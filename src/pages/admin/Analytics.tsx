import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Seo from "@/components/site/Seo";

interface ViewRow {
  path: string;
  session_id: string | null;
  referrer: string | null;
  created_at: string;
}

const DAYS = 30;

const Analytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [rows, setRows] = useState<ViewRow[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!role) {
        if (active) { setAuthorized(false); setLoading(false); }
        return;
      }

      const since = new Date(Date.now() - DAYS * 24 * 60 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from("page_views")
        .select("path, session_id, referrer, created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);

      if (active) {
        setRows((data as ViewRow[]) ?? []);
        setAuthorized(true);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [navigate]);

  if (loading) {
    return <section className="bg-background py-24"><div className="container-x text-muted-foreground">Loading…</div></section>;
  }

  if (!authorized) {
    return (
      <section className="bg-background py-24">
        <div className="container-x">
          <h1 className="font-display text-3xl font-light">Not authorized</h1>
          <p className="mt-3 text-muted-foreground">Your account doesn't have admin access.</p>
        </div>
      </section>
    );
  }

  const visitors = new Set(rows.map((r) => r.session_id ?? r.created_at)).size;

  const byPath = new Map<string, number>();
  rows.forEach((r) => byPath.set(r.path, (byPath.get(r.path) ?? 0) + 1));
  const topPages = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);

  const articles = topPages.filter(([p]) => p.startsWith("/articles/"));

  const bySource = new Map<string, number>();
  rows.forEach((r) => {
    let key = "Direct";
    if (r.referrer) {
      try { key = new URL(r.referrer).hostname.replace(/^www\./, ""); } catch { key = r.referrer; }
    }
    if (key.includes("elasticstudio.com")) return;
    bySource.set(key, (bySource.get(key) ?? 0) + 1);
  });
  const topSources = [...bySource.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  const stat = (label: string, value: string | number) => (
    <div className="rounded-3xl border border-hairline bg-surface p-6">
      <div className="label-eyebrow">{label}</div>
      <div className="mt-3 font-display text-4xl font-extralight text-foreground">{value}</div>
    </div>
  );

  const list = (title: string, items: [string, number][], empty: string) => (
    <div className="rounded-3xl border border-hairline bg-surface p-6 md:p-8">
      <h2 className="font-display text-xl font-light text-foreground">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map(([label, count]) => (
            <li key={label} className="flex items-baseline justify-between gap-6 border-b border-hairline pb-2 text-sm">
              <span className="truncate text-foreground/90">{label}</span>
              <span className="tabular-nums text-muted-foreground">{count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <Seo title="Analytics | Elastic Studio" description="Site traffic overview" path="/admin/analytics" />
      <section className="bg-background py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="label-eyebrow"><span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />Admin</span>
              <h1 className="mt-6 font-display text-4xl font-extralight text-foreground md:text-5xl">Traffic, last {DAYS} days</h1>
            </div>
            <Button variant="outline" className="rounded-full" onClick={() => navigate("/admin/submissions")}>
              Submissions
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {stat("Page views", rows.length)}
            {stat("Visitors", visitors)}
            {stat("Pages viewed", byPath.size)}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {list("Most-viewed pages", topPages, "No views recorded yet.")}
            {list("Most-read articles", articles, "No article views recorded yet.")}
          </div>

          <div className="mt-6">
            {list("Where visitors came from", topSources, "No referrers recorded yet.")}
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Views are recorded on the live site only, so local previews don't affect these numbers.
          </p>
        </div>
      </section>
    </>
  );
};

export default Analytics;
