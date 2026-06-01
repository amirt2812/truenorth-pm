import type { Metadata } from "next";
import { site } from "./site";

/**
 * Builds per-page Metadata with sensible defaults, canonical URLs, and Open
 * Graph / Twitter cards. Pass a `path` (e.g. "/pricing") for the canonical URL.
 */
export function pageMeta({
  title,
  description,
  path = "/",
  ogImage = "/og/default.png",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const fullTitle = title.includes(site.shortName) || title.includes(site.brand)
    ? title
    : `${title} | ${site.brand}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.brand,
      type: "website",
      locale: "en_US",
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
