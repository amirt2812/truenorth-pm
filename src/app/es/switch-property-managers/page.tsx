import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { LeadForm } from "@/components/forms/LeadForm";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Cambiar de Administrador de Propiedades en el Condado de Hernando, FL",
  description:
    "¿No está contento con su administrador? TrueNorth se encarga del cambio — contrato, inquilino, depósito de seguridad, registros y llaves — para propietarios en Spring Hill, Brooksville y el Condado de Hernando.",
  path: "/switch-property-managers",
  lang: "es",
});

const signs = [
  "Las llamadas y correos quedan sin respuesta por días",
  "Los estados de cuenta son confusos o aparecen cargos inesperados",
  "Las reparaciones tardan demasiado o cuestan más de lo debido",
  "Vacancias largas o una renta por debajo del mercado",
  "Se entera de los problemas por su inquilino antes que por su administrador",
];

const steps = [
  { title: "Revise su contrato actual", body: "Le ayudamos a identificar el plazo de aviso y cualquier cargo por terminación o arrendamiento, para que conozca su fecha de salida y costos antes de decidir." },
  { title: "Dé aviso por escrito", body: "Usted envía el aviso a su administrador actual. Le damos una lista exacta de lo que debe solicitarle." },
  { title: "Nos encargamos de la transición", body: "Contrato, historial de pagos, depósito de seguridad (transferido según la ley de Florida), llaves y órdenes de trabajo abiertas pasan a nosotros." },
  { title: "Damos la bienvenida a su inquilino", body: "Nos presentamos, configuramos el pago de renta en línea y confirmamos los registros de condición de la propiedad." },
];

const faqs = [
  { q: "¿Puedo cambiar de administrador a mitad de un contrato de arrendamiento?", a: "Sí. El contrato sigue vigente y su inquilino se queda. Lo que cambia es quién administra la propiedad y dónde se paga la renta." },
  { q: "¿Qué pasa con el depósito de seguridad del inquilino?", a: "Debe transferirse al nuevo administrador (o a usted) y sigue sujeto a las reglas de depósitos de Florida. Damos seguimiento a la transferencia como parte de la transición." },
  { q: "¿Le deberé algo a mi administrador actual?", a: "Depende de su contrato. Algunos incluyen un cargo por terminación anticipada o un cargo de arrendamiento ligado al inquilino actual. Le ayudamos a encontrar esos términos; para preguntas legales, consulte a un abogado de Florida." },
  { q: "¿Cuánto tarda un cambio?", a: "Normalmente el plazo de aviso de su contrato actual, a menudo 30 días. La transición en sí suele tomar unos días una vez dado el aviso." },
];

export default function SwitchPropertyManagersEs() {
  const { enabled, spots, cancelWindowDays } = site.foundingOffer;
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Cambiar de Administrador", path: "/es/switch-property-managers" }]}
        eyebrow="Cambiar de administrador"
        title="¿No está contento con su administrador? Cambiar es más fácil de lo que cree."
        intro="Muchos propietarios se quedan con un administrador que no funciona porque cambiar parece complicado. Nosotros nos encargamos de la transición para que su inquilino, depósito, registros y llaves lleguen a salvo."
        primary={{ label: "Iniciar mi cambio", href: "#switch-form" }}
        secondary={{ label: `Llame al ${site.phone}`, href: site.phoneHref }}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="¿Le suena familiar?" title="Señales de que es hora de cambiar" />
            <ul className="mt-6 space-y-3">
              {signs.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-700">
                  <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          {enabled ? (
            <Card className="border-gold-200 bg-gold-50">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Términos de propietario fundador · primeros {spots} propietarios</span>
              <h2 className="mt-3 font-display text-2xl font-medium text-navy-800">Cambie sin las penalidades de siempre</h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                <li className="flex gap-3"><Icon name="key" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Sin cargo de arrendamiento por asumir al inquilino actual</li>
                <li className="flex gap-3"><Icon name="dollar" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Sin cargo de inicio</li>
                <li className="flex gap-3"><Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Cancele sin cargo por terminación en sus primeros {cancelWindowDays} días</li>
                <li className="flex gap-3"><Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Una respuesta en {site.responseTime.es}, siempre</li>
              </ul>
              <p className="mt-5 text-xs text-slate-500">Los términos constan en un anexo escrito al contrato de administración.</p>
            </Card>
          ) : (
            <Card className="border-gold-200 bg-gold-50">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-700">Por qué los propietarios cambian a TrueNorth</span>
              <h2 className="mt-3 font-display text-2xl font-medium text-navy-800">Una administración que no tiene que perseguir</h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                <li className="flex gap-3"><Icon name="dollar" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Precios transparentes, con planes desde $99/mes</li>
                <li className="flex gap-3"><Icon name="eye" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Portal en línea para propietarios y estados de cuenta mensuales claros</li>
                <li className="flex gap-3"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Local y dirigido por su fundador, aquí en el Condado de Hernando</li>
                <li className="flex gap-3"><Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />Una respuesta en {site.responseTime.es}</li>
              </ul>
              <p className="mt-5 text-xs text-slate-500">{compliance.pricingDisclaimer.es}</p>
            </Card>
          )}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Cómo funciona" title="Cuatro pasos, y nosotros hacemos la mayoría" />
        <div className="mt-10">
          <ProcessSteps steps={steps} />
        </div>
      </Section>

      <Section tone="white" id="switch-form">
        <div className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="Hablemos" title="Cuéntenos sobre su propiedad" intro="Revisaremos su situación y le explicaremos el cambio paso a paso. Sin compromiso." />
          <Card className="mt-8">
            <LeadForm
              lang="es"
              formId="switch-manager"
              thankYouType="switch"
              showAddress
              defaultTopic="Cambio de administrador"
              extraFields={[
                {
                  kind: "select",
                  id: "timeline",
                  label: "¿Cuándo termina o se renueva su contrato actual?",
                  options: ["En 30 días", "1–3 meses", "3–6 meses", "Más de 6 meses", "No estoy seguro"],
                },
              ]}
              submitLabel="Iniciar Mi Cambio"
            />
          </Card>
        </div>
      </Section>

      <FaqSection items={faqs} tone="sand" eyebrow="Preguntas" title="Preguntas sobre el cambio" />
      <CtaBand lang="es" />
    </>
  );
}
