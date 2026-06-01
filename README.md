# TrueNorth Property Management — Website

Conversion-optimized marketing site for **TrueNorth Property Management** (Hernando County, FL).
Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

> Brand promise: **Property Management With Direction.**

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

> This environment had no Node.js available, so the project was authored but not
> built here. Run `npm install` locally first.

---

## ⚠️ Compliance toggle (read first)

The entire site flips between **pre-launch** and **licensed** messaging from one switch:

`src/lib/site.ts` → `export const launchStatus = "pre-launch" | "licensed"`

- **`"pre-launch"`** (default): shows the license-pending alert banner and Version A
  brokerage disclosure. No claim of an active brokerage. **Keep this until brokerage
  registration is confirmed active.**
- **`"licensed"`**: shows Version B disclosure with the legal brokerage name + license
  number. **Only switch after the brokerage registration is active.**

Compliance copy (fair housing, no-advice, pricing disclaimer, both disclosure versions)
lives in `compliance` / `activeBrokerageDisclosure()` in `src/lib/site.ts`.

---

## 🔧 Placeholders to replace before launch

**Everything you must fill in lives in `src/lib/site.ts`.** Search the codebase for
`INSERT` and `[` brackets. Key items:

| Placeholder | Where |
| --- | --- |
| `[Licensed Brokerage LLC Name]` | `site.brokerageLegalName` |
| `[Florida Brokerage License Number]` | `site.brokerageLicenseNumber` |
| `[Business Phone]` + `phoneHref` (E.164) | `site.phone`, `site.phoneHref` |
| `[Business Email]` (Outlook domain) | `site.email`, `site.emailHref` |
| `[Business Address / Mailing Address]` | `site.address` |
| `[Owner Portal Link]` (RentRedi) | `site.links.ownerPortal` |
| `[Tenant Portal Link]` (RentRedi) | `site.links.tenantPortal` |
| `[RentRedi Application Link]` | `site.links.rentRediApplication` |
| `[Calendly Link]` | `site.links.calendly` |
| `[Google Business Profile Link]` | `site.links.googleBusinessProfile` |
| Final pricing | `src/lib/pricing.ts` |
| Founder name / bio / photo | `src/app/page.tsx`, `src/app/about/page.tsx` |
| GTM / GA4 / Pixel / call-tracking IDs | `site.analytics` (wired in `src/app/layout.tsx`) |
| Logo asset | `src/components/ui/Logo.tsx` (swap inline SVG for `/public/logo.svg`) |
| OG image, favicon, apple-touch-icon | `/public/og/default.png`, `/public/favicon.ico` |
| Attorney-approved Privacy / Terms / SMS-Email / Legal copy | the four legal pages |

> Legal pages contain **placeholder language marked for attorney review** — do not publish
> as-is. They are not legal advice.

---

## Lead capture

All forms POST JSON to `src/app/api/lead/route.ts` (a stub that logs + returns 200).
**Wire it to your CRM / Outlook mailbox** (Microsoft Graph, SMTP, HubSpot, GoHighLevel, etc.).
On success the user is routed to `/thank-you?type=…`.

---

## Design system

- **Colors** (`tailwind.config.ts`): `navy` (deep navy brand), `gold` (warm muted accent),
  `slate` (neutral text), `sand` (off-white background).
- **Type**: `Fraunces` (display serif) + `Plus Jakarta Sans` (UI/body), via `next/font`.
- **Primitives**: `Button`, `Section`/`SectionHeading`, `Card`/`FeatureCard`, `Icon`
  (single-weight line icons), `Accordion`, `Logo`, `JsonLd`.
- **Reusable sections**: `CtaBand`, `PricingCards`, `ComparisonTable`, `RentRediSection`,
  `FoundingLandlord`, `FaqSection`.
- A subtle compass/direction motif is available via the `.bg-compass` utility.

Accessibility: skip link, focus-visible rings, semantic headings, labeled form fields,
`prefers-reduced-motion` support, AA-minded contrast.

SEO: per-page metadata via `pageMeta()` (`src/lib/seo.ts`), JSON-LD via `src/lib/schema.ts`
(Organization, LocalBusiness/RealEstateAgent, Breadcrumb, FAQPage), `sitemap.ts`, `robots.ts`.

---

## Build status (page-by-page)

**Pass 1 — complete:** project scaffold, design system, layout (header/footer/alert
banner), shared component library, SEO/schema infra, lead form + API stub, **Home**,
thank-you, 404, sitemap, robots.

**Remaining pages to build (Pass 2+):** Property Management, Pricing, Free Rental Analysis,
Owner Portal, Tenant Portal, Owners, Tenants, Realtor Referral Partners, Investor Services,
the 5 local SEO pages, ROI Calculator, Resources/Blog + 10 starter posts, FAQ, About,
Contact, and the 5 legal/compliance pages. All routes are already wired into the nav,
footer, and sitemap and will assemble from the existing components.
