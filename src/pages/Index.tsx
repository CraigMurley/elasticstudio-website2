import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProofBar from "@/components/site/ProofBar";
import SectionHeading from "@/components/site/SectionHeading";
import CaseCard from "@/components/site/CaseCard";
import CtaBanner from "@/components/site/CtaBanner";
import Reveal from "@/components/site/Reveal";
import ShowreelPlayer from "@/components/site/ShowreelPlayer";
import { cases, services, articles, testimonials } from "@/data/content";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, type ReactNode } from "react";
import craigImg from "@/assets/craig.jpg";
import Seo from "@/components/site/Seo";

type Faq = {
  question: string;
  answer: string;
  answerNodes?: ReactNode;
};

const faqs: Faq[] = [
  {
    question: "What is a One-Page Brand Universe?",
    answer:
      "The One-Page Brand Universe is a single, beautifully designed document that captures the entire personality of your brand. It includes your brand pillars, tone and behavior, admired brands and inspiration, typography and color system, and emotional direction. It becomes the reference point for everyone who works on your brand — designers, marketers, developers, and even new hires. Our clients often tell us it’s the most valuable thing they’ve ever received for their business.",
    answerNodes: (
      <>
        <p>The One-Page Brand Universe is a single, beautifully designed document that captures the entire personality of your brand.</p>
        <p>It includes:</p>
        <ul className="my-2 list-disc space-y-1 pl-5">
          <li>Your brand pillars</li>
          <li>Tone and behavior</li>
          <li>Admired brands and inspiration</li>
          <li>Typography and color system</li>
          <li>Emotional direction</li>
        </ul>
        <p>It becomes the reference point for everyone who works on your brand — designers, marketers, developers, and even new hires.</p>
        <p>
          Our clients often tell us it’s the most valuable thing they’ve ever received for their business. Check out <Link to="/articles/logo-vs-brand" className="text-primary underline-offset-4 hover:underline">our article</Link> for more.
        </p>
      </>
    ),
  },
  {
    question: "Who is Elastic Studio best suited for?",
    answer:
      "We work best with founders and entrepreneurs who care deeply about how their business is perceived, companies launching something new or leveling up, teams that want clarity, consistency, and confidence, and existing brands that need to evolve and stay up to date — a Brand Makeover adds a huge amount of value. If you want a quick logo with no thinking behind it, we’re not the right fit. If you want a brand that feels intentional and admired, you’re in the right place.",
    answerNodes: (
      <>
        <p>We work best with:</p>
        <ul className="my-2 list-disc space-y-1 pl-5">
          <li>Founders and entrepreneurs who care deeply about how their business is perceived</li>
          <li>Companies launching something new or leveling up</li>
          <li>Teams that want clarity, consistency, and confidence</li>
          <li>An existing brand that needs to evolve and to be up to date. A Brand Makeover adds a huge amount of value.</li>
        </ul>
        <p>If you want a quick logo with no thinking behind it, we’re not the right fit. If you want a brand that feels intentional and admired, you’re in the right place.</p>
      </>
    ),
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes, most of our clients work with us remotely. We collaborate with businesses across Europe and the United States, and all communication is done in English via Zoom, email, and shared documents. Our process is built to be smooth and clear, regardless of location. If you have any doubt — check out our client reviews.",
    answerNodes: (
      <>
        <p>Yes, most of our clients work with us remotely.</p>
        <p>
          We collaborate with businesses across Europe and the United States, and all communication is done in English via Zoom, email, and shared documents. Our process is built to be smooth and clear, regardless of location. If you have any doubt — check out <Link to="/testimonials" className="text-primary underline-offset-4 hover:underline">our client reviews</Link>.
        </p>
      </>
    ),
  },
  {
    question: "Will I be involved in the process?",
    answer:
      "Absolutely — but in a focused, structured way. We guide you through key decisions early, then translate that clarity into design. You won’t be overwhelmed with choices, but your input shapes the outcome at every meaningful stage. This balance is what clients love most about working with us.",
    answerNodes: (
      <>
        <p>Absolutely — but in a focused, structured way.</p>
        <p>We guide you through key decisions early, then translate that clarity into design. You won’t be overwhelmed with choices, but your input shapes the outcome at every meaningful stage. This balance is what clients love most about working with us.</p>
      </>
    ),
  },
  {
    question: "What makes Elastic Studio different from other brand agencies?",
    answer:
      "You work directly with senior creative leadership throughout, so the thinking never gets lost between a pitch team and a delivery team. We combine strategy and design in one focused process, then stay close until the brand feels right and works in the real world. We don’t just make your business look good. We make your business make sense - and easy for your ideal client to love.",
    answerNodes: (
      <>
        <p>
          We're a studio, not an agency. You work directly with senior creative leadership throughout, so the thinking never gets lost between a pitch
          team and a delivery team. We combine strategy and design in one focused process, then stay close until the
          brand feels right and works in the real world.
        </p>
        <p>We don’t just make your business look good. We make your business make sense - and easy for your ideal client to love.</p>
      </>
    ),
  },
  {
    question: "Can a One-Page Brand Universe replace a full brand guideline?",
    answer:
      "For most startups, yes. The 1-Page Brand Universe gives you the essence and direction needed to create confidently. Larger teams or franchises still benefit from extended guidelines later - but the Universe is always the foundation for an MVP. Think of it as the soul of the brand on one page, before the rulebook.",
    answerNodes: (
      <>
        <p>
          For most startups, yes. The 1-Page Brand Universe gives you the essence and direction needed to create
          confidently. Larger teams or franchises still benefit from extended guidelines later - but the Universe is
          always the foundation for an MVP.
        </p>
        <p>Think of it as the soul of the brand on one page, before the rulebook.</p>
      </>
    ),
  },
  {
    question: "How long does a branding project take?",
    answer:
      "It depends on the scope and how quickly decisions can be made. Most focused brand projects take several weeks rather than several months. Once we understand what you need, you’ll receive a clear schedule with milestones before the work begins.",
  },
  {
    question: "How much does it cost to work with Elastic Studio?",
    answer:
      "Every engagement is scoped around the business challenge, the people involved and what needs to be delivered. After an initial conversation, we’ll recommend the right level of support and provide a clear proposal with no hidden extras.",
  },
];

const Index = () => {
  const featured = cases.slice(0, 3);
  const latest = articles[0];
  const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let raf = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      glow.style.setProperty("--glow-x", `${currentX}%`);
      glow.style.setProperty("--glow-y", `${currentY}%`);
      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 50;
      targetY = 50;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <Seo
        title="Elastic Studio — Brand Strategy & Design for Founders"
        description="Brand strategy and design that turns ambitious founders into category leaders. Budapest · London · Zug."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://elasticstudio.com/#studio",
            name: "Elastic Studio",
            url: "https://elasticstudio.com/",
            description:
              "Brand strategy and design studio partnering with founders on strategy, identity, naming, voice, and launch-ready design systems.",
            founder: { "@type": "Person", name: "Craig Murley", jobTitle: "Founder & Creative Director" },
            foundingDate: "2014",
            areaServed: ["Budapest", "London", "Zug", "Worldwide"],
            knowsAbout: [
              "Brand strategy",
              "Brand identity",
              "Naming",
              "Brand voice",
              "Design systems",
              "Rebranding",
            ],
            serviceType: ["Brand Launch", "Brand Evolution", "Brand Refresh"],
            sameAs: ["https://elasticstudio.com/"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Elastic Studio",
            url: "https://elasticstudio.com/",
            publisher: { "@id": "https://elasticstudio.com/#studio" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          },
        ]}
      />
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-background">
        <div ref={glowRef} className="pointer-events-none absolute inset-0 gold-glow" aria-hidden />
        <div className="container-x relative flex flex-col items-center py-24 text-center pt-[46px]">
          <Reveal>
            <span className="label-eyebrow">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />
              Brand Strategy & Design · Est. 2014
            </span>
          </Reveal>
          <Reveal delay={160} className="mt-10 w-full">
            <div className="mx-auto w-full max-w-5xl">
              <ShowreelPlayer videoId={1221748734} title="ELASTIC STUDIO SHOWREEL 2026" />
            </div>
          </Reveal>
          <Reveal delay={260}>
            <h1 className="mx-auto mt-8 max-w-[20ch] font-display leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl sm:leading-[1.05] md:text-6xl lg:leading-[1.02] lg:text-6xl font-medium text-5xl">
              Let's get your ideal client to <span className="italic text-primary font-medium">love your business.</span>
            </h1>
          </Reveal>
          <Reveal delay={340}>
            <p className="mx-auto mt-8 max-w-xl text-base font-light text-muted-foreground md:text-lg whitespace-pre-line">
              Let's build you a brand that makes you look like the category leader. {"\n"}Then makes you one.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary px-7 py-6 text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">Let's Talk</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary bg-transparent px-7 py-6 text-primary hover:bg-primary/10 hover:text-primary">
                <Link to="/portfolio">See Our Work</Link>
              </Button>
            </div>
          </Reveal>
          <div className="mt-16 flex items-center justify-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-10 bg-hairline" />
            BUDAPEST · LONDON · ZUG
            <span className="h-px w-10 bg-hairline" />
          </div>
        </div>
      </section>

      <ProofBar />

      {/* WHAT WE DO — light section */}
      <section className="bg-light py-24 text-[hsl(var(--light-foreground))]">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionHeading eyebrow="What we do" tone="light">
                We build brands that earn attention.
              </SectionHeading>
            </div>
            <p className="text-base text-[hsl(var(--light-foreground))]/70 md:col-span-5">
              Three ways we partner with founders and teams. Each one starts with the same question: what does this brand need to become?
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <Link
                  to={`/services#${s.slug}`}
                  className="card-hover-glow group flex h-full flex-col gap-6 rounded-3xl border border-l-4 border-hairline border-l-primary bg-[hsl(var(--background))] p-8 text-foreground hover:border-l-primary hover:bg-surface"
                >
                  <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">0{i + 1}</span>
                  <h3 className="font-display text-2xl font-light">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm text-primary">
                    Explore {s.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-surface py-24">
        <div className="container-x text-center">
          <div className="relative flex items-center justify-center gap-1.5">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-0 blur-2xl"
              style={{
                background:
                  "radial-gradient(60% 120% at 50% 50%, hsl(var(--primary) / 0.45) 0%, transparent 70%)",
              }}
            />
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="relative h-4 w-4 fill-primary text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
                aria-hidden
              />
            ))}
          </div>
          <span className="label-eyebrow mt-4 inline-block">WHAT OUR CLIENTS SAY</span>
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            className="mx-auto mt-10 max-w-5xl"
          >
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <figure className="px-4 md:px-10">
                    <blockquote className="mx-auto max-w-4xl font-display text-2xl font-light leading-snug text-foreground md:text-4xl">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="mt-8 label-eyebrow">— {t.attribution}</figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 border-hairline bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 border-hairline bg-background/60 text-foreground hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
          <Link to="/testimonials" className="nav-link mt-10 inline-block text-primary">
            Read all testimonials →
          </Link>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-background py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected work">Work that made a difference.</SectionHeading>
            <Link to="/portfolio" className="nav-link text-primary">View all work →</Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <CaseCard {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="bg-surface-2 py-28">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-3">
            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-1 ring-primary/40 md:mx-0">
              <img src={craigImg} alt="Craig Murley, Founder of Elastic Studio" loading="lazy" className="h-full w-full object-cover" width={1280} height={1600} />
            </div>
          </div>
          <div className="md:col-span-9">
            <p className="font-display text-2xl font-light italic leading-snug text-foreground md:text-4xl">
              "It's not just a project for us. We guide and work with you until we hit the sweet spot."
            </p>
            <p className="mt-6 label-eyebrow">— Craig Murley, Founder · Elastic Studio</p>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLE */}
      <section className="bg-background py-24">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="Latest article">Thinking out loud.</SectionHeading>
          </div>
          <Link
            to={`/articles/${latest.slug}`}
            className="card-hover-glow group md:col-span-8 rounded-3xl border border-hairline bg-surface p-8 hover:border-primary/40 md:p-12"
          >
            <span className="label-eyebrow text-primary">{latest.date}</span>
            <h3 className="mt-4 font-display text-2xl font-light leading-snug text-foreground md:text-4xl">
              {latest.title}
            </h3>
            <p className="mt-4 max-w-2xl text-muted-foreground">{latest.excerpt}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
              Read this article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-24 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <SectionHeading eyebrow="FAQ">Questions? <span className="text-accent">We've got Answers.</span></SectionHeading>
              <p className="mt-6 max-w-sm text-base text-muted-foreground">
                The useful things to know before we start building your brand together.
              </p>
            </div>
          </div>
          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="border-t border-hairline">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="border-hairline">
                  <AccordionTrigger className="py-6 text-left font-display text-lg font-light leading-snug text-foreground hover:text-primary hover:no-underline md:py-7 md:text-xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl space-y-3 pb-7 pr-8 text-base leading-relaxed text-muted-foreground">
                    {faq.answerNodes ?? faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Index;
