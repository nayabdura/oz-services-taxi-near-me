import type { NextConfig } from "next";
import { USA_CITIES } from "./lib/data/cities";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "*.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "www.oztaxinearme.com" },
      { protocol: "https", hostname: "oztaxinearme.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  async redirects() {
    return USA_CITIES.map((city) => ({
      source: `/taxi-in-${city.slug}`,
      destination: `/locations/${city.stateSlug}/taxi-in-${city.slug}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://*.googleusercontent.com https://*.unsplash.com https://res.cloudinary.com https://www.oztaxinearme.com https://oztaxinearme.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.vercel-analytics.com https://*.google-analytics.com https://vitals.vercel-insights.com; frame-src 'self'; object-src 'none';",
          },
        ],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
