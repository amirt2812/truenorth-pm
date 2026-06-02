"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

/**
 * Inline Calendly embed. Loads Calendly's widget script once and renders the
 * scheduling calendar inline. Brand colors are passed via Calendly URL params
 * (navy primary, gold-ish accent). Falls back to a direct link if JS is off.
 */
export function CalendlyEmbed() {
  useEffect(() => {
    const id = "calendly-widget-script";
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // background_color (no #), text_color, primary_color per Calendly inline params.
  const url = `${site.links.calendly}?hide_gdpr_banner=1&background_color=ffffff&text_color=0F2742&primary_color=C29A4A`;

  return (
    <div>
      <link rel="preconnect" href="https://assets.calendly.com" />
      <div
        className="calendly-inline-widget overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card"
        data-url={url}
        style={{ minWidth: "320px", height: "720px" }}
      />
      <noscript>
        <p className="mt-4 text-center text-sm text-slate-600">
          Scheduling requires JavaScript.{" "}
          <a href={site.links.calendly} className="text-navy-600 underline">
            Open the booking page directly.
          </a>
        </p>
      </noscript>
    </div>
  );
}
