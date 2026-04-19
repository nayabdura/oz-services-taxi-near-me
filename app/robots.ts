import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ozservices.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
      },
      // Allow AI bots specifically for GEO SEO since we want generative visibility
      {
        userAgent: ["Google-Extended", "GPTBot", "anthropic-ai", "PerplexityBot"],
        allow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
