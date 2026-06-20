import { Helmet } from "react-helmet-async";
import {
  generateOGMeta,
  generateTwitterMeta,
  getCanonicalUrl,
} from "../utils/seoHelpers";

/**
 * SEO Component - Manages all meta tags for a page
 * Usage: <SEO title="..." description="..." />
 */
export const SEO = ({
  title = "Daily News Flow",
  description = "Latest breaking news, trending stories, and AI-powered news updates",
  keywords = "news, breaking news, trending stories, world news, technology, business, sports",
  image = "https://www.dailynewsflow.com/preview.png",
  imageAlt = "Daily News Flow preview image",
  url = getCanonicalUrl(),
  type = "website",
  author = "Daily News Flow",
  noindex = false,
  children,
}) => {
  const pageTitle = title?.trim();
  const titleSuffix = "Daily News Flow";
  const fullTitle =
    !pageTitle || /(?:\||—)\s*Daily News Flow$/i.test(pageTitle)
      ? pageTitle || titleSuffix
      : `${pageTitle} | ${titleSuffix}`;

  const ogMeta = generateOGMeta({
    title: fullTitle,
    description,
    image,
    url,
    type,
  });

  const twitterMeta = generateTwitterMeta({
    title: fullTitle,
    description,
    image,
  });

  return (
    <Helmet>
      <html lang="en" />

      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Indexing */}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <meta name="googlebot" content={noindex ? "noindex" : "index"} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      <link rel="apple-touch-icon" href="/favicon.png" />

      {/* Open Graph */}
      <meta property="og:type" content={ogMeta["og:type"]} />
      <meta property="og:title" content={ogMeta["og:title"]} />
      <meta property="og:description" content={ogMeta["og:description"]} />
      <meta property="og:url" content={ogMeta["og:url"]} />
      <meta property="og:image" content={ogMeta["og:image"]} />
      <meta property="og:site_name" content={ogMeta["og:site_name"]} />
      <meta property="og:locale" content={ogMeta["og:locale"]} />
      <meta property="og:image:alt" content={imageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterMeta["twitter:card"]} />
      <meta name="twitter:title" content={twitterMeta["twitter:title"]} />
      <meta
        name="twitter:description"
        content={twitterMeta["twitter:description"]}
      />
      <meta name="twitter:image" content={twitterMeta["twitter:image"]} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:creator" content={twitterMeta["twitter:creator"]} />
      <meta name="twitter:site" content={twitterMeta["twitter:site"]} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />

      {/* Theme Color */}
      <meta name="theme-color" content="#0ea5e9" />

      {/* Color Scheme */}
      <meta name="color-scheme" content="light dark" />

      {/* Additional Structured Data */}
      {children}
    </Helmet>
  );
};

/**
 * Schema Component - Adds JSON-LD structured data
 */
export const Schema = ({ data }) => {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

export default SEO;
