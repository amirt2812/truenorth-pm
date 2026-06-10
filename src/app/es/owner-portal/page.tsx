import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Portal del Propietario | Experiencia con Tecnología RentRedi",
  description:
    "Vea el rendimiento de su renta en cualquier momento. La experiencia del propietario con RentRedi de TrueNorth le da estados de cuenta, seguimiento de pagos, visibilidad de mantenimiento y documentos en un solo lugar.",
  path: "/owner-portal",
  lang: "es",
});

const features = [
  { icon: "doc", title: "Estados de cuenta en línea", body: "Estados mensuales claros que puede revisar y descargar en cualquier momento." },
  { icon: "dollar", title: "Seguimiento de pagos de renta", body: "Vea la actividad de renta y los pagos sin tener que perseguir a nadie por una actualización." },
  { icon: "wrench", title: "Visibilidad de mantenimiento", body: "Siga las solicitudes de mantenimiento, su estado y la documentación con fotos y facturas." },
  { icon: "doc", title: "Acceso a documentos", body: "Contratos y documentos clave organizados en un solo lugar seguro." },
  { icon: "chart", title: "Resumen mensual de rendimiento", body: "Una vista clara de cómo se desempeña su propiedad mes a mes." },
  { icon: "eye", title: "Acceso siempre disponible", body: "Inicie sesión desde cualquier lugar — ideal para propietarios de fuera del área y del estado." },
];

export default function OwnerPortalEs() {
  return (
    <>
      <HtmlLang lang="es" />
      <PageHero
        lang="es"
        breadcrumbs={[{ name: "Portal del Propietario", path: "/es/owner-portal" }]}
        eyebrow="Operaciones con tecnología avanzada"
        title="El rendimiento de su renta, siempre a la mano."
        intro={`Nuestra experiencia del propietario con ${site.softwarePlatform} reemplaza las conjeturas de la administración tradicional con visibilidad real — estados de cuenta, pagos, mantenimiento y documentos en un solo lugar.`}
        primary={{ label: "Iniciar Sesión en el Portal", href: site.links.ownerPortal }}
        secondary={{ label: "Solicitar una Demostración", href: "/es/contact?topic=proposal" }}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Lo que verá" title="Visibilidad, no mensajes de voz." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon as never} title={f.title}>
              {f.body}
            </FeatureCard>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          Usamos {site.softwarePlatform} según su diseño y no exageramos lo que el software puede hacer.
          Las funciones disponibles pueden evolucionar conforme la plataforma se actualice.
        </p>
      </Section>

      <Section tone="navy">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading light eyebrow="Véalo usted mismo" title="¿Quiere un recorrido?" intro="Agende una consulta y le mostraremos exactamente cómo se ven los reportes del propietario para una propiedad como la suya." />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/es/schedule" variant="gold" size="lg"><Icon name="calendar" className="h-4 w-4" /> Agendar una Consulta</Button>
            <Button href="/es/free-rental-analysis" variant="secondary" size="lg">Análisis de Renta Gratis</Button>
          </div>
        </div>
      </Section>

      <CtaBand
        lang="es"
        title="¿Listo para ver su propiedad con esta claridad?"
        subtitle="Solicite una propuesta y configuraremos su experiencia de propietario desde el primer día."
        primary={{ label: "Solicitar una Propuesta de Administración", href: "/es/contact?topic=proposal" }}
      />
    </>
  );
}
