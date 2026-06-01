import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, serviceAreaSentence } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { FounderAvatar } from "@/components/ui/FounderAvatar";

export const metadata: Metadata = pageMeta({
  title: "About TrueNorth Property Management | Local & Owner-Led",
  description:
    "TrueNorth Property Management brings transparent pricing, modern technology, and local accountability to Hernando County landlords. Learn why we exist and what we value.",
  path: "/about",
});

const values = [
  { icon: "compass", title: "Clarity", body: "Plain-English pricing, clear communication, and reporting you can actually read." },
  { icon: "chat", title: "Responsiveness", body: "We communicate early — before small problems become expensive ones." },
  { icon: "shield", title: "Accountability", body: "Local ownership that stands behind the work and the documentation." },
  { icon: "bolt", title: "Operational discipline", body: "Consistent systems and modern technology, applied to every property." },
  { icon: "eye", title: "Owner-first transparency", body: "No hidden markups or surprise fees — your interests come first." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About TrueNorth"
        title="Property management with direction."
        intro={`${site.brand} exists to give Hernando County landlords a clearer, more modern, more accountable way to manage rental property — without the friction owners have come to expect from traditional managers.`}
        primary={{ label: "Get a Free Rental Analysis", href: "/free-rental-analysis" }}
        secondary={{ label: "See Pricing", href: "/pricing" }}
      />

      <Section tone="white">
        <div className="prose-tn mx-auto">
          <h2>Why TrueNorth exists</h2>
          <p>
            Most owners don&apos;t leave a property manager over one big failure. They leave because of
            repeated small frustrations — unclear fees, slow updates, vague maintenance invoices, and
            poor visibility. We built TrueNorth to remove those friction points from the start.
          </p>
          <h2>Local focus</h2>
          <p>
            We focus on Hernando County: {serviceAreaSentence} Local knowledge shapes how we price,
            market, and manage — because a Spring Hill townhome and a Hernando Beach canal home are not
            the same rental.
          </p>
          <h2>Transparent pricing philosophy</h2>
          <p>
            Pricing should be readable. We publish our plans, define our fees, and put everything in a
            signed management agreement so owners know exactly what they&apos;re paying for.
          </p>
          <h2>Technology-forward operations</h2>
          <p>
            We run on {site.softwarePlatform} so owners and tenants get a modern, organized
            experience — online payments, documented maintenance, and real owner visibility — instead
            of a patchwork of texts, email, and spreadsheets.
          </p>
        </div>
      </Section>

      {/* Founder */}
      <Section tone="sand">
        <Card className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <FounderAvatar className="h-28 w-28" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">{site.founder.title}</p>
              <h2 className="mt-1 font-display text-2xl text-navy-800">{site.founder.name}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{site.founder.bio}</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Values */}
      <Section tone="white">
        <SectionHeading eyebrow="What we value" title="The principles behind every property we manage." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <Card key={v.title} hover className="h-full">
              <Icon name={v.icon as never} className="h-6 w-6 text-gold-600" />
              <h3 className="mt-3 font-display text-lg font-medium text-navy-800">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
