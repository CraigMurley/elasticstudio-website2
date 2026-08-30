import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/content";
import Seo from "@/components/site/Seo";
import SpokeWheel from "@/components/site/SpokeWheel";
import { renderArticleMedia } from "@/data/articleMedia";
import competitorsAsset from "@/assets/dad-daughter-competitors.jpg.asset.json";
import colourSpaceAsset from "@/assets/dad-daughter-colour-space.jpg.asset.json";
import originalBrandAsset from "@/assets/original-brand-cornerstone.jpg.asset.json";
import brandUniverseAsset from "@/assets/dad-daughter-brand-universe.jpg.asset.json";
import brandDesignAsset from "@/assets/dad-daughter-brand-design.jpg.asset.json";
import stickersAsset from "@/assets/dad-daughter-stickers.jpg.asset.json";
import uniformsAsset from "@/assets/dad-daughter-uniforms.jpg.asset.json";
import primaryLogoAsset from "@/assets/dad-daughter-primary-logo.jpg.asset.json";
import secondaryLogosAsset from "@/assets/dad-daughter-secondary-logos.jpg.asset.json";

const Article = () => {
  const { slug } = useParams();
  const idx = articles.findIndex((a) => a.slug === slug);
  const a = articles[idx >= 0 ? idx : 0];
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);
  return (
    <>
      <Seo
        title={`${a.title} | Elastic Studio`}
        description={a.excerpt}
        path={`/articles/${a.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          datePublished: a.date,
          author: { "@type": "Person", name: "Craig Murley" },
          publisher: { "@type": "Organization", name: "Elastic Studio" },
        }}
      />
      <section className="bg-background pb-12 pt-12">
        <div className="container-x">
          <Link to="/articles" className="nav-link">← All articles</Link>
        </div>
        <div className="container-x mt-10 max-w-3xl">
          <span className="label-eyebrow text-primary">{a.date} · 6 min read</span>
          <h1 className="mt-6 font-display text-4xl font-light leading-[1.1] text-foreground md:text-6xl whitespace-pre-line">
            {a.slug === "logo-vs-brand" ? (
              <>The difference between a <span className="text-primary">logo</span> {"\n"}and a <span className="text-primary">brand</span></>
            ) : a.title}
          </h1>
          <p className="mt-6 text-muted-foreground">By Craig Murley · Elastic Studio</p>
        </div>
        <div className="container-x mt-10">
          <div className="aspect-video overflow-hidden rounded-[8px] border border-hairline">
            {renderArticleMedia(a.slug, "h-full w-full object-cover", a.title)}
          </div>
        </div>
      </section>

      <article className="bg-background pb-24">
        <div className="container-x">
          {a.slug === "your-website-is-your-brand" ? (
            <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
              <p>{a.excerpt}</p>
              <p>
                A website is no longer a brochure. It's the single environment where almost every customer eventually meets your brand on their own terms — unguided, unrushed, and ready to make a decision. Long before anyone speaks to your team, they've already decided whether you look credible, whether you sound like you understand them, and whether you feel like a company worth trusting with their money.
              </p>
              <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary">
                "Your website isn't where people learn about your brand. It is your brand."
              </blockquote>
              <p>
                Every other channel — ads, social, referrals, search — ends at the same place. The website is the convergence point. If the brand promise breaks down here, nothing upstream can save it. If it holds, every other touchpoint compounds.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Why the website is the <span className="text-primary">brand decision</span></h2>
              <p>
                A logo can be admired. A tagline can be remembered. But a website is <em>used</em>. People scroll it, navigate it, compare it, and judge it against everything else they've ever opened in a browser. That experience — the typography, the pace, the clarity, the confidence — becomes the brand in the customer's mind. There is no separating the two.
              </p>
              <p>
                This is why a beautiful identity on a clumsy site quietly undermines itself. And it's why a sharply-written, well-built website can make a small company feel substantial, and a substantial company feel inevitable.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">How a website moves someone <span className="text-primary">off the fence</span></h2>
              <p>
                Most buyers don't arrive ready. They arrive curious, cautious, and comparing. The job of the website isn't to shout — it's to remove every reason not to proceed. That's a brand job as much as a UX one.
              </p>
              <p>
                It happens through small, deliberate things. A headline that names the exact problem they're sitting with. A first scroll that proves you understand the work better than the next tab open in their browser. Proof that other people like them have already trusted you and been rewarded for it. Pricing or process that feels honest rather than hidden. A path forward that feels like a sensible next step, not a leap.
              </p>
              <p>
                Done well, none of this feels like persuasion. It feels like recognition. The visitor stops thinking "should I?" and starts thinking "of course." That shift — from evaluation to assumption — is what a brand-led website is designed to produce.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Where to from here</h2>
              <p>
                Treat the website as the most important brand decision you'll make this year, because it is. Every other piece of marketing eventually points here. Build it so that when someone finally arrives — undecided, distracted, and one click from leaving — the brand does the closing for you.
              </p>
            </div>
          ) : a.slug === "dad-and-daughter-rebrand" ? (
            <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
              <p>
                For years, Cornerstone Garage Doors was a solid, dependable name in the Tennessee garage door market.&nbsp;So when the team behind Cornerstone decided it was time for a bold new chapter, they didn't just want a new name. They wanted a brand with a soul - one built to scale nationally, told as a story, and impossible to confuse with anyone else in the category. The result is <Link to="/portfolio/client-c" className="text-primary hover:underline">Dad & Daughter Garage Door Service</Link>, an incredibly rewarding project for Elastic Studio.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">A strategy worth <span className="text-primary">building on</span></h2>
              <p>
                This rebrand started in exactly the right place: strategy. The Ryan Chute Group did the foundational work — the positioning, the market thinking, and the name itself - and it's a genuinely brilliant one. "Dad & Daughter" instantly does three things at once. It signals family-owned and trustworthy. It promises something warmer than the typical trades brand. And it sets up a story - a real, ongoing narrative about a father and daughter building something together - that can carry the company across radio, advertising, vehicles, uniforms, and community touchpoints for years to come.
              </p>
              <figure className="!my-10">
                <button
                  type="button"
                  onClick={() => setLightbox({ src: originalBrandAsset.url, alt: "Original Cornerstone Garage Doors brand" })}
                  className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Open image: Original Cornerstone brand"
                >
                  <img
                    src={originalBrandAsset.url}
                    alt="Original Cornerstone Garage Doors brand"
                    className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                    loading="lazy"
                  />
                </button>
                <figcaption className="mt-3 text-sm text-foreground/60">The original Cornerstone Garage Doors brand</figcaption>
              </figure>
              <p>
                Once that foundation was in place, the Ryan Chute Group brought Elastic Studio on board as their creative partner to bring it to life — to take that strategic platform and give it a face, a voice, and a visual system strong enough to carry the weight of that story. One that would work as well on a van in a driveway as it would on a billboard, a t-shirt, or a business card.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">The "best of both" <span className="text-primary">concept</span></h2>
              <p>
                The heart of the brand comes down to a simple but powerful idea: book smarts meets street smarts. Dad brings decades of hands-on, hard-earned installation expertise - the guy who leads a team that can can diagnose a garage door problem and delivers precision work. Daughter brings a university education and sharp business acumen — the person modernising operations, building the customer experience, and thinking about where the company goes next.
              </p>
              <p>
                Crucially, this is a partnership of equals. One of the clearest creative briefs we worked from was an explicit rejection of the tired "dumb dad" trope so common in family-business branding. Neither character outshines the other. They stand back-to-back, arms crossed, equally confident - a visual handshake that says "we've got this, together."
              </p>
              <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary">
                "Tough and technical, but never flashy<br />for its own sake."
              </blockquote>
              <p>
                To find the right tone, we looked at brands and cultural references that captured this dual identity: the rugged dependability of a Ford F-150, the understated sophistication of an Audi Q4, and the disciplined teamwork of a NASCAR pit crew — tough, technical, and tightly coordinated. That blend of toughness and intelligence, of blue-collar and white-collar, became the DNA of everything that followed.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Standing out in a crowded, <span className="text-primary">colourful market</span></h2>
              <p>
                Before a single pixel of the new identity was designed, we did our homework. The residential garage door category in the&nbsp;region is dominated by two major players - and both of them lean hard into bold reds, oranges, and deep blues and greens.
              </p>
              <div className="!my-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: competitorsAsset.url, alt: "Competitor brands A1 Garage Door Service and Precision Garage Door Service — websites and vehicle livery" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Direct Competitors"
                  >
                    <img
                      src={competitorsAsset.url}
                      alt="Competitor brands A1 Garage Door Service and Precision Garage Door Service — websites and vehicle livery"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Direct Competitors</figcaption>
                </figure>
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: colourSpaceAsset.url, alt: "Dad & Daughter colour space — colour wheel showing existing competitor brand colours to avoid" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Existing brands — colour spaces to avoid"
                  >
                    <img
                      src={colourSpaceAsset.url}
                      alt="Dad & Daughter colour space — colour wheel showing existing competitor brand colours to avoid"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Existing brands — colour spaces to avoid</figcaption>
                </figure>
              </div>
              <p>
                We mapped out the colour territory these competitors already owned and made a deliberate decision to go somewhere else entirely. The result is a palette built around deep graphite and a confident, saturated magenta — a combination that simply doesn't exist anywhere else in this market. It's bold without being garish, premium without losing approachability, and — most importantly — it's instantly recognisable from a distance. In a category where visual space has been very well owned, Dad & Daughter looks like it belongs to a different, better-run business altogether.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Characters worth <span className="text-primary">remembering</span></h2>
              <p>
                At the centre of the new identity are Dad and Elizabeth (Daughter) themselves, illustrated as a mascot pairing that's warm without being cartoonish, and professional without being stiff. We explored dozens of reference points — from classic American mascots to modern tech brand characters — before landing on a style that feels approachable, contemporary, and built to age well as the brand scales.
              </p>
              <div className="!my-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: primaryLogoAsset.url, alt: "Dad & Daughter primary logo design" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Primary logo design"
                  >
                    <img
                      src={primaryLogoAsset.url}
                      alt="Dad & Daughter primary logo design"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Primary logo design</figcaption>
                </figure>
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: secondaryLogosAsset.url, alt: "Dad & Daughter secondary logos — badge, label, logotype, icon, and avatar variants" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Secondary logos"
                  >
                    <img
                      src={secondaryLogosAsset.url}
                      alt="Dad & Daughter secondary logos — badge, label, logotype, icon, and avatar variants"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Secondary logo system</figcaption>
                </figure>
              </div>
              <p>
                The badge-shaped icon nods to craftsmanship and structure — the kind of mark that feels at home on a uniform patch, a van door, or a hard hat sticker. Bold, uppercase "DAD" typography brings strength and durability, while "Daughter" is rendered in a confident retro script that adds warmth, personality, and a touch of nostalgia. Together, they create a logo that reads instantly, even at a glance from a moving car — which, for a brand whose vans are its biggest billboards, is exactly the point.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">A system built to do <span className="text-primary">the heavy lifting</span></h2>
              <p>
                A great logo is only the start. What makes a brand actually work in the real world is the system behind it — and that's where we spent much of our time. We developed a full identity architecture: primary and secondary logo lockups, a badge version, a circular "repair & care" stamp, social media avatars, and standalone character icons for messaging and community communications.
              </p>
              <div className="!my-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: brandUniverseAsset.url, alt: "Dad & Daughter 1-page brand universe" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Brand universe"
                  >
                    <img
                      src={brandUniverseAsset.url}
                      alt="Dad & Daughter 1-page brand universe"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Brand universe — pillars, palette, and references</figcaption>
                </figure>
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: brandDesignAsset.url, alt: "Dad & Daughter brand design — logo, livery, and collateral" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Brand design"
                  >
                    <img
                      src={brandDesignAsset.url}
                      alt="Dad & Daughter brand design — logo, livery, and collateral"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Brand design — logo system, livery, and collateral</figcaption>
                </figure>
              </div>
              <div className="!my-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: uniformsAsset.url, alt: "Dad & Daughter uniform designs — polos, caps, and outerwear" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Uniforms"
                  >
                    <img
                      src={uniformsAsset.url}
                      alt="Dad & Daughter uniform designs — polos, caps, and outerwear"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Uniforms — polos, caps, and outerwear</figcaption>
                </figure>
                <figure className="!my-0">
                  <button
                    type="button"
                    onClick={() => setLightbox({ src: stickersAsset.url, alt: "Dad & Daughter sticker layouts — service, caution, and reminder" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Stickers"
                  >
                    <img
                      src={stickersAsset.url}
                      alt="Dad & Daughter sticker layouts — service, caution, and reminder"
                      className="w-full rounded-[8px] cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </button>
                  <figcaption className="mt-3 text-sm text-foreground/60">Sticker layouts — service, caution, and reminder</figcaption>
                </figure>
              </div>
              <p>
                Then we put it to work. Full vehicle livery designs for a Ford Transit van and a RAM 1500 pickup bring the characters and colour palette to life on the road - bold enough to be seen from blocks away, but cohesive enough to feel like one unmistakable brand. Uniform designs carry the magenta-and-graphite palette through polos and caps, with the characters embroidered front and centre. Business cards, letterhead, and a full digital brand guideline round out a toolkit built so that — whether the company adds five vans or fifty - every new touchpoint looks like it was made by the same confident, considered hand.
              </p>
              <p>
                This is the part of branding that doesn't always make it into the highlight reel, but it's the part that determines whether a rebrand actually sticks: a system robust enough that the brand stays consistent as it grows, scales, and reaches new markets.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">A brand built to <span className="text-primary">travel</span></h2>
              <p>
                What started as a local Tennessee garage door company rebrand has turned into something with genuinely national potential - a brand designed from day one to be "elastic" enough to grow, distinctive enough to be remembered, and warm enough to build real community loyalty along the way. That's exactly the kind of project we love: strategy, story, and design system working together, each making the other stronger.
              </p>
              <p>
                If your business is going through its own evolution - whether that's a full rebrand, a market expansion, or simply a brand that no longer feels like it fits - we'd love to talk. If you're a US-based company thinking about what's next for your brand, <Link to="/contact" className="text-primary hover:underline">get in touch with Elastic Studio</Link>.
              </p>
              <p>
                We'd be glad to show you what's possible.
              </p>
            </div>
          ) : a.slug === "founder-voice" ? (
            <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
              <p>{a.excerpt}</p>
              <p>
                Almost every great company is the long shadow of one person. Scratch the surface of a brand you admire and you'll find a founder whose convictions, taste, and quiet obsessions are written into every decision. The product reflects them. The hiring reflects them. The way the company answers an email reflects them. The brand is just the most visible layer of that.
              </p>
              <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary">
                "A startup's brand is the founder's philosophy made visible."
              </blockquote>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">The founder sets the <span className="text-primary">tone</span></h2>
              <p>
                In the early years, the founder <em>is</em> the culture. What they tolerate becomes the standard. What they get excited about becomes the strategy. The way they speak in a meeting becomes the way the company sounds in the world. That tone — whether they realise it or not — is the brand's first and most honest signal.
              </p>
              <p>
                When founders try to outsource that voice too early, the brand starts to drift. It looks competent but reads as anonymous. It could belong to anyone, which means it belongs to no one.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">It's not the designer's <span className="text-primary">taste</span></h2>
              <p>
                A brand is not the designer's portfolio piece. Our job isn't to impose a style we happen to like this season. Our job is to listen carefully enough to the founder and the team that the brand we build feels inevitable — like it could only have come from them.
              </p>
              <p>
                Authenticity is the whole game. A brand is the suit the business wears in public. If the suit doesn't fit the body underneath, everyone notices, even if they can't say why. The most beautiful identity in the world will quietly fail if it feels borrowed.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">A brand is a <span className="text-primary">living thing</span></h2>
              <p>
                The brand has to feel like the culture of the people building it — the founder's philosophy, the team's instincts, the way they actually work when no one is watching. That's why a brand isn't a static deliverable. It's a living thing. It grows, sharpens, and matures as the company does.
              </p>
              <p>
                The job, then, isn't to invent a personality. It's to find the one that's already there, give it a shape, and trust the founder enough to let it sound like them.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Where to from here</h2>
              <p>
                Founders: stop hiding. Your voice — your point of view, your standards, your slightly stubborn opinions — is the most defensible asset the company has. Build the brand around it, not in spite of it.
              </p>
            </div>
          ) : (
          <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
            <p>{a.excerpt}</p>
            <p>
              Brand work is, more than anything, a discipline of attention. The decisions that matter most are usually the ones nobody notices — the spacing of a wordmark, the cadence of a sentence, the temperature of a colour. Get those right and everything downstream gets easier.
            </p>
            <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary whitespace-pre-line">
              "The best brands aren't louder. {"\n"}They're more deliberate."
            </blockquote>
            <p>
              After three decades of doing this work, the lesson that keeps repeating itself is this: restraint is a strategy. The brands that hold up over time are the ones that say less, but mean more.
            </p>
            <p>
              That's true for early-stage founders trying to find their voice, and it's true for established companies trying to grow into a new chapter. The medium changes. The principle doesn't.
            </p>
            <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Why it's so important to find your <span className="text-primary">unique brand space</span></h2>
            <SpokeWheel className="mb-4 aspect-square w-full overflow-hidden rounded-2xl border border-hairline md:ml-6 md:w-1/2 md:float-right" />
            <p>
              If we imagine this 360-degree view of brands and their messaging, you'll notice that most brands end up in one area, competing with each other. The winners and the disruptors look at the strategies of those brands — all the other angles available — and find an angle that hasn't been well-trodden yet.
            </p>
            <p>
              At Elastic Studio, we make this one of our key missions. We find the place that you can own. We make you look different to your competitors so that you don't have to compete in the same head space.
            </p>
            <p>
              This is the thing I learned about award-winning work: it's the same situation. Sometimes a brilliant idea will come from two sides of the world at the same time, but the fact that they are no longer unique cancels each other out. While the ones that have a message that is out of step with their competitors are the ones that are remembered. This is not easy to do, but this is what we do. Check out <Link to="/awards" className="text-primary hover:underline">Craig's page of Awards</Link>.
            </p>
            <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Where to from here</h2>
            <p>
              If there's one thing worth taking from this, it's that the work of brand isn't decoration applied at the end. It's a series of decisions made early — about who you're for, what you stand for, and how you want to be remembered.
            </p>
          </div>
          )}

          <div className="card-hover-glow mx-auto mt-16 flex max-w-[680px] flex-col items-start gap-6 rounded-3xl border border-hairline bg-surface p-8 md:flex-row md:items-center md:justify-between">
            <p className="whitespace-pre-line font-display text-xl font-light text-foreground md:text-2xl">
              Enjoyed this? {"\n"}Let's talk about your brand.
            </p>
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </article>
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close image"
            className="absolute right-4 top-4 rounded-full bg-foreground/10 p-2 text-foreground transition hover:bg-foreground/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-[8px] object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

export default Article;
