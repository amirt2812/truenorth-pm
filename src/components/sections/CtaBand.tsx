import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import type { Lang } from "@/lib/i18n";

const defaults = {
  en: {
    title: "Get direction on your rental property.",
    subtitle: "Get a market-informed rental estimate and a clear, no-pressure management recommendation for your Hernando County property.",
    primary: { label: "Get a Free Rental Analysis", href: "/free-rental-analysis" },
    secondary: "Talk to a Local Property Manager",
  },
  es: {
    title: "Reciba dirección para su propiedad de renta.",
    subtitle: "Obtenga una estimación de renta informada por el mercado y una recomendación de administración clara y sin presión para su propiedad en el Condado de Hernando.",
    primary: { label: "Análisis de Renta Gratis", href: "/es/free-rental-analysis" },
    secondary: "Hable con un Administrador Local",
  },
};

/**
 * Reusable final/mid-page CTA band. Used on most pages to keep a consistent
 * conversion path (primary offer + phone/schedule fallback). Bilingual via `lang`.
 */
export function CtaBand({
  lang = "en",
  title,
  subtitle,
  primary,
  secondary,
}: {
  lang?: Lang;
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const d = defaults[lang];
  const resolvedTitle = title ?? d.title;
  const resolvedSubtitle = subtitle ?? d.subtitle;
  const resolvedPrimary = primary ?? d.primary;
  return (
    <section className="bg-navy-800 bg-compass">
      <div className="container-tn py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl text-display-md !text-white">{resolvedTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-100">{resolvedSubtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={resolvedPrimary.href} variant="gold" size="lg">
            {resolvedPrimary.label}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          ) : (
            <Button href={site.phoneHref} variant="secondary" size="lg">
              <Icon name="phone" className="h-4 w-4" /> {d.secondary}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
