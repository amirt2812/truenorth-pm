import Image from "next/image";
import Link from "next/link";
import { type Property, coverImage, usd } from "@/lib/properties";
import { Icon } from "@/components/ui/Icon";
import type { Lang } from "@/lib/i18n";

const T = {
  en: { available: "Available", leased: "Leased", mo: "/mo", bd: "bd", ba: "ba", view: "View details" },
  es: { available: "Disponible", leased: "Arrendada", mo: "/mes", bd: "rec", ba: "baños", view: "Ver detalles" },
};

export function StatusBadge({ status, lang = "en" }: { status: Property["status"]; lang?: Lang }) {
  const t = T[lang];
  const available = status === "available";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        available ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-600"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-green-600" : "bg-slate-500"}`} aria-hidden />
      {available ? t.available : t.leased}
    </span>
  );
}

export function PropertyCard({ property, lang = "en" }: { property: Property; lang?: Lang }) {
  const t = T[lang];
  const base = lang === "es" ? "/es" : "";
  const href = `${base}/properties/${property.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card transition-shadow hover:shadow-card-hover">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-navy-50">
        <Image
          src={coverImage(property)}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3">
          <StatusBadge status={property.status} lang={lang} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {property.rent ? (
          <p className="font-display text-xl font-semibold text-navy-900">
            {usd(property.rent)}
            <span className="text-sm font-normal text-slate-500">{t.mo}</span>
          </p>
        ) : (
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-slate-400">
            {property.status === "leased" ? t.leased : t.available}
          </p>
        )}
        <h3 className="mt-1 font-display text-lg font-medium leading-snug text-navy-800">
          <Link href={href} className="hover:text-gold-700">{property.title}</Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <Icon name="pin" className="h-4 w-4 text-gold-600" />
          {property.city}, FL
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-navy-100 pt-4 text-sm text-navy-700">
          <span className="inline-flex items-center gap-1.5"><Icon name="bed" className="h-4 w-4 text-slate-400" />{property.beds} {t.bd}</span>
          <span className="inline-flex items-center gap-1.5"><Icon name="bath" className="h-4 w-4 text-slate-400" />{property.baths} {t.ba}</span>
          {property.sqft && (
            <span className="inline-flex items-center gap-1.5"><Icon name="ruler" className="h-4 w-4 text-slate-400" />{property.sqft.toLocaleString("en-US")} sqft</span>
          )}
        </div>

        <Link href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600">
          {t.view} <Icon name="arrow-right" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
