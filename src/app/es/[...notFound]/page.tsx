import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched /es/* URLs. Static routes always win over this
 * dynamic segment, so real Spanish pages are unaffected; anything else
 * triggers the Spanish not-found boundary (src/app/es/not-found.tsx) with a
 * proper server-rendered 404.
 */
export default function CatchAllEs() {
  notFound();
}
