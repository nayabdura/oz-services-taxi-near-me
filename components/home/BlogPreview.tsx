"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import axios from "axios";

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    // Fallback data in case of API failure
    const fallbackBlogs = [
      { 
        _id: '1', 
        title: 'How to Find the Best Taxi Service Near You: Complete USA Passenger Guide', 
        excerpt: 'Looking for a reliable, safe, and transparent taxi near you? This comprehensive USA passenger guide covers everything from flat rates to 24/7 dispatch selection.', 
        slug: 'how-to-find-best-taxi-service-near-you', 
        createdAt: new Date().toISOString(), 
        category: 'Travel Guides', 
        image_url: 'https://images.unsplash.com/photo-1549317661-bd32c5443c5b?q=80&w=800&h=500&auto=format&fit=crop',
        read_time: 8 
      },
      { 
        _id: '2', 
        title: 'Top 10 Tips for Safe and Affordable Late-Night Taxi Rides in USA Cities', 
        excerpt: 'Navigating late-night transportation safely requires smart preparation. Read our top 10 expert tips for securing safe, affordable, 24/7 taxi rides in any American city.', 
        slug: 'late-night-taxi-safety-tips-usa', 
        createdAt: new Date().toISOString(), 
        category: 'Safety', 
        image_url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&h=500&auto=format&fit=crop',
        read_time: 7 
      },
      { 
        _id: '3', 
        title: 'Taxi vs Rideshare in 2026: Why Flat-Rate Taxi Services Are Winning America Back', 
        excerpt: 'Compare traditional flat-rate taxi services with rideshare apps in 2026. Discover why smart passengers choose reliable, surge-free professional cabs for airport and city travel.', 
        slug: 'taxi-vs-rideshare-flat-rate-guide-usa', 
        createdAt: new Date().toISOString(), 
        category: 'Comparison', 
        image_url: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=800&h=500&auto=format&fit=crop',
        read_time: 10 
      }
    ];

    axios.get(`/api/blogs?published=true`)
      .then(res => {
        const fetchedBlogs = Array.isArray(res.data) ? res.data : (res.data.blogs || []);
        if (fetchedBlogs.length > 0) {
          setBlogs(fetchedBlogs.slice(0, 3));
        } else {
          setBlogs(fallbackBlogs);
        }
      })
      .catch(() => {
        setBlogs(fallbackBlogs);
      });
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="bg-blue-50 text-blue-600 font-bold tracking-widest uppercase text-xs px-3.5 py-1.5 rounded-lg mb-3 inline-block">
              Latest Insights
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight mt-2">
              USA Taxi Tips & <span className="text-blue-600">Travel Guides</span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium mt-3">
              Expert advice, local travel insights, and company updates from America&apos;s trusted nationwide taxi network.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all flex-shrink-0 group"
          >
            View All Travel Guides <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <article
              key={blog.slug || blog._id}
              className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <Link href={`/blog/${blog.slug}`} className="block aspect-[16/9] bg-slate-100 overflow-hidden relative">
                {blog.image_url ? (
                  <Image
                    src={blog.image_url}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-3xl">📰</div>
                )}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                    {blog.category || "Travel"}
                  </span>
                </div>
              </Link>
              
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3.5 h-3.5 text-blue-600" />
                      {new Date(blog.createdAt || blog.created_at || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3.5 h-3.5 text-blue-600" />
                      {blog.read_time || 6} min read
                    </span>
                  </div>
                  
                  <Link href={`/blog/${blog.slug}`}>
                    <h4 className="text-xl font-bold text-slate-900 font-heading mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {blog.title}
                    </h4>
                  </Link>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">By {blog.author || "Oz Services"}</span>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform"
                  >
                    Read <FiArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
