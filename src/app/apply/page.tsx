import { redirect } from "next/navigation";
import { site } from "@/lib/site";

/**
 * Short link for recruiting: truenorthpm.co/apply
 *
 * Sends an agent straight into the DocuSign PowerForm when its URL is set in
 * site.links.agentPacket, and to the Join page until then. Print the short link
 * on cards and flyers — when the PowerForm URL changes, only the config changes.
 */
export const dynamic = "force-dynamic";

export default function ApplyRedirect() {
  redirect(site.links.agentPacket || "/join");
}
