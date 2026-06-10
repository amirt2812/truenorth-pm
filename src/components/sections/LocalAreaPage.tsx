import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { Area } from "@/lib/local-areas";
import type { Lang } from "@/lib/i18n";
import { PageHero } from "./PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "./CtaBand";
import { FaqSection } from "./FaqSection";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

/** Shared renderer for the 5 local SEO pages. Content comes from local-areas[-es].ts. */
export function buildAreaMetadata(area: Area, lang: Lang = "en"): Metadata {
  return pageMeta({ title: area.metaTitle, description: area.metaDescription, path: `/${area.slug}`, lang });
}

const STR = {
  en: {
    state: "Florida",
    pmSuffix: "Property Management",
    primary: "Get a Free Rental Analysis",
    secondary: "See Pricing",
    challengesEyebrow: "Common landlord challenges",
    challengesTitle: (c: string) => `What ${c} owners run into`,
    whyEyebrow: "Why local management matters",
    whyTitle: (c: string) => `Management built for ${c}`,
    handleTitle: "What we handle here",
    handle: ["Leasing & tenant placement", "Tenant screening", "Rent collection via RentRedi", "Maintenance coordination & documentation", "Inspections & renewals", "Clear monthly owner reporting"],
    pm: "Property Management", pricing: "Pricing", contact: "Contact",
    faqTitle: (c: string) => `${c} property management FAQ`,
    faqEyebrow: "Frequently asked questions",
    ctaTitle: (c: string) => `Get a rental estimate for your ${c} property.`,
    ctaSub: "Request a free, market-informed rental analysis with rent-readiness notes and a clear management recommendation.",
    href: { fra: "/free-rental-analysis", pricing: "/pricing", pm: "/property-management", contact: "/contact" },
  },
  es: {
    state: "Florida",
    pmSuffix: "Administración de Propiedades",
    primary: "Análisis de Renta Gratis",
    secondary: "Ver Precios",
    challengesEyebrow: "Desafíos comunes de los propietarios",
    challengesTitle: (c: string) => `Lo que enfrentan los propietarios de ${c}`,
    whyEyebrow: "Por qué importa la administración local",
    whyTitle: (c: string) => `Administración hecha para ${c}`,
    handleTitle: "Lo que manejamos aquí",
    handle: ["Arrendamiento y colocación de inquilinos", "Selección de inquilinos", "Cobro de renta con RentRedi", "Coordinación y documentación de mantenimiento", "Inspecciones y renovaciones", "Reportes mensuales claros para el propietario"],
    pm: "Administración de Propiedades", pricing: "Precios", contact: "Contacto",
    faqTitle: (c: string) => `Preguntas frecuentes de administración en ${c}`,
    faqEyebrow: "Preguntas frecuentes",
    ctaTitle: (c: string) => `Obtenga una estimación de renta para su propiedad en ${c}.`,
    ctaSub: "Solicite un análisis de renta gratis e informado por el mercado, con notas de preparación y una recomendación de administración clara.",
    href: { fra: "/es/free-rental-analysis", pricing: "/es/pricing", pm: "/es/property-management", contact: "/es/contact" },
  },
};

export function LocalAreaPage({ area, lang = "en" }: { area: Area; lang?: Lang }) {
  const t = STR[lang];
  const base = lang === "es" ? "/es" : "";
  return (
    <>
      {lang === "es" && <HtmlLang lang="es" />}
      <PageHero
        lang={lang}
        breadcrumbs={[{ name: `${area.city} ${t.pmSuffix}`, path: `${base}/${area.slug}` }]}
        eyebrow={`${area.city}, ${t.state}`}
        title={area.h1}
        intro={area.intro[0]}
        primary={{ label: t.primary, href: t.href.fra }}
        secondary={{ label: t.secondary, href: t.href.pricing }}
      />

      <Section tone="white">
        <div className="prose-tn mx-auto">
          {area.intro.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-3">
          {area.highlights.map((h) => (
            <Card key={h.title} className="h-full">
              <Icon name="compass" className="h-6 w-6 text-gold-600" />
              <h3 className="mt-3 font-display text-lg font-medium text-navy-800">{h.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{h.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow={t.challengesEyebrow} title={t.challengesTitle(area.city)} />
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {area.painPoints.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3.5">
              <Icon name="x" className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
              <span className="text-[15px] text-navy-800">{p}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading align="left" eyebrow={t.whyEyebrow} title={t.whyTitle(area.city)} intro={area.whyLocal} />
          <Card className="bg-navy-800 text-navy-100">
            <h3 className="font-display text-xl !text-white">{t.handleTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {t.handle.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={t.href.pm} variant="gold" size="sm">{t.pm}</Button>
              <Button href={t.href.pricing} variant="secondary" size="sm">{t.pricing}</Button>
              <Button href={t.href.contact} variant="secondary" size="sm">{t.contact}</Button>
            </div>
          </Card>
        </div>
      </Section>

      <FaqSection items={area.faqs} tone="sand" eyebrow={t.faqEyebrow} title={t.faqTitle(area.city)} />

      <CtaBand lang={lang} title={t.ctaTitle(area.city)} subtitle={t.ctaSub} primary={{ label: t.primary, href: t.href.fra }} />
    </>
  );
}
