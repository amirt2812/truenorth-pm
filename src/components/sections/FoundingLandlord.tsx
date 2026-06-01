import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Founding Landlord offer. Intentionally does NOT promise discounts or specific
 * terms (compliance) — it invites owners to a limited early-access list.
 */
export function FoundingLandlord() {
  return (
    <section className="bg-sand-100">
      <div className="container-tn py-16 sm:py-20">
        <div className="overflow-hidden rounded-2xl border border-gold-200 bg-white shadow-card">
          <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700">
                <Icon name="compass" className="h-3.5 w-3.5" /> Founding Landlord Offer
              </span>
              <h2 className="mt-4 text-display-md">A founding spot for Hernando County landlords.</h2>
              <p className="mt-3 max-w-xl text-lg text-slate-600">
                We&apos;re opening a limited number of founding owner spots for Hernando County
                landlords who want transparent, modern property management from day one. Join the
                list to be among the first owners we onboard.
              </p>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Button href="/contact?topic=founding" variant="gold" size="lg">
                Join the Founding Landlord List
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-xs text-slate-500">
                No obligation. Joining the list does not create a management agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
