"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiFileText, FiDollarSign, FiMessageSquare, FiTrendingUp, FiPlus, FiCalendar } from "react-icons/fi";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ bookings: 0, blogs: 0, testimonials: 0, revenue: 0 });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    fetchStats(token);
  }, []);

  const fetchStats = async (token: string) => {
    try {
      const { data } = await axios.get(`/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats({
        bookings: data.stats?.bookingsCount || 0,
        blogs: data.stats?.blogsCount || 0,
        testimonials: data.stats?.testimonialsCount || 0,
        revenue: (data.stats?.bookingsCount || 0) * 35,
      });
    } catch { /* silent */ }
  };

  const StatCard = ({ title, value, icon: Icon, accent }: {
    title: string; value: number | string; icon: React.ElementType; accent: string;
  }) => (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-5">
        <div className={`w-11 h-11 rounded-xl ${accent} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <FiTrendingUp className="w-4 h-4 text-green-400" />
      </div>
      <div className="text-3xl font-black text-white mb-1 font-heading">{value}</div>
      <div className="text-slate-400 text-sm font-medium">{title}</div>
    </div>
  );

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Bookings" value={stats.bookings} icon={FiCalendar} accent="bg-amber-500/20 text-amber-400" />
        <StatCard title="Blog Posts" value={stats.blogs} icon={FiFileText} accent="bg-sky-500/20 text-sky-400" />
        <StatCard title="Reviews" value={stats.testimonials} icon={FiMessageSquare} accent="bg-purple-500/20 text-purple-400" />
        <StatCard title="Est. Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={FiDollarSign} accent="bg-green-500/20 text-green-400" />
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-bold text-lg mb-5 font-heading">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "View Bookings", href: "/admin/bookings", icon: FiCalendar, color: "from-amber-500 to-orange-600" },
            { label: "New Blog Post", href: "/admin/blogs/new", icon: FiFileText, color: "from-sky-500 to-blue-600" },
            { label: "Manage Pricing", href: "/admin/pricing", icon: FiDollarSign, color: "from-green-500 to-emerald-600" },
            { label: "Approve Reviews", href: "/admin/testimonials", icon: FiMessageSquare, color: "from-purple-500 to-violet-600" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={`bg-gradient-to-br ${a.color} p-5 rounded-xl flex flex-col items-center gap-3 text-white hover:opacity-90 transition-opacity`}
            >
              <a.icon className="w-6 h-6" />
              <span className="text-sm font-bold text-center">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-white font-bold text-lg mb-4 font-heading">System Info</h2>
        <div className="space-y-2">
          {[
            ["Status", "All systems operational"],
            ["Email System", "Resend API"],
            ["Database", "SQLite (better-sqlite3)"],
            ["Environment", process.env.NODE_ENV || "development"],
            ["Last Updated", new Date().toLocaleDateString("en-US")],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-3 border-b border-slate-800 text-sm">
              <span className="text-slate-400 font-medium">{k}</span>
              <span className="text-white font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
