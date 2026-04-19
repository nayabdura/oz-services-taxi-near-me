import { MetadataRoute } from "next";
import { USA_STATES } from "@/lib/data/states";
import getDB from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ozservices.com";
  const now = new Date();

  // Basic robust pages
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

  // Map 50 States
  const statePages: MetadataRoute.Sitemap = USA_STATES.map((state) => ({
    url: `${baseUrl}/locations/${state.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Map DB Blogs
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const db = getDB();
    const publishedBlogs = db.prepare("SELECT slug, updated_at FROM blogs WHERE published = 1").all() as any[];
    blogPages = publishedBlogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updated_at || b.created_at || now),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    // If during build time there's an issue with sqlite native node resolving, fail gracefully
  }

  return [...corePages, ...statePages, ...blogPages];
}
