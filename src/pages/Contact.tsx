import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Seo from "@/components/site/Seo";
import { supabase } from "@/integrations/supabase/client";

const Field = ({ label, id, children }: { label: string; id: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="label-eyebrow !text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [referral, setReferral] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim().slice(0, 200),
      email: String(form.get("email") || "").trim().slice(0, 255),
      company: String(form.get("company") || "").trim().slice(0, 200) || null,
      project: String(form.get("project") || "").trim().slice(0, 5000),
      referral_source: referral || null,
    };
    if (!payload.name || !payload.email || !payload.project) {
      toast({ title: "Please complete the form", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert(payload);
    setSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Thank you", description: "Craig will be in touch shortly." });
  };
  return (
    <>
      <Seo
        title="Contact — Let's Talk | Elastic Studio"
        description="We handpick the clients we work with. If you're building something worth believing in, we'd love to hear about it."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: "https://elasticstudio.com/contact",
          about: { "@type": "Organization", name: "Elastic Studio", url: "https://elasticstudio.com/" },
        }}
      />
      <section className="bg-background py-24">
        <div className="container-x">
          <span className="label-eyebrow"><span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />Contact Elastic Studio</span>
          <h1 className="mt-8 max-w-[22ch] font-display text-5xl font-extralight leading-[1.05] text-foreground md:text-7xl">
            <span className="block">Let's find out if</span>
            <span className="block italic text-primary">we're a good fit.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg font-light text-muted-foreground">
            We handpick the clients we work with. If you're building something worth believing in, we'd love to hear about it.
          </p>
        </div>
      </section>

      <section className="bg-surface-2 py-20">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-3xl font-light text-foreground">Tell us about your project.</h2>
            <div className="mt-10 space-y-6 text-sm text-muted-foreground">
              <div>
                <span className="label-eyebrow">Email</span>
                <p className="mt-2 font-display text-lg">
                  <a href="mailto:craig@elasticstudio.com" className="text-primary hover:underline">
                    craig@elasticstudio.com
                  </a>
                </p>
              </div>
              <div>
                <span className="label-eyebrow">Studios</span>
                <p className="mt-2 font-display text-lg text-foreground">BUDAPEST · LONDON · ZUG</p>
              </div>
              <div>
                <span className="label-eyebrow">Response time</span>
                <p className="mt-2">We reply to every enquiry within two working days.</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="rounded-3xl border border-primary/30 bg-surface p-10 text-center">
                <h3 className="font-display text-3xl font-light text-foreground">Thank you.</h3>
                <p className="mt-4 text-muted-foreground">Craig will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-hairline bg-surface p-8 md:p-10">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name" id="name"><Input id="name" name="name" required className="h-12 rounded-2xl border-hairline bg-background" /></Field>
                  <Field label="Email" id="email"><Input id="email" name="email" type="email" required className="h-12 rounded-2xl border-hairline bg-background" /></Field>
                </div>
                <Field label="Company / Brand" id="company"><Input id="company" name="company" className="h-12 rounded-2xl border-hairline bg-background" /></Field>
                <Field label="Tell us about your project" id="project">
                  <Textarea id="project" name="project" rows={6} required className="rounded-2xl border-hairline bg-background" />
                </Field>
                <Field label="How did you hear about us? (optional)" id="referral">
                  <Select value={referral} onValueChange={setReferral}>
                    <SelectTrigger className="h-12 rounded-2xl border-hairline bg-background">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="search">Search</SelectItem>
                      <SelectItem value="social">Social media</SelectItem>
                      <SelectItem value="press">Press / Article</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Button type="submit" disabled={submitting} size="lg" className="rounded-full bg-primary px-7 py-6 text-primary-foreground hover:bg-primary/90">
                  {submitting ? "Sending…" : "Send It →"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
