import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-navy-800 text-white hover:bg-navy-700 shadow-card hover:shadow-card-hover",
  gold: "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-gold",
  secondary: "bg-white text-navy-800 ring-1 ring-navy-200 hover:ring-navy-300 hover:bg-navy-50",
  ghost: "text-navy-700 hover:bg-navy-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-12 px-8 text-base",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & { href?: string } & Partial<ComponentProps<"a">> & Partial<ComponentProps<"button">>) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    const external = /^(https?:|tel:|mailto:)/.test(href) || href.startsWith("[");
    if (external) {
      return (
        <a href={href} className={cls} {...(rest as ComponentProps<"a">)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as ComponentProps<"a">)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
