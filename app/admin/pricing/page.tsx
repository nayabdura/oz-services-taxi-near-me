"use client";
import { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

interface Plan { id: number; name: string; price: string; unit: string; description: string; features: string; popular: number; sort_order: number; }

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Plan>>({});

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const { data } = await axios.get("/api/pricing");
      setPlans(data.pricing);
    } catch { toast.error("Failed to load pricing plans"); }
    finally { setLoading(false); }
  };

  const handleEdit = (plan: Plan) => {
    setEditingId(plan.id);
    setEditForm(plan);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      // Make sure features is an array, it might come back from DB as stringified JSON
      const parsedFeatures = typeof editForm.features === 'string' ? JSON.parse(editForm.features) : editForm.features;
      await axios.put("/api/pricing", { ...editForm, features: parsedFeatures }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Pricing updated");
      setEditingId(null);
      fetchPricing();
    } catch { toast.error("Failed to update pricing"); }
  };

  return (
    <AdminLayout title="Manage Pricing">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
           {loading ? (
            <div className="p-16 text-center text-slate-400">Loading pricing...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800 bg-slate-800/20">
                  <tr>
                    {["Plan Name", "Price", "Unit", "Popular", "Order", "Actions"].map((h) => (
                      <th key={h} className="text-left px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-slate-800/50 transition-colors">
                      {editingId === plan.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="bg-slate-800 border-slate-700 text-white rounded px-2 py-1 w-full text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <input value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} className="bg-slate-800 border-slate-700 text-white rounded px-2 py-1 w-20 text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <input value={editForm.unit} onChange={(e) => setEditForm({...editForm, unit: e.target.value})} className="bg-slate-800 border-slate-700 text-white rounded px-2 py-1 w-24 text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <input type="checkbox" checked={!!editForm.popular} onChange={(e) => setEditForm({...editForm, popular: e.target.checked ? 1 : 0})} className="accent-blue-500 w-4 h-4" />
                          </td>
                          <td className="px-6 py-4">
                             <input type="number" value={editForm.sort_order} onChange={(e) => setEditForm({...editForm, sort_order: parseInt(e.target.value)})} className="bg-slate-800 border-slate-700 text-white rounded px-2 py-1 w-16 text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={handleSave} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg"><FiSave className="w-4 h-4"/></button>
                              <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg"><FiX className="w-4 h-4"/></button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 text-white font-medium">{plan.name}</td>
                          <td className="px-6 py-4 text-white font-bold">{plan.price}</td>
                          <td className="px-6 py-4 text-slate-400 text-xs">{plan.unit}</td>
                          <td className="px-6 py-4">
                            {plan.popular === 1 && <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Popular</span>}
                          </td>
                          <td className="px-6 py-4 text-slate-400">{plan.sort_order}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEdit(plan)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg">
                                <FiEdit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
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
