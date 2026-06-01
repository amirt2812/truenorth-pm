import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMeta({
  title: "Investor Services | Hernando County Rental Portfolio Management",
  description:
    "Services for small portfolio landlords in Hernando County: rent analysis, portfolio performance review, renewal strategy, capex planning, and management reporting. Educational, not investment advice.",
  path: "/investor-services",
});

const services = [
  { icon: "chart", title: "Rent analysis", body: "Market-informed rent positioning for each property in your portfolio." },
  { icon: "eye", title: "Portfolio performance review", body: "A clear look at how your rentals are performing across the board." },
  { icon: "doc", title: "Renewal strategy", body: "Data-informed renewal recommendations to reduce turnover and vacancy." },
  { icon: "wrench", title: "Capex planning", body: "Help thinking through capital expenditures and timing across properties." },
  { icon: "compass", title: "Hold / sell / rent advisory", body: "An informed perspective on options for each asset — educational only." },
  { icon: "chart", title: "Management reporting", body: "Consolidated reporting so your portfolio is easy to track." },
];

export default function InvestorServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Investor Services", path: "/investor-services" }]}
        eyebrow="For investors"
        title="Institutional-quality systems for local portfolios."
        intro="Whether you own two rentals or twenty, TrueNorth brings consistent systems, clear reporting, and data-informed strategy to small portfolio landlords across Hernando County."
        primary={{ label: "Request a Portfolio Review", href: "/contact?topic=custom" }}
        secondary={{ label: "Try the ROI Calculator", href: "/roi-calculator" }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="What we offer" title="Strategy, reporting, and management in one place." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <FeatureCard key={s.title} icon={s.icon as never} title={s.title}>
              {s.body}
            </FeatureCard>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-gold-200 bg-gold-50 p-5 text-sm leading-relaxed text-navy-800">
          <Icon name="shield" className="mr-2 inline h-4 w-4 text-gold-700" />
          Information provided is educational and is not tax, legal, or investment advice. Consult
          your own licensed professionals before making investment decisions.
        </div>
      </Section>

      <Section tone="sand">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading eyebrow="Custom portfolio pricing" title="Scaling? Let's structure it." intro="Multi-property and portfolio owners can build a custom scope with pricing that fits. Tell us about your portfolio and goals." />
          <div className="mt-8">
            <Button href="/contact?topic=custom" variant="gold" size="lg">Request a Management Proposal <Icon name="arrow-right" className="h-4 w-4" /></Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Get a market-informed view of your portfolio."
        subtitle="Start with a free rental analysis on one property, or request a full portfolio review."
      />
    </>
  );
}
