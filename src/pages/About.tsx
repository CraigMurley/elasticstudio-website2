import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProofBar from "@/components/site/ProofBar";
import SectionHeading from "@/components/site/SectionHeading";
import Reveal from "@/components/site/Reveal";
import craigImg from "@/assets/craig.jpg";
import Seo from "@/components/site/Seo";
import skypixel from "@/assets/awards/skypixel-2021.png";
import caro from "@/assets/awards/caro-2020.png";
import corti from "@/assets/awards/corti-2020.png";
import defy from "@/assets/awards/defy-2021.png";
import hollyshorts from "@/assets/awards/hollyshorts-2021.png";
import tokyoIndie from "@/assets/awards/tokyo-indie-shorts-2024.png";
import videoArtExp from "@/assets/awards/video-art-experimental-2021.png";
import chicagoAi from "@/assets/awards/chicago-ai-2024.png";

const awards = [
  { src: skypixel, alt: "1st Prize · SkyPixel 6th Anniversary Aerial Photo & Video Contest 2021", invert: false },
  { src: caro, alt: "Official Selection · CARO Festival Internacional de Cine en Centroamérica 2020", invert: false },
  { src: corti, alt: "Official Selection · Corti in Cortile — il cinema in breve 2020", invert: false },
  { src: defy, alt: "Official Selection · Defy Film Festival 2021", invert: false },
  { src: hollyshorts, alt: "Official Selection · HollyShorts Monthly Screenings 2021", invert: true },
  { src: tokyoIndie, alt: "Official Selection · Tokyo Indie Shorts Fest 2024", invert: true },
  { src: videoArtExp, alt: "Official Selection · Video Art and Experimental Film Festival 2021", invert: false },
  { src: chicagoAi, alt: "Official Selection · Chicago AI Film Festival 2024", invert: false },
];

const About = () => (
  <>
    <Seo
      title="About Elastic Studio — Craig Murley, Founder"
      description="30 years, three continents, 33 awards. Meet Craig Murley and the studio behind Elastic — boutique brand strategy and design."
      path="/about"
    />
    <section className="bg-background py-24">
      <div className="container-x grid gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <span className="label-eyebrow"><span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />About · Craig Murley</span>
          <h1 className="mt-8 font-display text-5xl font-extralight leading-[1.05] text-foreground md:text-7xl">
            Craig creates the <span className="italic text-primary">unexpected.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg font-light text-muted-foreground">
            30 years. Three continents. 33 awards. All in service of one thing: making your business impossible to ignore.
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-hairline">
            <img src={craigImg} alt="Craig Murley portrait" className="h-full w-full object-cover" loading="lazy" width={1280} height={1600} />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-surface-2 py-24">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionHeading eyebrow="The story">
            A career<br />
            not a CV.
          </SectionHeading>
        </div>
        <div className="space-y-12 md:col-span-8">
          <Reveal>
            <h3 className="font-display text-xl font-medium text-foreground">From Cape Town to Budapest</h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Craig started his career in Cape Town in the mid-1990s, working on brand programmes for some of South Africa's most ambitious businesses. London came next, then Zug, Switzerland then Budapest — where Elastic Studio was founded in 2014. Three decades, three continents, one consistent obsession: brands that earn attention.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="font-display text-xl font-medium text-foreground">Why handpicked clients?</h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Elastic Studio works with a small number of clients each year. It's a deliberate choice. Brand work done well takes time, attention, and a real partnership. We'd rather do five projects brilliantly than fifty competently.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic leading-snug text-primary md:text-3xl">
              "Strategy without craft is a deck. Craft without strategy is decoration. The work lives where they meet."
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="font-display text-xl font-medium text-foreground">What drives the work</h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Confidence over noise. Restraint over decoration. Warmth over distance. We make brands that founders are proud to put their name on, that customers remember, and that hold up at every scale.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    <ProofBar />

    <section className="bg-background py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Recognition">33 International Creative Awards.</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {awards.map((a, i) => (
            <div key={i} className="card-hover-glow flex aspect-square items-center justify-center rounded-2xl border border-hairline bg-background p-6">
              <img
                src={a.src}
                alt={a.alt}
                loading="lazy"
                className={`max-h-full max-w-full object-contain ${a.invert ? "invert" : ""}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="link" className="text-foreground hover:text-primary">
            <Link to="/awards">See all awards →</Link>
          </Button>
        </div>
      </div>
    </section>

    <section className="bg-surface py-24">
      <div className="container-x flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <h2 className="max-w-[20ch] font-display text-3xl font-light text-foreground md:text-5xl">Ready to work together?</h2>
        <Button asChild size="lg" className="rounded-full bg-primary px-7 py-6 text-primary-foreground hover:bg-primary/90">
          <Link to="/contact">Let's Talk</Link>
        </Button>
      </div>
    </section>
  </>
);

export default About;
