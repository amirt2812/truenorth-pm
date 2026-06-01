import type { ReactNode } from "react";

/** Numbered vertical process timeline with a connecting line. */
export function ProcessSteps({ steps }: { steps: { title: string; body: ReactNode }[] }) {
  return (
    <ol className="relative space-y-8 border-l-2 border-navy-100 pl-8">
      {steps.map((step, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[42px] flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 font-display text-sm font-semibold text-gold-400 ring-4 ring-sand-100">
            {i + 1}
          </span>
          <h3 className="font-display text-xl font-medium text-navy-800">{step.title}</h3>
          <p className="mt-1.5 leading-relaxed text-slate-600">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
