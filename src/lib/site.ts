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
export type LaunchStatus = "pre-launch" | "licensed";
export const launchStatus = "licensed" as LaunchStatus;

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

  // ── Founder ──────────────────────────────────────────────────────────────
  founder: {
    name: "Alfredo Mirt",
    title: "Founder",
    // Drop the headshot at public/founder.jpg — until then a clean "AM" monogram shows.
    photo: "/founder.jpg",
    bio: "Alfredo Mirt is the founder of TrueNorth Property Management and a local Hernando County real estate investor. He started TrueNorth to bring institutional-quality systems — transparent pricing, modern technology, and clear, proactive communication — to local residential landlords who've been underserved by traditional property managers. His approach is simple: treat every owner's property like an asset worth protecting, and give owners the visibility and responsiveness they deserve.",
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  phone: "(727) 815-5245",
  phoneHref: "tel:+17278155245",
  email: "alfredo@truenorthpm.co",
  emailHref: "mailto:alfredo@truenorthpm.co",
  address: "7629 Odessa Ct, Brooksville, FL 34613",
  // Structured address (used by LocalBusiness schema)
  addressParts: {
    street: "7629 Odessa Ct",
    city: "Brooksville",
    region: "FL",
    postalCode: "34613",
  },
  businessHours: "Mon–Fri 9:00am – 5:00pm ET",

  // ── External links (replace placeholders) ────────────────────────────────
  links: {
    ownerPortal: "https://app.rentredi.com/login", // RentRedi owner login
    tenantPortal: "https://tenant.rentredi.com/getStarted", // RentRedi tenant portal
    rentRediApplication: "https://tenant.rentredi.com/getStarted", // tenant apply / get started
    calendly: "https://calendly.com/alfredo-truenorthpm",

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

export type Lang2 = "en" | "es";

// ── Compliance copy blocks (bilingual; used by Footer + legal pages) ─────────
export const compliance = {
  preLaunchDisclosure: {
    en: "Brokerage registration and service launch pending. Website content is for informational and pre-launch purposes only. No property management, leasing, or brokerage services are provided until all required licensing and registrations are active.",
    es: "Registro de corretaje y lanzamiento de servicios pendientes. El contenido del sitio web es solo para fines informativos y de prelanzamiento. No se brindan servicios de administración de propiedades, arrendamiento ni corretaje hasta que todas las licencias y registros requeridos estén activos.",
  },
  licensedDisclosure: {
    en: `TrueNorth Property Management is operated by ${site.brokerageLegalName}, a Florida licensed real estate brokerage. License number: ${site.brokerageLicenseNumber}.`,
    es: `TrueNorth Property Management es operada por ${site.brokerageLegalName}, una correduría de bienes raíces con licencia en Florida. Número de licencia: ${site.brokerageLicenseNumber}.`,
  },
  licensedInterimDisclosure: {
    en: "TrueNorth Property Management provides property management and leasing services in accordance with applicable Florida real estate law. Full brokerage name and license number will be published here.",
    es: "TrueNorth Property Management brinda servicios de administración de propiedades y arrendamiento de acuerdo con la ley de bienes raíces aplicable de Florida. El nombre completo de la correduría y el número de licencia se publicarán aquí.",
  },
  fairHousing: {
    en: "TrueNorth Property Management supports equal housing opportunity and does not discriminate on the basis of race, color, national origin, religion, sex, familial status, disability, or any other protected class under applicable law.",
    es: "TrueNorth Property Management apoya la igualdad de oportunidad de vivienda y no discrimina por motivos de raza, color, origen nacional, religión, sexo, estado familiar, discapacidad ni ninguna otra clase protegida bajo la ley aplicable.",
  },
  servicesSubjectToAgreement: {
    en: "All property management, leasing, and brokerage services are subject to signed agreements and applicable Florida law.",
    es: "Todos los servicios de administración de propiedades, arrendamiento y corretaje están sujetos a acuerdos firmados y a la ley aplicable de Florida.",
  },
  noAdvice: {
    en: "Website content is for general informational purposes only and is not legal, tax, financial, or investment advice.",
    es: "El contenido del sitio web es solo para fines informativos generales y no constituye asesoramiento legal, fiscal, financiero ni de inversión.",
  },
  pricingDisclaimer: {
    en: "Pricing is subject to property type, location, condition, service scope, and signed management agreement.",
    es: "Los precios están sujetos al tipo de propiedad, ubicación, condición, alcance del servicio y acuerdo de administración firmado.",
  },
} as const;

/** True once the real brokerage legal name has been filled in (no placeholder brackets). */
export const isBrokerageNamed = !site.brokerageLegalName.includes("[");

/**
 * Returns the correct brokerage disclosure for the current state + language.
 */
export const activeBrokerageDisclosure = (lang: Lang2 = "en"): string => {
  if (isPreLaunch) return compliance.preLaunchDisclosure[lang];
  return isBrokerageNamed ? compliance.licensedDisclosure[lang] : compliance.licensedInterimDisclosure[lang];
};
