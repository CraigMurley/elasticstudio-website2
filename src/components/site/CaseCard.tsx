import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { type WorkMedia } from "@/data/content";

type Props = {
  slug: string;
  name: string;
  industry: string;
  outcome: string;
  image: WorkMedia;
  large?: boolean;
};

const CaseCard = ({ slug, name, industry, outcome, image, large }: Props) => {
  const media = typeof image === "string" ? { type: "image" as const, src: image } : image;
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

  return (
    <Link to={`/portfolio/${slug}`} className="card-hover-glow group block overflow-hidden rounded-3xl border border-hairline bg-surface">
      <div className="relative aspect-video overflow-hidden">
        {isEmbed ? (
          <iframe
            src={embedSrc}
            title={`${name} — ${industry}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0 transition-transform duration-700 group-hover:scale-105"
          />
        ) : isVideo ? (
          <video
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={media.src}
            alt={`${name} — ${industry}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <span className="absolute left-5 top-5 rounded-full border border-foreground/20 bg-background/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground backdrop-blur">
          {industry}
        </span>
      </div>
      <div className="flex items-start justify-between gap-6 p-6 md:p-8">
        <div>
          <h3 className="font-display text-2xl font-light text-foreground">{name}</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{outcome}</p>
        </div>
        <span className="nav-link mt-2 whitespace-nowrap text-primary">View Case →</span>
      </div>
    </Link>
  );
};

export default CaseCard;
