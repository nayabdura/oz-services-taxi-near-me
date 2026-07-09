"use client";

import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyCallButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show after scrolling down a bit to prevent overlapping hero CTAs
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    setShowPhoneMenu(false);
  }, [pathname]);

  if (!isVisible) return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 pb-safe left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-auto md:translate-x-0 md:left-auto md:right-6 z-[100] flex flex-col items-center">
      <AnimatePresence>
        {showPhoneMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-full md:w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden mb-2 p-2 flex flex-col gap-1"
          >
            <a
              href="tel:4077938143"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              <FiPhoneCall className="w-4 h-4 text-blue-600" />
              Call 407-793-8143
            </a>
            <a
              href="tel:407967603"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
            >
              <FiPhoneCall className="w-4 h-4 text-blue-600" />
              Call (407) 967-603
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setShowPhoneMenu(!showPhoneMenu)}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-4 rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform"
      >
        <FiPhoneCall className="w-5 h-5 animate-pulse" />
        <span className="tracking-wide">Call Now</span>
      </button>
    </div>
  );
}
