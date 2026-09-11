import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { site } from "@/lib/site";

/**
 * Founding Landlord offer. While `site.foundingOffer.enabled` is false this is
 * an early-access list with no specific terms (compliance). When enabled, it
 * shows the concrete terms, which reduce the owner's risk of switching without
 * promising results and must match the Founding Owner Offer Addendum.
 */
export function FoundingLandlord() {
  const { enabled, spots, cancelWindowDays } = site.foundingOffer;
  const terms: { icon: IconName; text: string }[] = [
    { icon: "dollar", text: "No setup fee" },
    { icon: "key", text: "No leasing fee to take over a tenant already in place" },
    { icon: "shield", text: `Cancel without a termination fee in your first ${cancelWindowDays} days` },
    { icon: "clock", text: `A reply within ${site.responseTime.en}, every time` },
  ];

  return (
    <section className="bg-sand-100">
      <div className="container-tn py-16 sm:py-20">
        <div className="overflow-hidden rounded-2xl border border-gold-200 bg-white shadow-card">
          <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700">
                <Icon name="compass" className="h-3.5 w-3.5" /> {enabled ? `Founding Owner Offer · ${spots} spots` : "Founding Landlord Offer"}
              </span>
              {enabled ? (
                <>
                  <h2 className="mt-4 text-display-md">Founding terms for our first {spots} Hernando County owners.</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {terms.map((t) => (
                      <li key={t.text} className="flex items-start gap-3 text-slate-700">
                        <Icon name={t.icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                        {t.text}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h2 className="mt-4 text-display-md">A founding spot for Hernando County landlords.</h2>
                  <p className="mt-3 max-w-xl text-lg text-slate-600">
                    We&apos;re opening a limited number of founding owner spots for Hernando County
                    landlords who want transparent, modern property management from day one. Join the
                    list to be among the first owners we onboard.
                  </p>
                </>
              )}
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <Button href="/contact?topic=founding" variant="gold" size="lg">
                {enabled ? "Claim a Founding Spot" : "Join the Founding Landlord List"}
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
              <p className="mt-3 text-xs text-slate-500">
                {enabled
                  ? "No obligation. Terms are set out in a written addendum to the management agreement."
                  : "No obligation. Joining the list does not create a management agreement."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
