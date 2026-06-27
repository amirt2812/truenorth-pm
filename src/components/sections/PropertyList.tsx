"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type Property } from "@/lib/properties";
import { PropertyCard } from "./PropertyCard";
import { Icon } from "@/components/ui/Icon";
import type { Lang } from "@/lib/i18n";

type Filter = "all" | "available" | "leased";

const T = {
  en: {
    all: "All", available: "Available", leased: "Leased",
    count: (n: number) => `${n} ${n === 1 ? "home" : "homes"}`,
    emptyTitle: "No homes in this view right now.",
    emptyBody: "New rentals are added as they become available. Tell us what you're looking for and we'll reach out when something fits.",
    emptyCta: "Get notified of new rentals",
  },
  es: {
    all: "Todas", available: "Disponibles", leased: "Arrendadas",
    count: (n: number) => `${n} ${n === 1 ? "casa" : "casas"}`,
    emptyTitle: "No hay casas en esta vista por ahora.",
    emptyBody: "Agregamos nuevas rentas a medida que se desocupan. Díganos qué busca y le avisaremos cuando algo coincida.",
    emptyCta: "Recibir aviso de nuevas rentas",
  },
};

export function PropertyList({ properties, lang = "en" }: { properties: Property[]; lang?: Lang }) {
  const [filter, setFilter] = useState<Filter>("all");
  const t = T[lang];
  const base = lang === "es" ? "/es" : "";

  const counts = useMemo(
    () => ({
      all: properties.length,
      available: properties.filter((p) => p.status === "available").length,
      leased: properties.filter((p) => p.status === "leased").length,
    }),
    [properties]
  );

  const filtered = filter === "all" ? properties : properties.filter((p) => p.status === filter);

  const tabs: { key: Filter; label: string; n: number }[] = [
    { key: "all", label: t.all, n: counts.all },
    { key: "available", label: t.available, n: counts.available },
    { key: "leased", label: t.leased, n: counts.leased },
  ];

  return (
    <div>
      {/* Availability toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-navy-200 bg-white p-1" role="tablist" aria-label="Filter by availability">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === tab.key ? "bg-navy-800 text-white" : "text-navy-700 hover:bg-navy-50"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 ${filter === tab.key ? "text-navy-200" : "text-slate-400"}`}>{tab.n}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-500">{t.count(filtered.length)}</p>
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.slug} property={p} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-white px-6 py-16 text-center">
          <Icon name="home" className="mx-auto h-10 w-10 text-navy-300" />
          <h3 className="mt-4 font-display text-xl font-medium text-navy-800">{t.emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-slate-600">{t.emptyBody}</p>
          <Link
            href={`${base}/contact`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-[15px] font-semibold text-navy-900 hover:bg-gold-400"
          >
            {t.emptyCta} <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
