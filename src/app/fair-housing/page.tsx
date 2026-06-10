import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { compliance } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Fair Housing Statement",
  description: "TrueNorth Property Management supports equal housing opportunity and does not discriminate against any protected class under applicable law.",
  path: "/fair-housing",
});

export default function FairHousingPage() {
  return (
    <LegalLayout
      title="Fair Housing Statement"
      path="/fair-housing"
      intro="We are committed to equal housing opportunity for all."
    >
      <p className="text-lg font-medium text-navy-800">{compliance.fairHousing.en}</p>
      <h2>Our commitment</h2>
      <p>
        We provide equal professional service to all clients, prospective tenants, and applicants
        without regard to any protected class. We apply consistent screening criteria to every
        applicant and comply with the federal Fair Housing Act and all applicable Florida and local
        fair housing laws.
      </p>
      <h2>Reasonable accommodations</h2>
      <p>
        We accommodate assistance animals and service animals, and provide reasonable accommodations
        and modifications, in accordance with applicable fair housing law. Documentation requirements,
        where applicable, follow the law.
      </p>
      <h2>Reporting concerns</h2>
      <p>
        If you believe you have experienced discrimination, you may contact the U.S. Department of
        Housing and Urban Development (HUD) or the appropriate Florida agency. [INSERT contact details
        and any required licensee/brokerage disclosures upon attorney review.]
      </p>
    </LegalLayout>
  );
}
