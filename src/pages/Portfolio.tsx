import { useMemo, useState } from "react";
import CaseCard from "@/components/site/CaseCard";
import CtaBanner from "@/components/site/CtaBanner";
import Reveal from "@/components/site/Reveal";
import { cases, type CaseCategory } from "@/data/content";
import Seo from "@/components/site/Seo";

const FILTERS: ("All" | CaseCategory)[] = ["All", "brand design", "Video"];

const Portfolio = () => {
  const [active, setActive] = useState<"All" | CaseCategory>("All");

  const filtered = useMemo(
    () => (active === "All" ? cases : cases.filter((c) => c.category === active)),
    [active],
  );

  return (
    <>
      <Seo
        title="Selected Work — Brand Case Studies | Elastic Studio"
        description="A selection of the brands we've been trusted to build, evolve, and launch — across tech, biotech, consumer, and architecture."
        path="/portfolio"
      />
      <section className="bg-background py-24">
        <div className="container-x">
          <span className="label-eyebrow"><span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />Selected Brand Design Portfolio</span>
          <h1 className="mt-8 max-w-[18ch] font-display text-5xl font-extralight leading-[1.05] text-foreground md:text-7xl">
            Work that made a <span className="italic text-primary">difference.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg font-light text-muted-foreground">
            A selection of the brands we've been trusted to build, evolve, and launch.
          </p>
        </div>
      </section>

      <section className="bg-background pb-24">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap gap-3">
            {FILTERS.map((f) => {
              const isActive = f === active;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={[
                    "rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-hairline bg-surface text-muted-foreground hover:text-foreground hover:border-foreground/30",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {f === "brand design" ? "BRAND DESIGN" : f === "Video" ? "VIDEO" : f}
                </button>
              );
            })}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((c, i) => (
              <Reveal key={c.slug} delay={i * 60}>
                <CaseCard {...c} large />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Portfolio;
