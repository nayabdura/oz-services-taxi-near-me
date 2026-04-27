import type { NextConfig } from "next";

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
    return [
      // ── Legacy flat city URLs → correct nested location URLs (301 permanent) ──
      // These old URLs are recorded in Google's index as 404s after the URL migration.
      // 301 tells Google to permanently update its records to the new canonical URLs.
      {
        source: "/taxi-in-richmond",
        destination: "/locations/virginia/taxi-in-richmond",
        permanent: true,
      },
      {
        source: "/taxi-in-oklahoma-city",
        destination: "/locations/oklahoma/taxi-in-oklahoma-city",
        permanent: true,
      },
      {
        source: "/taxi-in-honolulu",
        destination: "/locations/hawaii/taxi-in-honolulu",
        permanent: true,
      },
    ];
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
        ],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
