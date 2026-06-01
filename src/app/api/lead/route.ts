import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

// Lead intake runs on the Node.js runtime (nodemailer needs Node, not Edge).
export const runtime = "nodejs";

/**
 * Lead intake endpoint. Every marketing form POSTs JSON here. On success it
 * emails a formatted notification to the business inbox via Microsoft 365 /
 * Outlook SMTP.
 *
 * Required environment variables (set in Vercel → Settings → Environment
 * Variables, and in .env.local for local dev):
 *   SMTP_HOST   smtp.office365.com
 *   SMTP_PORT   587
 *   SMTP_USER   alfredo@truenorthpm.co        (the mailbox that sends)
 *   SMTP_PASS   <mailbox password or app password>
 *   LEAD_TO     alfredo@truenorthpm.co        (where leads are delivered)
 *   LEAD_FROM   alfredo@truenorthpm.co        (must be the authenticated user/alias)
 *
 * NOTE: Microsoft 365 requires "Authenticated SMTP" to be enabled for the
 * sending mailbox (Microsoft 365 admin center → Users → the user → Mail →
 * Manage email apps → check "Authenticated SMTP"). If the account uses MFA,
 * create an app password or switch to Microsoft Graph.
 *
 * If SMTP env vars are absent (e.g. before they're configured), the route logs
 * the lead and still returns 200 so the form UX keeps working.
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

function format(payload: Record<string, unknown>) {
  const rows = Object.entries(payload)
    .filter(([, v]) => v !== "" && v != null)
    .map(([k, v]) => `${FIELD_LABELS[k] ?? k}: ${String(v)}`);
  return rows.join("\n");
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
  const body = format(payload);

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_TO, LEAD_FROM } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT ?? 587),
        secure: false, // 587 uses STARTTLS
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from: LEAD_FROM || SMTP_USER,
        to: LEAD_TO || SMTP_USER,
        replyTo: typeof payload.email === "string" ? payload.email : undefined,
        subject: `New ${formName} lead — ${name}`,
        text: `New lead from the ${site.domain} website (${formName} form):\n\n${body}`,
      });

      return NextResponse.json({ ok: true });
    } catch (err) {
      // Don't lose the lead if email fails — log it so it can be recovered.
      console.error("[lead] email send failed:", err);
      console.log("[lead] payload:", JSON.stringify(payload));
      return NextResponse.json({ ok: true, warning: "stored" });
    }
  }

  // SMTP not configured yet — log and succeed so the form flow still works.
  console.log("[lead] (SMTP not configured) received:", JSON.stringify(payload));
  return NextResponse.json({ ok: true });
}
