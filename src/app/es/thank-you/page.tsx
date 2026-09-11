import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

export const metadata: Metadata = pageMeta({
  title: "Gracias",
  description: "Gracias por comunicarse con TrueNorth Property Management.",
  path: "/thank-you",
  lang: "es",
  noindex: true,
});

const messages: Record<string, { title: string; body: string }> = {
  "rental-analysis": {
    title: "Gracias — recibimos su solicitud de análisis de renta.",
    body: "Revisaremos los detalles de la propiedad y le enviaremos un rango de renta, una recomendación de administración y los próximos pasos.",
  },
  consultation: {
    title: "Gracias — recibimos su solicitud de consulta.",
    body: "Nos comunicaremos pronto para confirmar un horario y hablar sobre su propiedad y sus metas.",
  },
  founding: {
    title: "Está en la lista de Propietarios Fundadores.",
    body: "Gracias por su interés. Nos comunicaremos a medida que abramos los lugares de propietario fundador en el Condado de Hernando.",
  },
  switch: {
    title: "Gracias — empecemos su cambio.",
    body: "Revisaremos su situación y le contactaremos en un día hábil con los próximos pasos y la lista de lo que debe solicitar a su administrador actual.",
  },
  default: {
    title: "Gracias por comunicarse.",
    body: "Recibimos su mensaje y le responderemos lo antes posible.",
  },
};

export default function ThankYouEs({ searchParams }: { searchParams: { type?: string } }) {
  const msg = messages[searchParams.type ?? "default"] ?? messages.default;
  return (
    <section className="bg-sand-100">
      <HtmlLang lang="es" />
      <div className="container-tn flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-700">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-display-md">{msg.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-600">{msg.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/es" variant="primary">Volver al Inicio</Button>
          <Button href={site.phoneHref} variant="secondary">
            <Icon name="phone" className="h-4 w-4" /> Llámenos
          </Button>
        </div>
      </div>
    </section>
  );
}
