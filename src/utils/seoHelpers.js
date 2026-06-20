/**
 * SEO Helper Functions
 * Manages meta tags, structured data, and SEO optimization
 */

/**
 * Generate canonical URL
 */
export const getCanonicalUrl = (path = "") => {
  const baseUrl =
    import.meta.env.VITE_CANONICAL_URL || "https://www.dailynewsflow.com";
  const safePath = path === "" || path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${safePath}`;
};

/**
 * Generate Open Graph meta tags
 */
export const generateOGMeta = (config) => {
  return {
    "og:type": config.type || "website",
    "og:title": config.title || "Daily News Flow",
    "og:description":
      config.description || "Latest breaking news and trending stories",
    "og:url": config.url || getCanonicalUrl(),
    "og:image": config.image || "https://www.dailynewsflow.com/preview.png",
    "og:site_name": "Daily News Flow",
    "og:locale": "en_US",
  };
};

/**
 * Generate Twitter Card meta tags
 */
export const generateTwitterMeta = (config) => {
  return {
    "twitter:card": config.card || "summary_large_image",
    "twitter:title": config.title || "Daily News Flow",
    "twitter:description":
      config.description || "Latest breaking news and trending stories",
    "twitter:image":
      config.image || "https://www.dailynewsflow.com/preview.png",
    "twitter:creator": "@dailynewsflow",
    "twitter:site": "@dailynewsflow",
  };
};

/**
 * Generate JSON-LD structured data for Article
 */
export const generateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.heading,
    description: article.content?.slice(0, 160),
    image: article.image,
    url: article.url || getCanonicalUrl(`/article/${article._id}`),
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    author: {
      "@type": "Person",
      name: article.author || "Daily News Flow",
    },
    publisher: {
      "@type": "Organization",
      name: "Daily News Flow",
      logo: {
        "@type": "ImageObject",
        url: "https://www.dailynewsflow.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getCanonicalUrl(),
    },
  };
};

/**
 * Generate JSON-LD structured data for Organization
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Daily News Flow",
    url: "https://www.dailynewsflow.com",
    logo: "https://www.dailynewsflow.com/favicon.png",
    description:
      "AI-powered news platform delivering the latest breaking news and trending stories",
    sameAs: [
      "https://twitter.com/dailynewsflow",
      "https://www.instagram.com/dailynewsflow",
      "https://www.facebook.com/dailynewsflow",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@dailynewsflow.com",
    },
  };
};

/**
 * Generate JSON-LD structured data for FAQ
 */
export const generateFAQSchema = (questions) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question || q.Q || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer || q.A || "",
      },
    })),
  };
};

/**
 * Generate JSON-LD structured data for Breadcrumb
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: getCanonicalUrl(crumb.path),
    })),
  };
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, length = 160) => {
  if (text === null || text === undefined) return "";
  const safeText = typeof text === "string" ? text : String(text);
  if (safeText.length <= length) return safeText;
  return safeText.slice(0, length).trim() + "...";
};

/**
 * Extract plain text from HTML
 */
export const stripHtml = (html) => {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

/**
 * Format date for display
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Generate reading time estimate
 */
export const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text?.split(/\s+/).length || 0;
  return Math.ceil(words / wordsPerMinute);
};
