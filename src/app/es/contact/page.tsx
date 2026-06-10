import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, serviceAreas } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Contacte a TrueNorth Property Management | Condado de Hernando, FL",
  description:
    "Hable con un administrador de propiedades local del Condado de Hernando. Solicite una propuesta, agende una consulta o haga una pregunta. Atendemos Spring Hill, Brooksville, Weeki Wachee y Hernando Beach.",
  path: "/contact",
  lang: "es",
});

export default function ContactEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <section className="bg-navy-800 bg-compass">
        <div className="container-tn py-12 sm:py-16">
          <Breadcrumbs lang="es" items={[{ name: "Contacto", path: "/es/contact" }]} />
          <div className="mt-6 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Contacto</p>
            <h1 className="font-display text-display-lg font-semibold !text-white">
              Hable con un administrador de propiedades local.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-100">
              Solicite una propuesta, agende una consulta o simplemente haga una pregunta. Somos
              locales del Condado de Hernando y con gusto le ayudamos.
            </p>
          </div>
        </div>
      </section>

      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card className="shadow-card-hover">
              <h2 className="font-display text-xl font-medium text-navy-800">Envíenos un mensaje</h2>
              <p className="mt-1 text-sm text-slate-500">Le responderemos lo antes posible.</p>
              <div className="mt-6">
                <LeadForm
                  formId="contact"
                  lang="es"
                  thankYouType="default"
                  topicOptions={[
                    "Solicitar una propuesta de administración",
                    "Agendar una consulta de propietario",
                    "Análisis de renta gratis",
                    "Asociación de referidos de agentes",
                    "Solicitud de proveedor",
                    "Unirme a la Lista de Propietarios Fundadores",
                    "Soy inquilino actual",
                    "Otra cosa",
                  ]}
                  showAddress
                  submitLabel="Enviar Mensaje"
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Card>
              <h2 className="font-display text-lg font-medium text-navy-800">Póngase en contacto</h2>
              <ul className="mt-4 space-y-4 text-[15px]">
                <li className="flex items-center gap-3">
                  <Icon name="phone" className="h-5 w-5 text-gold-600" />
                  <a href={site.phoneHref} className="text-navy-800 hover:text-gold-600">{site.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="chat" className="h-5 w-5 text-gold-600" />
                  <a href={site.emailHref} className="text-navy-800 hover:text-gold-600">{site.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="pin" className="h-5 w-5 text-gold-600" />
                  <span className="text-navy-800">{site.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="clock" className="h-5 w-5 text-gold-600" />
                  <span className="text-navy-800">{site.businessHours}</span>
                </li>
              </ul>
              <Button href="/es/schedule" variant="gold" className="mt-6 w-full">
                <Icon name="calendar" className="h-4 w-4" /> Agendar una Consulta
              </Button>
            </Card>

            <Card className="overflow-hidden p-0">
              <iframe
                title="Área de servicio de TrueNorth Property Management"
                src="https://www.google.com/maps?q=Brooksville,+FL&z=10&output=embed"
                className="aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-5">
                <p className="text-sm font-medium text-navy-800">Área de servicio</p>
                <p className="mt-1 text-sm text-slate-600">{serviceAreas.join(" · ")} y comunidades cercanas del Condado de Hernando.</p>
              </div>
            </Card>

            <div className="rounded-2xl border border-gold-200 bg-gold-50 p-5">
              <p className="flex items-center gap-2 font-medium text-navy-800">
                <Icon name="bolt" className="h-4 w-4 text-gold-700" /> Inquilinos actuales
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Envíe el mantenimiento no urgente a través del{" "}
                <a href="/es/tenant-portal" className="text-navy-600 underline">portal del inquilino</a>. Para
                una emergencia de vida, llame primero al 911. Para emergencias urgentes de la propiedad,
                llame al{" "}
                <a href={site.phoneHref} className="text-navy-600 underline">{site.phone}</a>.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
