import type { Metadata } from "next";
import Link from "next/link";
import { FiMapPin, FiArrowRight, FiPhone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Service Areas | Oz Services Taxi - Nationwide USA",
  description: "Oz Services provides taxi services across all USA states including New York, Los Angeles, Chicago, Miami, Orlando, and more. Check your area now.",
  alternates: { canonical: "/service-areas" },
};

const regions = [
  {
    name: "Northeast USA", areas: [
      "New York City, NY", "Boston, MA", "Philadelphia, PA", "Newark, NJ", "Baltimore, MD", "Washington DC", "Hartford, CT"
    ]
  },
  {
    name: "Southeast USA", areas: [
      "Miami, FL", "Orlando, FL", "Tampa, FL", "Atlanta, GA", "Charlotte, NC", "Nashville, TN", "Jacksonville, FL"
    ]
  },
  {
    name: "Midwest USA", areas: [
      "Chicago, IL", "Detroit, MI", "Columbus, OH", "Indianapolis, IN", "Minneapolis, MN", "Kansas City, MO", "Cleveland, OH"
    ]
  },
  {
    name: "West & Southwest USA", areas: [
      "Los Angeles, CA", "Las Vegas, NV", "Phoenix, AZ", "Houston, TX", "Dallas, TX", "Denver, CO", "Seattle, WA"
    ]
  },
];

export default function ServiceAreasPage() {
  return (
    <div className="pt-20 bg-white">
      <section className="hero-bg section">
        <div className="container text-center max-w-3xl mx-auto">
          <span className="badge mb-6">📍 Service Areas</span>
          <h1 className="section-title text-5xl lg:text-6xl text-gray-900 mb-6">
            We Serve <span className="text-blue-600">All USA</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            From coast to coast, Oz Services has professional drivers ready to pick you up anywhere in the United States. Call our dispatcher 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-primary">Book Your Taxi</Link>
            <a href="tel:4077938143" className="btn-outline bg-white"><FiPhone /> Call 407-793-8143</a>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="space-y-16">
            {regions.map(region => (
              <div key={region.name}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                    <FiMapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-gray-900 font-bold text-2xl" style={{ fontFamily: "Outfit, sans-serif" }}>{region.name}</h2>
                    <p className="text-gray-500 text-sm font-medium">{region.areas.length} service areas</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {region.areas.map(area => (
                    <div key={area} className="area-card text-center bg-white">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full mx-auto mb-3" />
                      <div className="text-gray-800 font-bold text-sm tracking-wide">{area}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 glass-card p-10 text-center bg-white border-blue-100 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-gray-900 font-black text-2xl mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Don&apos;t See Your City?</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">We cover all 50 states! Contact our dispatcher to confirm availability in your specific location across the USA.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <a href="tel:4077938143" className="btn-outline bg-gray-50"><FiPhone /> Call 407-793-8143</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
