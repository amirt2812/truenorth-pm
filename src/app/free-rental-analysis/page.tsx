import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Card, TrustItem } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { RentalAnalysisForm } from "@/components/forms/RentalAnalysisForm";

export const metadata: Metadata = pageMeta({
  title: "Free Rental Analysis — Spring Hill & Hernando County, FL",
  description:
    "Find out what your Hernando County rental could earn. Get a market-informed rental estimate, rent-readiness notes, and a recommended management approach. Not an appraisal.",
  path: "/free-rental-analysis",
});

const included = [
  { icon: "chart", title: "Estimated rental range", body: "A market-informed estimate based on local comparables — not a statewide average." },
  { icon: "check", title: "Rent-readiness notes", body: "Practical notes on what could help your property lease faster and hold value." },
  { icon: "compass", title: "Management recommendation", body: "A clear, no-pressure recommendation on the right management approach for your goals." },
];

export default function FreeRentalAnalysisPage() {
  return (
    <>
      {/* Hero + form, side by side */}
      <section className="bg-navy-800 bg-compass">
        <div className="container-tn py-12 sm:py-16">
          <Breadcrumbs items={[{ name: "Free Rental Analysis", path: "/free-rental-analysis" }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Free rental analysis</p>
              <h1 className="font-display text-display-lg font-semibold !text-white">
                Find out what your Hernando County rental could earn.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-100">
                Get a market-informed rental estimate, rent-readiness notes, and a recommended
                management approach for your property.
              </p>
              <ul className="mt-8 space-y-5">
                {included.map((i) => (
                  <li key={i.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-gold-300">
                      <Icon name={i.icon as never} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-lg !text-white">{i.title}</span>
                      <span className="text-sm text-navy-200">{i.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-navy-200">
                This is a market-informed rental estimate — not an appraisal or official valuation.
              </p>
            </div>

            <div className="lg:col-span-7">
              <Card className="shadow-card-hover">
                <h2 className="font-display text-xl font-medium text-navy-800">Tell us about your property</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Takes about two minutes. The more detail you share, the more useful the estimate.
                </p>
                <div className="mt-6">
                  <RentalAnalysisForm />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance band */}
      <Section tone="sand">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          <TrustItem icon="shield">No obligation and no pressure — a request is not a management agreement.</TrustItem>
          <TrustItem icon="pin">Local context from someone who knows the Hernando County rental market.</TrustItem>
          <TrustItem icon="eye">Clear next steps if you decide TrueNorth is a fit.</TrustItem>
        </div>
      </Section>
    </>
  );
}
