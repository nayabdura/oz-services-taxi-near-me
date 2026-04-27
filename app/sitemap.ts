import { MetadataRoute } from "next";
import { USA_STATES } from "@/lib/data/states";
import { USA_CITIES } from "@/lib/data/cities";
import connectDB from "@/lib/db";
import { Blog } from "@/lib/models";

// ISR: regenerate sitemap at most once per hour instead of force-dynamic.
// This means Googlebot always gets a fast cached response, while blog posts
// stay fresh within 60 minutes. If the DB is unavailable, the last cached
// version is served rather than returning a broken sitemap.
export const revalidate = 3600;

// 5-second timeout guard for the DB query — prevents a slow MongoDB
// connection from hanging the sitemap response and breaking Google's crawl.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("DB timeout")), ms)
    ),
  ]);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.oztaxinearme.com"
  ).replace(/\/$/, "");

  // ── Stable dates for static pages ─────────────────────────────────────────
  // Using new Date() for every page told Google everything changed on every
  // crawl, which wastes crawl budget trust. Real dates signal genuine freshness.
  const corePages: MetadataRoute.Sitemap = [
    { url: base,                              lastModified: new Date("2026-04-20"), changeFrequency: "daily",   priority: 1.0  },
    { url: `${base}/taxi-near-me`,            lastModified: new Date("2026-04-20"), changeFrequency: "daily",   priority: 1.0  },
    { url: `${base}/booking`,                 lastModified: new Date("2026-04-15"), changeFrequency: "weekly",  priority: 0.95 },
    { url: `${base}/services`,                lastModified: new Date("2026-04-01"), changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/pricing`,                 lastModified: new Date("2026-04-01"), changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/service-areas`,           lastModified: new Date("2026-04-01"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/fleet`,                   lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/blog`,                    lastModified: new Date("2026-04-20"), changeFrequency: "daily",   priority: 0.8  },
    { url: `${base}/about`,                   lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/contact`,                 lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.7  },
    { url: `${base}/privacy-policy`,          lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3  },
    { url: `${base}/terms-and-conditions`,    lastModified: new Date("2026-01-01"), changeFrequency: "yearly",  priority: 0.3  },
  ];

  // ── Location pages — 100% static from local data, no DB needed ────────────
  const locationDate = new Date("2026-04-20");

  const statePages: MetadataRoute.Sitemap = USA_STATES.map((state) => ({
    url: `${base}/locations/${state.slug}`,
    lastModified: locationDate,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const cityPages: MetadataRoute.Sitemap = USA_CITIES.map((city) => ({
    url: `${base}/locations/${city.stateSlug}/taxi-in-${city.slug}`,
    lastModified: locationDate,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  // ── Blog posts — fetched from MongoDB with timeout guard ──────────────────
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    await withTimeout(connectDB(), 5000);
    const posts = await withTimeout(Blog.find({ published: 1 }).lean(), 5000);
    blogPages = posts.map((b: any) => ({
      url: `${base}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.createdAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Graceful degradation: DB unavailable → return empty blog list.
    // Core + location pages are unaffected.
  }

  return [...corePages, ...statePages, ...cityPages, ...blogPages];
}
