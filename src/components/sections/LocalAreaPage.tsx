import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import type { Area } from "@/lib/local-areas";
import { PageHero } from "./PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "./CtaBand";
import { FaqSection } from "./FaqSection";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Shared renderer for the 5 local SEO pages. Content comes from local-areas.ts. */
export function buildAreaMetadata(area: Area): Metadata {
  return pageMeta({ title: area.metaTitle, description: area.metaDescription, path: `/${area.slug}` });
}

export function LocalAreaPage({ area }: { area: Area }) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: `${area.city} Property Management`, path: `/${area.slug}` }]}
        eyebrow={`${area.city}, Florida`}
        title={area.h1}
        intro={area.intro[0]}
        primary={{ label: "Get a Free Rental Analysis", href: "/free-rental-analysis" }}
        secondary={{ label: "See Pricing", href: "/pricing" }}
      />

      {/* Localized intro continued */}
      <Section tone="white">
        <div className="prose-tn mx-auto">
          {area.intro.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-3">
          {area.highlights.map((h) => (
            <Card key={h.title} className="h-full">
              <Icon name="compass" className="h-6 w-6 text-gold-600" />
              <h3 className="mt-3 font-display text-lg font-medium text-navy-800">{h.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{h.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pain points */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Common landlord challenges"
          title={`What ${area.city} owners run into`}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {area.painPoints.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white px-4 py-3.5">
              <Icon name="x" className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
              <span className="text-[15px] text-navy-800">{p}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Why local */}
      <Section tone="white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Why local management matters"
            title={`Management built for ${area.city}`}
            intro={area.whyLocal}
          />
          <Card className="bg-navy-800 text-navy-100">
            <h3 className="font-display text-xl !text-white">What we handle here</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {["Leasing & tenant placement", "Tenant screening", "Rent collection via RentRedi", "Maintenance coordination & documentation", "Inspections & renewals", "Clear monthly owner reporting"].map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/property-management" variant="gold" size="sm">Property Management</Button>
              <Button href="/pricing" variant="secondary" size="sm">Pricing</Button>
              <Button href="/contact" variant="secondary" size="sm">Contact</Button>
            </div>
          </Card>
        </div>
      </Section>

      <FaqSection items={area.faqs} tone="sand" title={`${area.city} property management FAQ`} />

      <CtaBand
        title={`Get a rental estimate for your ${area.city} property.`}
        subtitle="Request a free, market-informed rental analysis with rent-readiness notes and a clear management recommendation."
      />
    </>
  );
}
