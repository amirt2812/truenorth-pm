import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HtmlLang } from "@/components/layout/HtmlLang";

/** Spanish 404, server-rendered. Triggered by the /es catch-all route. */
export default function NotFoundEs() {
  return (
    <section className="bg-sand-100">
      <HtmlLang lang="es" />
      <div className="container-tn flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <Icon name="compass" className="h-12 w-12 text-gold-500" />
        <p className="mt-4 font-display text-6xl font-semibold text-navy-800">404</p>
        <h1 className="mt-2 text-display-md">Esta página está fuera del mapa.</h1>
        <p className="mt-3 max-w-md text-lg text-slate-600">
          La página que busca no existe o se ha movido. Volvamos al rumbo correcto.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/es" variant="primary">Volver al Inicio</Button>
          <Button href="/es/free-rental-analysis" variant="gold">Análisis de Renta Gratis</Button>
        </div>
      </div>
    </section>
  );
}
