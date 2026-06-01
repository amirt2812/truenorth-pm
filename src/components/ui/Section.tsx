import type { ElementType, ReactNode } from "react";

type Tone = "sand" | "white" | "navy" | "navy-soft";

const tones: Record<Tone, string> = {
  sand: "bg-sand-100 text-slate-700",
  white: "bg-white text-slate-700",
  navy: "bg-navy-800 text-navy-100",
  "navy-soft": "bg-navy-50 text-slate-700",
};

export function Section({
  tone = "white",
  className = "",
  id,
  children,
  as: Tag = "section",
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  children: ReactNode;
  as?: ElementType;
}) {
  return (
    <Tag id={id} className={`${tones[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-tn">{children}</div>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  light?: boolean;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignment} ${align === "center" ? "" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-[0.14em] ${
            light ? "text-gold-300" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`text-display-md ${light ? "!text-white" : ""}`}>{title}</h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-navy-100" : "text-slate-600"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
