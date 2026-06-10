import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { RoiCalculator } from "@/components/forms/RoiCalculator";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Calculadora de Rentabilidad para Arrendadores | Flujo de Caja de Renta en el Condado de Hernando",
  description:
    "Estime el flujo de caja mensual y anual de una renta en el Condado de Hernando. Ajuste renta, costos, vacancia y supuestos de administración. Solo estimación educativa — no asesoría financiera.",
  path: "/roi-calculator",
  lang: "es",
});

export default function RoiCalculatorEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[
          { name: "Propietarios", path: "/es/owners" },
          { name: "Calculadora de Rentabilidad", path: "/es/roi-calculator" },
        ]}
        eyebrow="Calculadora de rentabilidad"
        title="Estime el flujo de caja de su renta."
        intro="Ajuste los números para ver el flujo de caja mensual y anual estimado, la renta ajustada por vacancia y el costo de administración. Una forma rápida de evaluar una renta — no un sustituto de asesoría profesional."
      />
      <Section tone="sand">
        <RoiCalculator lang="es" />
      </Section>
      <CtaBand
        lang="es"
        title="¿Quiere una cifra de renta informada por el mercado para usar?"
        subtitle="Obtenga un análisis de renta gratis con un rango estimado para su propiedad específica en el Condado de Hernando."
      />
    </>
  );
}
