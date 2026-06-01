/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote image hosts here if you serve property photos from a CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
