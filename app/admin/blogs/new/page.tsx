"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSave, FiArrowLeft, FiImage, FiX, FiLink, FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";

const empty = { title: "", slug: "", excerpt: "", content: "", category: "Travel Guides", image_url: "", meta_title: "", meta_description: "", published: 0, featured: 0, read_time: 5, author: "Oz Services" };
const CATEGORIES = ["Travel Guides", "Airport Travel", "Corporate Travel", "Tips & Advice", "News"];

function BlogEditorInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("edit");
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const token = () => localStorage.getItem("adminToken") || "";

  useEffect(() => {
    if (editId) {
      axios.get(`/api/admin/blogs/${editId}`, { headers: { Authorization: `Bearer ${token()}` } })
        .then(({ data }) => setForm(data))
        .catch(() => toast.error("Could not load blog post"));
    }
  }, [editId]);

  const genSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitle = (v: string) => {
    setForm(f => ({ ...f, title: v, slug: f.slug || genSlug(v), meta_title: f.meta_title || v }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("folder", "blogs");
      const { data } = await axios.post("/api/upload", fd, { headers: { Authorization: `Bearer ${token()}` } });
      setForm(f => ({ ...f, image_url: data.url }));
      toast.success("Image uploaded!");
    } catch { toast.error("Image upload failed"); }
    finally { setUploading(false); }
  };

  const insertAtCursor = (text: string) => {
    const el = contentRef.current;
    if (!el) {
      setForm(f => ({ ...f, content: f.content + text }));
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newContent = form.content.substring(0, start) + text + form.content.substring(end);
    setForm(f => ({ ...f, content: newContent }));
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + text.length, start + text.length);
    }, 10);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter internal URL (e.g., /locations/florida, /blog/post-slug, or /):");
    if (!url) return;
    const anchorText = prompt("Enter anchor text (e.g., local taxi near me):");
    if (!anchorText) return;
    insertAtCursor(`<a href="${url}" title="Oz Services - ${anchorText}">${anchorText}</a>`);
  };

  const handleInsertContentImage = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      toast.loading("Uploading image...", { id: 'content-upload' });
      try {
        const fd = new FormData();
        fd.append("image", file);
        fd.append("folder", "blogs");
        const { data } = await axios.post("/api/upload", fd, { headers: { Authorization: `Bearer ${token()}` } });
        const altText = prompt("Enter SEO alt text for this image (e.g., airport taxi service in Orlando):") || "Taxi service";
        insertAtCursor(`\n<img src="${data.url}" alt="${altText}" loading="lazy" />\n`);
        toast.success("Image inserted!", { id: 'content-upload' });
      } catch {
        toast.error("Image upload failed", { id: 'content-upload' });
      }
    };
    fileInput.click();
  };

  const handleSave = async () => {
    if (!form.title) return toast.error("Title is required");
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`/api/admin/blogs/${editId}`, form, { headers: { Authorization: `Bearer ${token()}` } });
        toast.success("Blog post updated!");
      } else {
        await axios.post("/api/admin/blogs", { ...form, slug: form.slug || genSlug(form.title) }, { headers: { Authorization: `Bearer ${token()}` } });
        toast.success("Blog post created!");
      }
      router.push("/admin/blogs");
    } catch { toast.error("Failed to save blog post"); }
    finally { setLoading(false); }
  };

  const inp = "w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500";
  const label = "text-slate-400 text-xs font-semibold mb-1.5 block uppercase tracking-wider";

  return (
    <AdminLayout title={editId ? "Edit Blog Post" : "New Blog Post"} headerAction={
      <div className="flex gap-3">
        <Link href="/admin/blogs" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
          <FiArrowLeft className="w-4 h-4" /> Back
        </Link>
        <button onClick={() => { setForm(f => ({...f, published: 1})); setTimeout(handleSave, 0); }} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
          <FiSave className="w-4 h-4" /> Publish
        </button>
        <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg disabled:opacity-50 transition-colors">
          <FiSave className="w-4 h-4" /> {loading ? "Saving..." : "Save Draft"}
        </button>
      </div>
    }>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div>
            <label className={label}>Title *</label>
            <input className={inp} placeholder="e.g. Best Taxi Services in NYC" value={form.title} onChange={e => handleTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>URL Slug</label>
              <input className={inp} placeholder="auto-generated-from-title" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
            </div>
            <div>
              <label className={label}>Category</label>
              <select className={inp} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={label}>Excerpt (short summary)</label>
            <textarea className={inp} rows={2} placeholder="A short description shown on blog listing page..." value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className={label}>Content (HTML supported)</label>
              <div className="flex gap-2">
                <button onClick={handleInsertLink} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                  <FiLink className="w-3.5 h-3.5" /> Insert Internal Link
                </button>
                <button onClick={handleInsertContentImage} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                  <FiUploadCloud className="w-3.5 h-3.5" /> Insert Image
                </button>
              </div>
            </div>
            <textarea ref={contentRef} className={`${inp} font-mono text-xs`} rows={20} placeholder="<h2>Your heading</h2><p>Your content...</p>" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
            <p className="text-slate-500 text-xs mt-1">Select text to overwrite or just click to insert at cursor position.</p>
          </div>
        </div>

        {/* Image */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <label className={label}>Featured Image</label>
          {form.image_url ? (
            <div className="relative">
              <img src={form.image_url} alt="preview" className="w-full h-48 object-cover rounded-xl" />
              <button onClick={() => setForm({...form, image_url: ""})} className="absolute top-2 right-2 p-1.5 bg-red-600 rounded-full text-white hover:bg-red-700"><FiX className="w-4 h-4"/></button>
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full h-36 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 text-slate-400 hover:text-blue-400 transition-all">
              <FiImage className="w-8 h-8 mb-2" />
              <span className="text-sm">{uploading ? "Uploading to Cloudinary..." : "Click to upload image"}</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>

        {/* SEO */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-bold">SEO Settings</h3>
          <div>
            <label className={label}>Meta Title</label>
            <input className={inp} placeholder="SEO optimized title" value={form.meta_title} onChange={e => setForm({...form, meta_title: e.target.value})} />
          </div>
          <div>
            <label className={label}>Meta Description</label>
            <textarea className={inp} rows={2} placeholder="SEO description (155 chars max)" value={form.meta_description} onChange={e => setForm({...form, meta_description: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Read Time (minutes)</label>
              <input type="number" className={inp} value={form.read_time} onChange={e => setForm({...form, read_time: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className={label}>Author</label>
              <input className={inp} value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
              <input type="checkbox" className="accent-blue-500 w-4 h-4" checked={!!form.published} onChange={e => setForm({...form, published: e.target.checked ? 1 : 0})} />
              Published (Live)
            </label>
            <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
              <input type="checkbox" className="accent-amber-500 w-4 h-4" checked={!!form.featured} onChange={e => setForm({...form, featured: e.target.checked ? 1 : 0})} />
              Featured Post
            </label>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function BlogEditorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading editor...</div>}>
      <BlogEditorInner />
    </Suspense>
  );
}
