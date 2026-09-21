import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/site/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="404 — Page not found | Elastic Studio"
        description="This page does not exist."
        path={location.pathname}
        noindex
      />
  <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="flex w-full max-w-4xl flex-col items-center gap-12 md:flex-row md:gap-24">
        {/* Large ghosted 404 */}
        <div className="relative shrink-0">
            <span className="select-none bg-gradient-to-b from-white/10 to-transparent bg-clip-text font-display text-[12rem] font-bold italic leading-none text-transparent md:text-[16rem]">
              404
            </span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Missing Strategy
            </h1>

            <h2 className="mb-6 font-display text-4xl font-bold leading-tight md:text-6xl">
              The design is <span className="italic">incomplete.</span>
            </h2>

            <p className="mx-auto mb-10 max-w-md font-light leading-relaxed text-muted-foreground text-lg md:text-xl md:mx-0">
              The page you were looking for was left on the cutting room floor. Let&rsquo;s get you back to the highlights.
            </p>

            <div className="flex flex-col items-center gap-6 sm:flex-row md:justify-start justify-center">
              <a
                href="/"
                className="group relative translate-x-0 translate-y-0 bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-1 active:translate-y-0"
              >
                Back to Home Page
                <span className="absolute inset-0 -z-10 translate-x-2 translate-y-2 border border-white/20 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
              </a>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
                <a href="/portfolio" className="transition-colors hover:text-primary">Work</a>
                <a href="/services" className="transition-colors hover:text-primary">Services</a>
                <a href="/articles" className="transition-colors hover:text-primary">Articles</a>
                <a href="/contact" className="transition-colors hover:text-primary">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
