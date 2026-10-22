import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { NewConstructionPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "New Construction Rebate | $2,500 Back at Closing",
  description: "Register TrueNorth as your agent before you tour a model and we rebate $2,500 to $5,000 of our commission back to you as a credit at closing.",
  path: "/new-construction",
});

export default function Page() {
  return <NewConstructionPage lang="en" />;
}
