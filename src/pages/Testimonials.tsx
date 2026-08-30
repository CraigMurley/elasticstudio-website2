import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import CtaBanner from "@/components/site/CtaBanner";
import { testimonials } from "@/data/content";
import { Quote } from "lucide-react";
import Seo from "@/components/site/Seo";

const Testimonials = () => {
  return (
    <>
      <Seo
        title="Testimonials — What Clients Say | Elastic Studio"
        description="A decade of partnerships, told in the words of the founders, marketers and creative directors who trusted us with their brands."
        path="/testimonials"
      />
      <section className="bg-background pt-24 pb-12">
        <div className="container-x">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionHeading eyebrow="WHAT OUR CLIENTS SAY" accent>
                What clients say about working with us.
              </SectionHeading>
            </div>
            <p className="text-base text-muted-foreground md:col-span-5">
              A decade of partnerships, told in the words of the founders, marketers and creative directors who trusted us with their brands.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background pb-24">
        <div className="container-x">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={(i % 6) * 60}>
                <figure className="card-hover-glow mb-6 break-inside-avoid rounded-3xl border border-hairline bg-surface p-8 hover:border-primary/40">
                  <Quote className="h-6 w-6 text-primary" aria-hidden />
                  <blockquote className="mt-5 font-display text-lg font-light leading-snug text-foreground md:text-xl">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 label-eyebrow">— {t.attribution}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Testimonials;