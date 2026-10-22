import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SellPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Sell Your Home in Hernando County | 2.5% Listing Fee",
  description: "List with TrueNorth for 2.5%: professional photography, aerial video, floor plans, printed flyers, open houses, and weekly seller reporting included.",
  path: "/sell",
});

export default function Page() {
  return <SellPage lang="en" />;
}
