import Link from "next/link";
import { type Property, galleryImages, usd } from "@/lib/properties";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { CtaBand } from "./CtaBand";
import { PropertyGallery } from "./PropertyGallery";
import { StatusBadge } from "./PropertyCard";
import { HtmlLang } from "@/components/layout/HtmlLang";
import type { Lang } from "@/lib/i18n";

const T = {
  en: {
    rentals: "Rentals", mo: "/mo", beds: "Bedrooms", baths: "Bathrooms", sqft: "Square feet",
    available: "Available", availableNow: "Available now", pets: "Pet policy",
    about: "About this home", features: "Features", apply: "Apply Now", inquire: "Ask About This Home",
    leasedNote: "This home is currently leased. Contact us to be notified about similar rentals as they become available.",
    disclaimer: "Listing details are believed accurate but are not guaranteed and are subject to change. Square footage and features are approximate. Equal Housing Opportunity.",
    back: "← Back to all rentals",
  },
  es: {
    rentals: "Rentas", mo: "/mes", beds: "Recámaras", baths: "Baños", sqft: "Pies cuadrados",
    available: "Disponible", availableNow: "Disponible ahora", pets: "Política de mascotas",
    about: "Sobre esta casa", features: "Características", apply: "Solicitar Ahora", inquire: "Preguntar Sobre Esta Casa",
    leasedNote: "Esta casa está actualmente arrendada. Contáctenos para recibir aviso de rentas similares a medida que se desocupen.",
    disclaimer: "Se cree que los detalles del anuncio son precisos, pero no están garantizados y están sujetos a cambios. Los pies cuadrados y las características son aproximados. Igualdad de Oportunidad de Vivienda.",
    back: "← Volver a todas las rentas",
  },
};

export function PropertyDetail({ property, lang = "en" }: { property: Property; lang?: Lang }) {
  const t = T[lang];
  const base = lang === "es" ? "/es" : "";
  const images = galleryImages(property);
  const desc = (lang === "es" && property.descriptionEs) || property.description;
  const features = (lang === "es" && property.featuresEs) || property.features;
  const available = property.status === "available";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name: property.title,
    numberOfBedrooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    ...(property.sqft ? { floorSize: { "@type": "QuantitativeValue", value: property.sqft, unitCode: "FTK" } } : {}),
    address: { "@type": "PostalAddress", addressLocality: property.city, addressRegion: "FL", addressCountry: "US" },
    ...(available
      ? {
          offers: {
            "@type": "Offer",
            price: property.rent,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            businessFunction: "https://schema.org/LeaseOut",
          },
        }
      : {}),
  };

  return (
    <>
      {lang === "es" && <HtmlLang lang="es" />}
      <JsonLd data={schema} />

      <section className="bg-navy-800 bg-compass">
        <div className="container-tn py-10 sm:py-12">
          <Breadcrumbs
            lang={lang}
            items={[
              { name: t.rentals, path: `${base}/properties` },
              { name: property.title, path: `${base}/properties/${property.slug}` },
            ]}
          />
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2"><StatusBadge status={property.status} lang={lang} /></div>
              <h1 className="font-display text-display-md font-semibold !text-white">{property.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-navy-100">
                <Icon name="pin" className="h-4 w-4 text-gold-400" />
                {property.address !== "" && !property.address.startsWith("[") ? `${property.address}, ` : ""}{property.city}, FL
              </p>
            </div>
            <p className="font-display text-3xl font-semibold text-gold-400">
              {usd(property.rent)}<span className="text-lg text-navy-200">{t.mo}</span>
            </p>
          </div>
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Gallery + description */}
          <div className="lg:col-span-8">
            <PropertyGallery images={images} alt={property.title} />

            <h2 className="mt-10 font-display text-2xl text-navy-800">{t.about}</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{desc}</p>

            {features && features.length > 0 && (
              <>
                <h2 className="mt-8 font-display text-xl text-navy-800">{t.features}</h2>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-slate-700">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-10 text-xs leading-relaxed text-slate-400">{t.disclaimer}</p>
            <Link href={`${base}/properties`} className="mt-4 inline-block text-sm font-semibold text-navy-700 hover:text-gold-600">
              {t.back}
            </Link>
          </div>

          {/* Sticky facts + CTA */}
          <div className="lg:col-span-4">
            <Card className="lg:sticky lg:top-24">
              <dl className="divide-y divide-navy-100 text-sm">
                <Fact icon="bed" label={t.beds} value={String(property.beds)} />
                <Fact icon="bath" label={t.baths} value={String(property.baths)} />
                {property.sqft && <Fact icon="ruler" label={t.sqft} value={property.sqft.toLocaleString("en-US")} />}
                {available && (
                  <Fact icon="calendar" label={t.available} value={property.availableDate && property.availableDate > "2026-06" ? property.availableDate : t.availableNow} />
                )}
                {property.petPolicy && <Fact icon="shield" label={t.pets} value={property.petPolicy} />}
              </dl>

              {available ? (
                <div className="mt-6 flex flex-col gap-2.5">
                  <Button href={site.links.rentRediApplication} variant="gold" className="w-full">
                    <Icon name="key" className="h-4 w-4" /> {t.apply}
                  </Button>
                  <Button href={`${base}/contact?topic=tenant`} variant="secondary" className="w-full">
                    {t.inquire}
                  </Button>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="rounded-xl bg-sand-100 px-4 py-3 text-sm text-slate-600">{t.leasedNote}</p>
                  <Button href={`${base}/contact?topic=tenant`} variant="secondary" className="mt-3 w-full">
                    {t.inquire}
                  </Button>
                </div>
              )}

              <a href={site.phoneHref} className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-navy-700 hover:text-gold-600">
                <Icon name="phone" className="h-4 w-4" /> {site.phone}
              </a>
            </Card>
          </div>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}

function Fact({ icon, label, value }: { icon: Parameters<typeof Icon>[0]["name"]; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <dt className="flex items-center gap-2 text-slate-500">
        <Icon name={icon} className="h-4 w-4 text-gold-600" />
        {label}
      </dt>
      <dd className="text-right font-medium text-navy-800">{value}</dd>
    </div>
  );
}
