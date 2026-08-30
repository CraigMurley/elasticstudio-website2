import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Seo from "@/components/site/Seo";

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project: string;
  referral_source: string | null;
  created_at: string;
}

const Submissions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [items, setItems] = useState<Submission[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth", { replace: true });
        return;
      }
      const fetchRole = async () =>
        (await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle()).data;

      let roles = await fetchRole();
      if (!roles) {
        // Studio owner bootstraps their own admin role (server-side email check).
        await supabase.rpc("claim_admin");
        roles = await fetchRole();
      }
      if (!roles) {
        if (active) {
          setAuthorized(false);
          setLoading(false);
        }
        return;
      }
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      } else if (active) {
        setItems(data as Submission[]);
      }
      if (active) {
        setAuthorized(true);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  if (loading) {
    return <section className="bg-background py-24"><div className="container-x text-muted-foreground">Loading…</div></section>;
  }

  if (!authorized) {
    return (
      <section className="bg-background py-24">
        <div className="container-x">
          <h1 className="font-display text-3xl font-light">Not authorized</h1>
          <p className="mt-3 text-muted-foreground">Your account doesn't have admin access.</p>
          <Button onClick={signOut} className="mt-6 rounded-full">Sign out</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo title="Submissions | Elastic Studio" description="Contact form submissions" path="/admin/submissions" />
      <section className="bg-background py-20">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="label-eyebrow"><span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />Admin</span>
              <h1 className="mt-6 font-display text-4xl font-extralight text-foreground md:text-5xl">Contact submissions</h1>
              <p className="mt-3 text-sm text-muted-foreground">{items.length} total</p>
            </div>
            <Button variant="outline" onClick={signOut} className="rounded-full">Sign out</Button>
          </div>

          <div className="mt-12 space-y-4">
            {items.length === 0 && (
              <p className="text-muted-foreground">No submissions yet.</p>
            )}
            {items.map((s) => (
              <article key={s.id} className="rounded-3xl border border-hairline bg-surface p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-xl text-foreground">{s.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      <a href={`mailto:${s.email}`} className="text-primary hover:underline">{s.email}</a>
                      {s.company && <> · {s.company}</>}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>{new Date(s.created_at).toLocaleString()}</div>
                    {s.referral_source && <div className="mt-1 uppercase tracking-widest">via {s.referral_source}</div>}
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm text-foreground/90">{s.project}</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => remove(s.id)} className="text-muted-foreground hover:text-destructive">
                    Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Submissions;