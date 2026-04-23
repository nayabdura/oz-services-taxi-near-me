"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
      <section className="hero-bg section-sm">
        <div className="container text-center max-w-2xl mx-auto">
          <span className="badge mb-6">📞 Contact Us</span>
          <h1 className="section-title text-5xl text-gray-900 mb-5">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-gray-600 text-lg">
            We&apos;re available 24/7. Contact us anytime for bookings, enquiries, or support nationwide.
          </p>
        </div>
      </section>

      <section className="section bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-5">
              {[
                { icon: FiPhone, title: "Phone", value: "+1 407 793 8143", href: "tel:+14077938143", sub: "Available 24/7" },
                { icon: FiMail, title: "Email", value: "Ozaseel1978@gmail.com", href: "mailto:Ozaseel1978@gmail.com", sub: "Reply within 4 hours" },
                { icon: FiMapPin, title: "Location", value: "Nationwide USA", href: "#", sub: "Serving all states" },
                { icon: FiClock, title: "Hours", value: "Open 24/7", href: "#", sub: "Every day of the year" },
              ].map((item) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card bg-white p-6 flex items-center gap-5 hover:border-blue-500 transition-all block group shadow-sm hover:shadow-md"
                >
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{item.title}</div>
                    <div className="text-gray-900 font-bold text-base">{item.value}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{item.sub}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card bg-white p-8 lg:p-10 shadow-lg border-gray-200"
              >
                <h2 className="text-gray-900 font-black text-3xl mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-700 font-semibold text-sm mb-2 block">Full Name *</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="John Smith" className="input-field bg-gray-50" required
                      />
                    </div>
                    <div>
                      <label className="text-gray-700 font-semibold text-sm mb-2 block">Email Address *</label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@example.com" className="input-field bg-gray-50" required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-700 font-semibold text-sm mb-2 block">Phone Number</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+1 407 793 8143" className="input-field bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-gray-700 font-semibold text-sm mb-2 block">Subject *</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className="input-field bg-gray-50" required>
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
                    <label className="text-gray-700 font-semibold text-sm mb-2 block">Message *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={5} placeholder="Tell us how we can help..." className="input-field bg-gray-50 resize-none" required
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="btn-primary bg-blue-600 w-full justify-center text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : (<><FiSend className="w-5 h-5 mr-2" /> Send Message</>)}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
