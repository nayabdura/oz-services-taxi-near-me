"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiImage } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", category: "Travel Guides", read_time: 5, published: true,
  });

  const generateSlug = (val: string) => {
    return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.post("/api/upload", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });
      setImageURL(data.url);
      toast.success("Image uploaded!");
    } catch {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post("/api/blogs", { ...form, image_url: imageURL }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Blog created!");
      router.push("/admin/blogs");
    } catch {
      toast.error("Failed to create blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080E1A] p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/blogs" className="text-slate-400 hover:text-white transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-black text-2xl" style={{ fontFamily: "Outfit, sans-serif" }}>Create New Blog Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Title</label>
              <input type="text" value={form.title} onChange={handleTitleChange} required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Slug</label>
              <input type="text" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} required className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none">
              {["Travel Guides", "Airport Travel", "Corporate", "Comparison", "Safety"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Cover Image</label>
            <div className="bg-slate-800 border border-slate-700 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center">
              {imageURL ? (
                <div className="relative w-full max-w-xs aspect-video mb-4 rounded-lg overflow-hidden border border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageURL} alt="Preview" className="object-cover w-full h-full" />
                </div>
              ) : (
                <FiImage className="w-10 h-10 text-slate-500 mb-3" />
              )}
              <label className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white cursor-pointer px-6 py-2 rounded-lg font-medium transition-colors">
                {uploading ? "Uploading..." : imageURL ? "Change Image" : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
              <p className="text-slate-500 text-xs mt-3">Recommended: 1200x630. Max 5MB (JPG, PNG).</p>
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Excerpt</label>
            <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none h-24" />
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-2 block">Content (HTML allowed)</label>
            <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none h-64 font-mono text-sm" />
          </div>

          <div className="flex items-center gap-6">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="w-5 h-5 rounded border-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900 bg-slate-800" />
                <span className="text-slate-300 font-medium">Publish immediately</span>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button type="submit" disabled={loading} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? "Saving..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
