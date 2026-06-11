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

/**
 * ── RentCast enrichment ─────────────────────────────────────────────────────
 * When RENTCAST_API_KEY is set (Vercel → Environment Variables; free key at
 * rentcast.io), free-rental-analysis leads are enriched server-side with
 * public-record property details and a long-term rent estimate, so the lead
 * email arrives with beds/baths/sqft/year + an estimated rent range already
 * filled in. Strictly fail-safe: any error or timeout and the lead email goes
 * out unenriched. Calls are capped at 6s so the form never feels stuck.
 */
const money = (n: unknown) =>
  typeof n === "number" ? n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : null;

async function rentCastGet(path: string, address: string, key: string) {
  const res = await fetch(`https://api.rentcast.io/v1${path}?address=${encodeURIComponent(address)}`, {
    headers: { "X-Api-Key": key, Accept: "application/json" },
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`rentcast ${path} ${res.status}`);
  return res.json();
}

async function enrichWithRentCast(address: string): Promise<{ rows: [string, string][]; rentRange: string | null }> {
  const key = process.env.RENTCAST_API_KEY;
  if (!key) return { rows: [], rentRange: null };

  const [propRes, rentRes] = await Promise.allSettled([
    rentCastGet("/properties", address, key),
    rentCastGet("/avm/rent/long-term", address, key),
  ]);

  const rows: [string, string][] = [];
  let rentRange: string | null = null;

  if (propRes.status === "fulfilled") {
    const p = Array.isArray(propRes.value) ? propRes.value[0] : propRes.value;
    if (p && typeof p === "object") {
      const fields: [string, unknown][] = [
        ["Property type", p.propertyType],
        ["Bedrooms", p.bedrooms],
        ["Bathrooms", p.bathrooms],
        ["Square footage", typeof p.squareFootage === "number" ? p.squareFootage.toLocaleString("en-US") + " sqft" : null],
        ["Year built", p.yearBuilt],
        ["Lot size", typeof p.lotSize === "number" ? p.lotSize.toLocaleString("en-US") + " sqft" : null],
        ["Last sale", [money(p.lastSalePrice), typeof p.lastSaleDate === "string" ? p.lastSaleDate.slice(0, 10) : null].filter(Boolean).join(" on ") || null],
      ];
      for (const [label, v] of fields) if (v != null && v !== "") rows.push([label, String(v)]);
    }
  }

  if (rentRes.status === "fulfilled") {
    const r = rentRes.value as { rent?: number; rentRangeLow?: number; rentRangeHigh?: number };
    const est = money(r.rent);
    const lo = money(r.rentRangeLow);
    const hi = money(r.rentRangeHigh);
    if (est) rows.push(["Estimated rent", est + "/mo"]);
    if (lo && hi) {
      rows.push(["Rent range", `${lo} – ${hi}/mo`]);
      rentRange = `${lo}–${hi}`;
    }
  }

  if (propRes.status === "rejected") console.error("[lead] rentcast properties failed:", propRes.reason);
  if (rentRes.status === "rejected") console.error("[lead] rentcast rent estimate failed:", rentRes.reason);
  return { rows, rentRange };
}

function enrichmentHtml(rows: [string, string][]): string {
  if (rows.length === 0) return "";
  const tr = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748B;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0;color:#0F2742"><strong>${escapeHtml(v)}</strong></td></tr>`
    )
    .join("");
  return `<p style="font-family:Arial,sans-serif;font-size:14px;color:#0F2742;margin-top:18px"><strong>Property records &amp; rent estimate</strong> <span style="color:#64748B">(RentCast — verify before quoting)</span></p><table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${tr}</table>`;
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

  // Enrich rental-analysis leads that include an address (fail-safe by design).
  let enrichment: { rows: [string, string][]; rentRange: string | null } = { rows: [], rentRange: null };
  if (formName === "free-rental-analysis" && typeof payload.address === "string" && payload.address.trim()) {
    try {
      enrichment = await enrichWithRentCast(payload.address.trim());
    } catch (err) {
      console.error("[lead] enrichment failed:", err);
    }
  }

  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET, MS_SENDER, LEAD_TO } = process.env;

  if (MS_TENANT_ID && MS_CLIENT_ID && MS_CLIENT_SECRET && MS_SENDER) {
    try {
      const token = await getGraphToken(MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET);
      const to = LEAD_TO || MS_SENDER;

      const message = {
        subject: `New ${formName} lead — ${name}${enrichment.rentRange ? ` (est. ${enrichment.rentRange}/mo)` : ""}`,
        body: {
          contentType: "HTML",
          content: `<p style="font-family:Arial,sans-serif;font-size:14px;color:#0F2742">New lead from the ${site.domain} website (<strong>${escapeHtml(
            formName
          )}</strong> form):</p>${formatHtml(payload)}${enrichmentHtml(enrichment.rows)}`,
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
  console.log("[lead] (Graph not configured) received:", JSON.stringify(payload), "enrichment:", JSON.stringify(enrichment.rows));
  return NextResponse.json({ ok: true });
}
