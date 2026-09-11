import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = pageMeta({
  title: "Switching Property Managers in Hernando County, FL",
  description:
    "Unhappy with your property manager? TrueNorth handles the switch — lease, tenant, security deposit, records, and keys — for Spring Hill, Brooksville, and Hernando County owners.",
  path: "/switch-property-managers",
});

const signs = [
  "Calls and emails go unanswered for days",
  "Statements are hard to read, or charges show up you didn't expect",
  "Repairs drag on, or cost more than they should",
  "Long vacancies, or rent that has fallen behind the market",
  "You hear about problems from your tenant before your manager",
];

const steps = [
  { title: "Review your current agreement", body: "We'll help you find the notice period and any termination or leasing-fee terms, so you know your exit date and costs before you decide." },
  { title: "Give written notice", body: "You send notice to your current manager. We give you a checklist of exactly what to request from them." },
  { title: "We handle the handoff", body: "Lease, tenant ledger, security deposit (transferred as Florida law requires), keys, and open work orders all come over to us." },
  { title: "Welcome your tenant", body: "We introduce ourselves, set your tenant up on online rent payment, and confirm the property's condition records." },
];

const faqs = [
  { q: "Can I switch managers in the middle of a lease?", a: "Yes. The lease stays in force and your tenant stays put. What changes is who manages the property and where rent is paid." },
  { q: "What happens to my tenant's security deposit?", a: "It must be transferred to the new manager (or to you) and stays subject to Florida's security deposit rules. We track the transfer as part of the handoff." },
  { q: "Will I owe my current manager anything?", a: "It depends on your agreement. Some include an early termination fee or a leasing fee tied to the current tenant. We'll help you find those terms; for legal questions, consult a Florida attorney." },
  { q: "How long does a switch take?", a: "Usually the length of your current agreement's notice period, often 30 days. The handoff itself typically takes a few days once notice is given." },
];

export default function SwitchPropertyManagersPage() {
  const { enabled, spots, cancelWindowDays } = site.foundingOffer;
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Switching Property Managers", path: "/switch-property-managers" }]}
        eyebrow="Switching property managers"
        title="Unhappy with your property manager? Switching is easier than you think."
        intro="Most owners stay with a manager that isn't working because switching sounds like a hassle. We handle the transition, so your tenant, deposit, records, and keys all land safely."
        primary={{ label: "Start my switch", href: "#switch-form" }}
        secondary={{ label: `Call ${site.phone}`, href: site.phoneHref }}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="Sound familiar?" title="Signs it's time to switch" />
            <ul className="mt-6 space-y-3">
              {signs.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-700">
                  <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {enabled ? (
            <Card className="border-gold-200 bg-gold-50">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Founding owner terms · first {spots} owners</span>
              <h2 className="mt-3 font-display text-2xl font-medium text-navy-800">Switch without the usual penalties</h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                <li className="flex gap-3"><Icon name="key" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />No leasing fee to take over the tenant already in place</li>
                <li className="flex gap-3"><Icon name="dollar" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />No setup fee</li>
                <li className="flex gap-3"><Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Cancel without a termination fee in your first {cancelWindowDays} days</li>
                <li className="flex gap-3"><Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />A reply within {site.responseTime.en}, every time</li>
              </ul>
              <p className="mt-5 text-xs text-slate-500">Terms are set out in a written addendum to the management agreement.</p>
            </Card>
          ) : (
            <Card className="border-gold-200 bg-gold-50">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Why owners switch to TrueNorth</span>
              <h2 className="mt-3 font-display text-2xl font-medium text-navy-800">Management you don&apos;t have to chase</h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                <li className="flex gap-3"><Icon name="dollar" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Transparent pricing, with plans starting at $99/month</li>
                <li className="flex gap-3"><Icon name="eye" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Online owner portal and clear monthly statements</li>
                <li className="flex gap-3"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Local and founder-led, on the ground in Hernando County</li>
                <li className="flex gap-3"><Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />A reply within {site.responseTime.en}</li>
              </ul>
              <p className="mt-5 text-xs text-slate-500">{compliance.pricingDisclaimer.en}</p>
            </Card>
          )}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="How it works" title="Four steps, and we handle most of them" />
        <div className="mt-10">
          <ProcessSteps steps={steps} />
        </div>
      </Section>

      <Section tone="white" id="switch-form">
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="Let's talk" title="Tell us about your property" intro="We'll review your situation and walk you through the switch. No obligation." />
          <Card className="mt-8">
            <LeadForm
              formId="switch-manager"
              thankYouType="switch"
              showAddress
              defaultTopic="Switching property managers"
              extraFields={[
                {
                  kind: "select",
                  id: "timeline",
                  label: "When does your current agreement end or renew?",
                  options: ["Within 30 days", "1–3 months", "3–6 months", "6+ months", "Not sure"],
                },
              ]}
              submitLabel="Start My Switch"
            />
          </Card>
        </div>
      </Section>

      <FaqSection items={faqs} tone="sand" title="Switching questions" />
      <CtaBand />
    </>
  );
}
