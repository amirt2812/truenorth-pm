import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { compliance } from "@/lib/site";
import { managementPlans, aLaCartePlans } from "@/lib/pricing";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PricingCards } from "@/components/sections/PricingCards";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMeta({
  title: "Property Management Pricing in Hernando County",
  description:
    "Clear, published property management pricing for Hernando County, FL. Full-service plans starting at $99/mo, plus leasing-only, renewal-only, and à la carte options. No vague junk fees.",
  path: "/pricing",
});

const feeTransparency = [
  { icon: "dollar", title: "Clear management fee", body: "A straightforward monthly fee by plan — not a moving target." },
  { icon: "key", title: "Clear leasing fee", body: "Tenant placement priced up front before any work begins." },
  { icon: "doc", title: "Clear renewal fee", body: "A defined renewal fee so you know the cost of keeping a good tenant." },
  { icon: "eye", title: "Clear inspection pricing", body: "Inspection cadence and pricing spelled out in your agreement." },
  { icon: "wrench", title: "Maintenance coordination policy", body: "Owner approval thresholds you set; vendor costs are separate and documented." },
  { icon: "shield", title: "Owner approval thresholds", body: "You decide the dollar amount above which we check with you first." },
];

const feesWeAvoid = [
  "No hidden markups on maintenance",
  "No confusing junk fees",
  "No unclear cancellation terms",
  "No surprise charges buried in statements",
];

const pricingFaqs = [
  { q: "How much does property management cost?", a: "Full-service plans start at $99/month (Essential), $149/month (Plus), and $229/month (Premier). Leasing-only starts at 75% of the first month's rent (minimum fee to be confirmed), and renewal-only starts at $299. Final pricing depends on property type, location, condition, service scope, and a signed management agreement." },
  { q: "Do you offer leasing-only services?", a: "Yes. Our Leasing Only service handles marketing, screening, showings, and lease execution for owners who self-manage day to day." },
  { q: "Are there setup or cancellation fees?", a: "Any setup or cancellation terms are stated plainly in your management agreement before you sign. We avoid unclear cancellation terms." },
  { q: "Is pricing the same for every property?", a: "No. Pricing is subject to property type, location, condition, and service scope, which is why we provide a clear proposal for your specific property." },
  { q: "Are vendor/maintenance costs included in the monthly fee?", a: "No. Vendor costs for repairs are separate from management fees unless otherwise stated in your agreement, and they're documented with photos and invoices." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Pricing", path: "/pricing" }]}
        eyebrow="Transparent pricing"
        title="Pricing built to be read, not decoded."
        intro="We win on transparency. Here's how our plans and fees work — in plain English, before you ever sign an agreement."
        primary={{ label: "Request a Management Proposal", href: "/contact?topic=proposal" }}
        secondary={{ label: "Get a Free Rental Analysis", href: "/free-rental-analysis" }}
      />

      {/* Full-service plans */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Full-service management"
          title="Choose the level of management that fits."
          intro="Starting-at pricing. Every plan is defined in a signed management agreement for your specific property."
        />
        <div className="mt-10">
          <PricingCards plans={managementPlans} />
        </div>
      </Section>

      {/* À la carte */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Flexible options"
          title="Leasing-only, renewal-only, or build your own."
          intro="Self-managing but want help with the hard parts? Pick exactly what you need."
        />
        <div className="mt-10">
          <PricingCards plans={aLaCartePlans} />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-500">{compliance.pricingDisclaimer.en}</p>
      </Section>

      {/* Fee transparency */}
      <Section tone="sand">
        <SectionHeading eyebrow="Fee transparency" title="What you pay for — and what you don't." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {feeTransparency.map((f) => (
            <div key={f.title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                <Icon name={f.icon as never} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium text-navy-800">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>

        {/* Fees we avoid */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-gold-200 bg-white p-7 shadow-card">
          <h3 className="font-display text-xl font-medium text-navy-800">Fees we work hard to avoid</h3>
          <p className="mt-1 text-sm text-slate-500">
            Our goal is to reduce the small frustrations that drive owners away from traditional managers.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {feesWeAvoid.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] text-navy-800">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FaqSection items={pricingFaqs} tone="white" title="Pricing questions" />

      <CtaBand
        title="Want pricing for your specific property?"
        subtitle="Request a management proposal and we'll put together clear pricing for your Hernando County rental."
        primary={{ label: "Request a Management Proposal", href: "/contact?topic=proposal" }}
      />
    </>
  );
}
