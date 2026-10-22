import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BuyPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Buy a Home in Hernando County, FL",
  description: "A buyer's agent who underwrites the property before you offer — plus a new construction rebate paid back to you at closing.",
  path: "/buy",
});

export default function Page() {
  return <BuyPage lang="en" />;
}
