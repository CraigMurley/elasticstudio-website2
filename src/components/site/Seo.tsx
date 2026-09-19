import { Helmet } from "react-helmet-async";

const SITE_URL = "https://elasticstudio.com";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
};

const Seo = ({ title, description, path, type = "website", image, jsonLd, noindex }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const ogImage =
    image ??
    "https://storage.googleapis.com/gpt-engineer-file-uploads/tCnvxO6k5SOvKc3jkdlsIaMKjJD2/social-images/social-1776804780506-Elastic-Bold-landscape.webp";
  const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {ldArray.map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;