import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMeta({
  title: "For Owners | Hernando County Landlord Services",
  description:
    "What working with TrueNorth looks like for owners — onboarding, leasing, screening, maintenance controls, monthly reporting, renewals, and end-of-year support.",
  path: "/owners",
});

const journey = [
  { title: "Owner onboarding", body: "We learn your goals, set up your owner portal, and configure approval thresholds and reporting preferences." },
  { title: "Rent-ready evaluation", body: "A walkthrough and recommendations on what helps the property lease faster and hold value." },
  { title: "Leasing strategy", body: "Market-informed rent positioning, professional listing, and coordinated showings." },
  { title: "Tenant screening", body: "A consistent, fair-housing-compliant process applied to every applicant." },
  { title: "Lease execution", body: "Lease prep, signing, deposit handling per Florida law, and documented move-in." },
  { title: "Maintenance controls", body: "Owner approval thresholds you set, with photo and invoice documentation." },
  { title: "Monthly reporting", body: "Clear statements and a performance snapshot in your owner portal." },
  { title: "Renewal planning", body: "Market-informed renewal recommendations to retain good tenants." },
  { title: "End-of-year support", body: "Year-end documentation to make tax time easier (we don't provide tax advice)." },
];

const ownerFaqs = [
  { q: "How do I get started?", a: "Start with a free rental analysis or request a proposal. If it's a fit, we'll send a management agreement and begin onboarding." },
  { q: "How often will I hear from you?", a: "You'll have always-on visibility through the owner portal, clear monthly statements, and proactive contact when something needs your decision." },
  { q: "Can I set spending limits on repairs?", a: "Yes — you set an approval threshold, and we check with you before exceeding it (except genuine emergencies)." },
  { q: "What if I'm switching from another manager?", a: "We'll help coordinate a clean transition, subject to your current agreement and a signed agreement with us." },
];

export default function OwnersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Owners", path: "/owners" }]}
        eyebrow="For owners"
        title="Owner-first property management, start to finish."
        intro="Most landlords don't need more complexity. They need clear rent collection, reliable screening, documented maintenance, and a manager who communicates early. Here's what that looks like with TrueNorth."
        primary={{ label: "Get a Free Rental Analysis", href: "/free-rental-analysis" }}
        secondary={{ label: "Request a Proposal", href: "/contact?topic=proposal" }}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow="The owner journey"
              title="A clear path from first call to renewal."
              intro="Every step is documented so you always know what's happening with your property."
            />
            <div className="mt-6 flex flex-col gap-3">
              <Button href="/owner-portal" variant="secondary">Explore the Owner Portal</Button>
              <Button href="/roi-calculator" variant="ghost">Try the ROI Calculator <Icon name="arrow-right" className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ProcessSteps steps={journey} />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="What you get" title="Visibility, control, and transparency." />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Card hover><Icon name="eye" className="h-6 w-6 text-gold-600" /><h3 className="mt-3 font-display text-lg text-navy-800">Always-on visibility</h3><p className="mt-1 text-sm text-slate-600">Statements, payments, and activity in your owner portal.</p></Card>
          <Card hover><Icon name="wrench" className="h-6 w-6 text-gold-600" /><h3 className="mt-3 font-display text-lg text-navy-800">Maintenance control</h3><p className="mt-1 text-sm text-slate-600">Approval thresholds you set, fully documented.</p></Card>
          <Card hover><Icon name="dollar" className="h-6 w-6 text-gold-600" /><h3 className="mt-3 font-display text-lg text-navy-800">Transparent pricing</h3><p className="mt-1 text-sm text-slate-600">Plans you can read, with no surprise junk fees.</p></Card>
        </div>
      </Section>

      <FaqSection items={ownerFaqs} tone="white" title="Owner questions" />
      <CtaBand />
    </>
  );
}
