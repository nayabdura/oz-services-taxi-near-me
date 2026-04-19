"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

interface Plan { _id: string; name: string; price: string; unit: string; description: string; features: string; popular: number; sort_order: number; }
const empty: Partial<Plan> = { name: "", price: "", unit: "per ride", description: "", features: "", popular: 0, sort_order: 0 };

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Plan>>(empty);
  const [showAdd, setShowAdd] = useState(false);

  const token = () => localStorage.getItem("adminToken") || "";

  useEffect(() => { fetchPricing(); }, []);

  const fetchPricing = async () => {
    try {
      const { data } = await axios.get("/api/admin/pricing", { headers: { Authorization: `Bearer ${token()}` } });
      setPlans(data);
    } catch { toast.error("Failed to load pricing plans"); }
    finally { setLoading(false); }
  };

  const handleAdd = async () => {
    try {
      await axios.post("/api/admin/pricing", form, { headers: { Authorization: `Bearer ${token()}` } });
      toast.success("Plan added!"); setShowAdd(false); setForm(empty); fetchPricing();
    } catch { toast.error("Failed to add plan"); }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/admin/pricing/${editingId}`, form, { headers: { Authorization: `Bearer ${token()}` } });
      toast.success("Plan updated!"); setEditingId(null); setForm(empty); fetchPricing();
    } catch { toast.error("Failed to update plan"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this pricing plan?")) return;
    try {
      await axios.delete(`/api/admin/pricing/${id}`, { headers: { Authorization: `Bearer ${token()}` } });
      toast.success("Plan deleted!"); fetchPricing();
    } catch { toast.error("Delete failed"); }
  };

  const inp = "w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500";

  return (
    <AdminLayout title="Manage Pricing" headerAction={
      <button onClick={() => { setShowAdd(true); setForm(empty); }} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
        <FiPlus className="w-4 h-4" /> Add Plan
      </button>
    }>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Add Form */}
        {showAdd && (
          <div className="bg-slate-900 border border-blue-500/50 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">New Pricing Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><label className="text-slate-400 text-xs mb-1 block">Plan Name*</label><input className={inp} placeholder="e.g. Economy Ride" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Price*</label><input className={inp} placeholder="e.g. $8" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Unit</label><input className={inp} placeholder="e.g. base fare" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Sort Order</label><input type="number" className={inp} value={form.sort_order} onChange={e => setForm({...form, sort_order: parseInt(e.target.value)})} /></div>
              <div className="md:col-span-2"><label className="text-slate-400 text-xs mb-1 block">Description</label><input className={inp} placeholder="Short description of this plan" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div className="md:col-span-2"><label className="text-slate-400 text-xs mb-1 block">Features (one per line)</label><textarea className={inp} rows={4} placeholder="Up to 4 passengers&#10;Air conditioned&#10;GPS tracked" value={form.features} onChange={e => setForm({...form, features: e.target.value})} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="popular" className="accent-blue-500 w-4 h-4" checked={!!form.popular} onChange={e => setForm({...form, popular: e.target.checked ? 1 : 0})} /><label htmlFor="popular" className="text-slate-300 text-sm">Mark as Popular</label></div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2 rounded-lg"><FiSave className="w-4 h-4"/> Save Plan</button>
              <button onClick={() => setShowAdd(false)} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-lg"><FiX className="w-4 h-4"/> Cancel</button>
            </div>
          </div>
        )}

        {/* Plans Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">Loading pricing...</div>
          ) : plans.length === 0 ? (
            <div className="p-16 text-center text-slate-400">No plans yet. Click "Add Plan" to get started.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800 bg-slate-800/30">
                  <tr>{["Plan Name", "Price", "Unit", "Description", "Popular", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {plans.map(plan => (
                    <tr key={plan._id} className="hover:bg-slate-800/40 transition-colors">
                      {editingId === plan._id ? (
                        <>
                          <td className="px-5 py-4"><input className={inp} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></td>
                          <td className="px-5 py-4"><input className={inp} value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></td>
                          <td className="px-5 py-4"><input className={inp} value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} /></td>
                          <td className="px-5 py-4"><input className={inp} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></td>
                          <td className="px-5 py-4"><input type="checkbox" className="accent-blue-500 w-4 h-4" checked={!!form.popular} onChange={e => setForm({...form, popular: e.target.checked ? 1 : 0})} /></td>
                          <td className="px-5 py-4"><div className="flex gap-2">
                            <button onClick={handleSave} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg"><FiSave className="w-4 h-4"/></button>
                            <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg"><FiX className="w-4 h-4"/></button>
                          </div></td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-4 text-white font-medium">{plan.name}</td>
                          <td className="px-5 py-4 text-blue-400 font-bold">{plan.price}</td>
                          <td className="px-5 py-4 text-slate-400 text-xs">{plan.unit}</td>
                          <td className="px-5 py-4 text-slate-400 text-xs max-w-xs truncate">{plan.description}</td>
                          <td className="px-5 py-4">{plan.popular === 1 && <span className="flex items-center gap-1 text-amber-400 text-xs font-bold"><FiStar className="w-3 h-3"/>Popular</span>}</td>
                          <td className="px-5 py-4"><div className="flex gap-2">
                            <button onClick={() => { setEditingId(plan._id); setForm(plan); }} className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg"><FiEdit className="w-4 h-4"/></button>
                            <button onClick={() => handleDelete(plan._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg"><FiTrash2 className="w-4 h-4"/></button>
                          </div></td>
                        </>
                      )}
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
