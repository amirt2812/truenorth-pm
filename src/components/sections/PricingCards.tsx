import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Plan } from "@/lib/pricing";

export function PricingCards({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative flex flex-col rounded-2xl border bg-white p-7 ${
            plan.featured
              ? "border-gold-400 shadow-card-hover ring-1 ring-gold-200"
              : "border-navy-100 shadow-card"
          }`}
        >
          {plan.featured && (
            <span className="absolute -top-3 left-7 rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-900">
              Most popular
            </span>
          )}
          <h3 className="font-display text-2xl font-medium text-navy-800">{plan.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{plan.blurb}</p>
          <div className="mt-5 flex items-baseline gap-1">
            <span className="font-display text-3xl font-semibold text-navy-900">{plan.price}</span>
            <span className="text-sm text-slate-500">{plan.cadence}</span>
          </div>
          <ul className="mt-6 flex-1 space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] text-slate-700">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button
            href={plan.cta.href}
            variant={plan.featured ? "gold" : "secondary"}
            className="mt-7 w-full"
          >
            {plan.cta.label}
          </Button>
        </div>
      ))}
    </div>
  );
}
