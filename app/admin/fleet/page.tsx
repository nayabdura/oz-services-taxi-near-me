"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiTrash2, FiPlus, FiEdit3, FiImage, FiToggleLeft, FiToggleRight, FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

interface FleetCar {
  id: number;
  name: string;
  price: string;
  description: string;
  image_url: string;
  active: number;
  sort_order: number;
}

export default function AdminFleetPage() {
  const [fleet, setFleet] = useState<FleetCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FleetCar>>({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    fetchFleet(token);
  }, []);

  const fetchFleet = async (token: string) => {
    try {
      const { data } = await axios.get("/api/admin/fleet", { headers: { Authorization: `Bearer ${token}` } });
      setFleet(data);
    } catch { 
      toast.error("Failed to fetch fleet"); 
    } finally { 
      setLoading(false); 
    }
  };

  const deleteCar = async (id: number) => {
    if (!confirm("Delete this vehicle?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/admin/fleet/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setFleet(fleet.filter((c) => c.id !== id));
      toast.success("Vehicle deleted");
    } catch { 
      toast.error("Failed to delete vehicle"); 
    }
  };

  const toggleActive = async (car: FleetCar) => {
    const token = localStorage.getItem("adminToken");
    try {
      const newActive = car.active ? 0 : 1;
      const { data } = await axios.put(`/api/admin/fleet/${car.id}`, { active: newActive }, { headers: { Authorization: `Bearer ${token}` } });
      setFleet(fleet.map(c => c.id === car.id ? data : c));
      toast.success(`Vehicle ${newActive ? 'Enabled' : 'Disabled'}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const saveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    try {
      if (formData.id) {
        const { data } = await axios.put(`/api/admin/fleet/${formData.id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
        setFleet(fleet.map(c => c.id === formData.id ? data : c));
        toast.success("Vehicle updated");
      } else {
        const { data } = await axios.post(`/api/admin/fleet`, formData, { headers: { Authorization: `Bearer ${token}` } });
        setFleet([...fleet, data]);
        toast.success("Vehicle added");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to save vehicle");
    }
  };

  const openNewModal = () => {
    setFormData({ active: 1, sort_order: 0, image_url: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (car: FleetCar) => {
    setFormData(car);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem("adminToken");

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      uploadData.append('folder', 'fleet');

      const { data } = await axios.post('/api/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setFormData({ ...formData, image_url: data.url });
      toast.success('Image uploaded');
    } catch (error) {
      console.error('Upload error', error);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <AdminLayout 
      title="Fleet Management" 
      headerAction={
        <button onClick={openNewModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all active:scale-95">
          <FiPlus className="w-4 h-4" /> Add Vehicle
        </button>
      }
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading fleet...
            </div>
          ) : fleet.length === 0 ? (
            <div className="p-16 text-center">
              <div className="text-5xl mb-4">🚘</div>
              <div className="text-white font-bold mb-2">No vehicles in fleet</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm mt-2">
                <thead className="border-b border-slate-800 bg-slate-800/20">
                  <tr>
                    {["Image", "Vehicle", "Price", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left px-6 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {fleet.map((car) => (
                    <tr key={car.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                         {car.image_url ? (
                           <div className="w-20 h-12 rounded overflow-hidden relative border border-slate-700">
                             <img src={car.image_url} alt={car.name} className="object-cover w-full h-full" />
                           </div>
                         ) : (
                           <div className="w-20 h-12 bg-slate-800 rounded flex items-center justify-center text-slate-500 border border-slate-700">
                             <FiImage className="w-5 h-5"/>
                           </div>
                         )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium max-w-xs">{car.name}</div>
                        <div className="text-slate-500 text-xs mt-1 truncate">{car.description?.substring(0, 40)}...</div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-sky-400">{car.price || '-'}</td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => toggleActive(car)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            car.active ? "bg-green-400/15 text-green-400 border border-green-400/30 hover:bg-red-400/15 hover:text-red-400 hover:border-red-400/30" : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-green-400/15 hover:text-green-400 hover:border-green-400/30"
                          }`}
                        >
                          {car.active ? <><FiToggleRight className="w-4 h-4" /> Active</> : <><FiToggleLeft className="w-4 h-4" /> Disabled</>}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => openEditModal(car)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all" title="Edit">
                            <FiEdit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteCar(car.id)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all" title="Delete">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
              <h2 className="text-xl font-bold text-white">{formData.id ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <form onSubmit={saveCar} className="p-6 space-y-5">
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vehicle Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name || ''} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="e.g. Premium SUV"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pricing</label>
                    <input 
                      type="text" 
                      value={formData.price || ''} 
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="e.g. From $45"
                    />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Short Description</label>
                <textarea 
                  value={formData.description || ''} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  rows={3}
                  placeholder="Seating up to 6 passengers comfortably..."
                />
              </div>

               <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vehicle Image</label>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
                  {formData.image_url ? (
                    <div className="w-24 h-16 relative rounded-lg overflow-hidden border border-slate-700 shrink-0">
                      <img src={formData.image_url} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-24 h-16 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 shrink-0">
                       <FiImage className="w-6 h-6 text-slate-500"/>
                    </div>
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button 
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700"
                    >
                      {uploading ? <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" /> : <FiUploadCloud className="w-4 h-4" />}
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                    <p className="text-xs text-slate-500 mt-2">JPG, PNG or WEBP. Max 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-transform active:scale-95 disabled:opacity-50"
                >
                  {formData.id ? 'Save Changes' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
