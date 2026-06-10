"use client";

import { useEffect } from "react";

/**
 * Sets the document <html lang> attribute for the current page. The root layout
 * renders lang="en" statically; Spanish pages render <HtmlLang lang="es" /> to
 * correct it on the client for a11y and SEO.
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);
  return null;
}
