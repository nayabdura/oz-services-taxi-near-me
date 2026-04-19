import Link from "next/link";
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiArrowRight } from "react-icons/fi";

const footerLinks = {
  company: [
    { href: "/about", label: "About Oz Services" },
    { href: "/services", label: "Our Taxi Services" },
    { href: "/pricing", label: "Transparent Pricing" },
    { href: "/blog", label: "Travel Blog" },
    { href: "/contact", label: "Contact Us" },
  ],
  services: [
    { href: "/taxi-near-me", label: "Local Taxi Near Me" },
    { href: "/services/airport-taxi", label: "Airport Taxi Transfers" },
    { href: "/services/city-taxi", label: "City & Suburb Rides" },
    { href: "/services/corporate-taxi", label: "Corporate Accounts" },
    { href: "/service-areas", label: "Florida Service Areas" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-16 border-t border-slate-200">
      
      {/* Top Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center">
                <span className="text-white font-black text-xl font-heading">OZ</span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-black text-slate-900 text-2xl leading-none tracking-tight font-heading">
                  Oz Services
                </div>
                <div className="text-blue-600 font-bold text-xs tracking-widest uppercase mt-1">
                  Florida Taxi Network
                </div>
              </div>
            </Link>
            <p className="text-slate-600 text-base leading-relaxed mb-8 pr-4">
              Florida's premier taxi service network. Fast, reliable, and affordable rides available 24/7 across Orlando, Miami, Tampa, and surrounding areas. We specialize in seamless airport transfers, safe local transportation, and unmatched corporate travel solutions.
            </p>
            <div className="flex gap-4">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-200 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Company */}
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Taxi Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Get in Touch</h4>
              <ul className="space-y-5">
                <li>
                  <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="flex items-start gap-4 text-slate-600 hover:text-blue-600 transition-colors group">
                    <div className="mt-1">
                      <FiPhone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Call 24/7 Dispatch</span>
                      <span className="text-sm font-bold text-slate-900">{process.env.NEXT_PUBLIC_PHONE}</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@ozservices.com" className="flex items-start gap-4 text-slate-600 hover:text-blue-600 transition-colors group">
                    <div className="mt-1">
                      <FiMail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Support</span>
                      <span className="text-sm font-bold text-slate-900">info@ozservices.com</span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-4 text-slate-600">
                    <div className="mt-1">
                      <FiMapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Headquarters</span>
                      <span className="text-sm font-semibold text-slate-900">Orlando, FL 32801, USA</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Massive CTA Strip attached to Bottom */}
      <div className="bg-slate-900 py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-black text-2xl md:text-3xl font-heading mb-2">
              Ready for a Reliable Ride in Florida?
            </h3>
            <p className="text-slate-400 font-medium">Book your airport transfer, city trip, or corporate ride instantly.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="flex items-center justify-center gap-2 bg-slate-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-700 transition-all text-center">
              <FiPhone className="w-5 h-5" /> Call Dispatch
            </a>
            <Link href="/booking" className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all text-center shadow-lg shadow-blue-500/20">
              Book Online Now <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-slate-500 text-sm font-semibold">
            © {new Date().getFullYear()} Oz Services Taxi. All rights reserved. Servicing Orlando, Miami, Tampa, and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-500 hover:text-white text-sm font-semibold transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
