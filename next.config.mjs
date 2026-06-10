/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote image hosts here if you serve property photos from a CDN.
    remotePatterns: [],
  },
  async redirects() {
    // Retired city landing pages → countywide page (301, preserves SEO equity).
    const cities = [
      "spring-hill-property-management",
      "brooksville-property-management",
      "weeki-wachee-property-management",
      "hernando-beach-property-management",
    ];
    return cities.flatMap((slug) => [
      { source: `/${slug}`, destination: "/hernando-county-property-management", permanent: true },
      { source: `/es/${slug}`, destination: "/es/hernando-county-property-management", permanent: true },
    ]);
  },
};

export default nextConfig;
