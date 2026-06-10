import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site, serviceAreaSentence } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { FounderAvatar } from "@/components/ui/FounderAvatar";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Sobre TrueNorth Property Management | Local y Dirigida por su Fundador",
  description:
    "TrueNorth Property Management aporta precios transparentes, tecnología moderna y responsabilidad local a los propietarios del Condado de Hernando. Conozca por qué existimos y qué valoramos.",
  path: "/about",
  lang: "es",
});

const founderBioEs =
  "Alfredo Mirt es el fundador de TrueNorth Property Management y un inversionista local de bienes raíces del Condado de Hernando. Fundó TrueNorth para llevar sistemas de calidad institucional — precios transparentes, tecnología moderna y comunicación clara y proactiva — a los arrendadores residenciales locales que han sido mal atendidos por los administradores tradicionales. Su enfoque es simple: tratar la propiedad de cada propietario como un activo que vale la pena proteger, y darles a los propietarios la visibilidad y capacidad de respuesta que merecen.";

const values = [
  { icon: "compass", title: "Claridad", body: "Precios en lenguaje sencillo, comunicación clara y reportes que realmente puede leer." },
  { icon: "chat", title: "Capacidad de respuesta", body: "Nos comunicamos a tiempo — antes de que los problemas pequeños se vuelvan costosos." },
  { icon: "shield", title: "Responsabilidad", body: "Propiedad local que respalda el trabajo y la documentación." },
  { icon: "bolt", title: "Disciplina operativa", body: "Sistemas consistentes y tecnología moderna, aplicados a cada propiedad." },
  { icon: "eye", title: "Transparencia centrada en el propietario", body: "Sin recargos ocultos ni tarifas sorpresa — sus intereses van primero." },
];

export default function AboutEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Nosotros", path: "/es/about" }]}
        eyebrow="Sobre TrueNorth"
        title="Administración de propiedades con dirección."
        intro={`${site.brand} existe para darles a los propietarios del Condado de Hernando una forma más clara, moderna y responsable de administrar su renta — sin la fricción que los propietarios han llegado a esperar de los administradores tradicionales.`}
        primary={{ label: "Análisis de Renta Gratis", href: "/es/free-rental-analysis" }}
        secondary={{ label: "Ver Precios", href: "/es/pricing" }}
      />

      <Section tone="white">
        <div className="prose-tn mx-auto">
          <h2>Por qué existe TrueNorth</h2>
          <p>
            La mayoría de los propietarios no dejan a un administrador por una sola gran falla. Se van
            por frustraciones pequeñas y repetidas — tarifas poco claras, actualizaciones lentas,
            facturas de mantenimiento vagas y poca visibilidad. Creamos TrueNorth para eliminar esos
            puntos de fricción desde el principio.
          </p>
          <h2>Enfoque local</h2>
          <p>
            Nos enfocamos en el Condado de Hernando: {serviceAreaSentence} El conocimiento local define
            cómo fijamos precios, promovemos y administramos — porque un townhome en Spring Hill y una
            casa frente al canal en Hernando Beach no son la misma renta.
          </p>
          <h2>Filosofía de precios transparentes</h2>
          <p>
            Los precios deberían poder leerse. Publicamos nuestros planes, definimos nuestras tarifas y
            ponemos todo en un acuerdo de administración firmado para que los propietarios sepan
            exactamente por qué están pagando.
          </p>
          <h2>Operaciones con tecnología avanzada</h2>
          <p>
            Funcionamos con {site.softwarePlatform} para que propietarios e inquilinos tengan una
            experiencia moderna y organizada — pagos en línea, mantenimiento documentado y visibilidad
            real del propietario — en lugar de un revoltijo de mensajes, correos y hojas de cálculo.
          </p>
        </div>
      </Section>

      <Section tone="sand">
        <Card className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <FounderAvatar className="h-28 w-28" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-600">Fundador</p>
              <h2 className="mt-1 font-display text-2xl text-navy-800">{site.founder.name}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{founderBioEs}</p>
            </div>
          </div>
        </Card>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Lo que valoramos" title="Los principios detrás de cada propiedad que administramos." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => (
            <Card key={v.title} hover className="h-full">
              <Icon name={v.icon as never} className="h-6 w-6 text-gold-600" />
              <h3 className="mt-3 font-display text-lg font-medium text-navy-800">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand lang="es" />
    </>
  );
}
