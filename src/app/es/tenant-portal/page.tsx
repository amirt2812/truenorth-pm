import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard, Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Portal del Inquilino | Pague Renta y Envíe Mantenimiento en Línea",
  description:
    "Residentes de TrueNorth: paguen renta, envíen solicitudes de mantenimiento y accedan a documentos por el portal del inquilino de RentRedi. Comunicación clara y guía de mantenimiento de emergencia.",
  path: "/tenant-portal",
  lang: "es",
});

const features = [
  { icon: "dollar", title: "Pague renta en línea", body: "Pague de forma segura por el portal del inquilino de RentRedi, con recordatorios e historial de pagos." },
  { icon: "wrench", title: "Envíe mantenimiento", body: "Envíe solicitudes no urgentes con fotos para que los problemas se documenten y atiendan rápido." },
  { icon: "doc", title: "Acceda a documentos", body: "Encuentre su contrato y documentos clave cuando los necesite." },
  { icon: "chat", title: "Comunicación centralizada", body: "Mantenga organizadas sus conversaciones sobre la renta en un solo lugar." },
];

export default function TenantPortalEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[
          { name: "Inquilinos", path: "/es/tenants" },
          { name: "Portal del Inquilino", path: "/es/tenant-portal" },
        ]}
        eyebrow="Para residentes"
        title="Pague renta y envíe mantenimiento en minutos."
        intro={`Todo lo que los residentes necesitan está en el portal del inquilino de ${site.softwarePlatform} — pagos de renta, solicitudes de mantenimiento y documentos, disponibles en cualquier momento.`}
        primary={{ label: "Acceder al Portal del Inquilino", href: site.links.tenantPortal }}
        secondary={{ label: "Solicitar en Línea", href: site.links.rentRediApplication }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="En el portal" title="Simple, organizado y en línea." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon as never} title={f.title}>
              {f.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="font-display text-xl font-medium text-navy-800">Expectativas de comunicación</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Buscamos confirmar las solicitudes con prontitud y mantenerlo informado a medida que se
              programa el trabajo. Enviar las solicitudes por el portal (en lugar de mensaje o correo)
              nos ayuda a responder más rápido y a mantener un registro claro para todos.
            </p>
          </Card>
          <Card className="border-gold-200 bg-gold-50">
            <h3 className="flex items-center gap-2 font-display text-xl font-medium text-navy-800">
              <Icon name="bolt" className="h-5 w-5 text-gold-700" /> Mantenimiento de emergencia
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
              Para cualquier emergencia de vida, llame primero al <strong>911</strong>. Para emergencias
              urgentes de la propiedad — fuga de agua activa, sin calefacción/aire en clima extremo, olor
              a gas o peligro eléctrico — llámenos de inmediato al{" "}
              <a href={site.phoneHref} className="text-navy-600 underline">{site.phone}</a> en lugar de
              esperar una solicitud por el portal.
            </p>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <Button href={site.links.tenantPortal} variant="gold" size="lg">
            <Icon name="key" className="h-4 w-4" /> Acceder al Portal del Inquilino
          </Button>
        </div>
      </Section>
    </>
  );
}
