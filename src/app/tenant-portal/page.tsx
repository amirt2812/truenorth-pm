import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard, Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMeta({
  title: "Tenant Portal | Pay Rent & Submit Maintenance Online",
  description:
    "TrueNorth residents: pay rent, submit maintenance requests, and access documents through the RentRedi tenant portal. Clear communication and emergency maintenance guidance.",
  path: "/tenant-portal",
});

const features = [
  { icon: "dollar", title: "Pay rent online", body: "Pay securely through the RentRedi tenant portal, with reminders and payment history." },
  { icon: "wrench", title: "Submit maintenance", body: "Submit non-emergency requests with photos so issues are documented and routed quickly." },
  { icon: "doc", title: "Access documents", body: "Find your lease and key documents whenever you need them." },
  { icon: "chat", title: "Centralized communication", body: "Keep your rental conversations organized in one place." },
];

export default function TenantPortalPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { name: "Tenants", path: "/tenants" },
          { name: "Tenant Portal", path: "/tenant-portal" },
        ]}
        eyebrow="For residents"
        title="Pay rent and submit maintenance in minutes."
        intro={`Everything residents need lives in the ${site.softwarePlatform} tenant portal — rent payments, maintenance requests, and documents, available anytime.`}
        primary={{ label: "Access Tenant Portal", href: site.links.tenantPortal }}
        secondary={{ label: "Apply Online", href: site.links.rentRediApplication }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="In the portal" title="Simple, organized, and online." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon as never} title={f.title}>
              {f.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="font-display text-xl font-medium text-navy-800">Communication expectations</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              We aim to acknowledge requests promptly and keep you informed as work is scheduled.
              Routing requests through the portal (rather than text or email) helps us respond faster
              and keep a clear record for everyone.
            </p>
          </Card>
          <Card className="border-gold-200 bg-gold-50">
            <h3 className="flex items-center gap-2 font-display text-xl font-medium text-navy-800">
              <Icon name="bolt" className="h-5 w-5 text-gold-700" /> Emergency maintenance
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              For any life-safety emergency, call <strong>911</strong> first. For urgent property
              emergencies — active water leak, no heat/AC in extreme weather, gas smell, or electrical
              hazard — call us immediately at{" "}
              <a href={site.phoneHref} className="text-navy-600 underline">{site.phone}</a> rather than
              waiting on a portal request.
            </p>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button href={site.links.tenantPortal} variant="gold" size="lg">
            <Icon name="key" className="h-4 w-4" /> Access the Tenant Portal
          </Button>
        </div>
      </Section>
    </>
  );
}
