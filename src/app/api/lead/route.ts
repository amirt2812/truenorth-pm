import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Lead intake endpoint. Every marketing form POSTs JSON here. On success it
 * emails a formatted notification to the business inbox via the Microsoft Graph
 * API (application permissions / client-credentials flow) — no SMTP, no MFA.
 *
 * ── Azure setup (one time) ────────────────────────────────────────────────
 * 1. Azure Portal → Microsoft Entra ID → App registrations → New registration
 *    (single tenant is fine). Copy the "Application (client) ID" and
 *    "Directory (tenant) ID".
 * 2. Certificates & secrets → New client secret → copy the secret VALUE.
 * 3. API permissions → Add a permission → Microsoft Graph → Application
 *    permissions → Mail.Send → Add → then "Grant admin consent".
 * 4. (Recommended) Restrict which mailbox the app may send as, via an
 *    Exchange ApplicationAccessPolicy scoped to alfredo@truenorthpm.co.
 *
 * ── Environment variables (Vercel → Settings → Environment Variables, and
 *    .env.local for dev) ──────────────────────────────────────────────────
 *    MS_TENANT_ID      Directory (tenant) ID
 *    MS_CLIENT_ID      Application (client) ID
 *    MS_CLIENT_SECRET  client secret VALUE
 *    MS_SENDER         alfredo@truenorthpm.co   (mailbox that sends — must exist)
 *    LEAD_TO           alfredo@truenorthpm.co   (where leads are delivered)
 *
 * If these aren't set yet, the route logs the lead and returns 200 so the form
 * UX keeps working until email is configured.
 */

const FIELD_LABELS: Record<string, string> = {
  form: "Form",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  address: "Property address",
  city: "City",
  propertyType: "Property type",
  bedrooms: "Bedrooms",
  bathrooms: "Bathrooms",
  currentRent: "Current rent",
  occupancy: "Occupancy",
  leaseEnd: "Lease end",
  condition: "Condition",
  hoa: "HOA",
  pool: "Pool",
  pets: "Pets",
  managementStatus: "Management status",
  challenge: "Biggest challenge",
  timeline: "Timeline",
  topic: "Topic",
  brokerage: "Brokerage",
  license: "License #",
  notes: "Notes",
  message: "Message",
  consent: "Consent",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

function formatHtml(payload: Record<string, unknown>) {
  const rows = Object.entries(payload)
    .filter(([, v]) => v !== "" && v != null)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748B;vertical-align:top">${escapeHtml(
          FIELD_LABELS[k] ?? k
        )}</td><td style="padding:4px 0;color:#0F2742"><strong>${escapeHtml(String(v))}</strong></td></tr>`
    )
    .join("");
  return `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`;
}

async function getGraphToken(tenantId: string, clientId: string, clientSecret: string) {
  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const formName = String(payload.form ?? "lead");
  const name = [payload.firstName, payload.lastName].filter(Boolean).join(" ") || "New lead";
  const replyTo = typeof payload.email === "string" ? payload.email : undefined;

  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SENDER, LEAD_TO } = process.env;

  if (MS_TENANT_ID && MS_CLIENT_ID && MS_CLIENT_SECRET && MS_SENDER) {
    try {
      const token = await getGraphToken(MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET);
      const to = LEAD_TO || MS_SENDER;

      const message = {
        subject: `New ${formName} lead — ${name}`,
        body: {
          contentType: "HTML",
          content: `<p style="font-family:Arial,sans-serif;font-size:14px;color:#0F2742">New lead from the ${site.domain} website (<strong>${escapeHtml(
            formName
          )}</strong> form):</p>${formatHtml(payload)}`,
        },
        toRecipients: [{ emailAddress: { address: to } }],
        ...(replyTo ? { replyTo: [{ emailAddress: { address: replyTo } }] } : {}),
      };

      const sendRes = await fetch(
        `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(MS_SENDER)}/sendMail`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ message, saveToSentItems: true }),
        }
      );

      if (!sendRes.ok) throw new Error(`sendMail failed: ${sendRes.status} ${await sendRes.text()}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      // Don't lose the lead if email fails — log it so it can be recovered.
      console.error("[lead] Graph send failed:", err);
      console.log("[lead] payload:", JSON.stringify(payload));
      return NextResponse.json({ ok: true, warning: "stored" });
    }
  }

  // Graph not configured yet — log and succeed so the form flow still works.
  console.log("[lead] (Graph not configured) received:", JSON.stringify(payload));
  return NextResponse.json({ ok: true });
}
