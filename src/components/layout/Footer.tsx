import Link from "next/link";
import { footerNav } from "@/lib/nav";
import { site, serviceAreaSentence, compliance, activeBrokerageDisclosure } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-tn py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-xs font-display text-lg text-white">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
              Local, transparent, technology-forward property management serving {serviceAreaSentence}
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4 text-gold-400" />
                <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="chat" className="h-4 w-4 text-gold-400" />
                <a href={site.emailHref} className="hover:text-white">{site.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="pin" className="h-4 w-4 text-gold-400" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-gold-400" />
                <span>{site.businessHours}</span>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-300">{col.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-navy-200 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Disclosure block */}
        <div className="mt-12 space-y-3 border-t border-navy-700 pt-8 text-xs leading-relaxed text-navy-300">
          <p>
            <strong className="text-navy-100">Brokerage disclosure:</strong> {activeBrokerageDisclosure()}
          </p>
          <p>
            <strong className="text-navy-100">Equal Housing Opportunity.</strong> {compliance.fairHousing}
          </p>
          <p>{compliance.servicesSubjectToAgreement} {compliance.noAdvice}</p>
          <p>
            Holding company: {site.holdingCompany}. Property management software: {site.softwarePlatform}.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-navy-700 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center">
          <p>© {year} {site.brand}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms-of-use" className="hover:text-white">Terms</Link>
            <Link href="/sms-email-consent" className="hover:text-white">SMS/Email Consent</Link>
            <Link href="/fair-housing" className="hover:text-white">Fair Housing</Link>
            <Link href="/legal-disclosures" className="hover:text-white">Legal Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
