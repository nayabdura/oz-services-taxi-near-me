"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiMail, FiEye, FiEyeOff, FiTruck } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/auth/login`, form);
      if (data.user.role !== "admin") {
        toast.error("Access denied. Admin privileges required.");
        return;
      }
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      toast.success("Welcome back, " + data.user.name);
      router.push("/admin/dashboard");
    } catch {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-600/30">
            <FiTruck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-white font-black text-2xl font-heading tracking-tight">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-2">Oz Services Management Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-bold text-xl mb-7 text-center font-heading">Sign In to Continue</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Ozaseel1978@gmail.com"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-11 pr-12 py-3.5 text-sm font-medium placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-blue-600/20 mt-2"
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Secured with JWT Authentication · Oz Services © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
