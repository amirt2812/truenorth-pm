import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Standard interior-page hero: navy band, breadcrumbs, eyebrow, H1, intro, CTAs. */
export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  primary,
  secondary,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs: { name: string; path: string }[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy-800 bg-compass">
      <div className="container-tn py-12 sm:py-16">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">{eyebrow}</p>
          )}
          <h1 className="font-display text-display-lg font-semibold !text-white">{title}</h1>
          {intro && <p className="mt-5 text-lg leading-relaxed text-navy-100">{intro}</p>}
          {(primary || secondary) && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <Button href={primary.href} variant="gold" size="lg">
                  {primary.label}
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Button>
              )}
              {secondary && (
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
