import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CalendlyEmbed } from "@/components/sections/CalendlyEmbed";
import { TrustItem } from "@/components/ui/Card";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Agende una Consulta de Propietario | TrueNorth Property Management",
  description:
    "Reserve una consulta de propietario gratis y sin compromiso con TrueNorth Property Management. Hablemos de su renta en el Condado de Hernando, los precios y el enfoque de administración adecuado.",
  path: "/schedule",
  lang: "es",
});

export default function ScheduleEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Agendar una Consulta", path: "/es/schedule" }]}
        eyebrow="Consulta de propietario"
        title="Reserve un horario para hablar."
        intro="Elija el horario que le convenga. Hablaremos de su renta en el Condado de Hernando, sus metas y el enfoque de administración adecuado — sin presión, sin compromiso."
      />
      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-xl font-medium text-navy-800">Qué esperar</h2>
            <ul className="mt-5 space-y-4">
              <TrustItem icon="chat">Una conversación directa sobre su propiedad y sus metas.</TrustItem>
              <TrustItem icon="chart">Una visión informada por el mercado de lo que su renta podría generar.</TrustItem>
              <TrustItem icon="compass">Una recomendación clara sobre el enfoque de administración adecuado.</TrustItem>
              <TrustItem icon="shield">Sin compromiso — reservar una llamada no crea un acuerdo de administración.</TrustItem>
            </ul>
            <div className="mt-8 rounded-xl border border-navy-100 bg-white p-5 text-sm text-slate-600">
              ¿Prefiere hablar ahora? Llame al{" "}
              <a href={site.phoneHref} className="font-semibold text-navy-700 underline">{site.phone}</a>{" "}
              o escriba a{" "}
              <a href={site.emailHref} className="font-semibold text-navy-700 underline">{site.email}</a>.
            </div>
          </div>
          <div className="lg:col-span-8">
            <CalendlyEmbed />
          </div>
        </div>
      </Section>
    </>
  );
}
