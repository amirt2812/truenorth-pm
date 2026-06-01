import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

/** Visible + structured-data breadcrumbs. Pass the trail incl. Home. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];
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
