import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/blog";

/** All public routes (English paths). Spanish equivalents live under /es. */
const routes = [
  "/",
  "/property-management",
  "/pricing",
  "/free-rental-analysis",
  "/schedule",
  "/owner-portal",
  "/tenant-portal",
  "/owners",
  "/tenants",
  "/realtor-referral-partners",
  "/investor-services",
  "/hernando-county-property-management",
  "/spring-hill-property-management",
  "/brooksville-property-management",
  "/weeki-wachee-property-management",
  "/hernando-beach-property-management",
  "/roi-calculator",
  "/resources",
  "/faq",
  "/about",
  "/contact",
  "/legal-disclosures",
  "/privacy-policy",
  "/terms-of-use",
  "/sms-email-consent",
  "/fair-housing",
  ...posts.map((p) => `/resources/${p.slug}`),
];

const enUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const esUrl = (path: string) => `${site.url}${path === "/" ? "/es" : `/es${path}`}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const priorityFor = (path: string) =>
    path === "/" ? 1 : ["/free-rental-analysis", "/pricing", "/property-management"].includes(path) ? 0.9 : 0.7;
  const freqFor = (path: string): "weekly" | "monthly" | "yearly" =>
    path === "/" ? "weekly" : path.startsWith("/resources/") ? "yearly" : "monthly";

  const entries: MetadataRoute.Sitemap = [];
  for (const path of routes) {
    const alternates = {
      languages: { "en-US": enUrl(path), "es-US": esUrl(path), "x-default": enUrl(path) },
    };
    // English entry
    entries.push({
      url: enUrl(path),
      lastModified: now,
      changeFrequency: freqFor(path),
      priority: priorityFor(path),
      alternates,
    });
    // Spanish entry
    entries.push({
      url: esUrl(path),
      lastModified: now,
      changeFrequency: freqFor(path),
      priority: Math.max(0.5, priorityFor(path) - 0.1),
      alternates,
    });
  }
  return entries;
}
