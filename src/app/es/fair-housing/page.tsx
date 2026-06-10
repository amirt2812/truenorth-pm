import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { compliance } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Declaración de Vivienda Justa",
  description: "TrueNorth Property Management apoya la igualdad de oportunidad de vivienda y no discrimina contra ninguna clase protegida bajo la ley aplicable.",
  path: "/fair-housing",
  lang: "es",
});

export default function FairHousingEs() {
  return (
    <LegalLayout
      lang="es"
      title="Declaración de Vivienda Justa"
      path="/es/fair-housing"
      intro="Estamos comprometidos con la igualdad de oportunidad de vivienda para todos."
    >
      <p className="text-lg font-medium text-navy-800">{compliance.fairHousing.es}</p>
      <h2>Nuestro compromiso</h2>
      <p>
        Brindamos un servicio profesional equitativo a todos los clientes, posibles inquilinos y
        solicitantes sin importar ninguna clase protegida. Aplicamos criterios de selección consistentes
        a cada solicitante y cumplimos con la Ley federal de Vivienda Justa y todas las leyes de vivienda
        justa aplicables de Florida y locales.
      </p>
      <h2>Adaptaciones razonables</h2>
      <p>
        Acomodamos a los animales de asistencia y de servicio, y proporcionamos adaptaciones y
        modificaciones razonables, de acuerdo con la ley de vivienda justa aplicable. Los requisitos de
        documentación, cuando aplican, siguen la ley.
      </p>
      <h2>Reportar inquietudes</h2>
      <p>
        Si cree que ha experimentado discriminación, puede contactar al Departamento de Vivienda y
        Desarrollo Urbano de EE. UU. (HUD) o a la agencia correspondiente de Florida. [INSERTAR datos de
        contacto y cualquier divulgación de licencia/correduría requerida tras la revisión del abogado.]
      </p>
    </LegalLayout>
  );
}
