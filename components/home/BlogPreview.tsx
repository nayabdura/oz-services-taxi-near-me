"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowRight, FiCalendar } from "react-icons/fi";
import axios from "axios";

export default function BlogPreview() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Adding fallback data directly in case the API isn't fully connected yet
    const fallbackBlogs = [
      { _id: '1', title: 'Top 5 Tourist Spots in Orlando to Visit by Taxi', excerpt: 'Discover the hidden gems of Orlando without the stress of parking. Here are our top 5 picks.', slug: 'top-spots-orlando', createdAt: new Date().toISOString(), category: 'Travel', views: 120 },
      { _id: '2', title: 'Miami Airport Transfer Tips', excerpt: 'Navigate Miami International Airport like a pro with these essential taxi tips to avoid long taxi lines.', slug: 'miami-airport-tips', createdAt: new Date().toISOString(), category: 'Airport Travel', views: 85 },
      { _id: '3', title: 'Why Corporate Taxis are Better than Rideshares', excerpt: 'Security, billing transparency, and strict professionalism. Why your business should switch to dedicated taxi services today.', slug: 'corporate-taxis-vs-rideshares', createdAt: new Date().toISOString(), category: 'Corporate', views: 200 }
    ];

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=3&published=true`)
      .then(res => {
        const fetchedBlogs = res.data.blogs || res.data;
        if (Array.isArray(fetchedBlogs) && fetchedBlogs.length > 0) {
          setBlogs(fetchedBlogs as any);
        } else {
          setBlogs(fallbackBlogs as any);
        }
      })
      .catch(() => {
        setBlogs(fallbackBlogs as any);
      });
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Latest Updates</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 font-heading mb-6 tracking-tight">Read Our Travel Blog</h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">Get the latest Florida travel tips, local insights, and company news from the Oz Services driver network.</p>
          </div>
          <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 font-bold text-slate-900 border-2 border-slate-900 rounded-xl hover:bg-slate-50 transition-all flex-shrink-0">
            View All Posts <FiArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(blogs) && blogs.map((blog: any) => (
            <div key={blog.id || blog._id} className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <Link href={`/blog/${blog.slug}`} className="block h-48 bg-slate-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-500 z-10" />
                <div className="w-full h-full flex items-center justify-center text-white/10 font-black text-7xl font-heading transform group-hover:scale-110 transition-transform duration-700">
                  OZ
                </div>
              </Link>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md">{blog.category}</span>
                  <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
                    <FiCalendar className="w-3.5 h-3.5" /> 
                    {new Date(blog.created_at || blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                
                <Link href={`/blog/${blog.slug}`}>
                  <h4 className="text-xl font-bold text-slate-900 font-heading mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h4>
                </Link>
                
                <p className="text-slate-600 font-medium leading-relaxed mb-6 line-clamp-3 text-sm flex-grow">
                  {blog.excerpt}
                </p>
                
                <Link href={`/blog/${blog.slug}`} className="mt-auto inline-flex items-center text-blue-600 font-bold text-sm hover:gap-2 gap-1 transition-all uppercase tracking-widest">
                  Read Article <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
