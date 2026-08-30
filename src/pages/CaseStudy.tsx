import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cases } from "@/data/content";
import CtaBanner from "@/components/site/CtaBanner";
import Seo from "@/components/site/Seo";
import VimeoWorkPlayer from "@/components/site/VimeoWorkPlayer";

const CaseStudy = () => {
  const { slug } = useParams();
  const idx = cases.findIndex((c) => c.slug === slug);
  const c = cases[idx >= 0 ? idx : 0];
  const next = cases[((idx >= 0 ? idx : 0) + 1) % cases.length];
  return (
    <>
      <Seo
        title={`${c.name} — ${c.industry} Case Study | Elastic Studio`}
        description={c.outcome}
        path={`/portfolio/${c.slug}`}
        type="article"
      />
      <section className="bg-background">
        <div className="container-x pt-12">
          <Link to="/portfolio" className="nav-link">← All work</Link>
        </div>
        <div className="container-x pt-10">
          <span className="label-eyebrow text-primary">{c.industry}</span>
          <h1 className="mt-6 max-w-[20ch] font-display text-5xl font-extralight leading-[1.05] text-foreground md:text-7xl">
            {c.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-muted-foreground">{c.outcome}</p>
        </div>
        <div className="container-x mt-12">
          <div className="card-hover-glow overflow-hidden rounded-xl border border-hairline bg-surface-2">
            <div className="relative aspect-video w-full">
              {(() => {
                const media = typeof c.image === "string" ? { type: "image" as const, src: c.image } : c.image;
                const isVideo = media.type === "video";
                const isYouTube = isVideo && /youtube\.com|youtu\.be/.test(media.src);
                const isVimeo = isVideo && /vimeo\.com/.test(media.src);
                const isEmbed = isYouTube || isVimeo;
                let embedSrc = media.src;
                if (isYouTube) {
                  const id = media.src.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1];
                  embedSrc = id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1` : media.src;
                } else if (isVimeo) {
                  const id = media.src.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
                  embedSrc = id ? `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1` : media.src;
                }
                if (isEmbed) {
                  return (
                    <iframe
                      src={embedSrc}
                      title={c.name}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  );
                }
                if (isVideo) {
                  return (
                    <video
                      src={media.src}
                      poster={media.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  );
                }
                return <img src={media.src} alt={c.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />;
              })()}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-24">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="label-eyebrow">The Challenge</span>
          </div>
          <p className="text-lg font-light text-foreground md:col-span-8">
            {c.challenge || "The client came to us with a strong business and a brand that no longer reflected it. Their audience had grown up; their identity hadn't. They needed a brand confident enough to match the company they'd actually become."}
          </p>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="label-eyebrow">Our Approach</span>
          </div>
          <div className="space-y-6 md:col-span-8">
            {c.approach ? (
              c.approach.map((paragraph, i) => (
                <p key={i} className="whitespace-pre-wrap text-foreground/90">
                  {paragraph.includes("Read the full story.") ? (
                    <>
                      {paragraph.replace("Read the full story.", "")}
                      <Link
                        to="/articles/dad-and-daughter-rebrand"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        Read the full story.
                      </Link>
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))
            ) : (
              <>
                <p className="text-foreground/90">
                  We started, as we always do, by listening. Discovery sessions with leadership, customers, and the team uncovered a story they hadn't realised they were already telling. From that, the strategy wrote itself.
                </p>
                <p className="text-foreground/90">
                  The new identity leaned into restraint — fewer elements, working harder. A typographic system built on contrast. A colour story rooted in the brand's natural temperature. A voice that finally sounded like the founders, not the category.
                </p>
                <p className="text-foreground/90">
                  We rolled it out across every touchpoint — digital, print, environmental — with guidelines designed to be used, not filed.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-x">
          <span className="label-eyebrow">The Work</span>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {c.workImages.map((item, i) => {
              const media = typeof item === "string" ? { type: "image" as const, src: item } : item;
              const isVideo = media.type === "video";
              const isYouTube = isVideo && /youtube\.com|youtu\.be/.test(media.src);
              const isVimeo = isVideo && /vimeo\.com/.test(media.src);
              const youTubeId = isYouTube ? media.src.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1] : undefined;
              const vimeoId = isVimeo ? media.src.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1] : undefined;
              let embedSrc = media.src;
              if (isYouTube && youTubeId) {
                embedSrc = `https://www.youtube.com/embed/${youTubeId}?autoplay=1&mute=1&loop=1&playlist=${youTubeId}&controls=0&modestbranding=1`;
              }
              return (
              <div key={i} className="card-hover-glow overflow-hidden rounded-xl border border-hairline">
                <div className="relative aspect-video w-full bg-surface-2">
                  {isVimeo && vimeoId ? (
                    <VimeoWorkPlayer videoId={Number(vimeoId)} title="Project artefact" hasAudio={media.hasAudio !== false} />
                  ) : isYouTube ? (
                      <iframe
                        src={embedSrc}
                        title="Project artefact"
                        loading="lazy"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    ) : isVideo ? (
                      <video
                        src={media.src}
                        poster={media.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                     ) : (
                       <img src={media.src} alt="Project artefact" loading="lazy" className={`absolute inset-0 h-full w-full ${media.fit === "contain" ? "object-contain p-[24px]" : "object-cover"}`} />
                     )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-x text-center">
          <span className="label-eyebrow">The Outcome</span>
          <p className="mx-auto mt-8 max-w-3xl font-display text-3xl font-light italic leading-snug text-primary md:text-5xl">
            "{c.outcome}"
          </p>
        </div>
      </section>

      <section className="bg-surface-2 py-20">
        <div className="container-x">
          <Link to={`/portfolio/${next.slug}`} className="group flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="label-eyebrow">Next case study</span>
              <h3 className="mt-3 font-display text-3xl font-light text-foreground md:text-5xl">{next.name}</h3>
            </div>
            <span className="inline-flex items-center gap-2 text-primary">
              View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default CaseStudy;
