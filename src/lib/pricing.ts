/**
 * Pricing data — single source for the Pricing page and the homepage preview.
 * All figures use "Starting at" language and are PLACEHOLDERS until final
 * pricing is confirmed. See compliance.pricingDisclaimer in site.ts.
 */

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  featured?: boolean;
  cta: { label: string; href: string };
};

export const managementPlans: Plan[] = [
  {
    name: "Essential",
    price: "Starting at $99",
    cadence: "/month",
    blurb: "Core management for hands-off owners who want reliable rent collection and clear reporting.",
    features: [
      "Rent collection via RentRedi",
      "Online owner statements",
      "Maintenance request intake & triage",
      "Lease enforcement support",
      "Annual rent-strategy review",
    ],
    cta: { label: "Request a Proposal", href: "/contact?topic=proposal" },
  },
  {
    name: "Plus",
    price: "Starting at $149",
    cadence: "/month",
    blurb: "Our most popular plan — adds proactive inspections and faster maintenance coordination.",
    featured: true,
    features: [
      "Everything in Essential",
      "Periodic property inspections",
      "Priority maintenance coordination",
      "Owner approval thresholds you set",
      "Lease renewal management",
      "Monthly performance snapshot",
    ],
    cta: { label: "Request a Proposal", href: "/contact?topic=proposal" },
  },
  {
    name: "Premier",
    price: "Starting at $229",
    cadence: "/month",
    blurb: "Full-service, white-glove management for owners who want maximum visibility and advisory.",
    features: [
      "Everything in Plus",
      "Enhanced inspection cadence",
      "Rental performance advisory",
      "Capex & renewal planning support",
      "Dedicated point of contact",
      "End-of-year owner reporting support",
    ],
    cta: { label: "Request a Proposal", href: "/contact?topic=proposal" },
  },
];

export const aLaCartePlans: Plan[] = [
  {
    name: "Leasing Only",
    price: "Starting at 75%",
    cadence: "of first month's rent",
    blurb: "Tenant placement for self-managing owners. Minimum fee to be confirmed.",
    features: [
      "Market-informed rent positioning",
      "Listing & marketing",
      "Tenant screening",
      "Showings coordination",
      "Lease preparation & execution",
    ],
    cta: { label: "Talk to a Local Property Manager", href: "/contact?topic=leasing" },
  },
  {
    name: "Renewal Only",
    price: "Starting at $299",
    cadence: "per renewal",
    blurb: "Negotiation and paperwork for owners who self-manage but want renewals handled right.",
    features: [
      "Market-informed renewal pricing",
      "Tenant communication",
      "Renewal documentation",
      "Lease compliance review",
    ],
    cta: { label: "Talk to a Local Property Manager", href: "/contact?topic=renewal" },
  },
  {
    name: "Build Your Own",
    price: "Custom",
    cadence: "à la carte",
    blurb: "Mix services to fit your portfolio. Custom portfolio pricing available.",
    features: [
      "Choose the services you need",
      "Portfolio & multi-property pricing",
      "Inspection packages",
      "Advisory add-ons",
    ],
    cta: { label: "Request a Management Proposal", href: "/contact?topic=custom" },
  },
];
