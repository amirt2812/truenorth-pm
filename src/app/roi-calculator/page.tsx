import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { RoiCalculator } from "@/components/forms/RoiCalculator";

export const metadata: Metadata = pageMeta({
  title: "Landlord ROI Calculator | Hernando County Rental Cash Flow",
  description:
    "Estimate monthly and annual cash flow on a Hernando County rental. Adjust rent, costs, vacancy, and management assumptions. Educational estimate only — not financial advice.",
  path: "/roi-calculator",
});

export default function RoiCalculatorPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Owners", path: "/owners" },
          { name: "Landlord ROI Calculator", path: "/roi-calculator" },
        ]}
        eyebrow="Landlord ROI calculator"
        title="Estimate your rental's cash flow."
        intro="Adjust the numbers to see estimated monthly and annual cash flow, vacancy-adjusted rent, and management cost. A quick way to sanity-check a rental — not a substitute for professional advice."
      />
      <Section tone="sand">
        <RoiCalculator />
      </Section>
      <CtaBand
        title="Want a market-informed rent figure to plug in?"
        subtitle="Get a free rental analysis with an estimated rental range for your specific Hernando County property."
      />
    </>
  );
}
