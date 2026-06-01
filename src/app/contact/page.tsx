import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, serviceAreas, isPreLaunch } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = pageMeta({
  title: "Contact TrueNorth Property Management | Hernando County, FL",
  description:
    "Talk to a local Hernando County property manager. Request a proposal, schedule an owner consultation, or ask a question. Serving Spring Hill, Brooksville, Weeki Wachee, and Hernando Beach.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-800 bg-compass">
        <div className="container-tn py-12 sm:py-16">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Contact</p>
            <h1 className="font-display text-display-lg font-semibold !text-white">
              Talk to a local property manager.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              Request a proposal, schedule an owner consultation, or just ask a question. We&apos;re
              local to Hernando County and happy to help.
            </p>
          </div>
        </div>
      </section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <Card className="shadow-card-hover">
              <h2 className="font-display text-xl font-medium text-navy-800">Send us a message</h2>
              <p className="mt-1 text-sm text-slate-500">We&apos;ll follow up as soon as possible.</p>
              <div className="mt-6">
                <LeadForm
                  formId="contact"
                  thankYouType="default"
                  topicOptions={[
                    "Request a management proposal",
                    "Schedule an owner consultation",
                    "Free rental analysis",
                    "Realtor referral partnership",
                    "Vendor application",
                    "Join the Founding Landlord List",
                    "I'm a current tenant",
                    "Something else",
                  ]}
                  showAddress
                  submitLabel="Send Message"
                />
              </div>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-6 lg:col-span-5">
            <Card>
              <h2 className="font-display text-lg font-medium text-navy-800">Get in touch</h2>
              <ul className="mt-4 space-y-4 text-[15px]">
                <li className="flex items-center gap-3">
                  <Icon name="phone" className="h-5 w-5 text-gold-600" />
                  <a href={site.phoneHref} className="text-navy-800 hover:text-gold-600">{site.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="chat" className="h-5 w-5 text-gold-600" />
                  <a href={site.emailHref} className="text-navy-800 hover:text-gold-600">{site.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="pin" className="h-5 w-5 text-gold-600" />
                  <span className="text-navy-800">{site.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="clock" className="h-5 w-5 text-gold-600" />
                  <span className="text-navy-800">{site.businessHours}</span>
                </li>
              </ul>
              <Button href={site.links.calendly} variant="gold" className="mt-6 w-full">
                <Icon name="calendar" className="h-4 w-4" /> Schedule an Owner Consultation
              </Button>
            </Card>

            {/* Service area map */}
            <Card className="overflow-hidden p-0">
              <iframe
                title="TrueNorth Property Management service area"
                src="https://www.google.com/maps?q=Brooksville,+FL&z=10&output=embed"
                className="aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-5">
                <p className="text-sm font-medium text-navy-800">Service area</p>
                <p className="mt-1 text-sm text-slate-600">{serviceAreas.join(" · ")} and surrounding Hernando County communities.</p>
              </div>
            </Card>

            {/* Emergency note */}
            <div className="rounded-2xl border border-gold-200 bg-gold-50 p-5">
              <p className="flex items-center gap-2 font-medium text-navy-800">
                <Icon name="bolt" className="h-4 w-4 text-gold-700" /> Current tenants
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Submit non-emergency maintenance through the{" "}
                <a href="/tenant-portal" className="text-navy-600 underline">tenant portal</a>. For a
                life-safety emergency, call 911 first. For urgent property emergencies, call{" "}
                <a href={site.phoneHref} className="text-navy-600 underline">{site.phone}</a>.
              </p>
            </div>

            {isPreLaunch && (
              <div className="rounded-2xl border border-navy-200 bg-white p-5 text-sm text-slate-600">
                <strong className="text-navy-800">Pre-launch note:</strong> Brokerage registration and
                service launch are pending. You can still reach out and join the Founding Landlord List —
                no services are provided until licensing is active.
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
