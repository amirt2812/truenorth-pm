import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance, activeBrokerageDisclosure } from "@/lib/site";
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
        <li>Nombre legal de la correduría: {site.brokerageLegalName}</li>
        <li>Nombre comercial registrado (d/b/a): {site.brokerageTradeName}</li>
        {site.brokerageLicenseNumber && (
          <li>Número de licencia de correduría de bienes raíces de Florida: {site.brokerageLicenseNumber}</li>
        )}
        <li>Corredor: {site.broker.name}, licencia de corredor de bienes raíces de Florida {site.broker.licenseNumber}</li>
        <li>Oficina de la correduría: {site.address}</li>
        <li>Compañía matriz: {site.holdingCompany}</li>
      </ul>

      <h2>Aviso de publicidad y licencias</h2>
      <p>
        Conforme a la Regla 61J2-10.025 del Código Administrativo de Florida, nuestra publicidad
        identifica a la correduría con su nombre completo tal como está registrado ante el DBPR de
        Florida: {site.brokerageLicensedName}.
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
        {site.brokerageLicensedName} · {site.address} · {site.phone} · {site.email}
      </p>
    </LegalLayout>
  );
}
