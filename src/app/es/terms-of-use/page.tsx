import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Términos de Uso",
  description: "Los términos que rigen su uso del sitio web de TrueNorth Property Management.",
  path: "/terms-of-use",
  lang: "es",
});

export default function TermsOfUseEs() {
  return (
    <LegalLayout
      lang="es"
      title="Términos de Uso"
      path="/es/terms-of-use"
      intro="Los términos que rigen su uso de este sitio web. [Texto preliminar — pendiente de revisión por un abogado.]"
    >
      <h2>Aceptación de estos términos</h2>
      <p>
        Al acceder o usar este sitio web, usted acepta estos Términos de Uso. Si no está de acuerdo, por
        favor no use el sitio.
      </p>

      <h2>Sin asesoría profesional</h2>
      <p>{compliance.noAdvice.es}</p>

      <h2>Sin garantías</h2>
      <p>
        El contenido se proporciona «tal cual». No ofrecemos garantías respecto a la colocación de
        inquilinos, los montos de renta, los resultados de desalojos, los rendimientos de inversión, el
        cumplimiento legal ni los resultados de mantenimiento. Cualquier estimación de renta está
        informada por el mercado y no es una tasación ni una valoración oficial.
      </p>

      <h2>Servicios sujetos a acuerdo</h2>
      <p>{compliance.servicesSubjectToAgreement.es}</p>

      <h2>Propiedad intelectual</h2>
      <p>
        El contenido, la marca y el diseño de este sitio web son propiedad de {site.brand} o de sus
        licenciantes y no pueden copiarse ni reutilizarse sin permiso.
      </p>

      <h2>Enlaces de terceros</h2>
      <p>
        Este sitio puede enlazar a sitios y herramientas de terceros (incluidos los portales de RentRedi).
        No somos responsables del contenido ni de las prácticas de esos terceros.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley, {site.brand} no es responsable de daños indirectos,
        incidentales o consecuentes que surjan de su uso de este sitio web.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes del Estado de Florida, sin tener en cuenta los principios de
        conflicto de leyes. [INSERTAR disposiciones de jurisdicción y resolución de disputas tras la
        revisión del abogado.]
      </p>

      <h2>Contacto</h2>
      <p>¿Preguntas? Contacte a {site.brand} en {site.email}.</p>
    </LegalLayout>
  );
}
