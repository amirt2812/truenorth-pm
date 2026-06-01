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

  "spring-hill-property-management": {
    slug: "spring-hill-property-management",
    city: "Spring Hill",
    metaTitle: "Property Management Spring Hill FL | TrueNorth Property Manager",
    metaDescription:
      "Spring Hill, FL property management and tenant placement. Transparent pricing, RentRedi-powered owner portal, fast communication. Get a free rental analysis.",
    h1: "Spring Hill, FL Property Management",
    intro: [
      "Spring Hill is the heart of Hernando County's rental demand — a large, growing community of single-family homes and townhomes that attract families, commuters toward Tampa, and relocating renters. That demand is an opportunity, but only with the right pricing, screening, and turnaround.",
      "TrueNorth helps Spring Hill landlords lease faster, screen consistently, and keep maintenance documented — with pricing you can read and communication that doesn't leave you guessing.",
    ],
    painPoints: [
      "Long vacancies from rent priced above the neighborhood",
      "Inconsistent tenant screening across applicants",
      "Slow maintenance turnarounds between tenants",
      "Surprise fees buried in owner statements",
      "Hard-to-reach property managers",
    ],
    whyLocal:
      "Spring Hill rents vary block to block — proximity to schools, US-19, and newer construction all move the number. We price to the neighborhood, market professionally, and turn units efficiently to cut vacancy days.",
    highlights: [
      { title: "Single-family & townhome focus", body: "The rental types Spring Hill owners actually have." },
      { title: "Faster turns", body: "Coordinated rent-ready work to reduce vacancy between tenants." },
      { title: "Tampa-commuter demand", body: "Marketing that reaches the renters moving into the area." },
    ],
    faqs: [
      { q: "How fast can you lease my Spring Hill rental?", a: "Timelines depend on price, condition, and season, but market-informed pricing and professional marketing are the biggest levers for reducing vacancy. We focus on both." },
      { q: "Do you manage townhomes and homes with HOAs in Spring Hill?", a: "Yes. We manage single-family homes and townhomes, including properties governed by HOAs." },
      { q: "What does management cost in Spring Hill?", a: "Full-service plans start at $99/month; final pricing depends on the property and a signed management agreement. See our Pricing page for details." },
    ],
  },

  "brooksville-property-management": {
    slug: "brooksville-property-management",
    city: "Brooksville",
    metaTitle: "Brooksville Property Management | TrueNorth Property Manager FL",
    metaDescription:
      "Brooksville, FL property management for single-family rentals and small portfolios. Local accountability, transparent pricing, and modern owner reporting.",
    h1: "Brooksville, FL Property Management",
    intro: [
      "Brooksville blends historic neighborhoods, larger lots, and a mix of older and newer homes — a rental market that rewards managers who actually know the area. Condition, lot type, and location relative to downtown all shape what a home should rent for.",
      "TrueNorth manages Brooksville rentals with documented maintenance, consistent screening, and clear monthly reporting, so owners get both peace of mind and a property that's cared for.",
    ],
    painPoints: [
      "Older homes that need a manager who documents maintenance well",
      "Rent estimates that ignore Brooksville's variety of housing stock",
      "Deferred maintenance turning into expensive repairs",
      "Poor visibility into what's happening at the property",
      "Generic management from outside the area",
    ],
    whyLocal:
      "Brooksville's housing stock is varied — a manager who treats every home the same misprices rentals and misses maintenance issues. Local, documented management protects older properties and keeps owners informed.",
    highlights: [
      { title: "Varied housing stock", body: "Experience with older homes, larger lots, and newer builds alike." },
      { title: "Documented maintenance", body: "Photos and invoices so deferred issues don't become expensive surprises." },
      { title: "Clear monthly reporting", body: "Owner statements you can actually read." },
    ],
    faqs: [
      { q: "Do you manage older homes in Brooksville?", a: "Yes. Older homes often need more attentive, well-documented maintenance — which is exactly how we operate, with photos and invoices for every job." },
      { q: "How do I know what's happening at my property?", a: "You get an always-on RentRedi owner portal plus clear monthly statements and a performance snapshot." },
      { q: "Do you serve rural areas around Brooksville?", a: "We serve Brooksville and surrounding Hernando County communities. Reach out with your address and we'll confirm." },
    ],
  },

  "weeki-wachee-property-management": {
    slug: "weeki-wachee-property-management",
    city: "Weeki Wachee",
    metaTitle: "Weeki Wachee Property Management | TrueNorth Property Manager FL",
    metaDescription:
      "Weeki Wachee, FL property management for residential and near-coastal rentals. Transparent pricing, hurricane-aware operations, and a modern owner experience.",
    h1: "Weeki Wachee, FL Property Management",
    intro: [
      "Weeki Wachee's appeal — the spring, the river, and easy coastal access — shapes its rental market. Homes here range from residential subdivisions to properties that benefit from proximity to the water, and seasonal demand can influence pricing.",
      "TrueNorth manages Weeki Wachee rentals with market-informed pricing, responsive tenant service, and Florida-specific readiness, so your property stays leased and protected.",
    ],
    painPoints: [
      "Pricing that ignores near-coastal and seasonal demand",
      "Storm season readiness gaps",
      "Slow response to tenant and weather issues",
      "Limited local market knowledge from outside managers",
      "Unclear fees and reporting",
    ],
    whyLocal:
      "Weeki Wachee's near-coastal location means weather readiness and seasonal demand both matter. Local management prices appropriately and has a plan in place before storms — not after.",
    highlights: [
      { title: "Near-coastal awareness", body: "Pricing and care that account for the area's location and demand." },
      { title: "Hurricane-aware operations", body: "A readiness process so owners aren't scrambling when weather threatens." },
      { title: "Responsive service", body: "Prompt, documented communication with tenants and owners." },
    ],
    faqs: [
      { q: "How do you handle hurricane season for Weeki Wachee rentals?", a: "We follow a readiness process and triage emergencies first. Emergency repairs that protect health, safety, or the property may proceed before approval and are then documented." },
      { q: "Do you manage near-coastal properties?", a: "Yes. We manage residential rentals in and around Weeki Wachee and factor location into pricing and care." },
      { q: "Is pricing different for seasonal demand?", a: "We position rent using local comparables, which can reflect seasonal demand. Every property gets a market-informed estimate." },
    ],
  },

  "hernando-beach-property-management": {
    slug: "hernando-beach-property-management",
    city: "Hernando Beach",
    metaTitle: "Hernando Beach Property Management | TrueNorth Property Manager FL",
    metaDescription:
      "Hernando Beach, FL property management for canal-front and coastal homes. Market-informed pricing, hurricane-aware operations, and transparent reporting.",
    h1: "Hernando Beach, FL Property Management",
    intro: [
      "Hernando Beach is a distinct coastal market — canal-front homes, water access, and higher-value properties that demand a careful, documented management approach. Pricing and tenant fit here look nothing like inland Hernando County.",
      "TrueNorth manages Hernando Beach rentals with market-informed pricing, attentive maintenance documentation, and Florida-specific storm readiness designed to protect coastal assets.",
    ],
    painPoints: [
      "Coastal homes mispriced against inland comparables",
      "Insufficient storm and flood readiness",
      "Higher-value assets managed without enough documentation",
      "Maintenance issues that escalate near the water",
      "Owners left without clear visibility",
    ],
    whyLocal:
      "Hernando Beach is a higher-value coastal submarket where pricing, tenant screening, and storm readiness all carry more weight. Local management with documented maintenance protects the asset and prices it correctly.",
    highlights: [
      { title: "Coastal & canal-front homes", body: "Pricing and care tuned to Hernando Beach's distinct market." },
      { title: "Storm-season readiness", body: "Florida-specific operations to protect higher-value coastal assets." },
      { title: "Attentive documentation", body: "Thorough inspections and maintenance records for premium properties." },
    ],
    faqs: [
      { q: "Do you manage canal-front and coastal homes in Hernando Beach?", a: "Yes. We price and care for Hernando Beach's coastal and canal-front homes based on that distinct submarket, not inland averages." },
      { q: "How do you protect coastal properties during storms?", a: "We follow a Florida-specific readiness process and prioritize emergency triage. Documentation follows every action." },
      { q: "Is management more expensive for higher-value coastal homes?", a: "Pricing depends on property type, location, condition, and scope. We'll provide a clear proposal for your specific Hernando Beach property." },
    ],
  },
};

export const areaSlugs = Object.keys(areas);
