"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiTrash2, FiSave, FiX, FiCheck, FiMessageSquare } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

interface Review { _id: string; name: string; location: string; rating: number; message: string; published: number; createdAt: string; }
const empty = { name: "", location: "", rating: 5, message: "", published: 1 };

export default function AdminTestimonialsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(empty);

  const token = () => localStorage.getItem("adminToken") || "";

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("/api/admin/testimonials", { headers: { Authorization: `Bearer ${token()}` } });
      setReviews(Array.isArray(data) ? data : []);
    } catch { toast.error("Failed to load reviews"); }
    finally { setLoading(false); }
  };

  const handleAdd = async () => {
    if (!form.name || !form.message) return toast.error("Name and message are required");
    try {
      await axios.post("/api/admin/testimonials", form, { headers: { Authorization: `Bearer ${token()}` } });
      toast.success("Review added!"); setShowAdd(false); setForm(empty); fetchReviews();
    } catch { toast.error("Failed to add review"); }
  };

  const togglePublish = async (review: Review) => {
    try {
      await axios.put(`/api/admin/testimonials/${review._id}`, { ...review, published: review.published ? 0 : 1 }, { headers: { Authorization: `Bearer ${token()}` } });
      setReviews(reviews.map(r => r._id === review._id ? { ...r, published: r.published ? 0 : 1 } : r));
      toast.success(review.published ? "Review hidden" : "Review published");
    } catch { toast.error("Failed"); }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Permanently delete this review?")) return;
    try {
      await axios.delete(`/api/admin/testimonials/${id}`, { headers: { Authorization: `Bearer ${token()}` } });
      setReviews(reviews.filter(r => r._id !== id));
      toast.success("Review deleted");
    } catch { toast.error("Delete failed"); }
  };

  const inp = "w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500";

  return (
    <AdminLayout title="Manage Reviews" headerAction={
      <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg">
        <FiPlus className="w-4 h-4" /> Add Review
      </button>
    }>
      <div className="max-w-5xl mx-auto space-y-6">
        {showAdd && (
          <div className="bg-slate-900 border border-blue-500/50 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">New Review</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className="text-slate-400 text-xs mb-1 block">Customer Name*</label><input className={inp} placeholder="e.g. John Smith" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Location</label><input className={inp} placeholder="e.g. New York, NY" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Rating (1-5)</label>
                <select className={inp} value={form.rating} onChange={e => setForm({...form, rating: parseInt(e.target.value)})}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 mt-5"><input type="checkbox" id="pub" className="accent-blue-500 w-4 h-4" checked={!!form.published} onChange={e => setForm({...form, published: e.target.checked ? 1 : 0})} /><label htmlFor="pub" className="text-slate-300 text-sm">Publish immediately</label></div>
              <div className="md:col-span-2"><label className="text-slate-400 text-xs mb-1 block">Review Message*</label><textarea className={inp} rows={4} placeholder="Customer review text..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} /></div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2 rounded-lg"><FiSave className="w-4 h-4"/> Save Review</button>
              <button onClick={() => setShowAdd(false)} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-lg"><FiX className="w-4 h-4"/> Cancel</button>
            </div>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="p-16 text-center">
              <FiMessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400">No reviews yet. Add your first one!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800 bg-slate-800/30">
                  <tr>{["Author", "Review", "Rating", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {reviews.map(review => (
                    <tr key={review._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="text-white font-medium">{review.name}</div>
                        <div className="text-slate-500 text-xs">{review.location}</div>
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-slate-300 text-sm italic line-clamp-2">&quot;{review.message}&quot;</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex text-amber-400 text-sm">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${review.published ? "bg-green-400/15 text-green-400 border border-green-400/30" : "bg-slate-800 text-slate-400 border border-slate-700"}`}>
                          {review.published ? "Published" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => togglePublish(review)} className={`p-2 rounded-lg transition-all ${review.published ? "text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10" : "text-slate-400 hover:text-green-400 hover:bg-green-400/10"}`} title={review.published ? "Hide" : "Publish"}>
                            {review.published ? <FiX className="w-4 h-4"/> : <FiCheck className="w-4 h-4"/>}
                          </button>
                          <button onClick={() => deleteReview(review._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg"><FiTrash2 className="w-4 h-4"/></button>
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
