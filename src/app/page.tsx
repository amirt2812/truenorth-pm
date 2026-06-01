import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, serviceAreas, serviceAreaSentence } from "@/lib/site";
import { managementPlans } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard, TrustItem, Card } from "@/components/ui/Card";
import { PricingCards } from "@/components/sections/PricingCards";
import { RentRediSection } from "@/components/sections/RentRediSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FoundingLandlord } from "@/components/sections/FoundingLandlord";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { RentalAnalysisForm } from "@/components/forms/RentalAnalysisForm";

export const metadata: Metadata = pageMeta({
  title: "Hernando County Property Management | TrueNorth",
  description:
    "Transparent, technology-forward property management for Hernando County, FL landlords. Free rental analysis, clear pricing, local accountability, and a RentRedi-powered owner & tenant experience.",
  path: "/",
});

const trustBullets = [
  { icon: "dollar", text: "Transparent pricing" },
  { icon: "pin", text: "Local Hernando County focus" },
  { icon: "key", text: "RentRedi-powered owner & tenant experience" },
  { icon: "wrench", text: "Clear maintenance approval thresholds" },
  { icon: "chart", text: "Monthly owner reporting" },
  { icon: "shield", text: "Broker-led compliance framework, once active" },
] as const;

const painPoints = [
  "Late-night tenant calls",
  "Maintenance surprises",
  "Vacancy risk",
  "Weak tenant screening",
  "Unclear owner statements",
  "Slow property manager communication",
  "Hidden fees",
];

const differentiators = [
  { icon: "dollar", title: "Clear pricing", body: "Plain-English plans and fees you can actually read — no vague markups or surprise charges." },
  { icon: "chat", title: "Faster communication", body: "Prompt, documented updates so small issues are handled before they become expensive ones." },
  { icon: "pin", title: "Local accountability", body: "We focus on Hernando County, not a far-off regional call center." },
  { icon: "bolt", title: "Technology-forward", body: "RentRedi-powered operations keep payments, maintenance, and records organized." },
  { icon: "eye", title: "Owner visibility", body: "An always-on owner portal with statements, payments, and activity." },
  { icon: "wrench", title: "Maintenance control", body: "Owner approval thresholds you set, with photo and invoice documentation." },
  { icon: "chart", title: "Data-informed rent strategy", body: "Market-informed rent positioning and renewal recommendations." },
] as const;

const services = [
  { icon: "key", title: "Leasing & tenant placement" },
  { icon: "shield", title: "Tenant screening" },
  { icon: "dollar", title: "Rent collection" },
  { icon: "wrench", title: "Maintenance coordination" },
  { icon: "eye", title: "Inspections" },
  { icon: "doc", title: "Lease renewals" },
  { icon: "chart", title: "Owner reporting" },
  { icon: "compass", title: "Rental performance advisory" },
] as const;

const homeFaqs = [
  { q: "What areas do you serve?", a: `We serve ${serviceAreaSentence}` },
  { q: "How much does property management cost?", a: "Our published plans start at $99/month, with Plus and Premier tiers and à la carte leasing and renewal options. Final pricing depends on property type, location, condition, service scope, and a signed management agreement." },
  { q: "Can I approve repairs before work is done?", a: "Yes. You set owner approval thresholds, and maintenance is documented with photos and invoices. Vendor costs are separate from management fees unless otherwise stated in your agreement." },
  { q: "Do you work with out-of-state owners?", a: "Yes. Our RentRedi-powered owner portal and clear monthly reporting are built so owners can stay informed from anywhere." },
];

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-navy-800 bg-compass">
        <div className="container-tn grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 ring-1 ring-white/15">
              <Icon name="pin" className="h-3.5 w-3.5" /> Hernando County, Florida
            </span>
            <h1 className="mt-5 font-display text-display-xl font-semibold !text-white">
              Hernando County Property Management{" "}
              <span className="text-gold-400">With Direction.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
              {site.brand} helps local and out-of-area landlords lease, manage, maintain, and
              optimize rental homes with transparent pricing, modern technology, and clear
              communication.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/free-rental-analysis" variant="gold" size="lg">
                Get a Free Rental Analysis
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                See Pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-navy-200">
              Prefer to talk?{" "}
              <a href={site.phoneHref} className="font-semibold text-white underline underline-offset-4">
                Call a local property manager
              </a>
              .
            </p>
          </div>

          {/* Trust bullets card */}
          <div className="lg:col-span-5">
            <Card className="border-white/10 bg-white/[0.06] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
                Why owners choose TrueNorth
              </p>
              <ul className="mt-5 space-y-4">
                {trustBullets.map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                      <Icon name={b.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] leading-snug text-white">{b.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Pain points ───────────────────────── */}
      <Section tone="white">
        <SectionHeading
          eyebrow="The reality of self-managing"
          title="Owning a rental should not feel like managing a second job."
          intro="Most owners don't have a single big problem — they have a steady stream of small ones that add up."
        />
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p) => (
            <div key={p} className="flex items-center gap-3 rounded-xl border border-navy-100 bg-sand-50 px-4 py-3.5">
              <Icon name="x" className="h-5 w-5 shrink-0 text-slate-400" />
              <span className="text-[15px] text-navy-800">{p}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-slate-600">
          Most landlords do not need more complexity. They need clear rent collection, reliable
          tenant screening, documented maintenance, and a manager who communicates before small
          problems become expensive problems.
        </p>
      </Section>

      {/* ───────────────────────── Differentiation ───────────────────────── */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="The TrueNorth difference"
          title="A more transparent way to manage rental property."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <FeatureCard key={d.title} icon={d.icon} title={d.title}>
              {d.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      {/* ───────────────────────── Services overview ───────────────────────── */}
      <Section tone="white">
        <SectionHeading
          eyebrow="What we handle"
          title="Full-service management, end to end."
          intro="Pick full-service or build your own — every engagement is defined in a signed management agreement."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="font-display text-[17px] font-medium text-navy-800">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/property-management" variant="ghost">
            Explore full-service management <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* ───────────────────────── Pricing preview ───────────────────────── */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Transparent pricing"
          title="Pricing you can read at a glance."
          intro="Starting-at pricing for full-service management. À la carte leasing and renewal options are available."
        />
        <div className="mt-10">
          <PricingCards plans={managementPlans} />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-500">
          Pricing is subject to property type, location, condition, service scope, and signed
          management agreement.
        </p>
        <div className="mt-8 text-center">
          <Button href="/pricing" variant="primary">View Transparent Pricing</Button>
        </div>
      </Section>

      {/* ───────────────────────── RentRedi technology ───────────────────────── */}
      <RentRediSection />

      {/* ───────────────────────── Local market ───────────────────────── */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Local expertise"
              title="Built for Hernando County landlords."
              intro="We know the rental dynamics of Spring Hill's neighborhoods, Brooksville's established communities, the coastal market in Hernando Beach and Weeki Wachee, and 55+ communities like Timber Pines. Local knowledge shapes how we price, market, and manage."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span key={area} className="rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-700">
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TrustCard icon="home" title="Right-sized for our market" body="Single-family homes, townhomes, condos, and small portfolios — the rentals Hernando County owners actually have." />
            <TrustCard icon="chart" title="Market-informed pricing" body="Rent positioning based on local comparables, not generic statewide averages." />
            <TrustCard icon="bolt" title="Hurricane-aware operations" body="Florida-specific readiness so owners aren't scrambling when weather threatens." />
            <TrustCard icon="users" title="Tenant relationships" body="Responsive, respectful resident service that protects your asset and reduces turnover." />
          </div>
        </div>
      </Section>

      {/* ───────────────────────── Comparison ───────────────────────── */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Traditional management vs. TrueNorth"
          title="Owners rarely leave over one big failure."
          intro="They leave because of repeated small frustrations: unclear fees, slow updates, vague maintenance invoices, and poor visibility. TrueNorth is built to reduce those friction points from the start."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <ComparisonTable />
        </div>
      </Section>

      {/* ───────────────────────── Free rental analysis form ───────────────────────── */}
      <Section tone="white" id="rental-analysis">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Free rental analysis"
              title="Find out what your rental could earn."
              intro="Get a market-informed rental estimate, rent-readiness notes, and a recommended management approach for your Hernando County property."
            />
            <ul className="mt-6 space-y-4">
              <TrustItem icon="chart">A market-informed estimated rental range</TrustItem>
              <TrustItem icon="check">Rent-readiness notes for your property</TrustItem>
              <TrustItem icon="compass">A clear, no-pressure management recommendation</TrustItem>
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              This is a market-informed rental estimate — not an appraisal or official valuation.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Card className="shadow-card-hover">
              <RentalAnalysisForm />
            </Card>
          </div>
        </div>
      </Section>

      {/* ───────────────────────── Founder credibility ───────────────────────── */}
      <Section tone="navy-soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-600">Local & owner-led</span>
          <blockquote className="mt-4 font-display text-2xl leading-relaxed text-navy-800 sm:text-3xl">
            &ldquo;[Founder Name] is a local Hernando County real estate investor and property
            management operator focused on bringing institutional-quality systems to local
            residential landlords.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-slate-500">
            [INSERT founder name, photo, and bio. Do not add credentials that aren&apos;t verified.]
          </p>
          <div className="mt-8">
            <Button href="/about" variant="secondary">Meet TrueNorth</Button>
          </div>
        </div>
      </Section>

      {/* ───────────────────────── Founding landlord ───────────────────────── */}
      <FoundingLandlord />

      {/* ───────────────────────── Home FAQ ───────────────────────── */}
      <FaqSection items={homeFaqs} tone="white" title="Common questions from owners" />

      {/* ───────────────────────── Final CTA ───────────────────────── */}
      <CtaBand />
    </>
  );
}

function TrustCard({ icon, title, body }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-sand-50 p-5">
      <Icon name={icon} className="h-6 w-6 text-gold-600" />
      <h3 className="mt-3 font-display text-lg font-medium text-navy-800">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}
