import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description: "The terms governing your use of the TrueNorth Property Management website.",
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return (
    <LegalLayout
      title="Terms of Use"
      path="/terms-of-use"
      intro="The terms governing your use of this website. [Placeholder — pending attorney review.]"
    >
      <h2>Acceptance of these terms</h2>
      <p>
        By accessing or using this website, you agree to these Terms of Use. If you do not agree, please
        do not use the site.
      </p>

      <h2>No professional advice</h2>
      <p>{compliance.noAdvice.en}</p>

      <h2>No guarantees</h2>
      <p>
        Content is provided &ldquo;as is.&rdquo; We make no guarantees regarding tenant placement, rent
        amounts, eviction outcomes, investment returns, legal compliance, or maintenance results. Any
        rental estimate is market-informed and is not an appraisal or official valuation.
      </p>

      <h2>Services subject to agreement</h2>
      <p>{compliance.servicesSubjectToAgreement.en}</p>

      <h2>Intellectual property</h2>
      <p>
        The content, branding, and design of this website are owned by {site.brand} or its licensors
        and may not be copied or reused without permission.
      </p>

      <h2>Third-party links</h2>
      <p>
        This site may link to third-party websites and tools (including the RentRedi portals). We are
        not responsible for the content or practices of those third parties.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {site.brand} is not liable for any indirect,
        incidental, or consequential damages arising from your use of this website.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Florida, without regard to conflict-of-law
        principles. [INSERT venue/jurisdiction and dispute-resolution provisions upon attorney review.]
      </p>

      <h2>Contact</h2>
      <p>Questions? Contact {site.brand} at {site.email}.</p>
    </LegalLayout>
  );
}
