"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";

import { trackPhoneCall } from "@/lib/utils/gtm";

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
    <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-24 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/14077938143"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 md:w-14 md:h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-emerald-700 transition-colors z-10"
        aria-label="WhatsApp Support"
      >
        <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
      </a>

      <div className="relative">
        <AnimatePresence>
          {showPhoneMenu && (
            <div
              className="absolute bottom-16 right-0 mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-2 flex flex-col gap-1 z-50"
            >
              <a
                href={`tel:${phone}`}
                onClick={() => trackPhoneCall(PHONE_1, "Floating Menu")}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <FiPhone className="w-4 h-4 text-blue-600" />
                {PHONE_1}
              </a>
              <a
                href={`tel:${PHONE_2_TEL}`}
                onClick={() => trackPhoneCall(PHONE_2, "Floating Menu")}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                <FiPhone className="w-4 h-4 text-blue-600" />
                {PHONE_2}
              </a>
            </div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowPhoneMenu(!showPhoneMenu)}
          className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-colors z-10 relative"
          aria-label="Call Dispatch"
        >
          <FiPhone className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>
    </div>
  );
}
