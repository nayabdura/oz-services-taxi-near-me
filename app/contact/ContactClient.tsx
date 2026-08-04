"use client";
import { useState } from "react";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, form);
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-white">
      <section className="bg-slate-900 py-16 lg:py-20 text-white">
        <div className="max-w-2xl mx-auto text-center px-4">
          <p className="text-blue-400 font-bold tracking-wider uppercase text-xs mb-3">
            Contact Support & Dispatch
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading mb-4 text-white">
            Get In <span className="text-blue-500">Touch</span>
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Our dispatch team is available 24/7. Contact us anytime for bookings, corporate accounts, or passenger support.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {[
                { 
                  icon: FiPhone, 
                  title: "24/7 Phone Dispatch", 
                  phones: [
                    { label: "407-793-8143", href: "tel:+14077938143" },
                    { label: "(407) 967-603", href: "tel:+1407967603" }
                  ], 
                  sub: "Available 24 hours a day" 
                },
                { icon: FiMail, title: "Email Support", value: "oztaxinearme@gmail.com", href: "mailto:oztaxinearme@gmail.com", sub: "Prompt email responses" },
                { icon: FiMapPin, title: "Service Coverage", value: "Nationwide USA", href: "/service-areas", sub: "Serving all 50 US states" },
                { icon: FiClock, title: "Operating Hours", value: "Open 24/7", href: "#", sub: "365 days a year" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 border border-slate-200 rounded-xl flex items-start gap-4 shadow-sm"
                >
                  <div className="w-11 h-11 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0 text-blue-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{item.title}</div>
                    {item.phones ? (
                      <div className="flex flex-col gap-1">
                        {item.phones.map((phone) => (
                          <a key={phone.href} href={phone.href} className="text-slate-900 font-bold text-sm hover:text-blue-600 transition-colors block">
                            {phone.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a href={item.href} className="text-slate-900 font-bold text-sm hover:text-blue-600 transition-colors block">
                        {item.value}
                      </a>
                    )}
                    <div className="text-slate-500 text-xs mt-1">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div
                className="bg-white p-8 border border-slate-200 rounded-2xl shadow-sm"
              >
                <h2 className="text-slate-900 font-bold text-2xl mb-6 font-heading">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-slate-700 font-semibold text-xs uppercase tracking-wider mb-2 block">Full Name *</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="John Smith" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" required
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-semibold text-xs uppercase tracking-wider mb-2 block">Email Address *</label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-slate-700 font-semibold text-xs uppercase tracking-wider mb-2 block">Phone Number</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+1 407 793 8143" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-semibold text-xs uppercase tracking-wider mb-2 block">Subject *</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors" required>
                        <option value="">Select a subject</option>
                        <option value="booking">Taxi Booking</option>
                        <option value="corporate">Corporate Account</option>
                        <option value="complaint">Complaint</option>
                        <option value="lost-property">Lost Property</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-700 font-semibold text-xs uppercase tracking-wider mb-2 block">Message *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={4} placeholder="How can our dispatch team assist you?" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none" required
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full justify-center text-sm py-3.5 rounded-xl transition-colors disabled:opacity-60 flex items-center shadow-md"
                  >
                    {loading ? "Sending..." : (<><FiSend className="w-4 h-4 mr-2" /> Send Message</>)}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
