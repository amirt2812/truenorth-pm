import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Política de Privacidad",
  description: "Cómo TrueNorth Property Management recopila, usa y protege su información.",
  path: "/privacy-policy",
  lang: "es",
});

export default function PrivacyPolicyEs() {
  return (
    <LegalLayout
      lang="es"
      title="Política de Privacidad"
      path="/es/privacy-policy"
      intro="Cómo recopilamos, usamos y protegemos su información. [Texto preliminar — pendiente de revisión por un abogado.]"
    >
      <h2>Información que recopilamos</h2>
      <p>
        Recopilamos la información que usted proporciona a través de nuestros formularios de contacto y
        de prospectos (como su nombre, correo, teléfono y datos de la propiedad) e información recopilada
        automáticamente mediante análisis y cookies (como las páginas visitadas y la información del dispositivo).
      </p>

      <h2>Cómo usamos la información</h2>
      <ul>
        <li>Para responder a sus consultas y brindar un análisis de renta o propuesta</li>
        <li>Para comunicarnos con usted por teléfono, SMS y correo (con su consentimiento)</li>
        <li>Para operar, mejorar y proteger nuestro sitio web y servicios</li>
        <li>Para cumplir con obligaciones legales</li>
      </ul>

      <h2>Formularios de prospectos</h2>
      <p>
        Cuando envía un formulario, la información se nos transmite y puede almacenarse en nuestro CRM y
        sistemas de correo para dar seguimiento. Consulte nuestra{" "}
        <a href="/es/sms-email-consent">Política de Consentimiento SMS/Email</a> para los detalles de mensajería.
      </p>

      <h2>Comunicaciones por SMS / correo</h2>
      <p>
        Con su consentimiento, podemos contactarlo por SMS y correo. Puede cancelar el SMS en cualquier
        momento respondiendo STOP, y darse de baja de los correos de marketing usando el enlace
        proporcionado. El consentimiento no es condición para ninguna compra.
      </p>

      <h2>Cookies y análisis</h2>
      <p>
        Usamos cookies y herramientas de análisis (como Google Analytics / Google Tag Manager y píxeles
        de publicidad) para entender el uso del sitio y mejorar el rendimiento. Puede controlar las
        cookies desde la configuración de su navegador.
      </p>

      <h2>Herramientas de terceros</h2>
      <p>
        Usamos servicios de terceros para operar nuestro negocio, incluyendo {site.softwarePlatform} para
        la administración de propiedades y pagos, herramientas de agendamiento y proveedores de
        análisis/publicidad. Su uso de su información se rige por sus propias políticas de privacidad. Los
        enlaces a sitios de terceros (incluidos los portales de propietario e inquilino de RentRedi) se
        proporcionan por conveniencia.
      </p>

      <h2>Seguridad de los datos</h2>
      <p>
        Tomamos medidas razonables para proteger su información. Ningún método de transmisión o
        almacenamiento es completamente seguro, y no podemos garantizar seguridad absoluta.
      </p>

      <h2>Sus opciones</h2>
      <p>
        Puede solicitar acceso, corrección o eliminación de su información personal, y darse de baja de
        las comunicaciones de marketing, sujeto a la ley aplicable. [INSERTAR derechos y procedimientos
        específicos tras la revisión del abogado.]
      </p>

      <h2>Contacto</h2>
      <p>
        ¿Preguntas sobre esta política? Contacte a {site.brand} en {site.email} o {site.phone}.
      </p>
      <p className="text-sm text-slate-500">
        [INSERTAR la Política de Privacidad final aprobada por un abogado, incluyendo cualquier
        disposición de CCPA/CPRA, GLBA o específica de Florida que aplique a su negocio.]
      </p>
    </LegalLayout>
  );
}
