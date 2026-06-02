import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMeta({
  title: "Owner Portal | RentRedi-Powered Owner Experience",
  description:
    "See your rental's performance anytime. TrueNorth's RentRedi-powered owner experience gives you statements, payment tracking, maintenance visibility, and documents in one place.",
  path: "/owner-portal",
});

const features = [
  { icon: "doc", title: "Online statements", body: "Clear monthly statements you can review and download anytime." },
  { icon: "dollar", title: "Rent payment tracking", body: "See rent activity and disbursements without chasing anyone for an update." },
  { icon: "wrench", title: "Maintenance visibility", body: "Track maintenance requests, status, and documentation with photos and invoices." },
  { icon: "doc", title: "Document access", body: "Leases and key documents organized in one secure place." },
  { icon: "chart", title: "Monthly performance snapshot", body: "A clear view of how your property is performing month to month." },
  { icon: "eye", title: "Always-on access", body: "Log in from anywhere — ideal for out-of-area and out-of-state owners." },
];

export default function OwnerPortalPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Owner Portal", path: "/owner-portal" }]}
        eyebrow="Technology-forward operations"
        title="Your rental's performance, always within reach."
        intro={`Our ${site.softwarePlatform}-powered owner experience replaces the guesswork of traditional management with real visibility — statements, payments, maintenance, and documents in one place.`}
        primary={{ label: "Owner Portal Login", href: site.links.ownerPortal }}
        secondary={{ label: "Request an Owner Demo", href: "/contact?topic=proposal" }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="What you'll see" title="Visibility, not voicemails." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon as never} title={f.title}>
              {f.body}
            </FeatureCard>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          We use {site.softwarePlatform} as designed and don&apos;t overstate what the software can do.
          Available features may evolve as the platform updates.
        </p>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading light eyebrow="See it for yourself" title="Want a walkthrough?" intro="Schedule a consultation and we'll show you exactly what owner reporting looks like for a property like yours." />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/schedule" variant="gold" size="lg"><Icon name="calendar" className="h-4 w-4" /> Schedule a Consultation</Button>
            <Button href="/free-rental-analysis" variant="secondary" size="lg">Get a Free Rental Analysis</Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Ready to see your property this clearly?"
        subtitle="Request a proposal and we'll set up your owner experience from day one."
        primary={{ label: "Request a Management Proposal", href: "/contact?topic=proposal" }}
      />
    </>
  );
}
