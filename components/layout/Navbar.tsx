"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/taxi-near-me", label: "Taxi Near Me" },
  { href: "/pricing", label: "Pricing" },
  { href: "/service-areas", label: "Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200 py-3"
          : "bg-white border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-black text-lg font-heading">OZ</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-black text-slate-900 text-xl leading-none tracking-tight font-heading">
                Oz Services
              </div>
              <div className="text-blue-600 font-bold text-[10px] tracking-widest uppercase mt-0.5">
                Florida Taxi
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 xl:px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-blue-600 bg-blue-50/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors font-bold text-sm group"
            >
              <div className="bg-slate-100 p-2 rounded-full text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                <FiPhone className="w-4 h-4" />
              </div>
              {process.env.NEXT_PUBLIC_PHONE}
            </a>
            <Link 
              href="/booking" 
              className="bg-slate-900 text-white hover:bg-blue-600 px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 shadow-sm active:scale-95"
            >
              Book Now
            </Link>
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
            <div className="px-4 py-6 flex flex-col gap-2 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-colors"
                >
                  <FiPhone className="w-5 h-5" /> Call {process.env.NEXT_PUBLIC_PHONE}
                </a>
                <Link 
                  href="/booking" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Book a Taxi Right Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
