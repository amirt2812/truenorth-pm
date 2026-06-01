/**
 * ============================================================================
 *  TrueNorth Property Management — CENTRAL SITE CONFIG
 * ============================================================================
 *  This is the single source of truth for every placeholder on the website.
 *  Search this file for `INSERT` to find everything you must replace before
 *  launch. Editing values here updates them site-wide (header, footer, schema,
 *  SEO metadata, contact blocks, legal pages).
 *
 *  ⚠️  COMPLIANCE: Read `launchStatus` below. It flips the entire site between
 *      pre-license messaging (Version A) and licensed messaging (Version B).
 * ============================================================================
 */

/**
 * "pre-launch"  → Version A language everywhere. Alert banner shown. No claims
 *                 of active brokerage. Safe default until registration is live.
 * "licensed"    → Version B language. Requires a confirmed, active Florida
 *                 brokerage registration. Only switch this AFTER the user
 *                 confirms licensing is active (per compliance instruction #1).
 */
export const launchStatus: "pre-launch" | "licensed" = "pre-launch";

export const isPreLaunch = launchStatus === "pre-launch";

export const site = {
  brand: "TrueNorth Property Management",
  shortName: "TrueNorth",
  tagline: "Property Management With Direction.",
  domain: "truenorthpm.co",
  url: "https://truenorthpm.co",
  positioning:
    "TrueNorth Property Management helps Hernando County landlords lease, manage, maintain, and optimize rental properties with transparent pricing, clear communication, modern technology, and local accountability.",
  description:
    "Premium, transparent, technology-forward property management for Hernando County, FL landlords. Transparent pricing, local accountability, and a RentRedi-powered owner & tenant experience.",

  // ── Legal entities ───────────────────────────────────────────────────────
  holdingCompany: "MAGNA CAPITAL LLC",
  // The legal brokerage name is intentionally a placeholder (name conflict noted).
  brokerageLegalName: "[Licensed Brokerage LLC Name]",
  brokerageLicenseNumber: "[INSERT Florida Brokerage License Number]",
  softwarePlatform: "RentRedi",

  // ── Contact placeholders (replace before launch) ─────────────────────────
  phone: "[INSERT Business Phone]",
  phoneHref: "tel:+10000000000", // INSERT real E.164 phone, e.g. tel:+13525550123
  email: "[INSERT Business Email]", // Outlook domain mailbox, e.g. hello@truenorthpm.co
  emailHref: "mailto:[INSERT Business Email]",
  address: "[INSERT Business Address or Mailing Address]",
  businessHours: "Mon–Fri 9:00am – 5:00pm ET",

  // ── External links (replace placeholders) ────────────────────────────────
  links: {
    ownerPortal: "https://app.rentredi.com/login", // RentRedi owner login
    tenantPortal: "https://app.rentredi.com/login", // RentRedi tenant login
    rentRediApplication: "[INSERT RentRedi Application Link]",
    calendly: "[INSERT Calendly Link]",
    googleBusinessProfile: "[INSERT Google Business Profile Link]",
  },

  // ── Analytics / tag placeholders (wire in layout.tsx) ────────────────────
  analytics: {
    gtmId: "GTM-XXXXXXX", // INSERT Google Tag Manager container ID
    ga4Id: "G-XXXXXXXXXX", // INSERT GA4 measurement ID
    facebookPixelId: "INSERT_PIXEL_ID",
    callTracking: "INSERT_CALL_TRACKING_SNIPPET",
  },

  social: {
    // Add real profile URLs when available; left empty so nothing fake renders.
    facebook: "",
    instagram: "",
    linkedin: "",
  },
} as const;

// ── Service areas (used in footer, schema areaServed, local pages) ──────────
export const serviceAreas = [
  "Spring Hill",
  "Brooksville",
  "Weeki Wachee",
  "Hernando Beach",
  "Timber Pines",
] as const;

export const serviceAreaSentence =
  "Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, Timber Pines, and surrounding Hernando County communities.";

// ── Compliance copy blocks (used by Footer + legal pages) ───────────────────
export const compliance = {
  // Version A — pre-license / pre-launch
  preLaunchDisclosure:
    "Brokerage registration and service launch pending. Website content is for informational and pre-launch purposes only. No property management, leasing, or brokerage services are provided until all required licensing and registrations are active.",
  // Version B — post-license
  licensedDisclosure: `TrueNorth Property Management is operated by ${site.brokerageLegalName}, a Florida licensed real estate brokerage. License number: ${site.brokerageLicenseNumber}.`,

  fairHousing:
    "TrueNorth Property Management supports equal housing opportunity and does not discriminate on the basis of race, color, national origin, religion, sex, familial status, disability, or any other protected class under applicable law.",

  servicesSubjectToAgreement:
    "All property management, leasing, and brokerage services are subject to signed agreements and applicable Florida law.",

  noAdvice:
    "Website content is for general informational purposes only and is not legal, tax, financial, or investment advice.",

  pricingDisclaimer:
    "Pricing is subject to property type, location, condition, service scope, and signed management agreement.",
} as const;

/** Returns the correct brokerage disclosure string for the current launch status. */
export const activeBrokerageDisclosure = (): string =>
  isPreLaunch ? compliance.preLaunchDisclosure : compliance.licensedDisclosure;
