import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { compliance } from "@/lib/site";
import { managementPlansEs, aLaCartePlansEs } from "@/lib/pricing";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PricingCards } from "@/components/sections/PricingCards";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Precios Transparentes de Administración de Propiedades | Condado de Hernando",
  description:
    "Precios claros y publicados de administración de propiedades para el Condado de Hernando, FL. Planes integrales desde $99/mes, además de opciones de solo arrendamiento, solo renovación y por servicio.",
  path: "/pricing",
  lang: "es",
});

const feeTransparency = [
  { icon: "dollar", title: "Tarifa de administración clara", body: "Una tarifa mensual directa por plan — no un blanco móvil." },
  { icon: "key", title: "Tarifa de arrendamiento clara", body: "Colocación de inquilinos con precio definido antes de iniciar cualquier trabajo." },
  { icon: "doc", title: "Tarifa de renovación clara", body: "Una tarifa de renovación definida para que sepa el costo de conservar un buen inquilino." },
  { icon: "eye", title: "Precio de inspección claro", body: "Frecuencia y precio de inspecciones detallados en su acuerdo." },
  { icon: "wrench", title: "Política de coordinación de mantenimiento", body: "Umbrales de aprobación que usted define; los costos de proveedores son aparte y documentados." },
  { icon: "shield", title: "Umbrales de aprobación del propietario", body: "Usted decide el monto por encima del cual le consultamos primero." },
];

const feesWeAvoid = [
  "Sin recargos ocultos en mantenimiento",
  "Sin tarifas basura confusas",
  "Sin términos de cancelación poco claros",
  "Sin cargos sorpresa escondidos en los estados de cuenta",
];

const pricingFaqs = [
  { q: "¿Cuánto cuesta la administración de propiedades?", a: "Los planes integrales comienzan en $99/mes (Essential), $149/mes (Plus) y $229/mes (Premier). El servicio de solo arrendamiento comienza en 75% de la primera renta (tarifa mínima por confirmar), y solo renovación comienza en $299. El precio final depende del tipo de propiedad, ubicación, condición, alcance del servicio y un acuerdo de administración firmado." },
  { q: "¿Ofrecen servicios de solo arrendamiento?", a: "Sí. Nuestro servicio de Solo Arrendamiento maneja la promoción, selección, visitas y firma del contrato para propietarios que autoadministran el día a día." },
  { q: "¿Hay tarifas de configuración o cancelación?", a: "Cualquier término de configuración o cancelación se indica con claridad en su acuerdo de administración antes de firmar. Evitamos términos de cancelación poco claros." },
  { q: "¿El precio es igual para todas las propiedades?", a: "No. El precio depende del tipo de propiedad, ubicación, condición y alcance del servicio, por eso entregamos una propuesta clara para su propiedad específica." },
  { q: "¿Los costos de proveedores/mantenimiento están incluidos en la tarifa mensual?", a: "No. Los costos de proveedores para reparaciones son aparte de las tarifas de administración salvo que se indique lo contrario en su acuerdo, y se documentan con fotos y facturas." },
];

export default function PricingEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Precios", path: "/es/pricing" }]}
        eyebrow="Precios transparentes"
        title="Precios hechos para leerse, no para descifrarse."
        intro="Ganamos por transparencia. Así funcionan nuestros planes y tarifas — en lenguaje sencillo, antes de que firme cualquier acuerdo."
        primary={{ label: "Solicitar una Propuesta", href: "/es/contact?topic=proposal" }}
        secondary={{ label: "Análisis de Renta Gratis", href: "/es/free-rental-analysis" }}
      />

      <Section tone="sand">
        <SectionHeading
          eyebrow="Administración integral"
          title="Elija el nivel de administración que le convenga."
          intro="Precios «desde». Cada plan se define en un acuerdo de administración firmado para su propiedad específica."
        />
        <div className="mt-10">
          <PricingCards plans={managementPlansEs} />
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Opciones flexibles"
          title="Solo arrendamiento, solo renovación o arme su plan."
          intro="¿Autoadministra pero quiere ayuda con lo difícil? Elija exactamente lo que necesita."
        />
        <div className="mt-10">
          <PricingCards plans={aLaCartePlansEs} />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-500">{compliance.pricingDisclaimer.es}</p>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Transparencia de tarifas" title="Por qué paga — y por qué no." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {feeTransparency.map((f) => (
            <div key={f.title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                <Icon name={f.icon as never} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium text-navy-800">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-gold-200 bg-white p-7 shadow-card">
          <h3 className="font-display text-xl font-medium text-navy-800">Tarifas que trabajamos por evitar</h3>
          <p className="mt-1 text-sm text-slate-500">
            Nuestro objetivo es reducir las pequeñas frustraciones que alejan a los propietarios de los administradores tradicionales.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {feesWeAvoid.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] text-navy-800">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FaqSection items={pricingFaqs} tone="white" eyebrow="Preguntas frecuentes" title="Preguntas sobre precios" />

      <CtaBand
        lang="es"
        title="¿Quiere precios para su propiedad específica?"
        subtitle="Solicite una propuesta de administración y prepararemos precios claros para su renta en el Condado de Hernando."
        primary={{ label: "Solicitar una Propuesta de Administración", href: "/es/contact?topic=proposal" }}
      />
    </>
  );
}
