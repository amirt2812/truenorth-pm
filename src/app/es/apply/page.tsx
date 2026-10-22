import { redirect } from "next/navigation";
import { site } from "@/lib/site";

/** Spanish short link: truenorthpm.co/es/apply */
export const dynamic = "force-dynamic";

export default function ApplyRedirectEs() {
  redirect(site.links.agentPacket || "/es/join");
}
