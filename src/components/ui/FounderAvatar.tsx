"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Founder headshot. Renders /public/founder.jpg if present; if the file is
 * missing (e.g. before it's uploaded), it gracefully falls back to a navy
 * monogram of the founder's initials — so there's never a broken image.
 */
export function FounderAvatar({ className = "h-24 w-24" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = site.founder.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (failed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-2xl bg-navy-800 font-display text-2xl font-semibold text-gold-400 ${className}`}
        aria-label={site.founder.name}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={site.founder.photo}
      alt={`${site.founder.name}, ${site.founder.title} of ${site.brand}`}
      onError={() => setFailed(true)}
      className={`shrink-0 rounded-2xl object-cover ${className}`}
    />
  );
}
