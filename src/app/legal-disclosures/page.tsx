import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance, activeBrokerageDisclosure } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Legal Disclosures",
  description: "Brokerage, licensing, advertising, and informational disclosures for TrueNorth Property Management.",
  path: "/legal-disclosures",
});

export default function LegalDisclosuresPage() {
  return (
    <LegalLayout
      title="Legal Disclosures"
      path="/legal-disclosures"
      intro="Important brokerage, licensing, and informational disclosures."
    >
      <h2>Brokerage & licensing</h2>
      <p>{activeBrokerageDisclosure()}</p>
      <ul>
        <li>Brokerage legal name: {site.brokerageLegalName}</li>
        <li>Florida real estate brokerage license number: {site.brokerageLicenseNumber}</li>
        <li>Holding company: {site.holdingCompany}</li>
      </ul>

      <h2>Advertising & licensing disclosure</h2>
      <p>
        [INSERT any advertising disclosures required for a Florida real estate licensee/brokerage,
        including the brokerage name as registered and any required license identifiers, upon attorney
        review and active registration.]
      </p>

      <h2>Equal housing opportunity</h2>
      <p>{compliance.fairHousing}</p>

      <h2>No legal, tax, or investment advice</h2>
      <p>{compliance.noAdvice}</p>

      <h2>Services subject to agreement</h2>
      <p>{compliance.servicesSubjectToAgreement}</p>

      <h2>Pricing</h2>
      <p>{compliance.pricingDisclaimer} Pricing is subject to change.</p>

      <h2>Informational use only</h2>
      <p>
        Website content is provided for general informational purposes only and may be updated at any
        time. Marketing offers such as the &ldquo;Free Rental Analysis&rdquo; provide a market-informed
        rental estimate and are not an appraisal or official valuation.
      </p>

      <h2>Contact</h2>
      <p>
        {site.brand} · {site.address} · {site.phone} · {site.email}
      </p>
    </LegalLayout>
  );
}
