"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-sand-100/85 backdrop-blur supports-[backdrop-filter]:bg-sand-100/70">
      <div className="container-tn flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((group) => (
            <div key={group.label} className="group relative">
              {group.href ? (
                <Link
                  href={group.href}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium text-navy-700 hover:bg-navy-50"
                >
                  {group.label}
                  {group.children && <Icon name="arrow-right" className="h-3.5 w-3.5 rotate-90 text-slate-400" />}
                </Link>
              ) : (
                <button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium text-navy-700 hover:bg-navy-50">
                  {group.label}
                  <Icon name="arrow-right" className="h-3.5 w-3.5 rotate-90 text-slate-400" />
                </button>
              )}
              {group.children && (
                <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-xl border border-navy-100 bg-white p-2 opacity-0 shadow-card-hover transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {group.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-sand-100 hover:text-navy-800"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={site.phoneHref} variant="ghost" size="sm" aria-label="Call TrueNorth">
            <Icon name="phone" className="h-4 w-4" />
            Call
          </Button>
          <Button href="/free-rental-analysis" variant="gold" size="sm">
            Free Rental Analysis
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy-800 hover:bg-navy-50 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Icon name={mobileOpen ? "x" : "compass"} className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-navy-100 bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-tn max-h-[70vh] space-y-1 overflow-y-auto py-4">
            {primaryNav.map((group) => (
              <div key={group.label} className="py-1">
                {group.href ? (
                  <Link
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 font-display text-base font-medium text-navy-800"
                  >
                    {group.label}
                  </Link>
                ) : (
                  <p className="px-3 py-2 font-display text-base font-medium text-navy-800">{group.label}</p>
                )}
                {group.children && (
                  <div className="ml-3 border-l border-navy-100 pl-3">
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:text-navy-800"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Button href="/free-rental-analysis" variant="gold" onClick={() => setMobileOpen(false)}>
                Get a Free Rental Analysis
              </Button>
              <Button href={site.phoneHref} variant="secondary">
                <Icon name="phone" className="h-4 w-4" /> Call a Local Property Manager
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
