import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Servicios para Inversionistas | Administración de Portafolios en el Condado de Hernando",
  description:
    "Servicios para arrendadores con portafolios pequeños en el Condado de Hernando: análisis de renta, revisión de rendimiento del portafolio, estrategia de renovación, planificación de capex y reportes. Educativo, no asesoría de inversión.",
  path: "/investor-services",
  lang: "es",
});

const services = [
  { icon: "chart", title: "Análisis de renta", body: "Posicionamiento de renta informado por el mercado para cada propiedad de su portafolio." },
  { icon: "eye", title: "Revisión de rendimiento del portafolio", body: "Una vista clara de cómo se desempeñan sus rentas en conjunto." },
  { icon: "doc", title: "Estrategia de renovación", body: "Recomendaciones de renovación basadas en datos para reducir rotación y vacancia." },
  { icon: "wrench", title: "Planificación de capex", body: "Ayuda para pensar los gastos de capital y su momento en todas las propiedades." },
  { icon: "compass", title: "Asesoría conservar / vender / rentar", body: "Una perspectiva informada sobre las opciones para cada activo — solo educativa." },
  { icon: "chart", title: "Reportes de administración", body: "Reportes consolidados para que su portafolio sea fácil de seguir." },
];

export default function InvestorServicesEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Servicios para Inversionistas", path: "/es/investor-services" }]}
        eyebrow="Para inversionistas"
        title="Sistemas de calidad institucional para portafolios locales."
        intro="Ya sea que tenga dos rentas o veinte, TrueNorth aporta sistemas consistentes, reportes claros y estrategia basada en datos a los arrendadores con portafolios pequeños del Condado de Hernando."
        primary={{ label: "Solicitar una Revisión de Portafolio", href: "/es/contact?topic=custom" }}
        secondary={{ label: "Probar la Calculadora de Rentabilidad", href: "/es/roi-calculator" }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Lo que ofrecemos" title="Estrategia, reportes y administración en un solo lugar." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <FeatureCard key={s.title} icon={s.icon as never} title={s.title}>
              {s.body}
            </FeatureCard>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-gold-200 bg-gold-50 p-5 text-sm leading-relaxed text-navy-800">
          <Icon name="shield" className="mr-2 inline h-4 w-4 text-gold-700" />
          La información proporcionada es educativa y no constituye asesoría fiscal, legal ni de
          inversión. Consulte a sus propios profesionales con licencia antes de tomar decisiones de inversión.
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="Precios personalizados para portafolios" title="¿Está creciendo? Estructurémoslo." intro="Los propietarios con varias propiedades y portafolios pueden armar un alcance personalizado con precios a la medida. Cuéntenos sobre su portafolio y sus metas." />
          <div className="mt-8">
            <Button href="/es/contact?topic=custom" variant="gold" size="lg">Solicitar una Propuesta de Administración <Icon name="arrow-right" className="h-4 w-4" /></Button>
          </div>
        </div>
      </Section>

      <CtaBand
        lang="es"
        title="Obtenga una vista de su portafolio informada por el mercado."
        subtitle="Comience con un análisis de renta gratis en una propiedad, o solicite una revisión completa del portafolio."
      />
    </>
  );
}
