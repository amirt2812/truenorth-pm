"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Field = { id: string; label: string; suffix?: string; prefix?: string; default: number; help?: string };

const monthlyInputs: Field[] = [
  { id: "rent", label: "Estimated monthly rent", prefix: "$", default: 1800 },
  { id: "mortgage", label: "Mortgage payment", prefix: "$", default: 950 },
  { id: "taxes", label: "Property taxes (monthly)", prefix: "$", default: 220 },
  { id: "insurance", label: "Insurance (monthly)", prefix: "$", default: 160 },
  { id: "hoa", label: "HOA (monthly)", prefix: "$", default: 0 },
  { id: "other", label: "Other monthly costs", prefix: "$", default: 50 },
];

const assumptionInputs: Field[] = [
  { id: "maintenancePct", label: "Maintenance reserve", suffix: "% of rent", default: 8 },
  { id: "vacancyPct", label: "Vacancy assumption", suffix: "% of rent", default: 6 },
  { id: "mgmtPct", label: "Management fee", suffix: "% of rent", default: 9 },
  { id: "leasingPct", label: "Leasing fee (annualized)", suffix: "% of rent", default: 6, help: "Approx. annualized cost of placing a tenant, spread monthly." },
];

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function RoiCalculator() {
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
          <h3 className="font-display text-lg font-medium text-navy-800">Monthly income & costs</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{monthlyInputs.map(renderField)}</div>
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card">
          <h3 className="font-display text-lg font-medium text-navy-800">Assumptions</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">{assumptionInputs.map(renderField)}</div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-navy-800 text-navy-100 shadow-card">
          <div className="border-b border-navy-700 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-300">Estimated cash flow</p>
            <p className={`mt-2 font-display text-4xl font-semibold ${positive ? "text-white" : "text-red-300"}`}>
              {money(r.monthlyCashFlow)}<span className="text-lg text-navy-300">/mo</span>
            </p>
            <p className="mt-1 text-sm text-navy-200">{money(r.annualCashFlow)} per year (estimated)</p>
          </div>
          <dl className="divide-y divide-navy-700 p-6 text-sm">
            {[
              ["Vacancy-adjusted rent", money(r.vacancyAdjustedRent)],
              ["Management cost estimate", money(r.mgmtCost)],
              ["Maintenance reserve", money(r.maintenance)],
              ["Leasing (annualized)", money(r.leasingCost)],
              ["Total operating expenses", money(r.operatingExpenses)],
              ["Net operating estimate (before debt)", money(r.noi)],
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
          This calculator is for educational estimates only and is not financial, tax, legal, or
          investment advice. Figures are estimates based on the assumptions you enter.
        </p>
      </div>
    </div>
  );
}
