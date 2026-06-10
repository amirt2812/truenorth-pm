import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, compliance } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FaqSection } from "@/components/sections/FaqSection";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Para Inquilinos | Residentes de TrueNorth Property Management",
  description:
    "Recursos para residentes de TrueNorth Property Management: cómo solicitar, pagar renta, enviar mantenimiento, listas de entrada/salida, seguro de inquilino y mantenimiento de emergencia.",
  path: "/tenants",
  lang: "es",
});

const steps = [
  { icon: "doc", title: "Cómo solicitar", body: "Solicite en línea por la aplicación de RentRedi. Aplicamos criterios consistentes y conformes a la vivienda justa a cada solicitante." },
  { icon: "dollar", title: "Pague renta", body: "Pague renta en línea por el portal del inquilino de RentRedi, con recordatorios automáticos para no atrasarse." },
  { icon: "wrench", title: "Envíe mantenimiento", body: "Envíe solicitudes no urgentes con fotos por el portal del inquilino para un servicio rápido y documentado." },
  { icon: "doc", title: "Acceda a documentos", body: "Encuentre su contrato y documentos clave en su portal del inquilino." },
];

const tenantFaqs = [
  { q: "¿Cómo pago la renta?", a: `La renta se paga en línea por el portal del inquilino de ${site.softwarePlatform}. Puede configurar recordatorios y seguir su historial de pagos.` },
  { q: "¿Cómo envío una solicitud de mantenimiento?", a: "Envíe solicitudes no urgentes con fotos por el portal del inquilino. Para emergencias de vida, llame primero al 911; para emergencias urgentes de la propiedad, llámenos." },
  { q: "¿Cuáles son sus criterios de selección?", a: "Aplicamos criterios consistentes y conformes a la vivienda justa a cada solicitante. [INSERTAR criterios de selección específicos y revisados por un abogado una vez confirmados.]" },
  { q: "¿Necesito seguro de inquilino?", a: "Se recomienda enfáticamente el seguro de inquilino (y puede ser requerido por su contrato) para proteger sus pertenencias. [INSERTAR el requisito específico del contrato.]" },
  { q: "¿Cuál es su política de mascotas?", a: "[INSERTAR política de mascotas.] Los animales de asistencia y de servicio se acomodan conforme a la ley de vivienda justa aplicable; los requisitos de documentación siguen la ley." },
];

export default function TenantsEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Inquilinos", path: "/es/tenants" }]}
        eyebrow="Para inquilinos"
        title="Una experiencia de renta clara y receptiva."
        intro="Buscamos brindar a los residentes una experiencia de renta clara y receptiva. Pague renta, envíe solicitudes de mantenimiento y acceda a información clave por el portal del inquilino."
        primary={{ label: "Portal del Inquilino", href: site.links.tenantPortal }}
        secondary={{ label: "Solicitar en Línea", href: site.links.rentRediApplication }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Lo básico para residentes" title="Todo lo que necesita, en un solo lugar." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.title} hover className="h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                <Icon name={s.icon as never} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium text-navy-800">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="font-display text-xl font-medium text-navy-800">Lista de entrada (mudanza)</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-slate-700">
              {["Complete la documentación de condición de entrada", "Configure los pagos de renta en el portal", "Confirme que los servicios estén a su nombre", "Obtenga seguro de inquilino", "Guarde el enlace de mantenimiento y los contactos de emergencia"].map((i) => (
                <li key={i} className="flex items-start gap-2.5"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />{i}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-display text-xl font-medium text-navy-800">Lista de salida (desocupar)</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-slate-700">
              {["Dé el aviso por escrito correspondiente según su contrato", "Limpie la propiedad a fondo", "Retire todas sus pertenencias y basura", "Devuelva todas las llaves, controles y dispositivos de acceso", "Proporcione una dirección de reenvío"].map((i) => (
                <li key={i} className="flex items-start gap-2.5"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />{i}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionHeading light align="left" eyebrow="Mantenimiento de emergencia" title="Cuando es urgente." intro="Para cualquier emergencia de vida, llame primero al 911. Para emergencias urgentes de la propiedad (fuga activa, sin calefacción/aire en clima extremo, peligro eléctrico), llámenos de inmediato — no espere una solicitud por el portal." />
          </div>
          <div className="lg:text-right">
            <Button href={site.phoneHref} variant="gold" size="lg"><Icon name="phone" className="h-4 w-4" /> {site.phone}</Button>
          </div>
        </div>
      </Section>

      <FaqSection items={tenantFaqs} tone="white" eyebrow="Preguntas frecuentes" title="Preguntas de inquilinos" />

      <Section tone="sand">
        <div className="mx-auto max-w-3xl rounded-2xl border border-navy-100 bg-white p-6 text-center text-sm text-slate-600">
          <strong className="text-navy-800">Igualdad de Oportunidad de Vivienda.</strong> {compliance.fairHousing.es}
        </div>
      </Section>
    </>
  );
}
