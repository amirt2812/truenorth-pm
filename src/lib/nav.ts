/**
 * Navigation + route map. Header keeps a lean primary nav (per spec); deeper
 * pages are reachable via dropdowns and the footer to preserve a premium,
 * uncluttered top bar.
 */

export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; href?: string; children?: NavLink[] };

export const primaryNav: NavGroup[] = [
  {
    label: "Property Management",
    href: "/property-management",
    children: [
      { label: "Full-Service Management", href: "/property-management" },
      { label: "Investor Services", href: "/investor-services" },
      { label: "Owner Portal", href: "/owner-portal" },
      { label: "Tenant Portal", href: "/tenant-portal" },
      // Service areas consolidated here from the former standalone "Areas" menu
      { label: "Hernando County", href: "/hernando-county-property-management" },
      { label: "Spring Hill", href: "/spring-hill-property-management" },
      { label: "Brooksville", href: "/brooksville-property-management" },
      { label: "Weeki Wachee", href: "/weeki-wachee-property-management" },
      { label: "Hernando Beach", href: "/hernando-beach-property-management" },
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
      { label: "Spring Hill", href: "/spring-hill-property-management" },
      { label: "Brooksville", href: "/brooksville-property-management" },
      { label: "Weeki Wachee", href: "/weeki-wachee-property-management" },
      { label: "Hernando Beach", href: "/hernando-beach-property-management" },
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
