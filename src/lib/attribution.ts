/**
 * Marketing attribution + conversion events (client-side only).
 *
 * On landing, UTM parameters, ad click IDs, and the external referrer are saved
 * for 90 days. A later visit that carries new campaign parameters replaces them
 * (so a postcard scan after an old Google visit is credited to the postcard).
 * Every lead form attaches these fields, so each lead email names its channel.
 */

const KEY = "tn_attribution";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;

type Field = (typeof PARAMS)[number] | "referrer" | "landingPage" | "firstSeen";
export type Attribution = Partial<Record<Field, string>>;

function readStored(): Attribution | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw) as { at: number; data: Attribution };
    return Date.now() - at < TTL_MS ? data : null;
  } catch {
    return null;
  }
}

export function captureAttribution() {
  try {
    const url = new URL(window.location.href);
    const campaign: Attribution = {};
    for (const p of PARAMS) {
      const v = url.searchParams.get(p);
      if (v) campaign[p] = v.slice(0, 200);
    }
    if (readStored() && Object.keys(campaign).length === 0) return;

    const ref = document.referrer;
    const external = ref && !ref.startsWith(window.location.origin) ? ref.slice(0, 300) : "";
    const data: Attribution = { ...campaign, referrer: external, landingPage: url.pathname, firstSeen: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Storage blocked (private mode, etc.) — leads still submit, just unattributed.
  }
}

/** Attribution fields to merge into a lead payload. Empty values are dropped. */
export function getAttribution(): Attribution {
  const data = readStored() ?? {};
  return Object.fromEntries(Object.entries(data).filter(([, v]) => v)) as Attribution;
}

type TagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/** Fires the lead conversion to whichever tags are loaded (GTM, GA4, Meta Pixel). */
export function trackLead(form: string) {
  const w = window as TagWindow;
  try {
    if (w.gtag) w.gtag("event", "generate_lead", { form_id: form });
    else w.dataLayer?.push({ event: "generate_lead", form_id: form });
    w.fbq?.("track", "Lead", { content_name: form });
  } catch {
    // Never let analytics break the form flow.
  }
}

/** Meta Pixel only tracks the first page load on its own; call on client-side route changes. */
export function trackPageView() {
  try {
    (window as TagWindow).fbq?.("track", "PageView");
  } catch {}
}
