import { MetadataRoute } from "next";
import { USA_STATES } from "@/lib/data/states";
import { USA_CITIES } from "@/lib/data/cities";
import connectDB from "@/lib/db";
import { Blog } from "@/lib/models";

// Must be dynamic — sitemap includes live blog posts from MongoDB
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.oztaxinearme.com").replace(/\/$/, "");
  const now = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/taxi-near-me`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/booking`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/fleet`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // City-level pages (taxi-in-[city]) — mid-tier keyword targets
  const cityPages: MetadataRoute.Sitemap = USA_CITIES.map((city) => ({
    url: `${baseUrl}/taxi-in-${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  // State-level pages
  const statePages: MetadataRoute.Sitemap = USA_STATES.map((state) => ({
    url: `${baseUrl}/locations/${state.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // DB Blog posts
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const dbBlogs = await Blog.find({ published: 1 });
    blogPages = dbBlogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.createdAt || now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    // Fail gracefully during build if DB unavailable
  }

  return [...corePages, ...cityPages, ...statePages, ...blogPages];
}

