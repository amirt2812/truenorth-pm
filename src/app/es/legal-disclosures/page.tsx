import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance, activeBrokerageDisclosure, isBrokerageNamed } from "@/lib/site";
import { LegalLayout } from "@/components/sections/LegalLayout";

export const metadata: Metadata = pageMeta({
  title: "Avisos Legales",
  description: "Avisos de corretaje, licencias, publicidad e informativos de TrueNorth Property Management.",
  path: "/legal-disclosures",
  lang: "es",
});

export default function LegalDisclosuresEs() {
  return (
    <LegalLayout
      lang="es"
      title="Avisos Legales"
      path="/es/legal-disclosures"
      intro="Avisos importantes de corretaje, licencias e informativos."
    >
      <h2>Corretaje y licencias</h2>
      <p>{activeBrokerageDisclosure("es")}</p>
      <ul>
        {isBrokerageNamed && <li>Nombre legal de la correduría: {site.brokerageLegalName}</li>}
        {isBrokerageNamed && <li>Número de licencia de correduría de bienes raíces de Florida: {site.brokerageLicenseNumber}</li>}
        <li>Compañía matriz: {site.holdingCompany}</li>
      </ul>
      {!isBrokerageNamed && (
        <p className="text-sm text-slate-500">[El nombre legal de la correduría y el número de licencia de Florida se publicarán aquí.]</p>
      )}

      <h2>Aviso de publicidad y licencias</h2>
      <p>
        [INSERTAR cualquier aviso de publicidad requerido para un licenciatario/correduría de bienes
        raíces de Florida, incluyendo el nombre de la correduría tal como está registrado y cualquier
        identificador de licencia requerido, tras la revisión del abogado y el registro activo.]
      </p>

      <h2>Igualdad de oportunidad de vivienda</h2>
      <p>{compliance.fairHousing.es}</p>

      <h2>Sin asesoría legal, fiscal ni de inversión</h2>
      <p>{compliance.noAdvice.es}</p>

      <h2>Servicios sujetos a acuerdo</h2>
      <p>{compliance.servicesSubjectToAgreement.es}</p>

      <h2>Precios</h2>
      <p>{compliance.pricingDisclaimer.es} Los precios están sujetos a cambios.</p>

      <h2>Solo para uso informativo</h2>
      <p>
        El contenido del sitio web se proporciona solo para fines informativos generales y puede
        actualizarse en cualquier momento. Ofertas de marketing como el «Análisis de Renta Gratis»
        proporcionan una estimación de renta informada por el mercado y no son una tasación ni una
        valoración oficial.
      </p>

      <h2>Contacto</h2>
      <p>
        {site.brand} · {site.address} · {site.phone} · {site.email}
      </p>
    </LegalLayout>
  );
}
