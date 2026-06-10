import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { faqsEs } from "@/lib/faq";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Preguntas Frecuentes de Administración de Propiedades | Condado de Hernando, FL",
  description:
    "Respuestas a preguntas comunes sobre TrueNorth Property Management: áreas de servicio, precios, selección, aprobaciones de mantenimiento, pagos de renta, desalojos, depósitos y licencias.",
  path: "/faq",
  lang: "es",
});

export default function FaqEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Preguntas Frecuentes", path: "/es/faq" }]}
        eyebrow="Preguntas frecuentes"
        title="Respuestas para propietarios del Condado de Hernando."
        intro="Las preguntas que más hacen los propietarios — sobre precios, servicios, tecnología y cómo operamos. ¿No ve la suya? Contáctenos cuando guste."
        primary={{ label: "Análisis de Renta Gratis", href: "/es/free-rental-analysis" }}
        secondary={{ label: "Contáctenos", href: "/es/contact" }}
      />

      <FaqSection items={faqsEs} tone="white" eyebrow="" title="Todas las preguntas" />

      <CtaBand
        lang="es"
        title="¿Aún tiene preguntas?"
        subtitle="Hable con un administrador de propiedades local — sin presión, sin compromiso."
        primary={{ label: "Contacte a TrueNorth", href: "/es/contact" }}
      />
    </>
  );
}
