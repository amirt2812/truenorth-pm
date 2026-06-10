"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Lang } from "@/lib/i18n";

type Field = { id: string; label: string; suffix?: string; prefix?: string; default: number; help?: string };

const STR = {
  en: {
    pctRent: "% of rent",
    monthly: [
      { id: "rent", label: "Estimated monthly rent", default: 1800 },
      { id: "mortgage", label: "Mortgage payment", default: 950 },
      { id: "taxes", label: "Property taxes (monthly)", default: 220 },
      { id: "insurance", label: "Insurance (monthly)", default: 160 },
      { id: "hoa", label: "HOA (monthly)", default: 0 },
      { id: "other", label: "Other monthly costs", default: 50 },
    ],
    assumptions: [
      { id: "maintenancePct", label: "Maintenance reserve", default: 8 },
      { id: "vacancyPct", label: "Vacancy assumption", default: 6 },
      { id: "mgmtPct", label: "Management fee", default: 9 },
      { id: "leasingPct", label: "Leasing fee (annualized)", default: 6, help: "Approx. annualized cost of placing a tenant, spread monthly." },
    ],
    incomeCosts: "Monthly income & costs",
    assumptionsTitle: "Assumptions",
    estCashFlow: "Estimated cash flow",
    perMo: "/mo",
    perYear: "per year (estimated)",
    rows: ["Vacancy-adjusted rent", "Management cost estimate", "Maintenance reserve", "Leasing (annualized)", "Total operating expenses", "Net operating estimate (before debt)"],
    disclaimer: "This calculator is for educational estimates only and is not financial, tax, legal, or investment advice. Figures are estimates based on the assumptions you enter.",
  },
  es: {
    pctRent: "% de la renta",
    monthly: [
      { id: "rent", label: "Renta mensual estimada", default: 1800 },
      { id: "mortgage", label: "Pago de hipoteca", default: 950 },
      { id: "taxes", label: "Impuestos (mensual)", default: 220 },
      { id: "insurance", label: "Seguro (mensual)", default: 160 },
      { id: "hoa", label: "HOA (mensual)", default: 0 },
      { id: "other", label: "Otros costos mensuales", default: 50 },
    ],
    assumptions: [
      { id: "maintenancePct", label: "Reserva de mantenimiento", default: 8 },
      { id: "vacancyPct", label: "Supuesto de vacancia", default: 6 },
      { id: "mgmtPct", label: "Tarifa de administración", default: 9 },
      { id: "leasingPct", label: "Tarifa de arrendamiento (anualizada)", default: 6, help: "Costo anualizado aprox. de colocar un inquilino, repartido por mes." },
    ],
    incomeCosts: "Ingresos y costos mensuales",
    assumptionsTitle: "Supuestos",
    estCashFlow: "Flujo de caja estimado",
    perMo: "/mes",
    perYear: "por año (estimado)",
    rows: ["Renta ajustada por vacancia", "Estimación de costo de administración", "Reserva de mantenimiento", "Arrendamiento (anualizado)", "Gastos operativos totales", "Estimación operativa neta (antes de deuda)"],
    disclaimer: "Esta calculadora es solo para estimaciones educativas y no constituye asesoría financiera, fiscal, legal ni de inversión. Las cifras son estimaciones basadas en los supuestos que ingrese.",
  },
};

export function RoiCalculator({ lang = "en" }: { lang?: Lang }) {
  const s = STR[lang];
  const monthlyInputs: Field[] = s.monthly.map((m) => ({ ...m, prefix: "$" }));
  const assumptionInputs: Field[] = s.assumptions.map((a) => ({ ...a, suffix: s.pctRent }));
  const money = (n: number) =>
    n.toLocaleString(lang === "es" ? "es-US" : "en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const [vals, setVals] = useState<Record<string, number>>(
    Object.fromEntries([...monthlyInputs, ...assumptionInputs].map((f) => [f.id, f.default]))
  );

  const set = (id: string, v: string) =>
    setVals((s) => ({ ...s, [id]: Number.isFinite(parseFloat(v)) ? parseFloat(v) : 0 }));

  const r = useMemo(() => {
    const { rent, mortgage, taxes, insurance, hoa, other, maintenancePct, vacancyPct, mgmtPct, leasingPct } = vals;
    const vacancyLoss = (rent * vacancyPct) / 100;
    const vacancyAdjustedRent = rent - vacancyLoss;
    const mgmtCost = (rent * mgmtPct) / 100;
    const leasingCost = (rent * leasingPct) / 100;
    const maintenance = (rent * maintenancePct) / 100;
    const operatingExpenses = taxes + insurance + hoa + other + maintenance + mgmtCost + leasingCost;
    const noi = vacancyAdjustedRent - operatingExpenses; // net operating estimate (before debt)
    const cashFlow = noi - mortgage;
    return {
      vacancyAdjustedRent,
      mgmtCost,
      maintenance,
      leasingCost,
      operatingExpenses,
      noi,
      monthlyCashFlow: cashFlow,
      annualCashFlow: cashFlow * 12,
    };
  }, [vals]);

  const renderField = (f: Field) => (
    <div key={f.id}>
      <label htmlFor={f.id} className="mb-1.5 block text-sm font-medium text-navy-800">
        {f.label}
      </label>
      <div className="relative">
        {f.prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{f.prefix}</span>}
        <input
          id={f.id}
          type="number"
          inputMode="decimal"
          min={0}
          value={vals[f.id]}
          onChange={(e) => set(f.id, e.target.value)}
          className={`w-full rounded-xl border border-navy-200 bg-white py-3 text-[15px] text-navy-900 focus:border-gold-400 focus:ring-2 focus:ring-gold-200 focus:outline-none ${
            f.prefix ? "pl-7 pr-3" : "px-4"
          } ${f.suffix ? "pr-20" : ""}`}
        />
        {f.suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{f.suffix}</span>}
      </div>
      {f.help && <p className="mt-1 text-xs text-slate-500">{f.help}</p>}
    </div>
  );

  const positive = r.monthlyCashFlow >= 0;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h3 className="font-display text-lg font-medium text-navy-800">{s.incomeCosts}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{monthlyInputs.map(renderField)}</div>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h3 className="font-display text-lg font-medium text-navy-800">{s.assumptionsTitle}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{assumptionInputs.map(renderField)}</div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-navy-800 text-navy-100 shadow-card">
          <div className="border-b border-navy-700 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">{s.estCashFlow}</p>
            <p className={`mt-2 font-display text-4xl font-semibold ${positive ? "text-white" : "text-red-300"}`}>
              {money(r.monthlyCashFlow)}<span className="text-lg text-navy-300">{s.perMo}</span>
            </p>
            <p className="mt-1 text-sm text-navy-200">{money(r.annualCashFlow)} {s.perYear}</p>
          </div>
          <dl className="divide-y divide-navy-700 p-6 text-sm">
            {[
              [s.rows[0], money(r.vacancyAdjustedRent)],
              [s.rows[1], money(r.mgmtCost)],
              [s.rows[2], money(r.maintenance)],
              [s.rows[3], money(r.leasingCost)],
              [s.rows[4], money(r.operatingExpenses)],
              [s.rows[5], money(r.noi)],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2.5">
                <dt className="text-navy-200">{k}</dt>
                <dd className="font-medium text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
          <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
          {s.disclaimer}
        </p>
      </div>
    </div>
  );
}
