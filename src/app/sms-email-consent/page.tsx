import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "SMS / Email Consent Policy",
  description: "How TrueNorth Property Management handles SMS and email communications, consent, and opt-out.",
  path: "/sms-email-consent",
});

export default function SmsEmailConsentPage() {
  return (
    <LegalLayout
      title="SMS / Email Consent Policy"
      path="/sms-email-consent"
      intro="How our text and email communications work, and how to opt out. [Placeholder — pending attorney review.]"
    >
      <h2>Consent to receive messages</h2>
      <p>
        By providing your phone number and email address and checking the consent box on our forms, you
        agree to receive communications from {site.brand} by phone call, SMS text message, and email
        regarding your inquiry, your property, and related services.
      </p>

      <h2>Message frequency</h2>
      <p>Message frequency may vary based on your interactions with us.</p>

      <h2>Message & data rates</h2>
      <p>Message and data rates may apply, depending on your mobile carrier and plan.</p>

      <h2>Opting out</h2>
      <ul>
        <li>Reply <strong>STOP</strong> to any text message to opt out of SMS.</li>
        <li>Reply <strong>HELP</strong> for help, or contact us at {site.phone}.</li>
        <li>Use the unsubscribe link in any marketing email to opt out of emails.</li>
      </ul>

      <h2>Consent is not a condition of purchase</h2>
      <p>
        Your consent to receive marketing messages is not required as a condition of purchasing any
        property, product, or service.
      </p>

      <h2>Privacy</h2>
      <p>
        We do not sell your mobile information. See our <a href="/privacy-policy">Privacy Policy</a> for
        how we handle your information.
      </p>
      <p className="text-sm text-slate-500">
        [INSERT final, attorney-approved messaging consent language, including any TCPA-compliant
        disclosures and carrier-required terms.]
      </p>
    </LegalLayout>
  );
}
