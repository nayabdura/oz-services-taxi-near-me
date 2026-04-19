"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiPhone, FiChevronDown, FiMapPin } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const PHONE = "407-793-8143";
const PHONE_TEL = "4077938143";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/taxi-near-me", label: "Taxi Near Me" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/taxi-near-me", label: "Taxi Near Me" },
  { href: "/pricing", label: "Pricing" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const topStates = [
  { name: "California", slug: "california" },
  { name: "Texas", slug: "texas" },
  { name: "New York", slug: "new-york" },
  { name: "Florida", slug: "florida" },
  { name: "Illinois", slug: "illinois" },
  { name: "Georgia", slug: "georgia" },
  { name: "Pennsylvania", slug: "pennsylvania" },
  { name: "Ohio", slug: "ohio" },
  { name: "Arizona", slug: "arizona" },
  { name: "Colorado", slug: "colorado" },
  { name: "Washington", slug: "washington" },
  { name: "Nevada", slug: "nevada" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const locationsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationsRef.current && !locationsRef.current.contains(e.target as Node)) {
        setLocationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200 py-2"
          : "bg-white border-b border-slate-100 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-black text-base font-heading">OZ</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-black text-slate-900 text-lg leading-none tracking-tight font-heading">
                Oz Services
              </div>
              <div className="text-blue-600 font-bold text-[9px] tracking-widest uppercase mt-0.5 hidden sm:block">
                Nationwide Taxi
              </div>
            </div>
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Locations Dropdown */}
            <div ref={locationsRef} className="relative">
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                  pathname.startsWith("/locations")
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                Locations <FiChevronDown className={`w-3 h-3 transition-transform ${locationsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {locationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Popular States</p>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-slate-100 p-px">
                      {topStates.map((state) => (
                        <Link
                          key={state.slug}
                          href={`/locations/${state.slug}`}
                          onClick={() => setLocationsOpen(false)}
                          className="bg-white px-3 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <FiMapPin className="w-3 h-3 text-blue-500 shrink-0" />
                          {state.name}
                        </Link>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-100">
                      <Link
                        href="/service-areas"
                        onClick={() => setLocationsOpen(false)}
                        className="text-xs text-blue-600 hover:underline font-bold"
                      >
                        View all 50 states →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors font-bold text-sm group"
            >
              <div className="bg-slate-100 p-1.5 rounded-full text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                <FiPhone className="w-4 h-4" />
              </div>
              <span className="hidden 2xl:block">{PHONE}</span>
            </a>
            <Link
              href="/booking"
              className="bg-slate-900 text-white hover:bg-blue-600 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap"
            >
              Book Now
            </Link>
          </div>

          {/* lg-only CTA (no phone text to save space) */}
          <div className="hidden lg:flex xl:hidden items-center gap-2 shrink-0">
            <a
              href={`tel:${PHONE_TEL}`}
              className="bg-slate-100 p-2 rounded-full text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Call us"
            >
              <FiPhone className="w-4 h-4" />
            </a>
            <Link
              href="/booking"
              className="bg-slate-900 text-white hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap"
            >
              Book Now
            </Link>
            {/* lg-only compact nav */}
            <div className="hidden lg:flex xl:hidden items-center gap-0.5 ml-2">
              {navLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div ref={locationsRef} className="relative">
                <button
                  onClick={() => setLocationsOpen(!locationsOpen)}
                  className="flex items-center gap-0.5 px-2 py-1.5 rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  More <FiChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-slate-900 p-2 rounded-md hover:bg-slate-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-5 flex flex-col gap-1 max-w-7xl mx-auto">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Locations Section */}
              <div className="mt-2 pt-2 border-t border-slate-100">
                <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Popular Locations</p>
                <div className="grid grid-cols-2 gap-1">
                  {topStates.slice(0, 8).map((state) => (
                    <Link
                      key={state.slug}
                      href={`/locations/${state.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <FiMapPin className="w-3 h-3 text-blue-500 shrink-0" />
                      {state.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-colors"
                >
                  <FiPhone className="w-5 h-5" /> Call {PHONE}
                </a>
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Book a Taxi Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
