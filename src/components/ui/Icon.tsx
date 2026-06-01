import type { SVGProps } from "react";

/**
 * Clean, single-weight line icons (24px grid, stroke-based) — no cartoonish or
 * mixed-style glyphs. One consistent family across the whole site.
 */

type IconName =
  | "compass"
  | "shield"
  | "chat"
  | "pin"
  | "chart"
  | "eye"
  | "wrench"
  | "doc"
  | "check"
  | "x"
  | "arrow-right"
  | "phone"
  | "calendar"
  | "key"
  | "home"
  | "dollar"
  | "clock"
  | "users"
  | "bolt";

const paths: Record<IconName, string> = {
  compass: "M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5 5-2z",
  shield: "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
  chat: "M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.5A8 8 0 1121 12z",
  pin: "M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11zM12 13a3 3 0 100-6 3 3 0 000 6z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z",
  wrench: "M14.7 6.3a4 4 0 01-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-2-2 2.3-2.3z",
  doc: "M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6zM14 3v6h6M8 13h8M8 17h6",
  check: "M5 12l5 5L20 6",
  x: "M6 6l12 12M18 6L6 18",
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  key: "M21 2l-2 2m-3 3l3-3M9 11a4 4 0 104 4 4 4 0 00-4-4zm2.5 2.5L19 6",
  home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  dollar: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
};

const filled: IconName[] = []; // all stroke-based for consistency

export function Icon({
  name,
  className = "h-6 w-6",
  ...rest
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled.includes(name) ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}

export type { IconName };
