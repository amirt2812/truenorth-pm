import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { AlertBanner } from "@/components/layout/AlertBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema, localBusinessSchema } from "@/lib/schema";

// Premium serif display + clean geometric sans → premium, not generic-template.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Hernando County Property Management`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  // Favicon + apple icon are auto-wired from app/icon.svg and app/apple-icon.png.
  openGraph: { siteName: site.brand, type: "website", locale: "en_US" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* ── Google Tag Manager (INSERT real container ID in src/lib/site.ts) ── */}
        {site.analytics.gtmId !== "GTM-XXXXXXX" && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.analytics.gtmId}');`}
          </Script>
        )}
        {/* GA4, Facebook Pixel, and call-tracking snippets: add here once IDs are set in site.analytics. */}
      </head>
      <body className="font-sans">
        {/* GTM noscript fallback */}
        {site.analytics.gtmId !== "GTM-XXXXXXX" && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${site.analytics.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        )}

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />

        <AlertBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
