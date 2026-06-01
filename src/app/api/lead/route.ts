import { NextResponse } from "next/server";

/**
 * Lead intake endpoint — PLACEHOLDER.
 * All marketing forms POST JSON here. Wire this to your CRM / email provider:
 *   - Forward to Outlook mailbox (e.g. via Microsoft Graph or SMTP)
 *   - Or push to a CRM (HubSpot, GoHighLevel, etc.)
 *   - Or store + notify
 *
 * Until wired, it logs server-side and returns 200 so the UX flow works in dev.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // INSERT: send to CRM / email here.
    // Example:
    //   await fetch(process.env.CRM_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(payload) });
    console.log("[lead] received:", JSON.stringify(payload));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
