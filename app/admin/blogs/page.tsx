"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiTrash2, FiPlus, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

interface Blog { id: number; title: string; category: string; published: number; read_time: number; created_at: string; slug: string; }

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    fetchBlogs(token);
  }, []);

  const fetchBlogs = async (token: string) => {
    try {
      const { data } = await axios.get("/api/blogs?limit=100", { headers: { Authorization: `Bearer ${token}` } });
      setBlogs(data.blogs);
    } catch { toast.error("Failed to fetch blogs"); }
    finally { setLoading(false); }
  };

  const deleteBlog = async (id: number) => {
    if (!confirm("Delete this blog post?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("Blog deleted");
    } catch { toast.error("Failed to delete blog"); }
  };

  return (
    <AdminLayout 
      title="Blog Posts" 
      headerAction={
        <Link href="/admin/blogs/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all active:scale-95">
          <FiPlus className="w-4 h-4" /> New Post
        </Link>
      }
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading blogs...
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-5xl mb-4">📝</div>
              <div className="text-white font-bold mb-2">No blog posts yet</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800 bg-slate-800/20">
                  <tr>
                    {["Title", "Category", "Status", "Read Time", "Date", "Actions"].map((h) => (
                      <th key={h} className="text-left px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium line-clamp-1 max-w-xs">{blog.title}</div>
                        <div className="text-slate-500 text-xs mt-1">/blog/{blog.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-lg">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${blog.published ? "bg-green-400/15 text-green-400 border border-green-400/30" : "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"}`}>
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{blog.read_time} min</td>
                      <td className="px-6 py-4 text-slate-400">{new Date(blog.created_at).toLocaleDateString("en-US")}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/blog/${blog.slug}`} target="_blank" className="p-2 text-slate-500 hover:text-sky-400 hover:bg-sky-400/10 rounded-lg transition-all" title="View live">
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => deleteBlog(blog.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
