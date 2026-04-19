"use client";
import { useState, useEffect } from "react";
import { FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

export default function FloatingButtons() {
  const [mounted, setMounted] = useState(false);
  const phone = process.env.NEXT_PUBLIC_PHONE || "+14077938143";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        href={`tel:${phone}`}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/40 hover:bg-blue-700 hover:scale-110 transition-all z-10"
        aria-label="Call Us"
      >
        <FiPhone className="w-8 h-8" />
        <span className="absolute w-full h-full rounded-full border-2 border-blue-600 animate-ping opacity-50"></span>
      </motion.a>
    </div>
  );
}
