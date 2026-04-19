"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiCheck, FiTrash2, FiPhone, FiMail, FiCalendar, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  service_type: string;
  status: string;
  passengers: number;
  notes: string;
  created_at: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-400/15 text-yellow-400 border-yellow-400/30",
  confirmed: "bg-sky-400/15 text-sky-400 border-sky-400/30",
  completed: "bg-green-400/15 text-green-400 border-green-400/30",
  cancelled: "bg-red-400/15 text-red-400 border-red-400/30",
};

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { router.push("/admin"); return; }
    fetchBookings(token);
  }, [router]);

  const fetchBookings = async (token: string) => {
    try {
      const { data } = await axios.get(`/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // handle both {bookings:[]} and [] response shapes
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.patch(`/api/bookings`, { id, status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteBooking = async (id: number) => {
    if (!confirm("Delete this booking permanently?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-white font-black text-2xl font-heading">Bookings</h1>
            <p className="text-slate-400 text-sm">{bookings.length} total reservations</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {f}
              {filter !== f && (
                <span className="ml-2 text-xs opacity-60">
                  {bookings.filter((b) => f === "all" || b.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Loading bookings...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <FiCalendar className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-800">
                  <tr>
                    {["#", "Customer", "Route", "Date & Time", "Service", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/50 transition-colors">
                      {/* ID */}
                      <td className="px-5 py-4 text-slate-500 font-mono text-xs">#{b.id}</td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-white font-semibold">
                          <FiUser className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                          {b.name}
                        </div>
                        <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 text-slate-400 text-xs mt-1 hover:text-blue-400 transition-colors">
                          <FiMail className="w-3 h-3" /> {b.email}
                        </a>
                        <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 text-green-400 text-xs mt-0.5 hover:text-green-300 font-semibold">
                          <FiPhone className="w-3 h-3" /> {b.phone}
                        </a>
                      </td>

                      {/* Route */}
                      <td className="px-5 py-4 max-w-xs">
                        <div className="text-xs text-slate-400">From: <span className="text-white font-medium">{b.pickup}</span></div>
                        <div className="text-xs text-slate-400 mt-1">To: <span className="text-white font-medium">{b.dropoff}</span></div>
                        <div className="text-slate-500 text-xs mt-1">{b.passengers} pax</div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-white font-semibold">{b.date}</div>
                        <div className="text-slate-400 text-xs">{b.time}</div>
                        <div className="text-slate-500 text-xs mt-1">{new Date(b.created_at).toLocaleDateString("en-US")}</div>
                      </td>

                      {/* Service */}
                      <td className="px-5 py-4">
                        <span className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-lg capitalize">
                          {b.service_type}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer bg-transparent transition-all ${STATUS_STYLES[b.status] || "bg-slate-800/50 text-slate-400 border-slate-700"}`}
                        >
                          {["pending", "confirmed", "completed", "cancelled"].map((s) => (
                            <option key={s} value={s} className="bg-slate-800 text-white capitalize">
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(b.id, "confirmed")}
                            className="p-2 text-slate-500 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
                            title="Confirm booking"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            title="Delete booking"
                          >
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

        {filtered.length > 0 && (
          <p className="text-slate-500 text-xs text-center mt-4">
            Showing {filtered.length} of {bookings.length} bookings
          </p>
        )}
      </div>
    </div>
  );
}
