import { Icon } from "@/components/ui/Icon";
import type { Lang } from "@/lib/i18n";

const rowsEn: { dimension: string; traditional: string; truenorth: string }[] = [
  { dimension: "Pricing transparency", traditional: "Vague fees, surprise charges", truenorth: "Published, plain-English pricing" },
  { dimension: "Communication speed", traditional: "Slow callbacks, unclear updates", truenorth: "Prompt, documented communication" },
  { dimension: "Owner visibility", traditional: "Quarterly, if at all", truenorth: "Always-on RentRedi owner portal" },
  { dimension: "Maintenance documentation", traditional: "Vague invoices", truenorth: "Photos, invoices, approval thresholds" },
  { dimension: "Technology", traditional: "Email & spreadsheets", truenorth: "RentRedi-powered operations" },
  { dimension: "Reporting", traditional: "Hard-to-read statements", truenorth: "Clear monthly owner statements" },
  { dimension: "Local accountability", traditional: "Regional call center", truenorth: "Hernando County focus" },
  { dimension: "Flexibility", traditional: "One rigid package", truenorth: "Full-service or à la carte" },
];

const rowsEs: { dimension: string; traditional: string; truenorth: string }[] = [
  { dimension: "Transparencia de precios", traditional: "Tarifas vagas, cargos sorpresa", truenorth: "Precios publicados y en lenguaje sencillo" },
  { dimension: "Velocidad de comunicación", traditional: "Respuestas lentas, actualizaciones poco claras", truenorth: "Comunicación puntual y documentada" },
  { dimension: "Visibilidad del propietario", traditional: "Trimestral, si acaso", truenorth: "Portal del propietario con RentRedi, siempre disponible" },
  { dimension: "Documentación de mantenimiento", traditional: "Facturas vagas", truenorth: "Fotos, facturas y umbrales de aprobación" },
  { dimension: "Tecnología", traditional: "Correo y hojas de cálculo", truenorth: "Operaciones con RentRedi" },
  { dimension: "Reportes", traditional: "Estados de cuenta difíciles de leer", truenorth: "Estados de cuenta mensuales claros" },
  { dimension: "Responsabilidad local", traditional: "Centro de llamadas regional", truenorth: "Enfoque en el Condado de Hernando" },
  { dimension: "Flexibilidad", traditional: "Un solo paquete rígido", truenorth: "Servicio completo o por servicio" },
];

const labels = {
  en: { caption: "Traditional property management compared with TrueNorth", col1: "What owners notice", col2: "Traditional management" },
  es: { caption: "Administración tradicional comparada con TrueNorth", col1: "Lo que notan los propietarios", col2: "Administración tradicional" },
};

export function ComparisonTable({ lang = "en" }: { lang?: Lang }) {
  const rows = lang === "es" ? rowsEs : rowsEn;
  const t = labels[lang];
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{t.caption}</caption>
        <thead>
          <tr className="bg-navy-800 text-white">
            <th scope="col" className="px-5 py-4 font-semibold">{t.col1}</th>
            <th scope="col" className="px-5 py-4 font-medium text-navy-100">{t.col2}</th>
            <th scope="col" className="px-5 py-4 font-semibold text-gold-300">TrueNorth</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {rows.map((r) => (
            <tr key={r.dimension} className="align-top">
              <th scope="row" className="px-5 py-4 font-medium text-navy-800">{r.dimension}</th>
              <td className="px-5 py-4 text-slate-500">
                <span className="flex items-start gap-2">
                  <Icon name="x" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  {r.traditional}
                </span>
              </td>
              <td className="px-5 py-4 text-navy-800">
                <span className="flex items-start gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  {r.truenorth}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
