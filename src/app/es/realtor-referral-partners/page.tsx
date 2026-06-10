import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/forms/LeadForm";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Socios Agentes de Referidos | Proteja la Relación con su Cliente",
  description:
    "Asóciese con TrueNorth Property Management para administrar clientes que aún no están listos para vender — y consérvelos para cuando lo estén. Sujeto a la ley aplicable y al cumplimiento de corretaje.",
  path: "/realtor-referral-partners",
  lang: "es",
});

const how = [
  { icon: "shield", title: "Protegemos su relación", body: "Administramos la renta y mantenemos intacta su relación con el cliente para el futuro — somos un socio de administración, no un competidor por la venta." },
  { icon: "key", title: "Manejamos la administración", body: "Arrendamiento, selección, cobro de renta, mantenimiento y reportes — manejados con profesionalismo para que su cliente esté bien atendido." },
  { icon: "chat", title: "Se lo regresamos cuando esté listo", body: "Cuando su cliente esté listo para comprar o vender, podemos regresárselo, sujeto a la ley aplicable y al cumplimiento de corretaje." },
];

export default function RealtorReferralEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Socios Agentes de Referidos", path: "/es/realtor-referral-partners" }]}
        eyebrow="Para agentes de bienes raíces"
        title="Un socio de administración que protege la relación con su cliente."
        intro="Cuando un cliente no está listo para vender — o quiere rentar su casa por un tiempo — no tiene que perder la relación. TrueNorth administra la propiedad y mantiene intacta su conexión con el cliente para cuando esté listo para comprar o vender."
        primary={{ label: "Conviértase en Socio de Referidos", href: "#partner-form" }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Cómo funciona la asociación" title="Conserve a sus clientes. Delegue la administración." />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {how.map((h) => (
            <Card key={h.title} hover className="h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400"><Icon name={h.icon as never} className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display text-lg font-medium text-navy-800">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{h.body}</p>
            </Card>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-navy-100 bg-sand-50 p-5 text-sm leading-relaxed text-slate-600">
          <strong className="text-navy-800">Una nota sobre cumplimiento:</strong> Cualquier acuerdo de
          referidos se estructura para cumplir con la ley aplicable de Florida y las regulaciones de
          corretaje de bienes raíces. No ofrecemos ni prometemos comisiones de referidos ni compensación
          que no sea legal. Todos los acuerdos están sujetos al cumplimiento de corretaje y a cualquier
          acuerdo escrito requerido.
        </div>
      </Section>

      <Section tone="sand" id="partner-form">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading align="left" eyebrow="Hablemos" title="Conviértase en socio de referidos" intro="Cuéntenos sobre su negocio y el tipo de clientes que quisiera referir. Le contactaremos para conversar sobre una asociación conforme a la ley." />
          </div>
          <div className="lg:col-span-7">
            <Card className="shadow-card-hover">
              <LeadForm
                formId="realtor-referral"
                lang="es"
                thankYouType="default"
                defaultTopic="Asociación de referidos de agentes"
                extraFields={[
                  { kind: "input", id: "brokerage", label: "Su correduría", half: true },
                  { kind: "input", id: "license", label: "N.° de licencia (opcional)", half: true },
                ]}
                submitLabel="Conviértase en Socio de Referidos"
              />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
