import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { posts, categories } from "@/lib/blog";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { BlogList } from "@/components/sections/BlogList";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMeta({
  title: "Resources & Blog | Hernando County Landlord Guides",
  description:
    "Guides for Hernando County landlords: property management costs, tenant screening, maintenance, hurricane prep, vacancy, investor strategy, and Florida rental basics.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Resources", path: "/resources" }]}
        eyebrow="Resources & blog"
        title="Practical guides for Hernando County landlords."
        intro="Straightforward, no-hype articles on managing, pricing, and protecting rental property in Hernando County and across Florida."
      />
      <Section tone="sand">
        <BlogList posts={posts} categories={categories} />
      </Section>
      <CtaBand />
    </>
  );
}
