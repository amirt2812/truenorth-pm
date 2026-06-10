"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, Textarea, Checkbox } from "./Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { serviceAreas } from "@/lib/site";
import { localizeHref, type Lang } from "@/lib/i18n";

const T = {
  en: {
    firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone",
    address: "Property address", city: "City", cityOther: "Other Hernando County",
    propertyType: "Property type",
    propertyTypes: ["Single-family home", "Townhome", "Condo", "Duplex / multi-unit", "Mobile / manufactured", "Other"],
    bedrooms: "Bedrooms", bathrooms: "Bathrooms",
    currentRent: "Current rent (if applicable)",
    occupancy: "Occupied or vacant?", occupancyOpts: ["Occupied", "Vacant", "Becoming vacant soon"],
    leaseEnd: "Lease end date (if applicable)",
    condition: "Property condition", conditionOpts: ["Excellent", "Good", "Fair", "Needs work", "Not sure"],
    hoa: "HOA?", hoaOpts: ["Yes", "No", "Not sure"],
    pool: "Pool?", poolOpts: ["Yes", "No"],
    pets: "Pets allowed?", petsOpts: ["Yes", "No", "Open to it"],
    mgmt: "Current management status", mgmtOpts: ["Self-managing", "With another manager", "Vacant / unmanaged", "Just purchased"],
    challenge: "Biggest challenge right now",
    challengeOpts: ["Finding good tenants", "Maintenance & repairs", "Time / responsiveness", "Vacancy", "Rent collection", "Unhappy with current manager", "Out-of-state / distance", "Other"],
    timeline: "Desired timeline", timelineOpts: ["As soon as possible", "Within 30 days", "1–3 months", "Just researching"],
    notes: "Anything else we should know?", optional: "Optional",
    consent1: "I agree to be contacted by TrueNorth Property Management by phone, SMS, and email about my request. Message frequency may vary and message/data rates may apply. Reply STOP to opt out. Consent is not a condition of any purchase. See our ",
    smsPolicy: "SMS/Email Consent Policy", privacy: "Privacy Policy", and: " and ",
    error: "Something went wrong submitting the form. Please call us or try again.",
    sending: "Sending…", submit: "Request My Rental Analysis",
    disclaimer: "This is a market-informed rental estimate, not an appraisal or official valuation.",
  },
  es: {
    firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", phone: "Teléfono",
    address: "Dirección de la propiedad", city: "Ciudad", cityOther: "Otra área del Condado de Hernando",
    propertyType: "Tipo de propiedad",
    propertyTypes: ["Casa unifamiliar", "Townhome", "Condominio", "Dúplex / multifamiliar", "Casa móvil / prefabricada", "Otro"],
    bedrooms: "Recámaras", bathrooms: "Baños",
    currentRent: "Renta actual (si aplica)",
    occupancy: "¿Ocupada o vacía?", occupancyOpts: ["Ocupada", "Vacía", "Pronto estará vacía"],
    leaseEnd: "Fin del contrato (si aplica)",
    condition: "Condición de la propiedad", conditionOpts: ["Excelente", "Buena", "Regular", "Necesita trabajo", "No estoy seguro"],
    hoa: "¿HOA?", hoaOpts: ["Sí", "No", "No estoy seguro"],
    pool: "¿Piscina?", poolOpts: ["Sí", "No"],
    pets: "¿Se permiten mascotas?", petsOpts: ["Sí", "No", "Abierto a ello"],
    mgmt: "Estado actual de administración", mgmtOpts: ["Autoadministro", "Con otro administrador", "Vacía / sin administrar", "Recién comprada"],
    challenge: "Su mayor desafío en este momento",
    challengeOpts: ["Encontrar buenos inquilinos", "Mantenimiento y reparaciones", "Tiempo / capacidad de respuesta", "Vacancia", "Cobro de renta", "Insatisfecho con el administrador actual", "Vivo fuera del estado / distancia", "Otro"],
    timeline: "Plazo deseado", timelineOpts: ["Lo antes posible", "Dentro de 30 días", "1–3 meses", "Solo estoy investigando"],
    notes: "¿Algo más que debamos saber?", optional: "Opcional",
    consent1: "Acepto que TrueNorth Property Management me contacte por teléfono, SMS y correo electrónico sobre mi solicitud. La frecuencia de mensajes puede variar y pueden aplicar tarifas de mensajes/datos. Responda STOP para cancelar. El consentimiento no es condición para ninguna compra. Consulte nuestra ",
    smsPolicy: "Política de Consentimiento SMS/Email", privacy: "Política de Privacidad", and: " y ",
    error: "Hubo un problema al enviar el formulario. Por favor llámenos o intente de nuevo.",
    sending: "Enviando…", submit: "Solicitar Mi Análisis de Renta",
    disclaimer: "Esta es una estimación de renta basada en el mercado, no una tasación ni una valoración oficial.",
  },
};

/**
 * Free Rental Analysis lead form. Posts to /api/lead and routes to the
 * thank-you page. Bilingual via the `lang` prop. Marketing copy avoids
 * "appraisal"/"official valuation".
 */
export function RentalAnalysisForm({ lang = "en" }: { lang?: Lang }) {
  const router = useRouter();
  const t = T[lang];
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: "free-rental-analysis", lang, ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push(localizeHref("/thank-you?type=rental-analysis", lang));
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="firstName" label={t.firstName} required autoComplete="given-name" />
        <Input id="lastName" label={t.lastName} required autoComplete="family-name" />
        <Input id="email" label={t.email} type="email" required autoComplete="email" />
        <Input id="phone" label={t.phone} type="tel" required autoComplete="tel" />
      </div>

      <Input id="address" label={t.address} required autoComplete="street-address" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="city" label={t.city} required options={[...serviceAreas, t.cityOther]} />
        <Select id="propertyType" label={t.propertyType} required options={t.propertyTypes} />
        <Select id="bedrooms" label={t.bedrooms} options={["1", "2", "3", "4", "5+"]} />
        <Select id="bathrooms" label={t.bathrooms} options={["1", "1.5", "2", "2.5", "3", "3+"]} />
        <Input id="currentRent" label={t.currentRent} inputMode="numeric" placeholder="$" />
        <Select id="occupancy" label={t.occupancy} options={t.occupancyOpts} />
        <Input id="leaseEnd" label={t.leaseEnd} type="date" />
        <Select id="condition" label={t.condition} options={t.conditionOpts} />
        <Select id="hoa" label={t.hoa} options={t.hoaOpts} />
        <Select id="pool" label={t.pool} options={t.poolOpts} />
        <Select id="pets" label={t.pets} options={t.petsOpts} />
        <Select id="managementStatus" label={t.mgmt} options={t.mgmtOpts} />
      </div>

      <Select id="challenge" label={t.challenge} options={t.challengeOpts} />
      <Select id="timeline" label={t.timeline} options={t.timelineOpts} />
      <Textarea id="notes" label={t.notes} required={false} placeholder={t.optional} />

      <Checkbox id="consent" required>
        {t.consent1}
        <a href={localizeHref("/sms-email-consent", lang)} className="text-navy-600 underline">{t.smsPolicy}</a>
        {t.and}
        <a href={localizeHref("/privacy-policy", lang)} className="text-navy-600 underline">{t.privacy}</a>.
      </Checkbox>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{t.error}</p>
      )}

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? t.sending : t.submit}
        {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
      </Button>

      <p className="text-center text-xs text-slate-500">{t.disclaimer}</p>
    </form>
  );
}
