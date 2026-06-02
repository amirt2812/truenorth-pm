import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { posts } from "@/lib/blog";

/** All public routes. Update when adding pages. Blog posts are appended below. */
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : ["/free-rental-analysis", "/pricing", "/property-management"].includes(path) ? 0.9 : 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/resources/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
