"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiTrash2, FiPlus, FiEdit3, FiImage, FiToggleLeft, FiToggleRight, FiX, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

interface FleetCar {
  _id: string;
  name: string;
  price: string;
  description: string;
  image_url: string;
  active: number;
  sort_order: number;
}

const empty = { name: "", price: "", description: "", image_url: "", active: 1, sort_order: 0 };

export default function AdminFleetPage() {
  const [fleet, setFleet] = useState<FleetCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<FleetCar>>(empty);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const token = () => localStorage.getItem("adminToken") || "";

  useEffect(() => { fetchFleet(); }, []);

  const fetchFleet = async () => {
    try {
      const { data } = await axios.get("/api/admin/fleet", { headers: { Authorization: `Bearer ${token()}` } });
      setFleet(Array.isArray(data) ? data : []);
    } catch { toast.error("Failed to fetch fleet"); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditId(null); setForm(empty); setShowModal(true); };
  const openEdit = (car: FleetCar) => { setEditId(car._id); setForm(car); setShowModal(true); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("folder", "fleet");
      const { data } = await axios.post("/api/upload", fd, { headers: { Authorization: `Bearer ${token()}` } });
      setForm(f => ({ ...f, image_url: data.url }));
      toast.success("Image uploaded!");
    } catch { toast.error("Image upload failed"); }
    finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!form.name) return toast.error("Vehicle name is required");
    try {
      if (editId) {
        await axios.put(`/api/admin/fleet/${editId}`, form, { headers: { Authorization: `Bearer ${token()}` } });
        toast.success("Vehicle updated!");
      } else {
        await axios.post("/api/admin/fleet", form, { headers: { Authorization: `Bearer ${token()}` } });
        toast.success("Vehicle added!");
      }
      setShowModal(false); fetchFleet();
    } catch { toast.error("Failed to save vehicle"); }
  };

  const toggleActive = async (car: FleetCar) => {
    try {
      await axios.put(`/api/admin/fleet/${car._id}`, { ...car, active: car.active ? 0 : 1 }, { headers: { Authorization: `Bearer ${token()}` } });
      setFleet(fleet.map(c => c._id === car._id ? { ...c, active: c.active ? 0 : 1 } : c));
    } catch { toast.error("Failed to toggle status"); }
  };

  const deleteCar = async (id: string) => {
    if (!confirm("Delete this vehicle?")) return;
    try {
      await axios.delete(`/api/admin/fleet/${id}`, { headers: { Authorization: `Bearer ${token()}` } });
      setFleet(fleet.filter(c => c._id !== id));
      toast.success("Vehicle deleted");
    } catch { toast.error("Delete failed"); }
  };

  const inp = "w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 placeholder-slate-500";

  return (
    <AdminLayout title="Fleet Management" headerAction={
      <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
        <FiPlus className="w-4 h-4" /> Add Vehicle
      </button>
    }>
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="p-16 text-center text-slate-400">Loading fleet...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map(car => (
              <div key={car._id} className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all ${car.active ? "border-slate-800" : "border-slate-800 opacity-60"}`}>
                {/* Image */}
                <div className="relative h-48 bg-slate-800">
                  {car.image_url ? (
                    <Image src={car.image_url} alt={car.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600"><FiImage className="w-12 h-12" /></div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button onClick={() => toggleActive(car)} className="p-1.5 bg-slate-900/80 backdrop-blur rounded-lg text-slate-300 hover:text-white" title={car.active ? "Disable" : "Enable"}>
                      {car.active ? <FiToggleRight className="w-5 h-5 text-green-400" /> : <FiToggleLeft className="w-5 h-5 text-slate-500" />}
                    </button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{car.name}</h3>
                    <span className="text-blue-400 font-bold text-sm whitespace-nowrap">{car.price}</span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">{car.description}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(car)} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
                      <FiEdit3 className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={() => deleteCar(car._id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Add Card */}
            <button onClick={openAdd} className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl h-full min-h-64 flex flex-col items-center justify-center text-slate-500 hover:text-blue-400 transition-all gap-3">
              <FiPlus className="w-10 h-10" />
              <span className="text-sm font-medium">Add New Vehicle</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-xl">{editId ? "Edit Vehicle" : "Add Vehicle"}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white"><FiX className="w-5 h-5"/></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-slate-400 text-xs mb-1 block">Vehicle Name *</label><input className={inp} placeholder="e.g. Premium SUV" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Starting Price</label><input className={inp} placeholder="e.g. From $45" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
              <div><label className="text-slate-400 text-xs mb-1 block">Description</label><textarea className={inp} rows={3} placeholder="Brief description of this vehicle..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Vehicle Photo</label>
                {form.image_url ? (
                  <div className="relative rounded-xl overflow-hidden h-36">
                    <img src={form.image_url} alt="preview" className="w-full h-full object-cover" />
                    <button onClick={() => setForm({...form, image_url: ""})} className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white"><FiX className="w-3 h-3"/></button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full h-28 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 text-slate-500 hover:text-blue-400 transition-all">
                    <FiImage className="w-7 h-7 mb-1" />
                    <span className="text-xs">{uploading ? "Uploading..." : "Click to upload photo"}</span>
                  </button>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-slate-400 text-xs mb-1 block">Sort Order</label><input type="number" className={inp} value={form.sort_order} onChange={e => setForm({...form, sort_order: parseInt(e.target.value)})} /></div>
                <div className="flex items-end pb-2.5"><label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer"><input type="checkbox" className="accent-blue-500 w-4 h-4" checked={!!form.active} onChange={e => setForm({...form, active: e.target.checked ? 1 : 0})} />Active on site</label></div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors"><FiSave className="w-4 h-4"/> {editId ? "Update" : "Add Vehicle"}</button>
              <button onClick={() => setShowModal(false)} className="px-5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
