"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { langFromPath, localizeHref } from "@/lib/i18n";

const t = {
  en: {
    title: "This page is off the map.",
    body: "The page you're looking for doesn't exist or has moved. Let's get you back on course.",
    home: "Back to Home",
    cta: "Get a Free Rental Analysis",
  },
  es: {
    title: "Esta página está fuera del mapa.",
    body: "La página que busca no existe o se ha movido. Volvamos al rumbo correcto.",
    home: "Volver al Inicio",
    cta: "Análisis de Renta Gratis",
  },
};

export default function NotFound() {
  const lang = langFromPath(usePathname() || "/");
  const s = t[lang];
  return (
    <section className="bg-sand-100">
      <div className="container-tn flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <Icon name="compass" className="h-12 w-12 text-gold-500" />
        <p className="mt-4 font-display text-6xl font-semibold text-navy-800">404</p>
        <h1 className="mt-2 text-display-md">{s.title}</h1>
        <p className="mt-3 max-w-md text-lg text-slate-600">{s.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={localizeHref("/", lang)} variant="primary">{s.home}</Button>
          <Button href={localizeHref("/free-rental-analysis", lang)} variant="gold">{s.cta}</Button>
        </div>
      </div>
    </section>
  );
}
