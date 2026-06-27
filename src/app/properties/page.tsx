import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { properties } from "@/lib/properties";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { PropertyList } from "@/components/sections/PropertyList";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMeta({
  title: "Available Rentals in Hernando County",
  description:
    "Browse rental homes managed by TrueNorth Property Management in Spring Hill, Brooksville, Weeki Wachee, and across Hernando County, FL. Filter by availability, view photos, beds, baths, and apply online.",
  path: "/properties",
});

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Rentals", path: "/properties" }]}
        eyebrow="Available rentals"
        title="Homes for rent in Hernando County."
        intro="Browse the rental homes we manage across Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, and surrounding communities. Toggle to see what's available now, apply online, or ask us a question."
        primary={{ label: "Apply / Tenant Portal", href: "/tenant-portal" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
      <Section tone="sand">
        <PropertyList properties={properties} lang="en" />
      </Section>
      <CtaBand
        title="Are you a landlord, not a renter?"
        subtitle="Get a free, market-informed rental analysis and see what your Hernando County property could earn."
      />
    </>
  );
}
