/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote image hosts here if you serve property photos from a CDN.
    remotePatterns: [],
    // Allow the brand placeholder SVG to render via next/image. Our own SVG only;
    // CSP below blocks any script inside an SVG from executing.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    // Retired city landing pages → countywide page (301, preserves SEO equity).
    const cities = [
      "spring-hill-property-management",
      "brooksville-property-management",
      "weeki-wachee-property-management",
      "hernando-beach-property-management",
    ];
    // Short, printable campaign links (postcard, outreach, agent one-pager). Each
    // lands with UTM tags so the lead email names the channel. 302 so they can change.
    const campaigns = [
      { source: "/mail", destination: "/free-rental-analysis?utm_source=postcard&utm_medium=direct_mail&utm_campaign=absentee_owners_2026" },
      { source: "/switch", destination: "/switch-property-managers?utm_source=outreach&utm_medium=offline&utm_campaign=switch_2026" },
      { source: "/agents", destination: "/realtor-referral-partners?utm_source=agent_onepager&utm_medium=print&utm_campaign=agent_referrals_2026" },
    ].map((c) => ({ ...c, permanent: false }));

    return [
      ...cities.flatMap((slug) => [
        { source: `/${slug}`, destination: "/hernando-county-property-management", permanent: true },
        { source: `/es/${slug}`, destination: "/es/hernando-county-property-management", permanent: true },
      ]),
      ...campaigns,
    ];
  },
};

export default nextConfig;
