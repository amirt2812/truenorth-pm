/**
 * Lightweight i18n for the bilingual site.
 * - English lives at root URLs ("/pricing").
 * - Spanish lives under "/es" ("/es/pricing").
 * No existing English files move; Spanish pages are parallel under /app/es.
 */

export type Lang = "en" | "es";

export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

/** Detect the active language from a pathname. */
export function langFromPath(pathname: string): Lang {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

/**
 * Prefix an internal href for the given language.
 * localizeHref("/pricing", "es") -> "/es/pricing"
 * localizeHref("/pricing", "en") -> "/pricing"
 * External/anchor/tel/mailto links pass through unchanged.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (lang === "en") return href;
  if (!href.startsWith("/")) return href; // external, #, tel:, mailto:
  if (href === "/") return "/es";
  if (href.startsWith("/es/") || href === "/es") return href;
  return `/es${href}`;
}

/** Strip the /es prefix to get the equivalent English path (for the switcher). */
export function toEnglishPath(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname;
}

/** Add the /es prefix to an English path (for the switcher). */
export function toSpanishPath(pathname: string): string {
  if (pathname === "/") return "/es";
  if (pathname.startsWith("/es")) return pathname;
  return `/es${pathname}`;
}
