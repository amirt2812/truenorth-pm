/**
 * Navigation + route map. Header keeps a lean primary nav (per spec); deeper
 * pages are reachable via dropdowns and the footer to preserve a premium,
 * uncluttered top bar.
 */

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href?: string; children?: NavLink[] };

/**
 * Spanish labels keyed by the English label. The Header/Footer look up the
 * translated label here when rendering under /es. Hrefs are localized
 * separately via localizeHref(), so we only translate display text.
 */
export const navLabelEs: Record<string, string> = {
  // Primary nav
  "Property Management": "Administración de Propiedades",
  "Full-Service Management": "Administración Integral",
  "Investor Services": "Servicios para Inversionistas",
  "Owner Portal": "Portal del Propietario",
  "Tenant Portal": "Portal del Inquilino",
  "Hernando County": "Condado de Hernando",
  "Spring Hill": "Spring Hill",
  Brooksville: "Brooksville",
  "Weeki Wachee": "Weeki Wachee",
  "Hernando Beach": "Hernando Beach",
  Pricing: "Precios",
  Owners: "Propietarios",
  "For Owners": "Para Propietarios",
  "Free Rental Analysis": "Análisis de Renta Gratis",
  "Landlord ROI Calculator": "Calculadora de Rentabilidad",
  "Realtor Referral Partners": "Socios Agentes de Bienes Raíces",
  Tenants: "Inquilinos",
  "For Tenants": "Para Inquilinos",
  Resources: "Recursos",
  "Resources & Blog": "Recursos y Blog",
  FAQ: "Preguntas Frecuentes",
  About: "Nosotros",
  // Footer headings + links
  Services: "Servicios",
  "Owners & Tenants": "Propietarios e Inquilinos",
  "Service Areas": "Áreas de Servicio",
  "Company & Legal": "Empresa y Legal",
  Contact: "Contacto",
  "Legal Disclosures": "Avisos Legales",
  "Privacy Policy": "Política de Privacidad",
  "Terms of Use": "Términos de Uso",
  "SMS / Email Consent": "Consentimiento SMS / Email",
  "Fair Housing Statement": "Declaración de Vivienda Justa",
};

/** Translate a nav label for the given language (falls back to English). */
export function navLabel(label: string, lang: "en" | "es"): string {
  return lang === "es" ? navLabelEs[label] ?? label : label;
}

export const primaryNav: NavGroup[] = [
  {
    label: "Property Management",
    href: "/property-management",
    children: [
      { label: "Full-Service Management", href: "/property-management" },
      { label: "Investor Services", href: "/investor-services" },
      { label: "Owner Portal", href: "/owner-portal" },
      { label: "Tenant Portal", href: "/tenant-portal" },
      { label: "Hernando County", href: "/hernando-county-property-management" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Owners",
    href: "/owners",
    children: [
      { label: "For Owners", href: "/owners" },
      { label: "Free Rental Analysis", href: "/free-rental-analysis" },
      { label: "Landlord ROI Calculator", href: "/roi-calculator" },
      { label: "Realtor Referral Partners", href: "/realtor-referral-partners" },
    ],
  },
  {
    label: "Tenants",
    href: "/tenants",
    children: [
      { label: "For Tenants", href: "/tenants" },
      { label: "Tenant Portal", href: "/tenant-portal" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Resources & Blog", href: "/resources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Property Management", href: "/property-management" },
      { label: "Pricing", href: "/pricing" },
      { label: "Free Rental Analysis", href: "/free-rental-analysis" },
      { label: "Investor Services", href: "/investor-services" },
      { label: "Landlord ROI Calculator", href: "/roi-calculator" },
      { label: "Realtor Referral Partners", href: "/realtor-referral-partners" },
    ],
  },
  {
    heading: "Owners & Tenants",
    links: [
      { label: "For Owners", href: "/owners" },
      { label: "Owner Portal", href: "/owner-portal" },
      { label: "For Tenants", href: "/tenants" },
      { label: "Tenant Portal", href: "/tenant-portal" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Service Areas",
    links: [
      { label: "Hernando County", href: "/hernando-county-property-management" },
      { label: "Property Management", href: "/property-management" },
      { label: "Free Rental Analysis", href: "/free-rental-analysis" },
    ],
  },
  {
    heading: "Company & Legal",
    links: [
      { label: "About", href: "/about" },
      { label: "Resources & Blog", href: "/resources" },
      { label: "Legal Disclosures", href: "/legal-disclosures" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "SMS / Email Consent", href: "/sms-email-consent" },
      { label: "Fair Housing Statement", href: "/fair-housing" },
    ],
  },
];
