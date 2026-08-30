import { Link } from "react-router-dom";
import Reveal from "@/components/site/Reveal";
import { articles } from "@/data/content";
import CtaBanner from "@/components/site/CtaBanner";
import Seo from "@/components/site/Seo";
import { renderArticleMedia } from "@/data/articleMedia";

const Articles = () => (
  <>
    <Seo
      title="Articles — Brand Strategy & Design Essays | Elastic Studio"
      description="Thinking out loud. Sharing what 30 years of brand strategy and design taught us — for founders and creative teams."
      path="/articles"
    />
    <section className="bg-background py-24">
      <div className="container-x">
        <span className="label-eyebrow"><span className="mr-3 inline-block h-px w-8 align-middle bg-primary" />Articles</span>
        <h1 className="mt-8 max-w-[22ch] font-display text-5xl font-extralight leading-[1.05] text-foreground md:text-7xl">
          Thinking out loud. <span className="italic text-primary">Sharing what 30 years taught us.</span>
        </h1>
      </div>
    </section>

    <section className="bg-background pb-24">
      <div className="container-x grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 60}>
            <Link
              to={`/articles/${a.slug}`}
              className="card-hover-glow group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-surface hover:border-primary/40"
            >
              <div className="aspect-video overflow-hidden">
                {renderArticleMedia(a.slug, "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105")}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-7">
                <span className="label-eyebrow text-primary">{a.date}</span>
                <h3 className="font-display text-xl font-medium text-foreground">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.excerpt}</p>
                <span className="mt-auto text-sm text-primary">Read →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>

    <CtaBanner />
  </>
);

export default Articles;
