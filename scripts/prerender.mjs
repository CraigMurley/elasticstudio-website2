/**
 * Build-time prerender / static snapshot.
 *
 * After `vite build`, this launches a headless browser, visits every public
 * route, waits for react-helmet-async to finish injecting the <title>,
 * canonical and robots tags, then writes a fully-formed static HTML file per
 * route into dist/. Google (and everyone else) then gets real content + real
 * meta in the first response, with no dependence on client-side JavaScript.
 *
 * The route list is derived automatically from src/data/content.ts, so new
 * articles/case studies added in Lovable are picked up on the next build with
 * no change to this file.
 *
 * Design notes:
 *  - No app/routing/Seo code is changed. We snapshot what the app already
 *    produces correctly.
 *  - Prerender is mandatory: because vercel.json intentionally has no SPA
 *    catch-all rewrite (so genuinely missing pages return a real 404), a
 *    build that produced no per-route files would 404 across the board.
 *    So if a browser cannot be launched, we FAIL the build - which safely
 *    leaves the previous good deploy live - rather than ship a broken site.
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const CONTENT = join(ROOT, "src", "data", "content.ts");
const PORT = 41763;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

/** Pull the slugs out of a named `export const <name> = [ ... ]` block. */
function slugsFromBlock(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`);
  if (start === -1) return [];
  // Block runs until the next top-level `export const` (or end of file).
  const rest = source.slice(start + `export const ${exportName}`.length);
  const nextExport = rest.indexOf("\nexport const ");
  const block = nextExport === -1 ? rest : rest.slice(0, nextExport);
  const slugs = [];
  const re = /slug:\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = re.exec(block)) !== null) slugs.push(m[1]);
  return slugs;
}

async function buildRouteList() {
  const source = await readFile(CONTENT, "utf8");
  const articleSlugs = slugsFromBlock(source, "articles");
  const caseSlugs = slugsFromBlock(source, "cases");

  const staticRoutes = [
    "/",
    "/about",
    "/services",
    "/portfolio",
    "/articles",
    "/testimonials",
    "/awards",
    "/contact",
  ];
  const routes = [
    ...staticRoutes,
    ...caseSlugs.map((s) => `/portfolio/${s}`),
    ...articleSlugs.map((s) => `/articles/${s}`),
  ];
  return { routes, articleSlugs, caseSlugs };
}

function startServer(indexHtml) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
        const ext = extname(urlPath);
        // Real asset request -> serve from disk if present.
        if (ext && urlPath !== "/") {
          const filePath = join(DIST, urlPath);
          if (existsSync(filePath) && (await stat(filePath)).isFile()) {
            const body = await readFile(filePath);
            res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
            res.end(body);
            return;
          }
        }
        // Everything else -> SPA shell (the pristine built index.html).
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(indexHtml);
      } catch (err) {
        res.writeHead(500);
        res.end(String(err));
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function snapshot(page, url, waitSelector) {
  await page.goto(url, { waitUntil: "networkidle0", timeout: 45000 });
  // Wait for react-helmet-async to inject its managed tags. On heavy pages
  // this can take longer than a naive delay, so we wait on the actual tag.
  try {
    await page.waitForSelector(waitSelector, { timeout: 20000 });
  } catch {
    console.warn(`  ! helmet tag (${waitSelector}) not seen in time for ${url} - snapshotting anyway`);
  }
  // Small settle for any final tag reconciliation.
  await new Promise((r) => setTimeout(r, 400));
  const html = await page.evaluate(() => "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
  return html;
}

async function writeRoute(route, html) {
  const outPath = route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, "utf8");
  return outPath;
}

async function main() {
  if (!existsSync(join(DIST, "index.html"))) {
    console.error("prerender: dist/index.html not found - run `vite build` first.");
    process.exit(1);
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch (err) {
    // Fail the build rather than ship a site with no prerendered routes and no
    // SPA catch-all (see vercel.json) - that would 404 across the board. A
    // failed build leaves the previous good deploy live.
    console.error("prerender: puppeteer is required but could not be loaded. Failing the build.");
    console.error(String(err));
    process.exit(1);
  }

  const indexHtml = await readFile(join(DIST, "index.html"), "utf8");
  const { routes, articleSlugs, caseSlugs } = await buildRouteList();
  console.log(
    `prerender: ${routes.length} routes (${caseSlugs.length} portfolio, ${articleSlugs.length} articles + statics)`
  );

  const server = await startServer(indexHtml);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
  } catch (err) {
    console.error("prerender: could not launch a browser. Failing the build (see vercel.json - no SPA catch-all).");
    console.error(String(err));
    server.close();
    process.exit(1);
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const failures = [];
  for (const route of routes) {
    try {
      const html = await snapshot(page, `http://127.0.0.1:${PORT}${route}`, 'link[rel="canonical"][data-rh="true"]');
      const out = await writeRoute(route, html);
      const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "(no title)";
      console.log(`  ok  ${route}  ->  ${out.replace(ROOT + "/", "")}   [${title.slice(0, 60)}]`);
    } catch (err) {
      console.error(`  FAIL ${route}: ${err}`);
      failures.push(route);
    }
  }

  // Branded 404 with a real not-found status (served by Vercel as dist/404.html).
  try {
    const html = await snapshot(
      page,
      `http://127.0.0.1:${PORT}/__prerender_not_found__`,
      'meta[name="robots"][data-rh="true"]'
    );
    await writeFile(join(DIST, "404.html"), html, "utf8");
    console.log("  ok  404 -> dist/404.html (noindex baked in)");
  } catch (err) {
    console.error(`  FAIL 404 snapshot: ${err}`);
    failures.push("/404");
  }

  await browser.close();
  server.close();

  if (failures.length) {
    console.error(`prerender: ${failures.length} route(s) failed: ${failures.join(", ")}`);
    process.exit(1);
  }
  console.log("prerender: done.");
}

main().catch((err) => {
  console.error("prerender: unexpected error", err);
  process.exit(1);
});
