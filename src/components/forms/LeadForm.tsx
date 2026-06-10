"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select, Textarea, Checkbox } from "./Field";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { localizeHref, type Lang } from "@/lib/i18n";

type ExtraField =
  | { kind: "input"; id: string; label: string; type?: string; required?: boolean; half?: boolean }
  | { kind: "select"; id: string; label: string; options: string[]; required?: boolean; half?: boolean }
  | { kind: "textarea"; id: string; label: string; required?: boolean };

const T = {
  en: {
    firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone",
    address: "Property address", help: "How can we help?", message: "Your message",
    messagePlaceholder: "Tell us a bit about your property or question",
    consent1: "I agree to be contacted by TrueNorth Property Management by phone, SMS, and email about my request. Message frequency may vary and message/data rates may apply. Reply STOP to opt out. Consent is not a condition of any purchase. See our ",
    smsPolicy: "SMS/Email Consent Policy", privacy: "Privacy Policy", and: " and ",
    error: (p: string) => `Something went wrong. Please call us at ${p} or try again.`,
    sending: "Sending…", send: "Send Message",
  },
  es: {
    firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", phone: "Teléfono",
    address: "Dirección de la propiedad", help: "¿Cómo podemos ayudar?", message: "Su mensaje",
    messagePlaceholder: "Cuéntenos un poco sobre su propiedad o pregunta",
    consent1: "Acepto que TrueNorth Property Management me contacte por teléfono, SMS y correo electrónico sobre mi solicitud. La frecuencia de mensajes puede variar y pueden aplicar tarifas de mensajes/datos. Responda STOP para cancelar. El consentimiento no es condición para ninguna compra. Consulte nuestra ",
    smsPolicy: "Política de Consentimiento SMS/Email", privacy: "Política de Privacidad", and: " y ",
    error: (p: string) => `Hubo un problema. Por favor llámenos al ${p} o intente de nuevo.`,
    sending: "Enviando…", send: "Enviar Mensaje",
  },
};

/**
 * Configurable lead form used across Contact, Referral, Vendor, Consultation,
 * and Founding Landlord flows. Posts to /api/lead and routes to /thank-you.
 * Bilingual via `lang` (chrome strings; pass already-translated field labels).
 */
export function LeadForm({
  formId,
  thankYouType = "default",
  topicOptions,
  defaultTopic,
  extraFields = [],
  showAddress = false,
  showMessage = true,
  submitLabel,
  lang = "en",
}: {
  formId: string;
  thankYouType?: string;
  topicOptions?: string[];
  defaultTopic?: string;
  extraFields?: ExtraField[];
  showAddress?: boolean;
  showMessage?: boolean;
  submitLabel?: string;
  lang?: Lang;
}) {
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
        body: JSON.stringify({ form: formId, lang, ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push(localizeHref(`/thank-you?type=${thankYouType}`, lang));
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

      {showAddress && <Input id="address" label={t.address} autoComplete="street-address" />}

      {topicOptions && <Select id="topic" label={t.help} options={topicOptions} required />}
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

      {showMessage && <Textarea id="message" label={t.message} placeholder={t.messagePlaceholder} />}

      <Checkbox id="consent" required>
        {t.consent1}
        <a href={localizeHref("/sms-email-consent", lang)} className="text-navy-600 underline">{t.smsPolicy}</a>
        {t.and}
        <a href={localizeHref("/privacy-policy", lang)} className="text-navy-600 underline">{t.privacy}</a>.
      </Checkbox>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{t.error(site.phone)}</p>
      )}

      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? t.sending : submitLabel ?? t.send}
        {status !== "submitting" && <Icon name="arrow-right" className="h-4 w-4" />}
      </Button>
    </form>
  );
}
