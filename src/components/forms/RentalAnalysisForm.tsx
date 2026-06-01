"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, Textarea, Checkbox } from "./Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { serviceAreas } from "@/lib/site";

/**
 * Free Rental Analysis lead form. Posts to a placeholder endpoint (wire to your
 * CRM / email / serverless route at /api/lead). On success it routes to the
 * thank-you page. Marketing copy avoids "appraisal"/"official valuation".
 */
export function RentalAnalysisForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      // INSERT: point this at your CRM webhook / serverless function.
      // Example route stub provided at src/app/api/lead/route.ts
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "free-rental-analysis", ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you?type=rental-analysis");
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

      <Input id="address" label="Property address" required autoComplete="street-address" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="city" label="City" required options={[...serviceAreas, "Other Hernando County"]} />
        <Select
          id="propertyType"
          label="Property type"
          required
          options={["Single-family home", "Townhome", "Condo", "Duplex / multi-unit", "Mobile / manufactured", "Other"]}
        />
        <Select id="bedrooms" label="Bedrooms" options={["1", "2", "3", "4", "5+"]} />
        <Select id="bathrooms" label="Bathrooms" options={["1", "1.5", "2", "2.5", "3", "3+"]} />
        <Input id="currentRent" label="Current rent (if applicable)" inputMode="numeric" placeholder="$" />
        <Select id="occupancy" label="Occupied or vacant?" options={["Occupied", "Vacant", "Becoming vacant soon"]} />
        <Input id="leaseEnd" label="Lease end date (if applicable)" type="date" />
        <Select id="condition" label="Property condition" options={["Excellent", "Good", "Fair", "Needs work", "Not sure"]} />
        <Select id="hoa" label="HOA?" options={["Yes", "No", "Not sure"]} />
        <Select id="pool" label="Pool?" options={["Yes", "No"]} />
        <Select id="pets" label="Pets allowed?" options={["Yes", "No", "Open to it"]} />
        <Select
          id="managementStatus"
          label="Current management status"
          options={["Self-managing", "With another manager", "Vacant / unmanaged", "Just purchased"]}
        />
      </div>

      <Select
        id="challenge"
        label="Biggest challenge right now"
        options={[
          "Finding good tenants",
          "Maintenance & repairs",
          "Time / responsiveness",
          "Vacancy",
          "Rent collection",
          "Unhappy with current manager",
          "Out-of-state / distance",
          "Other",
        ]}
      />

      <Select
        id="timeline"
        label="Desired timeline"
        options={["As soon as possible", "Within 30 days", "1–3 months", "Just researching"]}
      />

      <Textarea id="notes" label="Anything else we should know?" required={false} placeholder="Optional" />

      <Checkbox id="consent" required>
        I agree to be contacted by {`TrueNorth Property Management`} by phone, SMS, and email about my
        request. Message frequency may vary and message/data rates may apply. Reply STOP to opt out.
        Consent is not a condition of any purchase. See our{" "}
        <a href="/sms-email-consent" className="text-navy-600 underline">SMS/Email Consent Policy</a> and{" "}
        <a href="/privacy-policy" className="text-navy-600 underline">Privacy Policy</a>.
      </Checkbox>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong submitting the form. Please call us or try again.
        </p>
      )}

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request My Rental Analysis"}
        {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
      </Button>

      <p className="text-center text-xs text-slate-500">
        This is a market-informed rental estimate, not an appraisal or official valuation.
      </p>
    </form>
  );
}
