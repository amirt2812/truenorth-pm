import { site, serviceAreaSentence, isBrokerageNamed } from "./site";

/** Master FAQ list for /faq. License answer uses the required placeholder. */
export const faqs: { q: string; a: string }[] = [
  { q: "What areas do you serve?", a: `We serve ${serviceAreaSentence}` },
  { q: "What types of properties do you manage?", a: "We manage residential rentals — single-family homes, townhomes, condos, and small multi-unit and portfolio properties across Hernando County." },
  { q: "How much do your services cost?", a: "Full-service plans start at $99/month (Essential), $149/month (Plus), and $229/month (Premier), plus à la carte leasing and renewal options. Final pricing depends on property type, location, condition, service scope, and a signed management agreement." },
  { q: "Do you offer leasing-only services?", a: "Yes. Our Leasing Only service covers marketing, screening, showings, and lease execution for owners who self-manage day to day. It starts at 75% of the first month's rent (minimum fee to be confirmed)." },
  { q: "Can I approve repairs before work is done?", a: "Yes. You set an owner approval threshold. Routine work below it is coordinated and documented; work above it is sent to you for approval first, except genuine emergencies that protect health, safety, or the property." },
  { q: "How do you screen tenants?", a: "We apply a consistent, fair-housing-compliant screening process to every applicant. Specific criteria are provided in writing and applied uniformly. [INSERT final screening criteria once confirmed with your attorney/brokerage.]" },
  { q: "How do owners receive rent payments?", a: "Owner disbursements and statements are handled through our RentRedi-powered process, with online statements available in your owner portal." },
  { q: "How do tenants pay rent?", a: "Tenants pay rent online through the RentRedi tenant portal, with automated reminders." },
  { q: "Do you manage homes with HOAs?", a: "Yes. We manage properties governed by HOAs and help keep tenants aligned with community rules." },
  { q: "Do you handle evictions?", a: "TrueNorth can coordinate documentation and attorney handoff when legal action is required. Legal services are provided only by licensed attorneys; we do not provide legal representation or advice." },
  { q: "Do you hold security deposits?", a: "Security deposit handling is performed in accordance with applicable Florida law and the signed lease/management agreement." },
  { q: "What software do you use?", a: `We use ${site.softwarePlatform} as our primary property management suite for rent payments, maintenance requests, owner visibility, and centralized communication.` },
  { q: "Can I switch from another property manager?", a: "Yes. Many owners come to us from another manager. We'll walk you through a clean transition, subject to the terms of your current agreement and a signed management agreement with us." },
  { q: "Do you work with out-of-state owners?", a: "Yes. Our RentRedi owner portal and clear monthly reporting are built so out-of-area owners stay fully informed." },
  { q: "Are you a licensed brokerage?", a: isBrokerageNamed
      ? `Property management and leasing services are provided through ${site.brokerageLegalName}, a Florida licensed real estate brokerage (license ${site.brokerageLicenseNumber}), in accordance with applicable Florida law.`
      : "Property management and leasing services are provided in accordance with applicable Florida real estate law. Our full brokerage name and license number will be published here." },
];
