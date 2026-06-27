import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getProperty, coverImage, usd } from "@/lib/properties";
import { pageMeta } from "@/lib/seo";
import { PropertyDetail } from "@/components/sections/PropertyDetail";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProperty(params.slug);
  if (!p) return {};
  const desc = p.descriptionEs || p.description;
  const price = p.rent ? ` por ${usd(p.rent)}/mes` : "";
  return pageMeta({
    title: `${p.title} — ${p.city}, FL`,
    description: `Renta de ${p.beds} recámaras y ${p.baths} baños en ${p.city}, FL${price}. ${desc.slice(0, 120)}`,
    path: `/properties/${p.slug}`,
    lang: "es",
    ogImage: coverImage(p),
  });
}

export default function PropertyPageEs({ params }: { params: { slug: string } }) {
  const property = getProperty(params.slug);
  if (!property) notFound();
  return <PropertyDetail property={property} lang="es" />;
}
