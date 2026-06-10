import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Card, TrustItem } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { RentalAnalysisForm } from "@/components/forms/RentalAnalysisForm";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Análisis de Renta Gratis — Spring Hill y Condado de Hernando, FL",
  description:
    "Descubra cuánto podría generar su renta en el Condado de Hernando. Obtenga una estimación de renta informada por el mercado, notas de preparación y un enfoque de administración recomendado. No es una tasación.",
  path: "/free-rental-analysis",
  lang: "es",
});

const included = [
  { icon: "chart", title: "Rango de renta estimado", body: "Una estimación informada por el mercado basada en comparables locales — no un promedio estatal." },
  { icon: "check", title: "Notas de preparación", body: "Notas prácticas sobre qué podría ayudar a que su propiedad se rente más rápido y conserve su valor." },
  { icon: "compass", title: "Recomendación de administración", body: "Una recomendación clara y sin presión sobre el enfoque de administración adecuado para sus metas." },
];

export default function FreeRentalAnalysisEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <section className="bg-navy-800 bg-compass">
        <div className="container-tn py-12 sm:py-16">
          <Breadcrumbs lang="es" items={[{ name: "Análisis de Renta Gratis", path: "/es/free-rental-analysis" }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Análisis de renta gratis</p>
              <h1 className="font-display text-display-lg font-semibold !text-white">
                Descubra cuánto podría generar su renta en el Condado de Hernando.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                Obtenga una estimación de renta informada por el mercado, notas sobre la preparación de
                la propiedad y un enfoque de administración recomendado para su propiedad.
              </p>
              <ul className="mt-8 space-y-5">
                {included.map((i) => (
                  <li key={i.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-300">
                      <Icon name={i.icon as never} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-lg !text-white">{i.title}</span>
                      <span className="text-sm text-navy-200">{i.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-navy-200">
                Esta es una estimación de renta informada por el mercado — no una tasación ni una valoración oficial.
              </p>
            </div>

            <div className="lg:col-span-7">
              <Card className="shadow-card-hover">
                <h2 className="font-display text-xl font-medium text-navy-800">Cuéntenos sobre su propiedad</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Toma unos dos minutos. Entre más detalle comparta, más útil será la estimación.
                </p>
                <div className="mt-6">
                  <RentalAnalysisForm lang="es" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Section tone="sand">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          <TrustItem icon="shield">Sin compromiso ni presión — una solicitud no es un acuerdo de administración.</TrustItem>
          <TrustItem icon="pin">Contexto local de alguien que conoce el mercado de renta del Condado de Hernando.</TrustItem>
          <TrustItem icon="eye">Próximos pasos claros si decide que TrueNorth es la opción adecuada.</TrustItem>
        </div>
      </Section>
    </>
  );
}
