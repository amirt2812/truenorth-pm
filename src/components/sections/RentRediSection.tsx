import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

const capabilities: { icon: Parameters<typeof Icon>[0]["name"]; title: string; body: string }[] = [
  { icon: "dollar", title: "Online rent payments", body: "Tenants pay rent online through the RentRedi tenant portal, with automated reminders." },
  { icon: "key", title: "Tenant portal", body: "Residents access their lease, payments, and key information in one place." },
  { icon: "wrench", title: "Maintenance requests", body: "Tenants submit maintenance requests with photos so issues are documented from the start." },
  { icon: "eye", title: "Owner visibility", body: "Owners can review statements, payments, and activity through the owner portal." },
  { icon: "chat", title: "Centralized communication", body: "Conversations and records stay organized instead of scattered across texts and email." },
];

export function RentRediSection() {
  return (
    <Section tone="navy">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            light
            align="left"
            eyebrow="Technology-forward operations"
            title={<>Powered by {site.softwarePlatform}</>}
            intro="We run on RentRedi so owners and tenants get a modern, organized experience — not a patchwork of spreadsheets, texts, and paper. We use RentRedi's capabilities as designed and don't overstate what software can do."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.links.ownerPortal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-900 hover:bg-gold-400"
            >
              <Icon name="eye" className="h-4 w-4" /> Owner Portal
            </a>
            <a
              href={site.links.tenantPortal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/20 hover:bg-white/15"
            >
              <Icon name="key" className="h-4 w-4" /> Tenant Portal
            </a>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((c) => (
            <li key={c.title} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
              <Icon name={c.icon} className="h-6 w-6 text-gold-400" />
              <h3 className="mt-3 font-display text-lg !text-white">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-navy-200">{c.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
