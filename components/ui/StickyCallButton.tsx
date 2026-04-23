"use client";

import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function StickyCallButton() {
  const [isVisible, setIsVisible] = useState(false);
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

  if (!isVisible) return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href="tel:4077938143"
      className="fixed bottom-6 pb-safe left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-auto md:translate-x-0 md:left-auto md:right-6 z-[100] flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-4 rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform animate-bounce-slow"
      style={{ animationDuration: '3s' }}
    >
      <FiPhoneCall className="w-5 h-5 animate-pulse" />
      <span className="tracking-wide">Call 407-793-8143</span>
    </a>
  );
}
