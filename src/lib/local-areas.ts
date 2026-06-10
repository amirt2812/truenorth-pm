/**
 * Per-area content for the 5 local SEO landing pages. Each area has unique
 * intro copy, pain points, "why local" angle, and FAQs so pages are distinct
 * for search (no duplicate content). Rendered by the shared LocalAreaPage.
 */

export type Area = {
  slug: string;
  city: string; // e.g. "Spring Hill"
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  painPoints: string[];
  whyLocal: string;
  highlights: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const areas: Record<string, Area> = {
  "hernando-county-property-management": {
    slug: "hernando-county-property-management",
    city: "Hernando County",
    metaTitle: "Hernando County Property Management | TrueNorth",
    metaDescription:
      "Local, transparent property management across Hernando County, FL — Spring Hill, Brooksville, Weeki Wachee, and Hernando Beach. Free rental analysis and clear pricing.",
    h1: "Property Management Across Hernando County",
    intro: [
      "Hernando County's rental market spans fast-growing Spring Hill subdivisions, established Brooksville neighborhoods, coastal Hernando Beach and Weeki Wachee homes, and 55+ communities like Timber Pines. Each submarket rents differently — and a one-size-fits-all manager rarely gets pricing or tenant fit right.",
      "TrueNorth Property Management brings institutional-quality systems to local residential landlords, with transparent pricing, a RentRedi-powered owner and tenant experience, and the kind of responsiveness that keeps good tenants and protects your asset.",
    ],
    painPoints: [
      "Managers who price every home off countywide averages",
      "Slow communication from regional offices outside the area",
      "Vague maintenance invoices with no documentation",
      "Owner statements that are hard to read",
      "No clear approval thresholds before repairs",
    ],
    whyLocal:
      "Hernando County is not one market — it's many. Pricing a Spring Hill 3/2 like a Hernando Beach canal home leaves money on the table or causes long vacancies. Local management means market-informed pricing, faster eyes on your property, and tenant screening tuned to the area.",
    highlights: [
      { title: "Countywide coverage", body: "Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, Timber Pines, and surrounding communities." },
      { title: "Market-informed pricing", body: "Rent positioning based on local comparables, submarket by submarket." },
      { title: "Hurricane-aware operations", body: "Florida-specific readiness so owners aren't scrambling when weather threatens." },
    ],
    faqs: [
      { q: "What parts of Hernando County do you serve?", a: "We serve Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, Timber Pines, and surrounding communities across the county." },
      { q: "Do you price every property the same?", a: "No. We position rent based on local comparables for each submarket rather than a countywide average." },
      { q: "Can you manage a property if I live out of state?", a: "Yes. Our RentRedi owner portal and clear monthly reporting are built so out-of-area owners stay fully informed." },
    ],
  },
};

export const areaSlugs = Object.keys(areas);
