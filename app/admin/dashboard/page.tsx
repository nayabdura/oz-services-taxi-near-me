"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiHome, FiFileText, FiDollarSign, FiMessageSquare, FiLogOut, FiTrendingUp, FiPlus, FiMenu, FiX, FiCalendar, FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

const navItems = [
  { href: "/admin/dashboard", icon: FiHome, label: "Dashboard" },
  { href: "/admin/bookings", icon: FiCalendar, label: "Bookings" },
  { href: "/admin/blogs", icon: FiFileText, label: "Blog Posts" },
  { href: "/admin/pricing", icon: FiDollarSign, label: "Pricing" },
  { href: "/admin/testimonials", icon: FiMessageSquare, label: "Reviews" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [stats, setStats] = useState({ bookings: 0, blogs: 0, testimonials: 0, revenue: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");
    if (!token || !userData) { router.push("/admin"); return; }
    setUser(JSON.parse(userData));
    fetchStats(token);
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    router.push("/admin");
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
    <div className="min-h-screen bg-slate-950 flex text-white">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <FiTruck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm font-heading">Oz Services</div>
              <div className="text-blue-400 text-xs font-medium">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-800">
          {user && (
            <div className="mb-3 px-3 py-2 bg-slate-800 rounded-xl">
              <div className="text-white text-sm font-semibold">{user.name}</div>
              <div className="text-slate-400 text-xs mt-0.5 truncate">{user.email}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm font-medium w-full"
          >
            <FiLogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-slate-400 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
            <h1 className="text-white font-bold text-xl font-heading">Dashboard Overview</h1>
          </div>
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all active:scale-95"
          >
            <FiPlus className="w-4 h-4" /> New Post
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
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
        </main>
      </div>
    </div>
  );
}
