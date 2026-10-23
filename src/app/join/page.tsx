import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { JoinPage } from "@/components/sections/BrokeragePages";

export const metadata: Metadata = pageMeta({
  title: "Join TrueNorth Brokerage Group | 100% Commission, $399 a Deal",
  description: "Keep 100% of your commission. $399 per closed transaction, $29 a month, no desk fee, no franchise fee — with the listing marketing package included.",
  path: "/join",
});

export default function Page() {
  return <JoinPage lang="en" />;
}
