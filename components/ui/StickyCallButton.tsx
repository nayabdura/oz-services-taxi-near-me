"use client";

import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function StickyCallButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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

  if (!isVisible) return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 pb-safe left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-auto md:translate-x-0 md:left-auto md:right-6 z-[100] flex flex-col items-center">
      <a
        href="tel:4077938143"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-3.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors text-sm"
      >
        <FiPhoneCall className="w-4 h-4" />
        <span className="tracking-wide">Call Dispatch (407-793-8143)</span>
      </a>
    </div>
  );
}
