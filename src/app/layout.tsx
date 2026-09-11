import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";
import { AlertBanner } from "@/components/layout/AlertBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { Attribution } from "@/components/layout/Attribution";
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

const { gtmId, ga4Id, metaPixelId, googleSiteVerification } = site.analytics;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // pageMeta() builds complete, brand-inclusive titles, so the template is a
  // passthrough (no extra "| brand" appended). `default` covers pages without
  // their own metadata.
  title: {
    default: `${site.shortName} Property Management | Hernando County, FL`,
    template: "%s",
  },
  description: site.description,
  applicationName: site.brand,
  // Favicon + apple icon are auto-wired from app/icon.svg and app/apple-icon.png.
  openGraph: { siteName: site.brand, type: "website", locale: "en_US" },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        {/* Tags load only once their IDs are set in site.analytics (src/lib/site.ts). */}
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        {ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4Id}');`}
            </Script>
          </>
        )}
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </head>
      <body className="font-sans">
        {/* GTM noscript fallback */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
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
        <Attribution />

        <AlertBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
