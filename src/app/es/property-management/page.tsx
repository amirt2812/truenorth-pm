import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { compliance } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard, Card } from "@/components/ui/Card";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Administración Integral de Propiedades para Propietarios del Condado de Hernando",
  description:
    "Administración integral de propiedades en el Condado de Hernando, FL: arrendamiento, selección, cobro de renta, mantenimiento, inspecciones, renovaciones y reportes — con precios transparentes y responsabilidad local.",
  path: "/property-management",
  lang: "es",
});

const whoFor = [
  "Propietarios que autoadministran y están listos para delegar el día a día",
  "Propietarios accidentales que rentan una casa heredada o anterior",
  "Propietarios de fuera del estado que necesitan ojos locales y reportes claros",
  "Inversionistas con portafolios pequeños que quieren sistemas consistentes",
  "Propietarios con una renta vacía que pierde ingresos cada mes",
  "Propietarios frustrados con su administrador actual",
];

const included = [
  { icon: "key", title: "Arrendamiento y colocación", body: "Precio informado por el mercado, publicación, visitas y firma del contrato." },
  { icon: "shield", title: "Selección de inquilinos", body: "Un proceso de selección consistente y conforme a la ley de vivienda justa." },
  { icon: "dollar", title: "Cobro de renta", body: "Cobro de renta en línea y recordatorios con RentRedi." },
  { icon: "wrench", title: "Coordinación de mantenimiento", body: "Triaje, envío de proveedores y documentación con fotos y facturas." },
  { icon: "eye", title: "Inspecciones", body: "Inspecciones periódicas para proteger su activo (frecuencia según el plan)." },
  { icon: "doc", title: "Renovaciones de contrato", body: "Precio de renovación informado por el mercado y papeleo gestionado por usted." },
  { icon: "chart", title: "Reportes para el propietario", body: "Estados de cuenta mensuales claros y un resumen de rendimiento." },
  { icon: "compass", title: "Asesoría de rendimiento", body: "Recomendaciones prácticas para optimizar su renta con el tiempo." },
];

const optional = [
  "Mayor frecuencia de inspecciones",
  "Apoyo en planificación de capex y renovaciones",
  "Coordinación de proyectos/acondicionamiento",
  "Reportes de portafolio",
  "Punto de contacto dedicado",
];

const onboarding = [
  { title: "Incorporación del propietario", body: "Conocemos sus metas, revisamos la propiedad y configuramos su portal, umbrales de aprobación y preferencias de reportes." },
  { title: "Evaluación de preparación", body: "Evaluamos la condición y recomendamos qué (si algo) ayuda a que la propiedad se rente más rápido y conserve su valor." },
  { title: "Arrendamiento y promoción", body: "Posicionamiento de renta informado por el mercado, publicación profesional y visitas coordinadas." },
  { title: "Selección de inquilinos", body: "Un proceso consistente y conforme a la vivienda justa, aplicado a cada solicitante." },
  { title: "Firma del contrato", body: "Preparación del contrato, firma, manejo del depósito según la ley de Florida y documentación de entrada." },
  { title: "Administración continua", body: "Cobro de renta, coordinación de mantenimiento, inspecciones y reportes mensuales claros." },
  { title: "Renovaciones y revisiones", body: "Recomendaciones de renovación informadas por el mercado y revisiones periódicas de rendimiento." },
];

const pmFaqs = [
  { q: "¿Qué está incluido vs. opcional?", a: "Los servicios principales — apoyo de arrendamiento, selección, cobro de renta, coordinación de mantenimiento y reportes — están incluidos según el plan. Inspecciones mejoradas, planificación de capex y contacto dedicado están disponibles en niveles superiores o por servicio. Su acuerdo de administración define exactamente qué está incluido." },
  { q: "¿Puedo aprobar las reparaciones antes de que se realicen?", a: "Sí. Usted define un umbral de aprobación. Por debajo de él, coordinamos las reparaciones de rutina y las documentamos; por encima, le consultamos primero (salvo emergencias reales que protejan la salud, la seguridad o la propiedad)." },
  { q: "¿Cómo manejan emergencias y huracanes?", a: "Las solicitudes de mantenimiento se clasifican en emergencia vs. no emergencia. Para eventos climáticos de Florida seguimos un proceso de preparación para que los propietarios no estén improvisando. Las reparaciones de emergencia que protegen la propiedad pueden proceder antes de la aprobación y luego se documentan." },
  { q: "¿Manejan desalojos?", a: "TrueNorth puede coordinar la documentación y la entrega a un abogado cuando se requiere acción legal. Los servicios legales los brindan únicamente abogados con licencia; no brindamos representación ni asesoría legal." },
  { q: "¿Cómo se manejan los depósitos de seguridad?", a: "El manejo del depósito de seguridad se realiza de acuerdo con la ley aplicable de Florida y el contrato/acuerdo de administración firmado." },
];

export default function PropertyManagementEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Administración de Propiedades", path: "/es/property-management" }]}
        eyebrow="Administración integral"
        title="Administración integral para propietarios del Condado de Hernando."
        intro="Arrendamiento, selección, cobro de renta, mantenimiento, inspecciones, renovaciones y reportes — manejados con precios transparentes, tecnología moderna y responsabilidad local."
        primary={{ label: "Solicitar una Propuesta de Administración", href: "/es/contact?topic=proposal" }}
        secondary={{ label: "Ver Precios", href: "/es/pricing" }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Para quién es" title="Hecho para las rentas que realmente tienen los propietarios del Condado de Hernando." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {whoFor.map((w) => (
            <div key={w} className="flex items-start gap-3 rounded-xl border border-navy-100 bg-sand-50 px-4 py-3.5">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <span className="text-[15px] text-navy-800">{w}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Qué está incluido" title="Todo lo que mantiene una renta funcionando bien." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {included.map((s) => (
            <FeatureCard key={s.title} icon={s.icon as never} title={s.title}>
              {s.body}
            </FeatureCard>
          ))}
        </div>

        <Card className="mx-auto mt-10 max-w-3xl">
          <h3 className="font-display text-xl font-medium text-navy-800">Servicios opcionales y complementarios</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {optional.map((o) => (
              <li key={o} className="flex items-start gap-2.5 text-[15px] text-slate-700">
                <Icon name="arrow-right" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {o}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow="Cómo funciona"
              title="Un camino claro desde la incorporación hasta la renovación."
              intro="Cada paso se documenta para que siempre sepa qué está pasando con su propiedad."
            />
          </div>
          <div className="lg:col-span-8">
            <ProcessSteps steps={onboarding} />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Mantenimiento, bien hecho"
          title="Mantenimiento documentado con umbrales de aprobación que usted controla."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <ProcessSteps
            steps={[
              { title: "El inquilino envía una solicitud", body: "Los residentes envían solicitudes de mantenimiento con fotos a través del portal del inquilino de RentRedi." },
              { title: "Hacemos el triaje", body: "Cada solicitud se clasifica como emergencia o no emergencia para priorizar los problemas urgentes." },
              { title: "Verificación del umbral de aprobación", body: "El trabajo de rutina por debajo de su umbral se coordina; el trabajo mayor se le envía para aprobación primero." },
              { title: "Envío de proveedor", body: "Coordinamos un proveedor y programamos el trabajo." },
              { title: "Documentado y facturado", body: "Se registran fotos y facturas para que haya un rastro claro." },
              { title: "Propietario informado", body: "Usted ve la actividad y el resultado en su portal del propietario y estados de cuenta." },
            ]}
          />
          <p className="mt-8 text-sm text-slate-500">
            Los costos de proveedores son aparte de las tarifas de administración salvo que se indique
            lo contrario en el acuerdo de administración.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Por qué cambian los propietarios"
          title="Una forma más transparente de administrar su renta."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <ComparisonTable lang="es" />
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          {compliance.servicesSubjectToAgreement.es}
        </p>
      </Section>

      <FaqSection items={pmFaqs} tone="sand" eyebrow="Preguntas frecuentes" title="Preguntas sobre administración de propiedades" />

      <CtaBand
        lang="es"
        title="¿Listo para una administración de propiedades con dirección?"
        subtitle="Solicite una propuesta y detallaremos el alcance y precios claros para su renta en el Condado de Hernando."
        primary={{ label: "Solicitar una Propuesta de Administración", href: "/es/contact?topic=proposal" }}
      />
    </>
  );
}
