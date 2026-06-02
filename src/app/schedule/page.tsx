import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CalendlyEmbed } from "@/components/sections/CalendlyEmbed";
import { TrustItem } from "@/components/ui/Card";

export const metadata: Metadata = pageMeta({
  title: "Schedule an Owner Consultation | TrueNorth Property Management",
  description:
    "Book a free, no-pressure owner consultation with TrueNorth Property Management. Talk through your Hernando County rental, pricing, and the right management approach.",
  path: "/schedule",
});

export default function SchedulePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Schedule a Consultation", path: "/schedule" }]}
        eyebrow="Owner consultation"
        title="Book a time to talk."
        intro="Pick a time that works for you. We'll discuss your Hernando County rental, your goals, and the right management approach — no pressure, no obligation."
      />
      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-xl font-medium text-navy-800">What to expect</h2>
            <ul className="mt-5 space-y-4">
              <TrustItem icon="chat">A straightforward conversation about your property and goals.</TrustItem>
              <TrustItem icon="chart">A market-informed view of what your rental could earn.</TrustItem>
              <TrustItem icon="compass">A clear recommendation on the right management approach.</TrustItem>
              <TrustItem icon="shield">No obligation — booking a call does not create a management agreement.</TrustItem>
            </ul>
            <div className="mt-8 rounded-xl border border-navy-100 bg-white p-5 text-sm text-slate-600">
              Prefer to talk now? Call{" "}
              <a href={site.phoneHref} className="font-semibold text-navy-700 underline">{site.phone}</a>{" "}
              or email{" "}
              <a href={site.emailHref} className="font-semibold text-navy-700 underline">{site.email}</a>.
            </div>
          </div>
          <div className="lg:col-span-8">
            <CalendlyEmbed />
          </div>
        </div>
      </Section>
    </>
  );
}
