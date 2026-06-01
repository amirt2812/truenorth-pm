import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = pageMeta({
  title: "Realtor Referral Partners | Protect Your Client Relationship",
  description:
    "Partner with TrueNorth Property Management to manage clients who aren't ready to sell — and keep the relationship for when they are. Subject to applicable law and brokerage compliance.",
  path: "/realtor-referral-partners",
});

const how = [
  { icon: "shield", title: "We protect your relationship", body: "We manage the rental and keep your client relationship intact for the future — we're a management partner, not a competitor for the sale." },
  { icon: "key", title: "We handle the management", body: "Leasing, screening, rent collection, maintenance, and reporting — handled professionally so your client is well cared for." },
  { icon: "chat", title: "We refer back when they're ready", body: "When your client is ready to buy or sell, we can refer them back to you, subject to applicable law and brokerage compliance." },
];

export default function RealtorReferralPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Realtor Referral Partners", path: "/realtor-referral-partners" }]}
        eyebrow="For real estate agents"
        title="A property management partner that protects your client relationship."
        intro="When a client isn't ready to sell — or wants to rent their home for a while — you don't have to lose the relationship. TrueNorth manages the property and keeps your client connection intact for when they're ready to buy or sell."
        primary={{ label: "Become a Referral Partner", href: "#partner-form" }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="How the partnership works" title="Keep your clients. Hand off the management." />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {how.map((h) => (
            <Card key={h.title} hover className="h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400"><Icon name={h.icon as never} className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display text-lg font-medium text-navy-800">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.body}</p>
            </Card>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-navy-100 bg-sand-50 p-5 text-sm leading-relaxed text-slate-600">
          <strong className="text-navy-800">A note on compliance:</strong> Any referral arrangement is
          structured to comply with applicable Florida law and real estate brokerage regulations.
          We do not offer or promise referral fees or any compensation that would not be lawful. All
          arrangements are subject to brokerage compliance and any required written agreements.
        </div>
      </Section>

      <Section tone="sand" id="partner-form">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow="Let's talk" title="Become a referral partner" intro="Tell us about your business and the kinds of clients you'd like to refer. We'll follow up to discuss a compliant partnership." />
          </div>
          <div className="lg:col-span-7">
            <Card className="shadow-card-hover">
              <LeadForm
                formId="realtor-referral"
                thankYouType="default"
                defaultTopic="Realtor referral partnership"
                extraFields={[
                  { kind: "input", id: "brokerage", label: "Your brokerage", half: true },
                  { kind: "input", id: "license", label: "License # (optional)", half: true },
                ]}
                submitLabel="Become a Referral Partner"
              />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
