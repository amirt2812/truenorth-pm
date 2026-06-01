import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { faqs } from "@/lib/faq";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMeta({
  title: "Property Management FAQ | Hernando County, FL",
  description:
    "Answers to common questions about TrueNorth Property Management: service areas, pricing, screening, maintenance approvals, rent payments, evictions, deposits, and licensing.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="Frequently asked questions"
        title="Answers for Hernando County landlords."
        intro="The questions owners ask most — about pricing, services, technology, and how we operate. Don't see yours? Reach out anytime."
        primary={{ label: "Get a Free Rental Analysis", href: "/free-rental-analysis" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />

      <FaqSection items={faqs} tone="white" eyebrow="" title="All questions" />

      <CtaBand
        title="Still have questions?"
        subtitle="Talk to a local property manager — no pressure, no obligation."
        primary={{ label: "Contact TrueNorth", href: "/contact" }}
      />
    </>
  );
}
