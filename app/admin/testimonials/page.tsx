"use client";
import { useState, useEffect } from "react";
import { FiCheck, FiX, FiTrash2, FiMessageSquare } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

interface Testimonial { id: number; name: string; location: string; rating: number; message: string; published: number; created_at: string; }

export default function AdminTestimonialsPage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      // Need all reviews, not just published. We rely on the endpoint returning all when admin fetched (we'll fix the API next)
      const { data } = await axios.get("/api/admin/testimonials", { headers: { Authorization: `Bearer ${token}` } });
      setReviews(data.testimonials || []);
    } catch { toast.error("Failed to load reviews"); }
    finally { setLoading(false); }
  };

  const togglePublish = async (id: number, currentPublished: number) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.patch(`/api/admin/testimonials`, { id, published: currentPublished ? 0 : 1 }, { headers: { Authorization: `Bearer ${token}` } });
      setReviews(reviews.map((r) => (r.id === id ? { ...r, published: currentPublished ? 0 : 1 } : r)));
      toast.success(currentPublished ? "Review hidden" : "Review published");
    } catch { toast.error("Failed to update status"); }
  };

  const deleteReview = async (id: number) => {
    if (!confirm("Permanently delete this review?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/admin/testimonials/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setReviews(reviews.filter((r) => r.id !== id));
      toast.success("Review deleted");
    } catch { toast.error("Delete failed"); }
  };

  return (
    <AdminLayout title="Approve Reviews">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
             <div className="p-16 text-center text-slate-400">Loading reviews...</div>
          ) : reviews.length === 0 ? (
             <div className="p-16 text-center">
              <FiMessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No reviews found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800 bg-slate-800/20">
                  <tr>
                    {["Author", "Review", "Rating", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{review.name}</div>
                        <div className="text-slate-500 text-xs">{review.location}</div>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        <p className="text-slate-300 text-sm italic line-clamp-2">"{review.message}"</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex text-amber-400 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? "opacity-100" : "opacity-30"}>★</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${review.published ? "bg-green-400/15 text-green-400 border border-green-400/30" : "bg-slate-800 text-slate-400 border border-slate-700"}`}>
                          {review.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <button
                            onClick={() => togglePublish(review.id, review.published)}
                            className={`p-2 rounded-lg transition-all ${review.published ? "text-slate-500 hover:text-yellow-400 hover:bg-yellow-400/10" : "text-slate-500 hover:text-green-400 hover:bg-green-400/10"}`}
                            title={review.published ? "Hide from site" : "Publish to site"}
                          >
                            {review.published ? <FiX className="w-4 h-4" /> : <FiCheck className="w-4 h-4" />}
                          </button>
                          <button onClick={() => deleteReview(review.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
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
