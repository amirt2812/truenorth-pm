"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, Textarea, Checkbox } from "./Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

type ExtraField =
  | { kind: "input"; id: string; label: string; type?: string; required?: boolean; half?: boolean }
  | { kind: "select"; id: string; label: string; options: string[]; required?: boolean; half?: boolean }
  | { kind: "textarea"; id: string; label: string; required?: boolean };

/**
 * Configurable lead form used across Contact, Referral, Vendor, Consultation,
 * and Founding Landlord flows. Posts to /api/lead and routes to /thank-you.
 */
export function LeadForm({
  formId,
  thankYouType = "default",
  topicOptions,
  defaultTopic,
  extraFields = [],
  showAddress = false,
  showMessage = true,
  submitLabel = "Send Message",
}: {
  formId: string;
  thankYouType?: string;
  topicOptions?: string[];
  defaultTopic?: string;
  extraFields?: ExtraField[];
  showAddress?: boolean;
  showMessage?: boolean;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: formId, ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push(`/thank-you?type=${thankYouType}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="firstName" label="First name" required autoComplete="given-name" />
        <Input id="lastName" label="Last name" required autoComplete="family-name" />
        <Input id="email" label="Email" type="email" required autoComplete="email" />
        <Input id="phone" label="Phone" type="tel" required autoComplete="tel" />
      </div>

      {showAddress && <Input id="address" label="Property address" autoComplete="street-address" />}

      {topicOptions && <Select id="topic" label="How can we help?" options={topicOptions} required />}
      {defaultTopic && <input type="hidden" name="topic" value={defaultTopic} />}

      {extraFields.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {extraFields.map((f) => {
            const span = "half" in f && f.half ? "" : "sm:col-span-2";
            if (f.kind === "input")
              return <Input key={f.id} id={f.id} label={f.label} type={f.type} required={f.required} className={span} />;
            if (f.kind === "select")
              return <Select key={f.id} id={f.id} label={f.label} options={f.options} required={f.required} className={span} />;
            return <Textarea key={f.id} id={f.id} label={f.label} required={f.required} className="sm:col-span-2" />;
          })}
        </div>
      )}

      {showMessage && <Textarea id="message" label="Your message" placeholder="Tell us a bit about your property or question" />}

      <Checkbox id="consent" required>
        I agree to be contacted by {site.brand} by phone, SMS, and email about my request. Message
        frequency may vary and message/data rates may apply. Reply STOP to opt out. Consent is not a
        condition of any purchase. See our{" "}
        <a href="/sms-email-consent" className="text-navy-600 underline">SMS/Email Consent Policy</a> and{" "}
        <a href="/privacy-policy" className="text-navy-600 underline">Privacy Policy</a>.
      </Checkbox>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please call us at {site.phone} or try again.
        </p>
      )}

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : submitLabel}
        {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
      </Button>
    </form>
  );
}
