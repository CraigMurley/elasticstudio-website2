import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import CtaBanner from "@/components/site/CtaBanner";
import { services } from "@/data/content";
import Seo from "@/components/site/Seo";

const steps = [
  { n: "01", t: "Discovery", d: "A deep-dive into your business, audience, and ambition. We listen first." },
  { n: "02", t: "Strategy", d: "Positioning, voice, and the brief that guides everything that follows." },
  { n: "03", t: "Design", d: "The visual system, built to last — and to flex as your business grows." },
  { n: "04", t: "Launch & Beyond", d: "We don't disappear after launch. We stay close while the brand finds its feet." },
];

const Services = () => (
  <>
    <Seo
      title="Services — Brand Launch, Evolution & Refresh | Elastic Studio"
      description="Three ways we partner with founders and teams: Brand Launch, Brand Evolution, and Brand Refresh. Strategy, identity, voice, and launch-ready systems."
      path="/services"
      jsonLd={services.map((s) => ({
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.title,
        description: s.short,
        provider: { "@type": "Organization", name: "Elastic Studio" },
      }))}
    />
    <section className="bg-background py-24">
      <div className="container-x">
        <span className="label-eyebrow"><span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />Brand Strategy &amp; Design Services</span>
        <h1 className="mt-8 max-w-[20ch] font-display text-5xl font-extralight leading-[1.05] text-foreground md:text-7xl">
          We don't just make things look good. <span className="italic text-primary">We make them work.</span>
        </h1>
      </div>
    </section>

    {services.map((s, i) => (
      <section key={s.slug} id={s.slug} className={i % 2 === 0 ? "bg-surface-2 py-24" : "bg-background py-24"}>
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Reveal>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">0{i + 1} · Service</span>
              <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] text-foreground md:text-6xl">{s.title}</h2>
              <p className="mt-6 text-muted-foreground">{s.audience}</p>
              <p className="mt-4 font-display text-lg font-light italic text-primary">{s.outcome}</p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={120}>
              <div className="card-hover-glow rounded-3xl border border-hairline bg-surface p-8 md:p-10">
                <span className="label-eyebrow">What's included</span>
                <ul className="mt-6 space-y-4">
                  {s.includes.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-foreground">
                      <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm md:text-base">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    ))}

    <section className="bg-surface py-[60px]">
      <div className="container-x">
        <SectionHeading eyebrow="How we work">Four steps. Every project.</SectionHeading>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="card-hover-glow flex h-full flex-col gap-4 rounded-3xl border border-hairline bg-background p-8">
                <span className="font-display text-5xl font-extralight text-primary">{s.n}</span>
                <h3 className="font-display text-xl font-medium text-foreground">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-background py-24">
      <div className="container-x flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-[24ch] font-display text-3xl font-light text-foreground md:text-5xl">
          Not sure which is right for you? Let's find out.
        </h2>
        <Button asChild size="lg" className="rounded-full bg-primary px-7 py-6 text-primary-foreground hover:bg-primary/90">
          <Link to="/contact">Get in Touch</Link>
        </Button>
      </div>
    </section>

    <CtaBanner headline="Let's build something worth remembering." cta="Start a Project" />
  </>
);

export default Services;
