import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { categories } from "@/lib/blog";
import { postsEs, categoriesEs } from "@/lib/blog-es";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogList } from "@/components/sections/BlogList";
import { CtaBand } from "@/components/sections/CtaBand";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Recursos y Blog | Guías para Propietarios del Condado de Hernando",
  description:
    "Guías para propietarios del Condado de Hernando: costos de administración, selección de inquilinos, mantenimiento, preparación para huracanes, vacancia, estrategia de inversión y conceptos básicos de renta en Florida.",
  path: "/resources",
  lang: "es",
});

export default function ResourcesEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Recursos", path: "/es/resources" }]}
        eyebrow="Recursos y blog"
        title="Guías prácticas para propietarios del Condado de Hernando."
        intro="Artículos directos y sin exageraciones sobre administrar, fijar precios y proteger propiedades de renta en el Condado de Hernando y en toda Florida."
      />
      <Section tone="sand">
        <BlogList posts={postsEs} categories={categories} lang="es" categoryLabels={categoriesEs} />
      </Section>
      <CtaBand lang="es" />
    </>
  );
}
