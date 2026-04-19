"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiUsers, FiStar, FiArrowRight, FiPhoneCall } from "react-icons/fi";

const vehicles = [
  {
    name: "Standard Sedan",
    tagline: "Everyday Comfort",
    description: "Perfect for solo or couple city rides. Clean, air-conditioned, and GPS-tracked.",
    passengers: 4,
    rating: "4.9",
    badge: "Most Popular",
    badgeColor: "bg-blue-600",
    price: "From $25",
    image: "https://images.unsplash.com/photo-1549317661-bd32c5443c5b?q=80&w=800&h=500&auto=format&fit=crop",
    gradient: "from-blue-900/80",
  },
  {
    name: "Premium SUV",
    tagline: "Executive Travel",
    description: "Spacious luxury SUV ideal for airport transfers and family trips.",
    passengers: 6,
    rating: "5.0",
    badge: "Business Choice",
    badgeColor: "bg-slate-900",
    price: "From $45",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&h=500&auto=format&fit=crop",
    gradient: "from-slate-900/80",
  },
  {
    name: "Luxury Car",
    tagline: "Arrive in Style",
    description: "Premium leather seats, complimentary water, and a professional chauffeur.",
    passengers: 4,
    rating: "5.0",
    badge: "Top Rated",
    badgeColor: "bg-amber-600",
    price: "From $75",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&h=500&auto=format&fit=crop",
    gradient: "from-amber-900/80",
  },
  {
    name: "Airport Transfer",
    tagline: "Hassle-Free Airports",
    description: "Dedicated vehicle with extra luggage capacity. Flight tracking included.",
    passengers: 5,
    rating: "4.8",
    badge: "Airport Special",
    badgeColor: "bg-green-700",
    price: "From $55",
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=800&h=500&auto=format&fit=crop",
    gradient: "from-green-900/80",
  },
  {
    name: "Group Van",
    tagline: "Travel Together",
    description: "Spacious minivan for large groups, corporate teams, and event transportation.",
    passengers: 8,
    rating: "4.9",
    badge: "Group Special",
    badgeColor: "bg-purple-700",
    price: "From $90",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&h=500&auto=format&fit=crop",
    gradient: "from-purple-900/80",
  },
];

export default function FleetShowcase() {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4"
          >
            Our Premium Fleet
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white font-heading mb-6"
          >
            Choose Your <span className="text-blue-500">Perfect Ride</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            From economy sedans to luxury chauffeur cars — every vehicle in our fleet is immaculately maintained, fully insured, and ready 24/7 across the USA.
          </motion.p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((car, index) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.name} - Oz Services Nationwide Taxi`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${car.gradient} via-transparent to-transparent opacity-90`} />

                {/* Top badge */}
                <div className="absolute top-4 left-4">
                  <span className={`${car.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                    {car.badge}
                  </span>
                </div>

                {/* Price tag */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                    {car.price}
                  </span>
                </div>

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">{car.tagline}</p>
                  <h3 className="text-white font-black text-2xl font-heading mb-1">{car.name}</h3>
                  <div className="flex items-center gap-4 text-white/70 text-sm">
                    <span className="flex items-center gap-1.5">
                      <FiUsers className="w-4 h-4" /> Up to {car.passengers}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-white font-semibold">{car.rating}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-b-2xl">
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{car.description}</p>
                <div className="flex gap-3">
                  <a
                    href="tel:4077938143"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold py-2.5 rounded-xl transition-colors border border-slate-700"
                  >
                    <FiPhoneCall className="w-4 h-4" /> Call Now
                  </a>
                  <Link
                    href="/booking"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                  >
                    Book <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/fleet"
            className="inline-flex items-center gap-3 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all hover:scale-105 shadow-xl"
          >
            View Full Fleet & Pricing <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
