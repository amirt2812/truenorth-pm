import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-navy-100 bg-white p-6 shadow-card ${
        hover ? "transition-shadow duration-200 hover:shadow-card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  children,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card hover className="h-full">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-xl font-medium text-navy-800">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{children}</p>
    </Card>
  );
}

/** Compact icon + label used in trust bars and bullet grids. */
export function TrustItem({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="text-[15px] leading-snug text-slate-700">{children}</span>
    </div>
  );
}
