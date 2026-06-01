/**
 * Blog content for /resources and /resources/[slug]. Posts are authored as
 * structured blocks (no MDX runtime needed). Categories drive the hub filters.
 * Copy is compliance-safe: no guarantees, no legal/tax/investment advice.
 */

export type Block =
  | { t: "h2"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  body: Block[];
};

export const categories = [
  "Hernando County rental market",
  "Landlord tips",
  "Florida rental basics",
  "Maintenance",
  "Tenant screening",
  "Property management fees",
  "Investor strategy",
  "Hurricane preparedness",
] as const;
export type Category = (typeof categories)[number];

const cta: Block = {
  t: "note",
  text: "Want a market-informed rental estimate for your property? Request a Free Rental Analysis — no obligation.",
};

export const posts: Post[] = [
  {
    slug: "how-much-does-property-management-cost-in-hernando-county",
    title: "How Much Does Property Management Cost in Hernando County?",
    category: "Property management fees",
    excerpt:
      "A plain-English breakdown of typical property management fees in Hernando County — monthly management, leasing, renewal, and the fees to watch out for.",
    date: "2026-01-15",
    readingMinutes: 6,
    body: [
      { t: "p", text: "Property management pricing should be easy to understand. In Hernando County, most residential management is built from a few core fees. Here's how they typically work and what to look for." },
      { t: "h2", text: "The core fees" },
      { t: "ul", items: [
        "Monthly management fee — a flat fee or percentage for ongoing management. TrueNorth's plans start at $99/month.",
        "Leasing / tenant placement fee — charged when a new tenant is placed, often a percentage of the first month's rent.",
        "Renewal fee — a smaller fee to negotiate and document a lease renewal.",
        "Inspection fees — depending on cadence and plan.",
      ]},
      { t: "h2", text: "Fees owners should question" },
      { t: "p", text: "The fees that frustrate owners are usually the unclear ones: maintenance markups, vague 'admin' charges, and confusing cancellation terms. A transparent manager spells these out before you sign." },
      { t: "h2", text: "What drives your specific price" },
      { t: "ul", items: ["Property type and size", "Location and condition", "Scope of services you choose", "Whether you bundle full-service or go à la carte"] },
      { t: "note", text: "Pricing is subject to property type, location, condition, service scope, and a signed management agreement." },
      cta,
    ],
  },
  {
    slug: "self-manage-or-hire-a-property-manager",
    title: "Should You Self-Manage or Hire a Property Manager?",
    category: "Landlord tips",
    excerpt: "A practical framework for deciding whether to manage your own rental or hire a pro — based on time, distance, and risk tolerance.",
    date: "2026-01-22",
    readingMinutes: 7,
    body: [
      { t: "p", text: "Self-managing can work well — until it doesn't. The right answer depends on your time, your distance from the property, and how you handle the parts most owners dislike." },
      { t: "h2", text: "Self-managing may fit if…" },
      { t: "ul", items: ["You live near the property", "You have time for tenant calls and coordination", "You're comfortable with screening, leases, and Florida requirements", "You have reliable vendors on call"] },
      { t: "h2", text: "A manager usually makes sense if…" },
      { t: "ul", items: ["You're out of the area or out of state", "Vacancy or turnover is costing you", "You're not confident in your screening process", "Maintenance coordination is eating your evenings"] },
      { t: "h2", text: "The real cost of self-managing" },
      { t: "p", text: "Self-management isn't free — it costs time, and mistakes (a bad tenant, a slow turn, an undocumented repair) can cost far more than a management fee. Weigh both." },
      cta,
    ],
  },
  {
    slug: "spring-hill-rental-property-owner-checklist",
    title: "Spring Hill Rental Property Owner Checklist",
    category: "Hernando County rental market",
    excerpt: "A start-to-finish checklist for Spring Hill landlords — from pricing and rent-readiness to screening and ongoing management.",
    date: "2026-02-03",
    readingMinutes: 5,
    body: [
      { t: "p", text: "Owning a rental in Spring Hill is an opportunity, but the details matter. Use this checklist to keep your property leased and protected." },
      { t: "h2", text: "Before you list" },
      { t: "ul", items: ["Price to the neighborhood, not a countywide average", "Complete rent-ready repairs and cleaning", "Confirm HOA rules that affect tenants", "Gather lease, disclosures, and documentation"] },
      { t: "h2", text: "While leasing" },
      { t: "ul", items: ["Professional photos and listing", "Consistent, fair-housing-compliant screening", "Clear lease terms", "Documented move-in condition"] },
      { t: "h2", text: "Ongoing" },
      { t: "ul", items: ["Online rent collection", "Documented maintenance with approval thresholds", "Periodic inspections", "Clear monthly reporting"] },
      cta,
    ],
  },
  {
    slug: "prepare-your-hernando-county-rental-for-a-new-tenant",
    title: "How to Prepare Your Hernando County Rental for a New Tenant",
    category: "Maintenance",
    excerpt: "A rent-ready turn done right reduces vacancy and sets the tone with a new tenant. Here's what to cover.",
    date: "2026-02-12",
    readingMinutes: 5,
    body: [
      { t: "p", text: "The turn between tenants is your chance to protect the property and lease quickly. A thorough, documented rent-ready process pays off." },
      { t: "h2", text: "Clean and inspect" },
      { t: "ul", items: ["Deep clean, including appliances and floors", "Inspect HVAC, plumbing, and electrical", "Replace air filters and test smoke/CO detectors", "Re-key or update locks"] },
      { t: "h2", text: "Repair and document" },
      { t: "ul", items: ["Handle deferred maintenance before it grows", "Photograph the move-in condition thoroughly", "Confirm safety items meet requirements"] },
      { t: "h2", text: "Curb appeal and speed" },
      { t: "p", text: "Small exterior touches help a property show well, and a fast, organized turn cuts vacancy days — one of the biggest hidden costs for owners." },
      cta,
    ],
  },
  {
    slug: "out-of-state-landlords-managing-florida-property",
    title: "What Out-of-State Landlords Should Know About Managing Property in Florida",
    category: "Florida rental basics",
    excerpt: "Managing a Florida rental from afar is very doable — with the right systems, local eyes, and clear reporting.",
    date: "2026-02-20",
    readingMinutes: 6,
    body: [
      { t: "p", text: "Out-of-state ownership works well when you have local accountability and visibility. Here's what to plan for in Florida specifically." },
      { t: "h2", text: "Local presence matters" },
      { t: "p", text: "Someone needs to physically respond to maintenance, inspections, and weather events. A local manager provides that without you flying in." },
      { t: "h2", text: "Florida-specific considerations" },
      { t: "ul", items: ["Hurricane and storm readiness", "Humidity and HVAC maintenance", "Security deposit handling under Florida law", "Insurance considerations for absentee owners"] },
      { t: "h2", text: "Visibility from anywhere" },
      { t: "p", text: "An online owner portal and clear monthly statements let you stay informed from another state or time zone." },
      { t: "note", text: "This article is general information, not legal, tax, or insurance advice. Consult licensed professionals for your situation." },
      cta,
    ],
  },
  {
    slug: "property-management-fees-explained",
    title: "Property Management Fees Explained: What Owners Should Look For",
    category: "Property management fees",
    excerpt: "Not all fee structures are equal. Learn how to compare managers on transparency, not just headline price.",
    date: "2026-03-02",
    readingMinutes: 6,
    body: [
      { t: "p", text: "The lowest headline fee isn't always the best deal. What matters is total transparency — knowing exactly what you'll pay and when." },
      { t: "h2", text: "Questions to ask about fees" },
      { t: "ul", items: ["Is the management fee flat or a percentage?", "What's the leasing fee, and when is it charged?", "Are maintenance costs marked up?", "Are there setup, admin, or cancellation fees?", "How are vendor invoices documented?"] },
      { t: "h2", text: "Transparency over gimmicks" },
      { t: "p", text: "A clear, published fee structure usually beats a 'low' fee padded with surprise charges. Read the agreement, not just the brochure." },
      cta,
    ],
  },
  {
    slug: "reduce-vacancy-in-a-hernando-county-rental",
    title: "How to Reduce Vacancy in a Hernando County Rental Home",
    category: "Landlord tips",
    excerpt: "Vacancy is one of the biggest hidden costs of owning a rental. Here are the levers that actually move it.",
    date: "2026-03-10",
    readingMinutes: 5,
    body: [
      { t: "p", text: "Every vacant week is lost income. The good news: most vacancy is controllable with pricing, presentation, and speed." },
      { t: "h2", text: "Price to the market" },
      { t: "p", text: "Overpricing is the number-one cause of long vacancies. Market-informed pricing based on local comparables leases faster and often nets more over the year." },
      { t: "h2", text: "Show it well, turn it fast" },
      { t: "ul", items: ["Professional photos and a complete listing", "A quick, organized rent-ready turn", "Responsive showings and application handling", "Proactive renewals to avoid turnover entirely"] },
      cta,
    ],
  },
  {
    slug: "rental-property-hurricane-preparedness-checklist-florida",
    title: "Rental Property Hurricane Preparedness Checklist for Florida Landlords",
    category: "Hurricane preparedness",
    excerpt: "A practical, season-ready checklist to protect your Florida rental and your tenants before, during, and after a storm.",
    date: "2026-03-18",
    readingMinutes: 6,
    body: [
      { t: "p", text: "Florida landlords can't control the weather, but they can be ready. A documented plan protects your property and your tenants." },
      { t: "h2", text: "Before the season" },
      { t: "ul", items: ["Review insurance coverage with your agent", "Inspect roof, gutters, and drainage", "Trim trees and secure outdoor items", "Confirm tenant emergency contact info"] },
      { t: "h2", text: "When a storm threatens" },
      { t: "ul", items: ["Communicate clearly with tenants", "Document the property's pre-storm condition", "Prioritize emergency triage for safety issues"] },
      { t: "h2", text: "After the storm" },
      { t: "ul", items: ["Inspect and document damage with photos", "Coordinate emergency repairs", "Keep owners updated"] },
      { t: "note", text: "Insurance and legal questions should be directed to licensed professionals. This is general information only." },
      cta,
    ],
  },
  {
    slug: "what-makes-a-rental-property-rent-ready",
    title: "What Makes a Rental Property Rent-Ready?",
    category: "Maintenance",
    excerpt: "\"Rent-ready\" means more than clean. Here's the standard that helps a property lease quickly and hold value.",
    date: "2026-03-26",
    readingMinutes: 4,
    body: [
      { t: "p", text: "Rent-ready is a standard, not a feeling. Meeting it consistently reduces vacancy and sets expectations with tenants." },
      { t: "h2", text: "The rent-ready standard" },
      { t: "ul", items: ["Professionally clean throughout", "All systems functional (HVAC, plumbing, electrical)", "Safety items in place and tested", "No outstanding deferred maintenance", "Documented move-in condition"] },
      { t: "p", text: "A property that meets this standard shows better, attracts stronger applicants, and protects you in any future deposit discussion." },
      cta,
    ],
  },
  {
    slug: "questions-to-ask-before-hiring-a-property-manager",
    title: "Questions to Ask Before Hiring a Property Manager",
    category: "Landlord tips",
    excerpt: "Interviewing managers? These questions cut through the sales pitch to what actually matters for your property.",
    date: "2026-04-04",
    readingMinutes: 5,
    body: [
      { t: "p", text: "A good property manager should welcome hard questions. Use these to compare managers on substance." },
      { t: "h2", text: "Pricing & transparency" },
      { t: "ul", items: ["What exactly do your fees cover?", "Are maintenance costs marked up?", "What are the cancellation terms?"] },
      { t: "h2", text: "Operations" },
      { t: "ul", items: ["How do you screen tenants?", "Can I set maintenance approval thresholds?", "How and when will I hear from you?", "What software do you use, and what will I see?"] },
      { t: "h2", text: "Local & compliance" },
      { t: "ul", items: ["How well do you know my market?", "How do you handle Florida-specific requirements?", "Are you operating under an active Florida brokerage?"] },
      cta,
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
