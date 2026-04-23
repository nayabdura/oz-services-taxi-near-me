"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiCalendar, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

interface FleetCar {
  id: number;
  name: string;
  price: string;
  description: string;
  image_url: string;
}

export default function FleetClient() {
  const [fleet, setFleet] = useState<FleetCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFleet();
  }, []);

  const fetchFleet = async () => {
    try {
      const { data } = await axios.get("/api/fleet");
      setFleet(data);
    } catch (error) {
      console.error("Failed to load fleet", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="py-12 md:py-20 lg:py-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3"
        >
          Nationwide Taxi Services
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 font-heading"
        >
          Our Premium Fleet
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto"
        >
          Travel in comfort and style anywhere in the USA. We offer a variety of high-quality vehicles perfectly tailored to your needs.
        </motion.p>
      </div>

      {/* Fleet Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden animate-pulse">
                <div className="h-64 bg-slate-200" />
                <div className="p-8">
                  <div className="h-8 bg-slate-200 rounded-lg w-1/2 mb-4" />
                  <div className="h-4 bg-slate-200 rounded-lg w-full mb-2" />
                  <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-6" />
                  <div className="flex gap-4">
                    <div className="h-12 bg-slate-200 rounded-xl w-full" />
                    <div className="h-12 bg-slate-200 rounded-xl w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : fleet.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl text-slate-500 font-bold">No vehicles available at the moment.</h3>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {fleet.map((car) => (
              <motion.div 
                key={car.id} 
                variants={itemVariants}
                className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-slate-100 group flex flex-col"
              >
                {/* Image Box */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={car.image_url || '/images/blog-placeholder.jpg'} 
                      alt={car.name} 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  {car.price && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white font-bold px-4 py-2 rounded-full shadow-lg text-sm backdrop-blur-md bg-opacity-90">
                      {car.price}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{car.name}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {car.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6 border-t border-slate-100">
                    <a 
                      href="tel:4077938143"
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors text-sm"
                    >
                      <FiPhoneCall className="w-4 h-4" />
                      <span>Call Now</span>
                    </a>
                    <Link
                      href="/booking"
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3.5 px-4 rounded-xl transition-colors border border-slate-200 text-sm"
                    >
                      <FiCalendar className="w-4 h-4" />
                      <span>Book Online</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="mt-20 text-center max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
          <FiCheckCircle className="w-4 h-4" />
          <span>Available 24/7 Nationwide</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Need a specific vehicle?</h2>
        <p className="text-slate-600 mb-8">Call our dispatcher directly and we'll ensure you get the exact ride you want anywhere in the USA.</p>
        <a 
          href="tel:4077938143"
          className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <FiPhoneCall className="w-5 h-5" />
          <span>Call Dispatch: 407-793-8143</span>
        </a>
      </div>
    </div>
  );
}
