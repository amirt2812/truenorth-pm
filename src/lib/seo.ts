import type { Metadata } from "next";
import { site } from "./site";
import type { Lang } from "./i18n";

/**
 * Builds per-page Metadata with canonical URLs, hreflang alternates (en/es),
 * and Open Graph / Twitter cards.
 *
 * Pass the ENGLISH `path` (e.g. "/pricing"). For Spanish pages, also pass
 * `lang: "es"` — canonical points at the /es URL and hreflang links both.
 */
export function pageMeta({
  title,
  description,
  path = "/",
  lang = "en",
  ogImage = "/og/default.png",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  lang?: Lang;
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const enPath = path === "/" ? "" : path;
  const esPath = path === "/" ? "/es" : `/es${path}`;
  const enUrl = `${site.url}${enPath}`;
  const esUrl = `${site.url}${esPath}`;
  const canonical = lang === "es" ? esUrl : enUrl;

  const fullTitle =
    title.includes(site.shortName) || title.includes(site.brand) ? title : `${title} | ${site.brand}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      languages: {
        "en-US": enUrl,
        "es-US": esUrl,
        "x-default": enUrl,
      },
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: site.brand,
      type: "website",
      locale: lang === "es" ? "es_US" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.brand }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
