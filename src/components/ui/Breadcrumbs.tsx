import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import type { Lang } from "@/lib/i18n";

/** Visible + structured-data breadcrumbs. Pass the trail (excl. Home). */
export function Breadcrumbs({ items, lang = "en" }: { items: { name: string; path: string }[]; lang?: Lang }) {
  const home = lang === "es" ? { name: "Inicio", path: "/es" } : { name: "Home", path: "/" };
  const trail = [home, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <JsonLd data={breadcrumbSchema(trail)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-navy-200">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-gold-300">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-white">{item.name}</Link>
                  <span aria-hidden="true" className="text-navy-400">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
