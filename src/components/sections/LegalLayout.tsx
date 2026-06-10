import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import type { Lang } from "@/lib/i18n";
import { HtmlLang } from "@/components/layout/HtmlLang";

const STR = {
  en: {
    eyebrow: "Legal",
    notice: <><strong>Placeholder — pending attorney review.</strong> This page contains template language for pre-launch purposes only. It is not legal advice and must be reviewed and finalized by a licensed attorney before publication.</>,
    updated: "Last updated:",
    controls: null as ReactNode,
  },
  es: {
    eyebrow: "Legal",
    notice: <><strong>Texto preliminar — pendiente de revisión por un abogado.</strong> Esta página contiene lenguaje de plantilla solo para fines de prelanzamiento. No es asesoría legal y debe ser revisada y finalizada por un abogado con licencia antes de su publicación.</>,
    updated: "Última actualización:",
    controls: <>Esta es una traducción de cortesía. <strong>La versión en inglés es la versión oficial y prevaleciente</strong> de este documento.</>,
  },
};

/**
 * Shared shell for legal/compliance pages. Bilingual via `lang`. For Spanish it
 * also shows an "English version controls" notice.
 */
export function LegalLayout({
  title,
  intro,
  path,
  updated = "May 31, 2026",
  lang = "en",
  children,
}: {
  title: string;
  intro: string;
  path: string;
  updated?: string;
  lang?: Lang;
  children: ReactNode;
}) {
  const s = STR[lang];
  return (
    <>
      {lang === "es" && <HtmlLang lang="es" />}
      <PageHero lang={lang} breadcrumbs={[{ name: title, path }]} eyebrow={s.eyebrow} title={title} intro={intro} />
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-gold-200 bg-gold-50 px-5 py-4">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            <p className="text-sm leading-relaxed text-navy-800">{s.notice}</p>
          </div>
          {s.controls && (
            <div className="mb-8 rounded-xl border border-navy-200 bg-navy-50 px-5 py-4 text-sm leading-relaxed text-navy-800">
              {s.controls}
            </div>
          )}
          <p className="mb-8 text-sm text-slate-500">{s.updated} {updated}</p>
          <div className="prose-tn">{children}</div>
        </div>
      </Section>
    </>
  );
}
