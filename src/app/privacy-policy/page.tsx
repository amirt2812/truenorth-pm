import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How TrueNorth Property Management collects, uses, and protects your information.",
  path: "/privacy-policy",
  noindex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      path="/privacy-policy"
      intro="How we collect, use, and protect your information. [Placeholder — pending attorney review.]"
    >
      <h2>Information we collect</h2>
      <p>
        We collect information you provide through our lead and contact forms (such as your name,
        email, phone, and property details) and information collected automatically through analytics
        and cookies (such as pages visited and device information).
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiries and provide a rental analysis or proposal</li>
        <li>To communicate with you by phone, SMS, and email (with your consent)</li>
        <li>To operate, improve, and secure our website and services</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>Lead forms</h2>
      <p>
        When you submit a form, the information is transmitted to us and may be stored in our CRM and
        email systems for follow-up. See our{" "}
        <a href="/sms-email-consent">SMS / Email Consent Policy</a> for messaging details.
      </p>

      <h2>SMS / email communications</h2>
      <p>
        With your consent, we may contact you by SMS and email. You can opt out of SMS at any time by
        replying STOP, and unsubscribe from marketing emails using the link provided. Consent is not a
        condition of any purchase.
      </p>

      <h2>Cookies & analytics</h2>
      <p>
        We use cookies and analytics tools (such as Google Analytics / Google Tag Manager and
        advertising pixels) to understand site usage and improve performance. You can control cookies
        through your browser settings.
      </p>

      <h2>Third-party tools</h2>
      <p>
        We use third-party services to operate our business, including {site.softwarePlatform} for
        property management and payments, scheduling tools, and analytics/advertising providers. Their
        use of your information is governed by their own privacy policies. Links to third-party sites
        (including the RentRedi owner and tenant portals) are provided for convenience.
      </p>

      <h2>Data security</h2>
      <p>
        We take reasonable measures to protect your information. No method of transmission or storage
        is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information, and may opt
        out of marketing communications, subject to applicable law. [INSERT specific rights and
        procedures upon attorney review.]
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Contact {site.brand} at {site.email} or {site.phone}.
      </p>
      <p className="text-sm text-slate-500">
        [INSERT final, attorney-approved Privacy Policy, including any CCPA/CPRA, GLBA, or
        Florida-specific provisions that apply to your business.]
      </p>
    </LegalLayout>
  );
}
