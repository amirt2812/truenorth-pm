import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { properties } from "@/lib/properties";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { PropertyList } from "@/components/sections/PropertyList";
import { CtaBand } from "@/components/sections/CtaBand";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Rentas Disponibles en el Condado de Hernando",
  description:
    "Explore casas de renta administradas por TrueNorth Property Management en Spring Hill, Brooksville, Weeki Wachee y todo el Condado de Hernando, FL. Filtre por disponibilidad, vea fotos, recámaras, baños y solicite en línea.",
  path: "/properties",
  lang: "es",
});

export default function PropertiesEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Rentas", path: "/es/properties" }]}
        eyebrow="Rentas disponibles"
        title="Casas en renta en el Condado de Hernando."
        intro="Explore las casas de renta que administramos en Spring Hill, Brooksville, Weeki Wachee, Hernando Beach y comunidades cercanas. Cambie la vista para ver lo disponible ahora, solicite en línea o háganos una pregunta."
        primary={{ label: "Solicitar / Portal del Inquilino", href: "/es/tenant-portal" }}
        secondary={{ label: "Contáctenos", href: "/es/contact" }}
      />
      <Section tone="sand">
        <PropertyList properties={properties} lang="es" />
      </Section>
      <CtaBand
        lang="es"
        title="¿Es propietario, no inquilino?"
        subtitle="Obtenga un análisis de renta gratis e informado por el mercado y vea cuánto podría generar su propiedad en el Condado de Hernando."
      />
    </>
  );
}
