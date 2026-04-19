"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";

interface Blog { _id: string; title: string; slug: string; category: string; published: number; featured: number; read_time: number; createdAt: string; }

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const token = () => localStorage.getItem("adminToken") || "";

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs", { headers: { Authorization: `Bearer ${token()}` } });
      setBlogs(Array.isArray(data) ? data : []);
    } catch { toast.error("Failed to load blogs"); }
    finally { setLoading(false); }
  };

  const togglePublish = async (blog: Blog) => {
    try {
      await axios.put(`/api/admin/blogs/${blog._id}`, { ...blog, published: blog.published ? 0 : 1 }, { headers: { Authorization: `Bearer ${token()}` } });
      setBlogs(blogs.map(b => b._id === blog._id ? { ...b, published: b.published ? 0 : 1 } : b));
      toast.success(blog.published ? "Blog unpublished" : "Blog published");
    } catch { toast.error("Failed"); }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post permanently?")) return;
    try {
      await axios.delete(`/api/admin/blogs/${id}`, { headers: { Authorization: `Bearer ${token()}` } });
      setBlogs(blogs.filter(b => b._id !== id));
      toast.success("Blog deleted");
    } catch { toast.error("Delete failed"); }
  };

  return (
    <AdminLayout title="Blog Posts" headerAction={
      <Link href="/admin/blogs/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg">
        <FiPlus className="w-4 h-4" /> New Post
      </Link>
    }>
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">Loading posts...</div>
          ) : blogs.length === 0 ? (
            <div className="p-16 text-center">
              <FiFileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No blog posts yet.</p>
              <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-lg"><FiPlus className="w-4 h-4"/>Write First Post</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800 bg-slate-800/30">
                  <tr>{["Title", "Category", "Status", "Featured", "Read Time", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {blogs.map(blog => (
                    <tr key={blog._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="text-white font-medium line-clamp-1 max-w-xs">{blog.title}</div>
                        <div className="text-slate-500 text-xs mt-0.5">/blog/{blog.slug}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs">{blog.category}</td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${blog.published ? "bg-green-400/15 text-green-400 border border-green-400/30" : "bg-slate-800 text-slate-400 border border-slate-700"}`}>
                          {blog.published ? "Live" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {blog.featured === 1 && <span className="bg-amber-400/15 text-amber-400 border border-amber-400/30 text-xs font-bold px-2 py-1 rounded-full">Featured</span>}
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs">{blog.read_time} min</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/blogs/new?edit=${blog._id}`} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg" title="Edit"><FiEdit className="w-4 h-4"/></Link>
                          <button onClick={() => togglePublish(blog)} className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg" title={blog.published ? "Unpublish" : "Publish"}>
                            {blog.published ? <FiEyeOff className="w-4 h-4"/> : <FiEye className="w-4 h-4"/>}
                          </button>
                          <button onClick={() => deleteBlog(blog._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg" title="Delete"><FiTrash2 className="w-4 h-4"/></button>
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
