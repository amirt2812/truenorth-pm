import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { compliance } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard, Card } from "@/components/ui/Card";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMeta({
  title: "Full-Service Property Management for Hernando County Rental Owners",
  description:
    "Full-service property management in Hernando County, FL: leasing, screening, rent collection, maintenance, inspections, renewals, and owner reporting — with transparent pricing and local accountability.",
  path: "/property-management",
});

const whoFor = [
  "Self-managing landlords ready to hand off the day-to-day",
  "Accidental landlords renting an inherited or former home",
  "Out-of-state owners who need local eyes and clear reporting",
  "Small portfolio investors who want consistent systems",
  "Owners with a vacant rental losing income each month",
  "Owners frustrated with their current property manager",
];

const included = [
  { icon: "key", title: "Leasing & tenant placement", body: "Market-informed pricing, listing, showings, and lease execution." },
  { icon: "shield", title: "Tenant screening", body: "A consistent, fair-housing-compliant screening process." },
  { icon: "dollar", title: "Rent collection", body: "Online rent collection and reminders through RentRedi." },
  { icon: "wrench", title: "Maintenance coordination", body: "Triage, vendor dispatch, and documentation with photos and invoices." },
  { icon: "eye", title: "Inspections", body: "Periodic inspections to protect your asset (cadence by plan)." },
  { icon: "doc", title: "Lease renewals", body: "Market-informed renewal pricing and paperwork handled for you." },
  { icon: "chart", title: "Owner reporting", body: "Clear monthly statements and a performance snapshot." },
  { icon: "compass", title: "Rental performance advisory", body: "Practical recommendations to optimize your rental over time." },
];

const optional = [
  "Enhanced inspection cadence",
  "Capex & renewal planning support",
  "Project/turn coordination",
  "Portfolio reporting",
  "Dedicated point of contact",
];

const onboarding = [
  { title: "Owner onboarding", body: "We learn your goals, review the property, and set up your owner portal, approval thresholds, and reporting preferences." },
  { title: "Rent-ready evaluation", body: "We assess condition and recommend what (if anything) helps the property lease faster and hold value." },
  { title: "Leasing & marketing", body: "Market-informed rent positioning, professional listing, and coordinated showings." },
  { title: "Tenant screening", body: "A consistent, fair-housing-compliant process applied to every applicant." },
  { title: "Lease execution", body: "Lease preparation, signing, deposit handling per Florida law, and move-in documentation." },
  { title: "Ongoing management", body: "Rent collection, maintenance coordination, inspections, and clear monthly reporting." },
  { title: "Renewals & reviews", body: "Market-informed renewal recommendations and periodic performance reviews." },
];

const pmFaqs = [
  { q: "What's included vs. optional?", a: "Core services — leasing support, screening, rent collection, maintenance coordination, and owner reporting — are included by plan. Enhanced inspections, capex planning, and dedicated contact are available on higher tiers or à la carte. Your management agreement defines exactly what's included." },
  { q: "Can I approve repairs before work is done?", a: "Yes. You set an owner approval threshold. Below it, we coordinate routine repairs and document them; above it, we check with you first (except genuine emergencies that protect health, safety, or the property)." },
  { q: "How do you handle emergencies and hurricanes?", a: "Maintenance requests are triaged into emergency vs. non-emergency. For Florida weather events we follow a readiness process so owners aren't scrambling. Emergency repairs that protect the property may proceed before approval, then are documented." },
  { q: "Do you handle evictions?", a: "TrueNorth can coordinate documentation and attorney handoff when legal action is required. Legal services are provided only by licensed attorneys; we do not provide legal representation or advice." },
  { q: "How are security deposits handled?", a: "Security deposit handling is performed in accordance with applicable Florida law and the signed lease/management agreement." },
];

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Property Management", path: "/property-management" }]}
        eyebrow="Full-service management"
        title="Full-service property management for Hernando County rental owners."
        intro="Leasing, screening, rent collection, maintenance, inspections, renewals, and reporting — handled with transparent pricing, modern technology, and local accountability."
        primary={{ label: "Request a Management Proposal", href: "/contact?topic=proposal" }}
        secondary={{ label: "See Pricing", href: "/pricing" }}
      />

      {/* Who it's for */}
      <Section tone="white">
        <SectionHeading eyebrow="Who it's for" title="Built for the rentals Hernando County owners actually have." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {whoFor.map((w) => (
            <div key={w} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-sand-50 px-4 py-3.5">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <span className="text-[15px] text-navy-800">{w}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* What's included */}
      <Section tone="sand">
        <SectionHeading eyebrow="What's included" title="Everything that keeps a rental running well." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {included.map((s) => (
            <FeatureCard key={s.title} icon={s.icon as never} title={s.title}>
              {s.body}
            </FeatureCard>
          ))}
        </div>

        <Card className="mx-auto mt-10 max-w-3xl">
          <h3 className="font-display text-xl font-medium text-navy-800">Optional & add-on services</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {optional.map((o) => (
              <li key={o} className="flex items-start gap-2.5 text-[15px] text-slate-700">
                <Icon name="arrow-right" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {o}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Process */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow="How it works"
              title="A clear path from onboarding to renewal."
              intro="Every step is documented so you always know what's happening with your property."
            />
          </div>
          <div className="lg:col-span-8">
            <ProcessSteps steps={onboarding} />
          </div>
        </div>
      </Section>

      {/* Maintenance detail */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Maintenance, handled right"
          title="Documented maintenance with approval thresholds you control."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <ProcessSteps
            steps={[
              { title: "Tenant submits a request", body: "Residents submit maintenance requests with photos through the RentRedi tenant portal." },
              { title: "We triage it", body: "Each request is classified as emergency or non-emergency so urgent issues are prioritized." },
              { title: "Approval threshold check", body: "Routine work below your threshold is coordinated; larger work is sent to you for approval first." },
              { title: "Vendor dispatch", body: "We coordinate a vendor and schedule the work." },
              { title: "Documented & invoiced", body: "Photos and invoices are recorded so there's a clear paper trail." },
              { title: "Owner updated", body: "You see the activity and outcome in your owner portal and statements." },
            ]}
          />
          <p className="mt-8 text-sm text-slate-500">
            Vendor costs are separate from management fees unless otherwise stated in the management
            agreement.
          </p>
        </div>
      </Section>

      {/* Comparison */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Why owners switch"
          title="A more transparent way to manage rental property."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <ComparisonTable />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          {compliance.servicesSubjectToAgreement.en}
        </p>
      </Section>

      <FaqSection items={pmFaqs} tone="sand" title="Property management questions" />

      <CtaBand
        title="Ready for property management with direction?"
        subtitle="Request a proposal and we'll outline scope and clear pricing for your Hernando County rental."
        primary={{ label: "Request a Management Proposal", href: "/contact?topic=proposal" }}
      />
    </>
  );
}
