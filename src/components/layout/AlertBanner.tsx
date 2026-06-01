import { isPreLaunch } from "@/lib/site";

/**
 * Pre-launch / license-pending status banner. Renders only while
 * `launchStatus === "pre-launch"` in src/lib/site.ts. Flip to "licensed" to
 * remove it site-wide once brokerage registration is active.
 */
export function AlertBanner() {
  if (!isPreLaunch) return null;
  return (
    <div className="bg-navy-900 text-center text-[13px] text-navy-100">
      <div className="container-tn flex items-center justify-center gap-2 py-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
        <p>
          <span className="font-semibold text-white">Pre-launch:</span> Brokerage registration and
          service launch pending. Content is informational only.
        </p>
      </div>
    </div>
  );
}
