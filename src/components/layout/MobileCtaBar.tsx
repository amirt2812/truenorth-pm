"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { langFromPath, localizeHref } from "@/lib/i18n";
import { Icon } from "@/components/ui/Icon";

const t = {
  en: { call: "Call Now", cta: "Free Rental Analysis" },
  es: { call: "Llamar", cta: "Análisis Gratis" },
};

/**
 * Persistent tap-to-call + lead CTA bar, mobile only. For a local lead-gen
 * business this is one of the highest-converting elements: visitors can call
 * or request an analysis from anywhere on the site without hunting the menu.
 * Hidden on the Free Rental Analysis pages (the form itself is the CTA there,
 * and the bar would cover its submit button).
 */
export function MobileCtaBar() {
  const pathname = usePathname() || "/";
  const lang = langFromPath(pathname);
  if (pathname.includes("/free-rental-analysis")) return null;
  const s = t[lang];

  return (
    <>
      {/* Spacer so the fixed bar never covers footer content on mobile */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-700 bg-navy-900/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2 p-2.5">
          <a
            href={site.phoneHref}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/10 text-[15px] font-semibold text-white ring-1 ring-white/20 active:scale-[0.98]"
          >
            <Icon name="phone" className="h-4 w-4" />
            {s.call}
          </a>
          <Link
            href={localizeHref("/free-rental-analysis", lang)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold-500 text-[15px] font-semibold text-navy-900 active:scale-[0.98]"
          >
            {s.cta}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
