import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/content";
import Seo from "@/components/site/Seo";
import SpokeWheel from "@/components/site/SpokeWheel";
import { renderArticleMedia } from "@/data/articleMedia";
import competitorsAsset from "@/assets/dad-daughter-competitors.jpg";
import colourSpaceAsset from "@/assets/dad-daughter-colour-space.jpg";
import originalBrandAsset from "@/assets/original-brand-cornerstone.jpg";
import brandUniverseAsset from "@/assets/dad-daughter-brand-universe.jpg";
import brandDesignAsset from "@/assets/dad-daughter-brand-design.jpg";
import stickersAsset from "@/assets/dad-daughter-stickers.jpg";
import uniformsAsset from "@/assets/dad-daughter-uniforms.jpg";
import primaryLogoAsset from "@/assets/dad-daughter-primary-logo.jpg";
import secondaryLogosAsset from "@/assets/dad-daughter-secondary-logos.jpg";

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
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.excerpt,
            datePublished: new Date(a.date).toISOString().slice(0, 10),
            dateModified: new Date(a.date).toISOString().slice(0, 10),
            inLanguage: "en",
            mainEntityOfPage: `https://elasticstudio.com/articles/${a.slug}`,
            author: { "@type": "Person", name: "Craig Murley", url: "https://elasticstudio.com/about" },
            publisher: {
              "@type": "Organization",
              name: "Elastic Studio",
              url: "https://elasticstudio.com/",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://elasticstudio.com/" },
              { "@type": "ListItem", position: 2, name: "Articles", item: "https://elasticstudio.com/articles" },
              {
                "@type": "ListItem",
                position: 3,
                name: a.title,
                item: `https://elasticstudio.com/articles/${a.slug}`,
              },
            ],
          },
        ]}
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
                  onClick={() => setLightbox({ src: originalBrandAsset, alt: "Original Cornerstone Garage Doors brand" })}
                  className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Open image: Original Cornerstone brand"
                >
                  <img
                    src={originalBrandAsset}
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
                    onClick={() => setLightbox({ src: competitorsAsset, alt: "Competitor brands A1 Garage Door Service and Precision Garage Door Service — websites and vehicle livery" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Direct Competitors"
                  >
                    <img
                      src={competitorsAsset}
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
                    onClick={() => setLightbox({ src: colourSpaceAsset, alt: "Dad & Daughter colour space — colour wheel showing existing competitor brand colours to avoid" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Existing brands — colour spaces to avoid"
                  >
                    <img
                      src={colourSpaceAsset}
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
                    onClick={() => setLightbox({ src: primaryLogoAsset, alt: "Dad & Daughter primary logo design" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Primary logo design"
                  >
                    <img
                      src={primaryLogoAsset}
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
                    onClick={() => setLightbox({ src: secondaryLogosAsset, alt: "Dad & Daughter secondary logos — badge, label, logotype, icon, and avatar variants" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Secondary logos"
                  >
                    <img
                      src={secondaryLogosAsset}
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
                    onClick={() => setLightbox({ src: brandUniverseAsset, alt: "Dad & Daughter 1-page brand universe" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Brand universe"
                  >
                    <img
                      src={brandUniverseAsset}
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
                    onClick={() => setLightbox({ src: brandDesignAsset, alt: "Dad & Daughter brand design — logo, livery, and collateral" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Brand design"
                  >
                    <img
                      src={brandDesignAsset}
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
                    onClick={() => setLightbox({ src: uniformsAsset, alt: "Dad & Daughter uniform designs — polos, caps, and outerwear" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Uniforms"
                  >
                    <img
                      src={uniformsAsset}
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
                    onClick={() => setLightbox({ src: stickersAsset, alt: "Dad & Daughter sticker layouts — service, caution, and reminder" })}
                    className="block w-full overflow-hidden rounded-[8px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Open image: Stickers"
                  >
                    <img
                      src={stickersAsset}
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
          ) : a.slug === "great-is-the-new-average" ? (
            <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
              <p>{a.excerpt}</p>
              <p>
                There was a time when good work was enough to win. A sharp identity, a well-built website, a campaign that looked expensive - any of those could set you apart, because most of what surrounded you was, frankly, not very good.
              </p>
              <p>
                That time is over. Not because the bar collapsed, but because it rose for everybody at once.
              </p>
              <p>
                Every founder now has access to beautiful templates, capable freelancers, and tools that can produce a polished logo, a clean landing page and a month of on-brand social posts before lunch. The floor has lifted. Competent is free. Polished is cheap. Good is, for the first time, completely ordinary.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">A field of <span className="text-primary">lighthouses</span></h2>
              <p>
                Picture a coastline where every building is a lighthouse. Each one well made. Each one lit. Each one doing exactly what a lighthouse is supposed to do. From out at sea, what do you see?
              </p>
              <p>
                You see a glow. An even, pleasant, undifferentiated glow. None of them is wrong, and none of them is helping you navigate. When everything signals, nothing does.
              </p>
              <p>
                That is what most categories look like right now. Twenty competitors, all with tidy wordmarks, confident sans-serifs, soft gradients and a headline about being "the smarter way to" something. All good. All lit. All the same height.
              </p>
              <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary">
                "When everyone's work is good, good stops being a reason to choose you."
              </blockquote>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Better isn't the same as <span className="text-primary">different</span></h2>
              <p>
                The instinctive response is to try to be a little better. A slightly bolder colour. A slightly cleverer line. A slightly bigger budget for the photography. It feels like progress, and it almost never is.
              </p>
              <p>
                Being a little better than a field of good competitors just makes you a slightly brighter light in the same crowd. From a distance, the difference disappears. People don't choose between brands by comparing the quality of their kerning. They choose the one they remember, and they remember the one that stood somewhere nobody else was standing.
              </p>
              <p>
                The lighthouse that gets seen isn't the one with the best paintwork. It's the one that is built differently - taller, placed somewhere else, throwing its light in a direction the others never thought to.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Where great actually <span className="text-primary">comes from</span></h2>
              <p>
                Great work, the kind that still separates you when everyone's work is good, rarely comes from execution. Execution is the part that became abundant. It comes from the decisions made before anyone opens a design file.
              </p>
              <p>
                <strong>A position only you can hold.</strong> Not a list of qualities every competitor would also claim, but a specific place in the market that is true of you and awkward for anyone else to copy.
              </p>
              <p>
                <strong>A point of view you're prepared to defend.</strong> Brands that try to please everyone end up with nothing to say. The ones that stand out have opinions, and are willing to lose the customers who disagree.
              </p>
              <p>
                <strong>The discipline to be consistent.</strong> A single distinctive idea, repeated everywhere, beats ten clever ones that change with the season. Consistency is what turns a good idea into something people can actually recognise.
              </p>
              <p>
                None of that can be templated. None of it comes free with a subscription. That is exactly why it is now the whole game.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Where to <span className="text-primary">from here</span></h2>
              <p>
                If you look at your category and see a row of good-looking, well-lit competitors, that isn't a threat. It's a map. It shows you precisely where not to stand.
              </p>
              <p>
                The question worth asking isn't "how do we look as good as them?" You probably already do. It's "what could we say, and be, that none of them can?" Answer that honestly, build everything around it, and good stops being the ceiling. It becomes the thing everyone else is stuck at.
              </p>
              <p>
                If you suspect your brand is one more light in a very bright field, that's a conversation we'd enjoy having. <Link to="/contact" className="text-primary hover:underline">Let's talk</Link>.
              </p>
            </div>
          ) : a.slug === "machines-reading-your-brand" ? (
            <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
              <p>{a.excerpt}</p>
              <p>
                For thirty years, the entire discipline of branding rested on a simple assumption: a human being would look at your thing. They might look at it on a shelf, a billboard, a phone, a pitch deck. But a human would look, and something in them would move, and that movement was the whole game.
              </p>
              <p>
                That assumption is now partially wrong, and the part that's wrong is growing.
              </p>
              <p>
                An increasing share of first impressions no longer happen on a page you designed. They happen inside an answer - a synthesised paragraph assembled by a model that has never seen your colour palette, doesn't care about your kerning, and has read everything ever written about you with the emotional engagement of a filing cabinet. It will decide, in a fraction of a second, whether you get mentioned. And it will not be charmed.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">The plumbing isn't the <span className="text-primary">point</span></h2>
              <p>
                The technical crowd have already named this - answer engine optimisation, generative engine optimisation, pick your acronym - and are busy selling it as a plumbing problem. Schema. Structured data. Retrievability. All of it real, none of it the point.
              </p>
              <p>
                Because when you read what the serious analysts actually conclude, you find something almost embarrassingly old-fashioned. Onely's 2026 guidance on AI search visibility lands on three words: clear, trustworthy, distinctive. It notes that sheer volume of content matters less than how reusable a single answer is. Jarred Smith's analysis of AI-search data reports that brands appearing with both mentions and citations are roughly 40% more likely to resurface across consecutive queries than those carrying citations alone.
              </p>
              <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary">
                "The machine repeats brands that are easy to repeat."
              </blockquote>
              <p>
                Which is, of course, precisely what a brand has always been. Not a logo. Not a palette. A compression algorithm. A way of squeezing everything a company is into something a stranger can carry in their head and hand to someone else without dropping any of it.
              </p>
              <p>
                Here is the provocation. If your positioning cannot survive being compressed into one sentence by a system that has never met you, never liked you, and has no interest in your founder story - then it was never positioning. It was decoration. Expensive, beautifully rendered, professionally presented decoration.
              </p>
              <p>
                The machines have simply become the most ruthless focus group ever assembled. They don't nod politely in the room. They don't tell you the work is "interesting". They either repeat you or they don't.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">The production floor, <span className="text-primary">rebuilt</span></h2>
              <p>
                Meanwhile, the production floor is being rebuilt underneath us. Colabz AI Studio has launched a platform that codifies a brand's visual DNA - lighting, composition, texture, mood - into a persistent system it calls a Visual Bible, pitched openly as a replacement for traditional product photography. Superside and Punchcut are running ranked league tables of AI design agencies, and the shared promise is ten times the output at a fraction of the cost.
              </p>
              <p>
                Notice what is being sold there. Not better decisions. More outputs. Faster variants. Cheaper multiplication.
              </p>
              <p>
                And multiplication is a magnificent thing, right up until you realise what you're multiplying. Ten thousand on-brand assets generated from a brand that says nothing distinctive is simply a very efficient way to be ignored at scale. The bottleneck in creative work was never how quickly you could produce the fiftieth variant. It was whether the first one was worth producing.
              </p>
              <p>
                This is the strange gift the AI era has handed to anyone who does the hard part properly. The cheap layer got cheaper. The expensive layer - deciding what is true about a business, what it will refuse to say, what it will plant a flag on when it would be so much more comfortable to hedge - got more valuable, because it is now the only remaining input that matters.
              </p>
              <p>
                Fluxio's 2026 trend work notes that solo-founded startups climbed from 23.7% in 2019 to 36.3% by mid-2025, and identifies a ceiling where the operational load exceeds what one founder and their agents can carry. That ceiling is real. But it is an operations ceiling, not a judgement ceiling. Nobody has yet built a system that runs out of capacity to have a strong opinion.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Three unglamorous <span className="text-primary">things</span></h2>
              <p>
                <strong>Say one thing.</strong> Not four things weighted by stakeholder seniority. One. The machine will only carry one anyway, and it will pick for you if you don't.
              </p>
              <p>
                <strong>Say it identically everywhere.</strong> Consistency used to be a governance nicety enforced by a brand guardian nobody invited to lunch. It is now a retrieval mechanism. Your website, your LinkedIn, your press mentions, your case studies - every inconsistency is a vote for a different version of you.
              </p>
              <p>
                <strong>Make it repeatable.</strong> If a stranger cannot relay your positioning accurately after reading it once, a language model won't either. Write the sentence you want quoted back to you, and then actually earn it.
              </p>
              <p>
                None of this is new. It's just that the audience got larger, colder, and considerably harder to impress with a nice gradient.
              </p>
              <p>
                If your brand would struggle to survive being compressed by something that has never met you - that's usually a good conversation to have out loud. We have it often, and we rather enjoy it. <Link to="/contact" className="text-primary hover:underline">Let's talk</Link>.
              </p>
            </div>
          ) : a.slug === "ai-brand-was-already-vague" ? (
            <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
              <p>{a.excerpt}</p>
              <p>
                Nine in ten US marketing agencies now use generative AI. Half have moved on to agentic AI for actual execution. Forrester and the 4As published those numbers this year, and our industry received them the way it receives most numbers about itself: as a compliment. Look how fast we adopted. Look how modern we are.
              </p>
              <p>
                Then you read the rest of the finding, which is the part that matters. The same research concludes that this adoption — bolted onto an industry-wide obsession with productivity and cost efficiency — is undermining marketing effectiveness, creativity, and long-term brand growth.
              </p>
              <p>
                The tools got better. The work got worse. Both things are true, and the second one is not the fault of the first.
              </p>
              <p>
                Here's the uncomfortable bit, and we say it with affection: AI did not make your brand generic. AI made your brand <em>legible</em>. It took whatever was actually in your brand guidelines and ran it ten thousand times at speed, and what came back was a very honest answer to a question most companies had been getting away with not answering.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Averaging <span className="text-primary">machines</span></h2>
              <p>
                Because generative models are, at heart, averaging machines. They are trained on what already exists, so they return what already exists, smoothed. Feed one a brand with genuine conviction — a real point of view, a specific voice, an actual opinion about the world — and it becomes an extraordinary production engine. It scales the distinctiveness you already had. Feed it "innovative, trusted, human-centred, forward-thinking" and it will give you exactly that, in perpetuity, in every format, for pennies. It will give it to your competitor too, who wrote the same four words in a different order.
              </p>
              <p>
                This is why the sameness critique has moved from design Twitter to the boardroom this year. The AI-led campaigns from the big houses — Coca-Cola, Valentino, J.Crew — didn't fail because the pixels were wrong. The pixels were immaculate. They failed the way a very well-made greetings card fails: technically coherent, emotionally weightless. Nothing in them could only have come from that brand. And audiences, it turns out, are unnervingly good at spotting the difference between something made and something generated, even when they can't tell you why.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">The question worth <span className="text-primary">asking</span></h2>
              <p>
                So the question worth asking in 2026 isn't "how do we use AI?" Everyone is using AI. Nine in ten, remember. That's not a strategy, that's a utility bill. The question is: what, specifically, would be lost if a machine made our work instead of us?
              </p>
              <p>
                If the honest answer is "not much", you don't have an AI problem. You have a brand that was surviving on production values, and production values just became free.
              </p>
              <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary">
                "The scarce resource was never execution. It's the willingness to be one thing and not another."
              </blockquote>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Strength <span className="text-primary">compounds</span> now</h2>
              <p>
                The good news is that this cuts sharply in the other direction too. A brand with real clarity — a defensible position, a voice you'd recognise blindfolded, opinions it's prepared to lose customers over — can suddenly show up everywhere, consistently, at a volume that was economically impossible three years ago. The distance between the brands that know who they are and the brands that don't isn't narrowing. It's widening at machine speed.
              </p>
              <p>
                Which means the scarce resource was never execution. It hasn't been for a while. The scarce resource is the decision — the willingness to be one thing and not another, to plant a flag somewhere specific and stand next to it while the market floods with beautifully rendered nothing.
              </p>
              <p>
                That decision cannot be prompted. It can't be A/B tested into existence, and it certainly can't be outsourced to a tool trained on the average of everyone who came before you. It has to be made by people who are prepared to be wrong in public, which is, inconveniently, still the only way anything interesting has ever been made.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Where to <span className="text-primary">from here</span></h2>
              <p>
                Forrester's recommendation, for what it's worth, is that leaders reinvest their efficiency gains into talent, training and capability — into doing things that weren't possible before, rather than doing the same things cheaper. That's a polite way of saying the money you saved was supposed to buy you ambition. Most of it bought margin.
              </p>
              <p>
                So use the tools. Use all of them. We do, daily, and they're genuinely remarkable. But use them to amplify a point of view, not to manufacture one. Get the conviction right first, then let the machine make it loud.
              </p>
              <p>
                Otherwise you've simply bought the world's most expensive way to look like everybody else.
              </p>
              <p>
                If you're not certain what your brand would lose to a machine, that's the conversation worth having. We're at <Link to="/contact" className="text-primary hover:underline">Elastic Studio</Link>.
              </p>
            </div>
          ) : a.slug === "ai-brand-strategy-90-seconds" ? (
            <div className="mx-auto max-w-[680px] space-y-6 font-light leading-[1.75] text-foreground/90">
              <p>{a.excerpt}</p>
              <p>
                Ask an AI brand tool to "build my brand strategy" and, ninety seconds later, it hands you five pillars, three values (one of them is always "authenticity"), a moodboard of the same soft-focus gradients everyone else just got, and a tone-of-voice slide reading "confident yet approachable." Type "premium minimalist brand" into an image generator and you'll get the same handful of aesthetic clichés — regardless of who's asking, or why. By any reasonable definition, that's a brand strategy. It is also, structurally, identical to the one the AI just handed the founder two tabs over.
              </p>
              <p>
                Here's the part nobody selling these tools wants said out loud: that's not a bug they're racing to fix. It's the business model. A tool that produces the same output for every input scales infinitely. A strategist who produces a different, specific, occasionally uncomfortable answer for every client does not — and was never trying to.
              </p>
              <blockquote className="border-l-2 border-primary pl-6 font-display text-2xl font-light italic text-primary">
                "The mechanical middle of brand strategy just became a commodity. What's left was always the actual point."
              </blockquote>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">We've seen this <span className="text-primary">movie before</span></h2>
              <p>
                Stock photography didn't kill photography; it killed the market for generic photography and left the specific, art-directed kind more valuable. Templated websites didn't kill web design; they killed the twelve-page brochure site and made anything genuinely differentiated worth a premium. AI brand tools are running the identical play, faster, on strategy itself. What's left standing is the part that was always the actual point: someone with taste, pattern recognition, and the nerve to tell a founder their favourite idea is the weakest one in the room.
              </p>
              <p>
                That's uncomfortable for anyone whose value proposition was "we'll make you a nice deck." It's very good news for anyone whose value proposition was never the deck.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">The question an <span className="text-primary">AI won't ask</span></h2>
              <p>
                Here's the tell. Ask an AI tool for a brand strategy and it will never ask you an uncomfortable question back. It won't notice that your co-founders each described the company differently just now, that your pricing page contradicts your positioning, or that the story you tell investors and the story you tell customers have quietly drifted apart. A generic five-pillar deck can't catch any of that, because catching it requires having sat in the room, read the tension in the pause before someone answers, and cared enough to push. That's not a workflow gap the next model update closes. It's a different job entirely.
              </p>
              <p>
                This matters more right now than it would have two years ago, because the founders who most need real strategic thinking are also the ones most likely to reach for the free tool first — not out of laziness, but because it's genuinely hard to tell, from the outside, what you're not getting. The output looks polished. It has the right words on it. It's only six months later, watching a competitor with a sharper, more specific position pull ahead in a category you both entered at the same time, that the gap becomes visible. By then it's an expensive lesson instead of a cheap one.
              </p>
              <p>
                None of this is an argument against using AI in brand work — we use it constantly, for exactly the acceleration it's good at: faster exploration, more variations, less time on the mechanical stuff. The argument is narrower, and more useful: the tool is only as good as the thinking directing it. Point a generic prompt at a generic model and you get a generic answer, dressed in this season's aesthetic. Point genuine strategic judgment at the same model and it becomes a very fast pair of hands. The difference was never the software.
              </p>
              <h2 className="!mt-12 font-display text-3xl font-light text-foreground">Where to <span className="text-primary">from here</span></h2>
              <p>
                So here's the flag, planted: if your brand strategy could have been generated by typing one sentence into a box, it's not a strategy — it's a placeholder wearing a strategy's clothes, and your competitor typed a similar sentence into the same box last week. The founders who'll be talking about their positioning differently a year from now are the ones treating brand as the thinking, not the artefact.
              </p>
              <p>
                That's the whole pitch, really. We lead with thinking, not software — because the software was never the hard part.
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
