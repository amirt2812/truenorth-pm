import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { BrokerageHub } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Hernando County Real Estate Brokerage",
  description: "Buy, sell, and invest in Hernando County with TrueNorth Brokerage Group — a local, broker-owned brokerage that also manages rentals.",
  path: "/brokerage",
});

export default function Page() {
  return <BrokerageHub lang="en" />;
}
