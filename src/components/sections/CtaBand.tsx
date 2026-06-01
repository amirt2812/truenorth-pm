import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Reusable final/mid-page CTA band. Used on most pages to keep a consistent
 * conversion path (primary offer + phone/schedule fallback).
 */
export function CtaBand({
  title = "Get direction on your rental property.",
  subtitle = "Get a market-informed rental estimate and a clear, no-pressure management recommendation for your Hernando County property.",
  primary = { label: "Get a Free Rental Analysis", href: "/free-rental-analysis" },
  secondary,
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-navy-800 bg-compass">
      <div className="container-tn py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl text-display-md !text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-100">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={primary.href} variant="gold" size="lg">
            {primary.label}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          ) : (
            <Button href={site.phoneHref} variant="secondary" size="lg">
              <Icon name="phone" className="h-4 w-4" /> Talk to a Local Property Manager
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
