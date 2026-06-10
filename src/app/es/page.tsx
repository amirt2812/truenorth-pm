import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, serviceAreas } from "@/lib/site";
import { managementPlansEs } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard, TrustItem, Card } from "@/components/ui/Card";
import { PricingCards } from "@/components/sections/PricingCards";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { RentalAnalysisForm } from "@/components/forms/RentalAnalysisForm";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Administración de Propiedades en el Condado de Hernando | TrueNorth",
  description:
    "Administración de propiedades transparente y moderna para propietarios en el Condado de Hernando, FL. Análisis de renta gratis, precios claros, responsabilidad local y una experiencia con tecnología RentRedi.",
  path: "/",
  lang: "es",
});

const trustBullets = [
  { icon: "dollar", text: "Precios transparentes" },
  { icon: "pin", text: "Enfoque local en el Condado de Hernando" },
  { icon: "key", text: "Experiencia para propietario e inquilino con RentRedi" },
  { icon: "wrench", text: "Umbrales claros de aprobación de mantenimiento" },
  { icon: "chart", text: "Reportes mensuales para el propietario" },
  { icon: "shield", text: "Marco de cumplimiento dirigido por corredor, una vez activo" },
] as const;

const painPoints = [
  "Llamadas de inquilinos a altas horas de la noche",
  "Sorpresas de mantenimiento",
  "Riesgo de vacancia",
  "Selección débil de inquilinos",
  "Estados de cuenta poco claros",
  "Comunicación lenta del administrador",
  "Tarifas ocultas",
];

const differentiators = [
  { icon: "dollar", title: "Precios claros", body: "Planes y tarifas en lenguaje sencillo que puede leer — sin recargos vagos ni cargos sorpresa." },
  { icon: "chat", title: "Comunicación más rápida", body: "Actualizaciones puntuales y documentadas para atender los problemas pequeños antes de que se vuelvan costosos." },
  { icon: "pin", title: "Responsabilidad local", body: "Nos enfocamos en el Condado de Hernando, no en un centro de llamadas regional lejano." },
  { icon: "bolt", title: "Con tecnología avanzada", body: "Operaciones con RentRedi que mantienen pagos, mantenimiento y registros organizados." },
  { icon: "eye", title: "Visibilidad para el propietario", body: "Un portal del propietario siempre disponible con estados de cuenta, pagos y actividad." },
  { icon: "wrench", title: "Control de mantenimiento", body: "Umbrales de aprobación que usted define, con documentación de fotos y facturas." },
  { icon: "chart", title: "Estrategia de renta basada en datos", body: "Posicionamiento de renta informado por el mercado y recomendaciones de renovación." },
] as const;

const services = [
  { icon: "key", title: "Arrendamiento y colocación de inquilinos" },
  { icon: "shield", title: "Selección de inquilinos" },
  { icon: "dollar", title: "Cobro de renta" },
  { icon: "wrench", title: "Coordinación de mantenimiento" },
  { icon: "eye", title: "Inspecciones" },
  { icon: "doc", title: "Renovaciones de contrato" },
  { icon: "chart", title: "Reportes para el propietario" },
  { icon: "compass", title: "Asesoría de rendimiento de la renta" },
] as const;

const homeFaqs = [
  { q: "¿Qué áreas atienden?", a: "Atendemos Spring Hill, Brooksville, Weeki Wachee, Hernando Beach, Timber Pines y las comunidades cercanas del Condado de Hernando." },
  { q: "¿Cuánto cuesta la administración de propiedades?", a: "Nuestros planes publicados comienzan en $99/mes, con niveles Plus y Premier y opciones de arrendamiento y renovación por separado. El precio final depende del tipo de propiedad, ubicación, condición, alcance del servicio y un acuerdo de administración firmado." },
  { q: "¿Puedo aprobar las reparaciones antes de que se realicen?", a: "Sí. Usted define los umbrales de aprobación, y el mantenimiento se documenta con fotos y facturas. Los costos de proveedores son aparte de las tarifas de administración salvo que se indique lo contrario en su acuerdo." },
  { q: "¿Trabajan con propietarios que viven fuera del estado?", a: "Sí. Nuestro portal del propietario con RentRedi y los reportes mensuales claros están diseñados para que los propietarios se mantengan informados desde cualquier lugar." },
];

export default function HomeEs() {
  return (
    <>
      <HtmlLang lang="es" />
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-800 bg-compass">
        <div className="container-tn grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-300 ring-1 ring-white/15">
              <Icon name="pin" className="h-3.5 w-3.5" /> Condado de Hernando, Florida
            </span>
            <h1 className="mt-5 font-display text-display-xl font-semibold !text-white">
              Administración de Propiedades con Dirección{" "}
              <span className="text-gold-400">en el Condado de Hernando.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-100">
              {site.brand} ayuda a propietarios locales y de fuera del área a arrendar, administrar,
              mantener y optimizar viviendas de renta con precios transparentes, tecnología moderna y
              comunicación clara.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/es/free-rental-analysis" variant="gold" size="lg">
                Análisis de Renta Gratis
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <Button href="/es/pricing" variant="secondary" size="lg">
                Ver Precios
              </Button>
            </div>
            <p className="mt-4 text-sm text-navy-200">
              ¿Prefiere hablar?{" "}
              <a href={site.phoneHref} className="font-semibold text-white underline underline-offset-4">
                Llame a un administrador local
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-5">
            <Card className="border-white/10 bg-white/[0.06] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">
                Por qué los propietarios eligen TrueNorth
              </p>
              <ul className="mt-5 space-y-4">
                {trustBullets.map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                      <Icon name={b.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-[15px] leading-snug text-white">{b.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <Section tone="white">
        <SectionHeading
          eyebrow="La realidad de autoadministrar"
          title="Ser dueño de una renta no debería sentirse como un segundo trabajo."
          intro="La mayoría de los propietarios no tienen un solo problema grande — tienen una serie constante de problemas pequeños que se acumulan."
        />
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p) => (
            <div key={p} className="flex items-center gap-3 rounded-xl border border-navy-100 bg-sand-50 px-4 py-3.5">
              <Icon name="x" className="h-5 w-5 shrink-0 text-slate-400" />
              <span className="text-[15px] text-navy-800">{p}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-slate-600">
          La mayoría de los propietarios no necesitan más complejidad. Necesitan un cobro de renta
          claro, una selección confiable de inquilinos, mantenimiento documentado y un administrador
          que se comunique antes de que los problemas pequeños se vuelvan costosos.
        </p>
      </Section>

      {/* Differentiation */}
      <Section tone="sand">
        <SectionHeading eyebrow="La diferencia TrueNorth" title="Una forma más transparente de administrar su renta." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <FeatureCard key={d.title} icon={d.icon} title={d.title}>
              {d.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Lo que manejamos"
          title="Administración integral, de principio a fin."
          intro="Elija el servicio completo o arme su propio plan — cada servicio se define en un acuerdo de administración firmado."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="flex items-center gap-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="font-display text-[17px] font-medium text-navy-800">{s.title}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/es/property-management" variant="ghost">
            Explorar administración integral <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* Pricing preview */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Precios transparentes"
          title="Precios que se entienden de un vistazo."
          intro="Precios «desde» para administración integral. También hay opciones de solo arrendamiento y solo renovación."
        />
        <div className="mt-10">
          <PricingCards plans={managementPlansEs} />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-500">
          Los precios están sujetos al tipo de propiedad, ubicación, condición, alcance del servicio y
          acuerdo de administración firmado.
        </p>
        <div className="mt-8 text-center">
          <Button href="/es/pricing" variant="primary">Ver Precios Transparentes</Button>
        </div>
      </Section>

      {/* Local */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Experiencia local"
              title="Hecho para propietarios del Condado de Hernando."
              intro="Conocemos la dinámica de renta de los vecindarios de Spring Hill, las comunidades establecidas de Brooksville, el mercado costero de Hernando Beach y Weeki Wachee, y comunidades 55+ como Timber Pines. El conocimiento local define cómo fijamos precios, promovemos y administramos."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span key={area} className="rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-700">
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <LocalCard icon="home" title="A la medida de nuestro mercado" body="Casas unifamiliares, townhomes, condominios y portafolios pequeños — las rentas que realmente tienen los propietarios del Condado de Hernando." />
            <LocalCard icon="chart" title="Precios informados por el mercado" body="Posicionamiento de renta basado en comparables locales, no en promedios estatales genéricos." />
            <LocalCard icon="bolt" title="Operaciones preparadas para huracanes" body="Preparación específica de Florida para que los propietarios no estén improvisando cuando amenaza el clima." />
            <LocalCard icon="users" title="Relaciones con inquilinos" body="Servicio al residente atento y respetuoso que protege su activo y reduce la rotación." />
          </div>
        </div>
      </Section>

      {/* Comparison */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Administración tradicional vs. TrueNorth"
          title="Los propietarios rara vez se van por una sola gran falla."
          intro="Se van por frustraciones pequeñas y repetidas: tarifas poco claras, actualizaciones lentas, facturas de mantenimiento vagas y poca visibilidad. TrueNorth está diseñado para reducir esos puntos de fricción desde el principio."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <ComparisonTable lang="es" />
        </div>
      </Section>

      {/* Form */}
      <Section tone="white" id="rental-analysis">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Análisis de renta gratis"
              title="Descubra cuánto podría generar su renta."
              intro="Obtenga una estimación de renta informada por el mercado, notas sobre la preparación de la propiedad y un enfoque de administración recomendado para su propiedad en el Condado de Hernando."
            />
            <ul className="mt-6 space-y-4">
              <TrustItem icon="chart">Un rango de renta estimado e informado por el mercado</TrustItem>
              <TrustItem icon="check">Notas sobre la preparación de su propiedad para rentar</TrustItem>
              <TrustItem icon="compass">Una recomendación de administración clara y sin presión</TrustItem>
            </ul>
            <p className="mt-6 text-sm text-slate-500">
              Esta es una estimación de renta informada por el mercado — no una tasación ni una
              valoración oficial.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Card className="shadow-card-hover">
              <RentalAnalysisForm lang="es" />
            </Card>
          </div>
        </div>
      </Section>

      {/* Founder */}
      <Section tone="navy-soft">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-600">Local y dirigido por su fundador</span>
          <blockquote className="mt-4 font-display text-2xl leading-relaxed text-navy-800 sm:text-3xl">
            &ldquo;Tratar la propiedad de cada propietario como un activo que vale la pena proteger, y
            darle a los propietarios la visibilidad y capacidad de respuesta que merecen.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-slate-500">{site.founder.name}, {site.founder.title}</p>
          <div className="mt-8">
            <Button href="/es/about" variant="secondary">Conozca TrueNorth</Button>
          </div>
        </div>
      </Section>

      <FaqSection items={homeFaqs} tone="white" eyebrow="Preguntas frecuentes" title="Preguntas comunes de los propietarios" />

      <CtaBand
        lang="es"
        title="Reciba dirección para su propiedad de renta."
        subtitle="Obtenga una estimación de renta informada por el mercado y una recomendación de administración clara y sin presión para su propiedad en el Condado de Hernando."
        primary={{ label: "Análisis de Renta Gratis", href: "/es/free-rental-analysis" }}
      />
    </>
  );
}

function LocalCard({ icon, title, body }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-sand-50 p-5">
      <Icon name={icon} className="h-6 w-6 text-gold-600" />
      <h3 className="mt-3 font-display text-lg font-medium text-navy-800">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}
