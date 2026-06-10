import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Política de Consentimiento SMS / Email",
  description: "Cómo TrueNorth Property Management maneja las comunicaciones por SMS y correo, el consentimiento y la cancelación.",
  path: "/sms-email-consent",
  lang: "es",
});

export default function SmsEmailConsentEs() {
  return (
    <LegalLayout
      lang="es"
      title="Política de Consentimiento SMS / Email"
      path="/es/sms-email-consent"
      intro="Cómo funcionan nuestras comunicaciones por texto y correo, y cómo cancelar. [Texto preliminar — pendiente de revisión por un abogado.]"
    >
      <h2>Consentimiento para recibir mensajes</h2>
      <p>
        Al proporcionar su número de teléfono y correo electrónico y marcar la casilla de consentimiento
        en nuestros formularios, usted acepta recibir comunicaciones de {site.brand} por llamada,
        mensaje de texto SMS y correo electrónico sobre su consulta, su propiedad y servicios relacionados.
      </p>

      <h2>Frecuencia de mensajes</h2>
      <p>La frecuencia de mensajes puede variar según sus interacciones con nosotros.</p>

      <h2>Tarifas de mensajes y datos</h2>
      <p>Pueden aplicar tarifas de mensajes y datos, según su operador móvil y su plan.</p>

      <h2>Cancelar la suscripción</h2>
      <ul>
        <li>Responda <strong>STOP</strong> a cualquier mensaje de texto para cancelar el SMS.</li>
        <li>Responda <strong>HELP</strong> para ayuda, o contáctenos al {site.phone}.</li>
        <li>Use el enlace de cancelación en cualquier correo de marketing para darse de baja.</li>
      </ul>

      <h2>El consentimiento no es condición de compra</h2>
      <p>
        Su consentimiento para recibir mensajes de marketing no es requerido como condición para comprar
        ninguna propiedad, producto o servicio.
      </p>

      <h2>Privacidad</h2>
      <p>
        No vendemos su información móvil. Consulte nuestra <a href="/es/privacy-policy">Política de Privacidad</a> para
        saber cómo manejamos su información.
      </p>
      <p className="text-sm text-slate-500">
        [INSERTAR el lenguaje final de consentimiento de mensajería aprobado por un abogado, incluyendo
        cualquier divulgación conforme a la TCPA y los términos requeridos por los operadores.]
      </p>
    </LegalLayout>
  );
}
