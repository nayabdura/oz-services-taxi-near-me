"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtons() {
  const [mounted, setMounted] = useState(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const phone = process.env.NEXT_PUBLIC_PHONE || "+14077938143";
  const PHONE_1 = "407-793-8143";
  const PHONE_2 = "(407) 967-603";
  const PHONE_2_TEL = "407967603";

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowPhoneMenu(false);
  }, [pathname]);

  if (!mounted) return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] md:bottom-28 right-6 z-50 flex flex-col gap-4">
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        href={`https://wa.me/14077938143`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/40 hover:bg-green-600 hover:scale-110 transition-all z-10"
        aria-label="WhatsApp Us"
      >
        <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
      </motion.a>
      <div className="relative">
        <AnimatePresence>
          {showPhoneMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-16 md:bottom-20 right-0 mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 p-2 flex flex-col gap-1"
            >
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <FiPhone className="w-4 h-4 text-blue-600" />
                {PHONE_1}
              </a>
              <a
                href={`tel:${PHONE_2_TEL}`}
                className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <FiPhone className="w-4 h-4 text-blue-600" />
                {PHONE_2}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowPhoneMenu(!showPhoneMenu)}
          className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 hover:scale-110 transition-all z-10 relative"
          aria-label="Call Us"
        >
          <FiPhone className="w-7 h-7 md:w-8 md:h-8" />
          <span className="absolute w-full h-full rounded-full border-2 border-blue-600 animate-ping opacity-50"></span>
        </button>
      </div>
    </div>
  );
}
