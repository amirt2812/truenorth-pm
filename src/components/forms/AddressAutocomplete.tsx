"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "./Field";
import type { Lang } from "@/lib/i18n";

/**
 * Property-address input with as-you-type suggestions from Photon
 * (photon.komoot.io — free OpenStreetMap geocoder, no API key). Results are
 * biased toward Hernando County, FL. The field always accepts free text:
 * suggestions assist, they never block submission. If the geocoder is
 * unreachable it degrades silently to a plain input.
 *
 * Upgrade path: to switch to Google Places Autocomplete later, only this
 * component changes — the form contract (a plain `address` text field) stays.
 */

// Hernando County, FL — bias center for suggestion ranking.
const BIAS = { lat: 28.56, lon: -82.42 };
const MIN_CHARS = 4;
const DEBOUNCE_MS = 250;

type Suggestion = { label: string; key: string };

function toLabel(p: Record<string, string | undefined>): string | null {
  const line1 = [p.housenumber, p.street].filter(Boolean).join(" ") || p.name;
  if (!line1) return null;
  const rest = [p.city || p.district, p.state, p.postcode].filter(Boolean).join(", ");
  return rest ? `${line1}, ${rest}` : line1;
}

export function AddressAutocomplete({
  id,
  label,
  required,
  lang = "en",
}: {
  id: string;
  label: string;
  required?: boolean;
  lang?: Lang;
}) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close the listbox when clicking outside the component.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  async function fetchSuggestions(q: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lat=${BIAS.lat}&lon=${BIAS.lon}&limit=8&lang=en`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) return;
      const data = (await res.json()) as { features?: { properties: Record<string, string> }[] };
      const seen = new Set<string>();
      const items: Suggestion[] = [];
      const features = (data.features ?? []).filter((f) => f.properties?.countrycode === "US");
      // Florida results first — the property being analyzed is local even if the owner isn't.
      features.sort((a, b) => Number(b.properties.state === "Florida") - Number(a.properties.state === "Florida"));
      for (const f of features) {
        const l = toLabel(f.properties);
        if (l && !seen.has(l)) {
          seen.add(l);
          items.push({ label: l, key: l });
          if (items.length === 5) break;
        }
      }
      setSuggestions(items);
      setOpen(items.length > 0);
      setHighlight(-1);
    } catch {
      // Network/abort — plain input keeps working.
    }
  }

  function onChange(v: string) {
    setValue(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (v.trim().length < MIN_CHARS) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    timerRef.current = setTimeout(() => fetchSuggestions(v.trim()), DEBOUNCE_MS);
  }

  function select(s: Suggestion) {
    setValue(s.label);
    setSuggestions([]);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h <= 0 ? suggestions.length - 1 : h - 1));
    } else if (e.key === "Enter" && highlight >= 0) {
      e.preventDefault();
      select(suggestions[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const listId = `${id}-listbox`;

  return (
    <div ref={rootRef} className="relative">
      <Label htmlFor={id} required={required}>{label}</Label>
      <input
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        autoComplete="street-address"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={highlight >= 0 ? `${id}-opt-${highlight}` : undefined}
        placeholder={lang === "es" ? "Empiece a escribir la dirección…" : "Start typing the address…"}
        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-slate-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-200 focus:outline-none"
      />
      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card-hover"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.key}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === highlight}
              onMouseDown={(e) => {
                e.preventDefault(); // select before the input blurs
                select(s);
              }}
              onMouseEnter={() => setHighlight(i)}
              className={`cursor-pointer px-4 py-2.5 text-[15px] text-navy-800 ${
                i === highlight ? "bg-sand-100" : ""
              }`}
            >
              {s.label}
            </li>
          ))}
          <li aria-hidden="true" className="border-t border-navy-100 px-4 py-1.5 text-[11px] text-slate-400">
            © OpenStreetMap
          </li>
        </ul>
      )}
    </div>
  );
}
