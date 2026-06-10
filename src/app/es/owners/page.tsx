import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Para Propietarios | Servicios para Arrendadores del Condado de Hernando",
  description:
    "Cómo es trabajar con TrueNorth para los propietarios — incorporación, arrendamiento, selección, controles de mantenimiento, reportes mensuales, renovaciones y apoyo de fin de año.",
  path: "/owners",
  lang: "es",
});

const journey = [
  { title: "Incorporación del propietario", body: "Conocemos sus metas, configuramos su portal y definimos umbrales de aprobación y preferencias de reportes." },
  { title: "Evaluación de preparación", body: "Un recorrido y recomendaciones sobre qué ayuda a que la propiedad se rente más rápido y conserve su valor." },
  { title: "Estrategia de arrendamiento", body: "Posicionamiento de renta informado por el mercado, publicación profesional y visitas coordinadas." },
  { title: "Selección de inquilinos", body: "Un proceso consistente y conforme a la vivienda justa, aplicado a cada solicitante." },
  { title: "Firma del contrato", body: "Preparación del contrato, firma, manejo del depósito según la ley de Florida y entrada documentada." },
  { title: "Controles de mantenimiento", body: "Umbrales de aprobación que usted define, con documentación de fotos y facturas." },
  { title: "Reportes mensuales", body: "Estados de cuenta claros y un resumen de rendimiento en su portal del propietario." },
  { title: "Planificación de renovaciones", body: "Recomendaciones de renovación informadas por el mercado para conservar buenos inquilinos." },
  { title: "Apoyo de fin de año", body: "Documentación de fin de año para facilitar la temporada de impuestos (no brindamos asesoría fiscal)." },
];

const ownerFaqs = [
  { q: "¿Cómo empiezo?", a: "Comience con un análisis de renta gratis o solicite una propuesta. Si es adecuado, le enviaremos un acuerdo de administración e iniciaremos la incorporación." },
  { q: "¿Con qué frecuencia tendré noticias suyas?", a: "Tendrá visibilidad siempre disponible por el portal del propietario, estados de cuenta mensuales claros y contacto proactivo cuando algo requiera su decisión." },
  { q: "¿Puedo poner límites de gasto en las reparaciones?", a: "Sí — usted define un umbral de aprobación, y le consultamos antes de superarlo (salvo emergencias reales)." },
  { q: "¿Qué pasa si cambio de otro administrador?", a: "Le ayudaremos a coordinar una transición limpia, sujeta a su acuerdo actual y a un acuerdo firmado con nosotros." },
];

export default function OwnersEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Propietarios", path: "/es/owners" }]}
        eyebrow="Para propietarios"
        title="Administración de propiedades centrada en el propietario, de principio a fin."
        intro="La mayoría de los propietarios no necesitan más complejidad. Necesitan un cobro de renta claro, selección confiable, mantenimiento documentado y un administrador que se comunique a tiempo. Así se ve eso con TrueNorth."
        primary={{ label: "Análisis de Renta Gratis", href: "/es/free-rental-analysis" }}
        secondary={{ label: "Solicitar una Propuesta", href: "/es/contact?topic=proposal" }}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow="El recorrido del propietario"
              title="Un camino claro desde la primera llamada hasta la renovación."
              intro="Cada paso se documenta para que siempre sepa qué está pasando con su propiedad."
            />
            <div className="mt-6 flex flex-col gap-3">
              <Button href="/es/owner-portal" variant="secondary">Explorar el Portal del Propietario</Button>
              <Button href="/es/roi-calculator" variant="ghost">Probar la Calculadora de Rentabilidad <Icon name="arrow-right" className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ProcessSteps steps={journey} />
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Lo que recibe" title="Visibilidad, control y transparencia." />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Card hover><Icon name="eye" className="h-6 w-6 text-gold-600" /><h3 className="mt-3 font-display text-lg text-navy-800">Visibilidad siempre disponible</h3><p className="mt-1 text-sm text-slate-600">Estados de cuenta, pagos y actividad en su portal del propietario.</p></Card>
          <Card hover><Icon name="wrench" className="h-6 w-6 text-gold-600" /><h3 className="mt-3 font-display text-lg text-navy-800">Control de mantenimiento</h3><p className="mt-1 text-sm text-slate-600">Umbrales de aprobación que usted define, totalmente documentados.</p></Card>
          <Card hover><Icon name="dollar" className="h-6 w-6 text-gold-600" /><h3 className="mt-3 font-display text-lg text-navy-800">Precios transparentes</h3><p className="mt-1 text-sm text-slate-600">Planes que puede leer, sin tarifas basura sorpresa.</p></Card>
        </div>
      </Section>

      <FaqSection items={ownerFaqs} tone="white" eyebrow="Preguntas frecuentes" title="Preguntas de propietarios" />
      <CtaBand lang="es" />
    </>
  );
}
