"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FiHome, FiFileText, FiDollarSign, FiMessageSquare, FiLogOut, FiMenu, FiX, FiCalendar, FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin/dashboard", icon: FiHome, label: "Dashboard" },
  { href: "/admin/bookings", icon: FiCalendar, label: "Bookings" },
  { href: "/admin/blogs", icon: FiFileText, label: "Blog Posts" },
  { href: "/admin/pricing", icon: FiDollarSign, label: "Pricing" },
  { href: "/admin/testimonials", icon: FiMessageSquare, label: "Reviews" },
];

export default function AdminLayout({ children, title, headerAction }: { children: React.ReactNode; title: string; headerAction?: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("adminToken");
    const userData = localStorage.getItem("adminUser");
    if (!token || !userData) {
      router.push("/admin");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    router.push("/admin");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex text-white font-sans">
      {/* Sidebar Overlay for Mobile */}
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
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
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
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-white font-bold text-xl font-heading">{title}</h1>
          </div>
          {headerAction}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
