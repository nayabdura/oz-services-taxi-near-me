"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCalendar, FiClock, FiSearch, FiUser } from "react-icons/fi";
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
    if (selectedCategory !== "All" || searchQuery !== "") {
      return filteredPosts;
    }
    return posts.filter(p => p.slug !== featuredPost.slug);
  }, [posts, filteredPosts, featuredPost, selectedCategory, searchQuery]);

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="bg-slate-900 py-16 lg:py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-400 font-bold tracking-wider uppercase text-xs mb-3">
            Oz Services Travel & Taxi Guides
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mb-4 text-white">
            USA Taxi Tips & <span className="text-blue-500">Travel Guides</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Expert advice, transportation guides, and travel insights from America&apos;s trusted nationwide taxi network.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides, airports, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-md"
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
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500 text-sm font-medium">
              Loading articles...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 max-w-md mx-auto shadow-sm">
              <h3 className="text-slate-900 font-bold text-lg mb-2">No articles found</h3>
              <p className="text-slate-600 text-xs mb-6">
                No posts match your search or selected category.
              </p>
              <button
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post Card */}
              {featuredPost && selectedCategory === "All" && searchQuery === "" && (
                <div className="mb-14">
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-slate-100 min-h-[280px]">
                      {featuredPost.image_url ? (
                        <Image
                          src={featuredPost.image_url}
                          alt={featuredPost.title}
                          fill
                          priority
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm font-bold">No Image</div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
                          Featured Article
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3 flex-wrap">
                          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-semibold">
                            {featuredPost.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3.5 h-3.5 text-blue-600" /> {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3.5 h-3.5 text-blue-600" /> {featuredPost.read_time || 5} min read
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                          <Link href={`/blog/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                          <FiUser className="w-3.5 h-3.5 text-slate-400" />
                          <span>{featuredPost.author || "Oz Services"}</span>
                        </div>

                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                        >
                          Read Article <FiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Regular Posts */}
              <div>
                {selectedCategory === "All" && searchQuery === "" && (
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-6">
                    Latest Articles
                  </h3>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                    >
                      <div>
                        <div className="aspect-[16/9] w-full bg-slate-100 relative overflow-hidden">
                          {post.image_url ? (
                            <Image
                              src={post.image_url}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-bold">No Image</div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <FiCalendar className="w-3.5 h-3.5 text-blue-600" /> {post.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FiClock className="w-3.5 h-3.5 text-blue-600" /> {post.read_time || 5} min read
                            </span>
                          </div>

                          <h3 className="text-slate-900 font-bold font-heading text-lg mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">By {post.author || "Oz Services"}</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1"
                        >
                          Read <FiArrowRight className="w-3.5 h-3.5" />
                        </Link>
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
