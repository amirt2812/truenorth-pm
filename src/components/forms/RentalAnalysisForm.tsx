"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Checkbox } from "./Field";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { localizeHref, type Lang } from "@/lib/i18n";

const T = {
  en: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    address: "Property address",
    lookup: "That's all we need — we'll pull the property details from public records and follow up with your rental range.",
    consent1:
      "I agree to be contacted by TrueNorth Property Management by phone, SMS, and email about my request. Message frequency may vary and message/data rates may apply. Reply STOP to opt out. Consent is not a condition of any purchase. See our ",
    smsPolicy: "SMS/Email Consent Policy",
    privacy: "Privacy Policy",
    and: " and ",
    error: "Something went wrong submitting the form. Please call us or try again.",
    sending: "Sending…",
    submit: "Request My Rental Analysis",
    disclaimer: "This is a market-informed rental estimate, not an appraisal or official valuation.",
  },
  es: {
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo electrónico",
    phone: "Teléfono",
    address: "Dirección de la propiedad",
    lookup: "Eso es todo lo que necesitamos — obtendremos los detalles de la propiedad de los registros públicos y le enviaremos su rango de renta.",
    consent1:
      "Acepto que TrueNorth Property Management me contacte por teléfono, SMS y correo electrónico sobre mi solicitud. La frecuencia de mensajes puede variar y pueden aplicar tarifas de mensajes/datos. Responda STOP para cancelar. El consentimiento no es condición para ninguna compra. Consulte nuestra ",
    smsPolicy: "Política de Consentimiento SMS/Email",
    privacy: "Política de Privacidad",
    and: " y ",
    error: "Hubo un problema al enviar el formulario. Por favor llámenos o intente de nuevo.",
    sending: "Enviando…",
    submit: "Solicitar Mi Análisis de Renta",
    disclaimer: "Esta es una estimación de renta basada en el mercado, no una tasación ni una valoración oficial.",
  },
};

/**
 * Free Rental Analysis lead form — intentionally minimal (5 fields + consent)
 * to maximize conversion. Property details (beds/baths/condition/etc.) are
 * looked up from public records after submission rather than asked up front.
 * The address field offers as-you-type suggestions via AddressAutocomplete.
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

      <AddressAutocomplete id="address" label={t.address} required lang={lang} />

      <p className="flex items-start gap-2 text-sm text-slate-500">
        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
        {t.lookup}
      </p>

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
