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
  return pageMeta({
    title: `${p.title} — ${p.city}, FL`,
    description: `${p.beds} bed, ${p.baths} bath rental in ${p.city}, FL for ${usd(p.rent)}/mo. ${p.description.slice(0, 120)}`,
    path: `/properties/${p.slug}`,
    ogImage: coverImage(p),
  });
}

export default function PropertyPage({ params }: { params: { slug: string } }) {
  const property = getProperty(params.slug);
  if (!property) notFound();
  return <PropertyDetail property={property} lang="en" />;
}
