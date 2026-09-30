import type { WorkMedia } from "@/data/content";
import { articles, cases } from "@/data/content";
import { useEffect, useState } from "react";
import logosBriefsCard from "@/assets/article-33-briefs-logos-card.jpg";

import founderVoiceImage from "@/assets/article-founder-voice.jpg";
import dadDaughterHero from "@/assets/dad-daughter-hero.mp4";
import logoVsBrandVideo from "@/assets/whohire-logo-vs-brand.mp4";
import apsBrand from "@/assets/brand-universe-aps-intelligence-1-page-brand-universe-2025.jpg";
import garethBrand from "@/assets/brand-universe-gareth-james-1-page-brand-universe.jpg";
import helpCatsBrand from "@/assets/brand-universe-help-with-cats-1-page-brand-universe.jpg";
import highGroundBrand from "@/assets/brand-universe-high-ground-1-page-brand-universe.jpg";
import justacBrand from "@/assets/brand-universe-justac-1-page-brand-universe.jpg";
import mcbBrand from "@/assets/brand-universe-mcb-tour-championship-1-page-brand-universe.jpg";
import merlinBrand from "@/assets/brand-universe-merlin-pictures-group-1-page-brand-universe.jpg";
import orangeJacketsBrand from "@/assets/brand-universe-orange-jackets-1-page-brand-universe.jpg";
import perceptionBrand from "@/assets/brand-universe-perception-predict-1-page-brand-universe.jpg";
import pregistryBrand from "@/assets/brand-universe-pregistry-1-page-brand-universe-2022.jpg";
import aiBrandStrategyHero from "@/assets/article-ai-brand-strategy.png";
import aiVagueFoxHero from "@/assets/article-ai-vague-fox.jpg";
import machinesReadingHero from "@/assets/article-machines-reading.jpg";
import greatNewAverageHero from "@/assets/article-great-new-average.jpg";
import founderBrandPlanHero from "@/assets/article-founder-brand-plan.jpg.asset.json";

const logoVsBrandSlides: string[] = [
  apsBrand,
  garethBrand,
  helpCatsBrand,
  highGroundBrand,
  justacBrand,
  mcbBrand,
  merlinBrand,
  orangeJacketsBrand,
  perceptionBrand,
  pregistryBrand,
];

const overrides: Record<string, WorkMedia> = {
  "founder-brand-plan": { type: "image", src: founderBrandPlanHero.url },
  "great-is-the-new-average": { type: "image", src: greatNewAverageHero },
  "machines-reading-your-brand": { type: "image", src: machinesReadingHero },
  "ai-brand-was-already-vague": { type: "image", src: aiVagueFoxHero },
  "ai-brand-strategy-90-seconds": { type: "image", src: aiBrandStrategyHero },
  "lessons-from-33-briefs": logosBriefsCard,
  "your-website-is-your-brand": { type: "video", src: "https://vimeo.com/1221763576", title: "FINAL SPARK HOME SCREEN DESIGN" },
  "founder-voice": founderVoiceImage,
  "dad-and-daughter-rebrand": { type: "video", src: dadDaughterHero },
  "logo-vs-brand": { type: "video", src: logoVsBrandVideo },
};

export const getArticleMedia = (slug: string): WorkMedia => {
  if (overrides[slug]) return overrides[slug];
  const i = articles.findIndex((a) => a.slug === slug);
  const idx = i >= 0 ? i : 0;
  return cases[idx % cases.length].image;
};

export const renderArticleMedia = (slug: string, className: string, alt = "") => {
  if (slug === "logo-vs-brand") {
    return <ArticleSlideshow slides={logoVsBrandSlides} className={className} alt={alt} />;
  }
  const media = getArticleMedia(slug);
  const src = typeof media === "string" ? media : media.src;
  const isVideo = typeof media !== "string" && media.type === "video";
  if (isVideo) {
    const vimeoId = src.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
    if (vimeoId) {
      const embedSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&dnt=1&title=0&byline=0&portrait=0`;
      const mediaTitle = typeof media !== "string" && media.type === "video" ? media.title : undefined;
      return (
        <iframe
          src={embedSrc}
          title={mediaTitle || alt || "Project video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={className}
        />
      );
    }
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className={className}
      />
    );
  }
  return <img src={src} alt={alt} loading="lazy" className={className} />;
};

const ArticleSlideshow = ({
  slides,
  className,
  alt,
}: {
  slides: string[];
  className: string;
  alt: string;
}) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);
  return (
    <div className={`${className} relative overflow-hidden`}>
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};