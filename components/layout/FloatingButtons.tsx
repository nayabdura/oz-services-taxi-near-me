"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FloatingButtons() {
  const [mounted, setMounted] = useState(false);
  const phone = process.env.NEXT_PUBLIC_PHONE || "+14077938143";

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        href={`tel:${phone}`}
        className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 hover:scale-110 transition-all z-10"
        aria-label="Call Us"
      >
        <FiPhone className="w-7 h-7 md:w-8 md:h-8" />
        <span className="absolute w-full h-full rounded-full border-2 border-blue-600 animate-ping opacity-50"></span>
      </motion.a>
    </div>
  );
}
