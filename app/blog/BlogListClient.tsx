"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCalendar, FiClock, FiSearch, FiUser, FiBookOpen } from "react-icons/fi";
import axios from "axios";

const categories = ["All", "Travel Guides", "Airport Travel", "Corporate", "Comparison", "Safety"];

export default function BlogListClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("/api/blogs?published=true");
        const formatted = Array.isArray(data) ? data.map((b: any) => ({
          ...b,
          date: new Date(b.createdAt || b.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        })) : [];
        setPosts(formatted);
      } catch (error) {
        console.error("Failed to load blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find(p => p.featured === 1 || p.featured === true) || posts[0];
  }, [posts]);

  const regularPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    // If filtering, show all matches; otherwise exclude featured from regular list if showing "All"
    if (selectedCategory !== "All" || searchQuery !== "") {
      return filteredPosts;
    }
    return posts.filter(p => p.slug !== featuredPost.slug);
  }, [posts, filteredPosts, featuredPost, selectedCategory, searchQuery]);

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-slate-900 py-16 lg:py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 backdrop-blur-sm">
            <FiBookOpen className="w-4 h-4 text-blue-400" />
            <span>Oz Services Insights & Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-6 text-white">
            USA Taxi Tips & <span className="text-blue-500">Travel Guides</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Expert advice, local transportation guides, and insider travel tips from America&apos;s trusted nationwide taxi network.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search travel guides, airport tips, location guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base shadow-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Navigation */}
          <div className="flex flex-wrap gap-2.5 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105"
                    : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/80 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600 font-medium">Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🔍
              </div>
              <h3 className="text-slate-900 font-bold text-xl mb-2">No articles found</h3>
              <p className="text-slate-600 text-sm mb-6">
                We couldn&apos;t find any posts matching your search criteria.
              </p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post Card (only shown when viewing All and no search filter active) */}
              {featuredPost && selectedCategory === "All" && searchQuery === "" && (
                <div className="mb-16">
                  <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl hover:shadow-2xl transition-all duration-300 group grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-slate-100 min-h-[300px]">
                      {featuredPost.image_url ? (
                        <Image
                          src={featuredPost.image_url}
                          alt={featuredPost.title}
                          fill
                          priority
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-slate-400 text-4xl">🚕</div>
                      )}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md">
                          Featured Article
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4 flex-wrap">
                          <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-bold">
                            {featuredPost.category}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FiCalendar className="w-3.5 h-3.5 text-blue-600" /> {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FiClock className="w-3.5 h-3.5 text-blue-600" /> {featuredPost.read_time || 5} min read
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                          <Link href={`/blog/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        <p className="text-slate-600 text-base leading-relaxed mb-8 line-clamp-4">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-2.5 text-slate-700 text-sm font-semibold">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            <FiUser className="w-4 h-4" />
                          </div>
                          <span>{featuredPost.author || "Oz Services"}</span>
                        </div>

                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 group-hover:translate-x-1"
                        >
                          Read Article <FiArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Regular Posts */}
              <div>
                {selectedCategory === "All" && searchQuery === "" && (
                  <h3 className="text-2xl font-black text-slate-900 font-heading mb-8">
                    Latest <span className="text-blue-600">Articles</span>
                  </h3>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                    >
                      <div className="aspect-[16/9] w-full bg-slate-100 relative overflow-hidden">
                        {post.image_url ? (
                          <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-3xl">📰</div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <FiCalendar className="w-3.5 h-3.5 text-blue-600" /> {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FiClock className="w-3.5 h-3.5 text-blue-600" /> {post.read_time || 5} min read
                            </span>
                          </div>

                          <h3 className="text-slate-900 font-bold font-heading text-xl mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">By {post.author || "Oz Services"}</span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                          >
                            Read <FiArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
