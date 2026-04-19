"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import axios from "axios";

const categories = ["All", "Travel Guides", "Airport Travel", "Corporate", "Comparison", "Safety"];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blogs?published=true");
        // format date simply for display
        const formatted = data.blogs.map((b: any) => ({
          ...b,
          date: new Date(b.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        }));
        setPosts(formatted);
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="pt-20 bg-white">
      <section className="hero-bg section-sm">
        <div className="container text-center max-w-3xl mx-auto">
          <span className="badge mb-6">📝 Blog</span>
          <h1 className="section-title text-5xl lg:text-6xl text-gray-900 mb-6">
            USA Taxi Tips &amp; <span className="text-blue-600">Travel Guides</span>
          </h1>
          <p className="text-gray-600 text-lg">Expert advice, travel tips, and the latest news from the Oz Services team.</p>
        </div>
      </section>

      <section className="section bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map(cat => (
              <button key={cat} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${cat === "All" ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 hover:text-black border border-gray-200"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-gray-500">
                Loading blogs...
              </div>
            ) : posts.length === 0 ? (
               <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-gray-500">
                No blogs found. Check back later!
              </div>
            ) : posts.map((post, i) => (
              <article key={post.slug} className={`blog-card bg-white ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                <div className="h-52 bg-blue-50 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply" />
                  {post.image_url && post.image_url.startsWith('/') ? (
                    <Image src={post.image_url} alt={post.title} fill className="object-cover" />
                  ) : (
                    <span className="relative z-10 text-gray-400 text-xl font-bold">Image</span>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="badge !px-3 !py-1 text-xs">{post.category}</span>
                    <span className="text-gray-500 text-xs font-medium flex items-center gap-1"><FiCalendar className="w-3 h-3" /> {post.date}</span>
                    <span className="text-gray-500 text-xs font-medium flex items-center gap-1"><FiClock className="w-3 h-3" /> {post.read_time} min read</span>
                  </div>
                  <h2 className="text-gray-900 font-bold text-xl mb-3 leading-snug line-clamp-2" style={{ fontFamily: "Outfit, sans-serif" }}>
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-2 transition-colors group">
                    Read Article <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
