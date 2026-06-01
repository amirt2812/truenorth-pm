import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = pageMeta({
  title: "For Tenants | TrueNorth Property Management Residents",
  description:
    "Resident resources from TrueNorth Property Management: how to apply, pay rent, submit maintenance, move-in/move-out checklists, renter's insurance, and emergency maintenance.",
  path: "/tenants",
});

const steps = [
  { icon: "doc", title: "How to apply", body: "Apply online through our RentRedi application. We apply consistent, fair-housing-compliant criteria to every applicant." },
  { icon: "dollar", title: "Pay rent", body: "Pay rent online through the RentRedi tenant portal, with automated reminders so nothing slips." },
  { icon: "wrench", title: "Submit maintenance", body: "Submit non-emergency maintenance requests with photos through the tenant portal for fast, documented service." },
  { icon: "doc", title: "Access documents", body: "Find your lease and key documents in your tenant portal." },
];

const tenantFaqs = [
  { q: "How do I pay rent?", a: `Rent is paid online through the ${site.softwarePlatform} tenant portal. You can set up reminders and track your payment history.` },
  { q: "How do I submit a maintenance request?", a: "Submit non-emergency requests with photos through the tenant portal. For life-safety emergencies, call 911 first; for urgent property emergencies, call us." },
  { q: "What are your screening criteria?", a: "We apply consistent, fair-housing-compliant criteria to every applicant. [INSERT specific, attorney-reviewed screening criteria here once confirmed.]" },
  { q: "Do I need renter's insurance?", a: "Renter's insurance is strongly recommended (and may be required by your lease) to protect your belongings. [INSERT specific lease requirement.]" },
  { q: "What's your pet policy?", a: "[INSERT pet policy.] Assistance animals and service animals are accommodated in accordance with applicable fair housing law; documentation requirements follow the law." },
];

export default function TenantsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Tenants", path: "/tenants" }]}
        eyebrow="For tenants"
        title="A clear, responsive rental experience."
        intro="We aim to provide residents with a clear, responsive rental experience. Pay rent, submit maintenance requests, and access key information through the tenant portal."
        primary={{ label: "Tenant Portal", href: site.links.tenantPortal }}
        secondary={{ label: "Apply Online", href: site.links.rentRediApplication }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Resident basics" title="Everything you need, in one place." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.title} hover className="h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                <Icon name={s.icon as never} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium text-navy-800">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Checklists */}
      <Section tone="sand">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="font-display text-xl font-medium text-navy-800">Move-in checklist</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-slate-700">
              {["Complete the move-in condition documentation", "Set up rent payments in the portal", "Confirm utilities are in your name", "Obtain renter's insurance", "Save the maintenance request link and emergency contacts"].map((i) => (
                <li key={i} className="flex items-start gap-2.5"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />{i}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-display text-xl font-medium text-navy-800">Move-out checklist</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-slate-700">
              {["Provide proper written notice per your lease", "Clean the property thoroughly", "Remove all belongings and trash", "Return all keys, remotes, and access devices", "Provide a forwarding address"].map((i) => (
                <li key={i} className="flex items-start gap-2.5"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />{i}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Emergency */}
      <Section tone="navy">
        <div className="grid items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading light align="left" eyebrow="Emergency maintenance" title="When it's urgent." intro="For any life-safety emergency, call 911 first. For urgent property emergencies (active leak, no heat/AC in extreme weather, electrical hazard), call us right away — don't wait on a portal request." />
          </div>
          <div className="lg:text-right">
            <Button href={site.phoneHref} variant="gold" size="lg"><Icon name="phone" className="h-4 w-4" /> {site.phone}</Button>
          </div>
        </div>
      </Section>

      <FaqSection items={tenantFaqs} tone="white" title="Tenant questions" />

      <Section tone="sand">
        <div className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-white p-6 text-center text-sm text-slate-600">
          <strong className="text-navy-800">Equal Housing Opportunity.</strong> {compliance.fairHousing}
        </div>
      </Section>
    </>
  );
}
