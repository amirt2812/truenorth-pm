import { site, serviceAreas, isPreLaunch } from "./site";

/**
 * JSON-LD structured data builders. All use placeholder legal name until the
 * brokerage entity is confirmed. Render with the <JsonLd /> component.
 */

const sameAs = [site.social.facebook, site.social.instagram, site.social.linkedin].filter(Boolean);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.brand,
    legalName: site.brokerageLegalName,
    url: site.url,
    slogan: site.tagline,
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone,
      email: site.email,
      areaServed: "Hernando County, FL",
    },
  };
}

/** LocalBusiness / RealEstateAgent combined node for the homepage + contact. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "RealEstateAgent"],
    "@id": `${site.url}/#localbusiness`,
    name: site.brand,
    image: `${site.url}/og/default.png`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Spring Hill",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: serviceAreas.map((a) => ({ "@type": "City", name: `${a}, FL` })),
    openingHours: "Mo-Fr 09:00-17:00",
    ...(isPreLaunch ? { disambiguatingDescription: "Pre-launch — brokerage registration pending." } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
