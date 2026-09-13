"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNav, navLabel } from "@/lib/nav";
import { site, serviceAreaSentence, compliance, activeBrokerageDisclosure } from "@/lib/site";
import { langFromPath, localizeHref } from "@/lib/i18n";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

const ft = {
  en: {
    blurb: (s: string) => `Local, transparent, technology-forward property management serving ${s}`,
    brokerage: "Brokerage disclosure:",
    eho: "Equal Housing Opportunity.",
    holding: (h: string, p: string) => `Holding company: ${h}. Property management software: ${p}.`,
    rights: "All rights reserved.",
    privacy: "Privacy", terms: "Terms", sms: "SMS/Email Consent", fair: "Fair Housing", legal: "Legal Disclosures",
    follow: "Follow TrueNorth",
  },
  es: {
    blurb: (s: string) => `Administración de propiedades local, transparente y con tecnología avanzada, sirviendo a ${s}`,
    brokerage: "Aviso de corretaje:",
    eho: "Igualdad de Oportunidad de Vivienda.",
    holding: (h: string, p: string) => `Compañía matriz: ${h}. Software de administración: ${p}.`,
    rights: "Todos los derechos reservados.",
    privacy: "Privacidad", terms: "Términos", sms: "Consentimiento SMS/Email", fair: "Vivienda Justa", legal: "Avisos Legales",
    follow: "Siga a TrueNorth",
  },
};

const socialLabels = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube" } as const;
const socials = (Object.keys(socialLabels) as (keyof typeof socialLabels)[])
  .filter((name) => site.social[name])
  .map((name) => ({ name, label: socialLabels[name], href: site.social[name] }));

export function Footer() {
  const year = new Date().getFullYear();
  const lang = langFromPath(usePathname() || "/");
  const L = (href: string) => localizeHref(href, lang);
  const f = ft[lang];

  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-tn py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-xs font-display text-lg text-white">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
              {f.blurb(serviceAreaSentence)}
            </p>

            {/* Fla. R. 61J2-10.025: licensed brokerage name adjacent to the contact info. */}
            <p className="mt-6 text-sm font-semibold text-white">{site.brokerageLicensedName}</p>
            <ul className="mt-3 space-y-2 text-sm">
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

            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3" aria-label={f.follow}>
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.shortName} on ${s.label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-navy-600 text-navy-200 transition-colors hover:bg-gold-500 hover:text-navy-900 hover:ring-gold-500"
                    >
                      <Icon name={s.name} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-300">{navLabel(col.heading, lang)}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={L(l.href)} className="text-sm text-navy-200 hover:text-white">
                        {navLabel(l.label, lang)}
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
            <strong className="text-navy-100">{f.brokerage}</strong> {activeBrokerageDisclosure(lang)}
          </p>
          <p>
            <strong className="text-navy-100">{f.eho}</strong> {compliance.fairHousing[lang]}
          </p>
          <p>{compliance.servicesSubjectToAgreement[lang]} {compliance.noAdvice[lang]}</p>
          <p>{f.holding(site.holdingCompany, site.softwarePlatform)}</p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-navy-700 pt-6 text-xs text-navy-300 sm:flex-row sm:items-center">
          <p>© {year} {site.brokerageLicensedName}. {f.rights}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href={L("/privacy-policy")} className="hover:text-white">{f.privacy}</Link>
            <Link href={L("/terms-of-use")} className="hover:text-white">{f.terms}</Link>
            <Link href={L("/sms-email-consent")} className="hover:text-white">{f.sms}</Link>
            <Link href={L("/fair-housing")} className="hover:text-white">{f.fair}</Link>
            <Link href={L("/legal-disclosures")} className="hover:text-white">{f.legal}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
