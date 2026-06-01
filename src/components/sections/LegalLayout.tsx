import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

/**
 * Shared shell for legal/compliance pages. Renders the attorney-review notice
 * and a "last updated" line. The body content uses the `.prose-tn` styles.
 */
export function LegalLayout({
  title,
  intro,
  path,
  updated = "May 31, 2026",
  children,
}: {
  title: string;
  intro: string;
  path: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero breadcrumbs={[{ name: title, path }]} eyebrow="Legal" title={title} intro={intro} />
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-gold-200 bg-gold-50 px-5 py-4">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            <p className="text-sm leading-relaxed text-navy-800">
              <strong>Placeholder — pending attorney review.</strong> This page contains template
              language for pre-launch purposes only. It is not legal advice and must be reviewed and
              finalized by a licensed attorney before publication.
            </p>
          </div>
          <p className="mb-8 text-sm text-slate-500">Last updated: {updated}</p>
          <div className="prose-tn">{children}</div>
        </div>
      </Section>
    </>
  );
}
