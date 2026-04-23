import type { Metadata } from "next";
import Link from "next/link";
import { FiMapPin, FiPhone } from "react-icons/fi";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const BASE = "https://www.oztaxinearme.com";

export const metadata: Metadata = {
  title: "Service Areas | Oz Services Taxi — Nationwide USA Cab Service",
  description:
    "Oz Services provides professional taxi service across all 50 US states. From New York to Los Angeles, Chicago to Miami — find your city and book a cab online or call 407-793-8143.",
  alternates: { canonical: "/service-areas" },
  keywords: [
    "taxi service USA",
    "Oz Services service areas",
    "cab service near me",
    "nationwide taxi USA",
    "taxi in USA",
  ],
};

const BASE_URL = "https://www.oztaxinearme.com";

const regions = [
  {
    name: "Northeast USA",
    stateSlug: "new-york",
    areas: [
      { label: "New York City, NY", stateSlug: "new-york", citySlug: "new-york" },
      { label: "Boston, MA", stateSlug: "massachusetts", citySlug: "boston" },
      { label: "Philadelphia, PA", stateSlug: "pennsylvania", citySlug: "philadelphia" },
      { label: "Newark, NJ", stateSlug: "new-jersey", citySlug: "newark" },
      { label: "Baltimore, MD", stateSlug: "maryland", citySlug: "baltimore" },
      { label: "Washington DC", stateSlug: "virginia", citySlug: "washington-dc" },
      { label: "Hartford, CT", stateSlug: "connecticut", citySlug: null },
    ],
  },
  {
    name: "Southeast USA",
    stateSlug: "florida",
    areas: [
      { label: "Miami, FL", stateSlug: "florida", citySlug: "miami" },
      { label: "Orlando, FL", stateSlug: "florida", citySlug: "orlando" },
      { label: "Tampa, FL", stateSlug: "florida", citySlug: "tampa" },
      { label: "Atlanta, GA", stateSlug: "georgia", citySlug: "atlanta" },
      { label: "Charlotte, NC", stateSlug: "north-carolina", citySlug: "charlotte" },
      { label: "Nashville, TN", stateSlug: "tennessee", citySlug: "nashville" },
      { label: "Jacksonville, FL", stateSlug: "florida", citySlug: "jacksonville" },
    ],
  },
  {
    name: "Midwest USA",
    stateSlug: "illinois",
    areas: [
      { label: "Chicago, IL", stateSlug: "illinois", citySlug: "chicago" },
      { label: "Detroit, MI", stateSlug: "michigan", citySlug: "detroit" },
      { label: "Columbus, OH", stateSlug: "ohio", citySlug: "columbus" },
      { label: "Indianapolis, IN", stateSlug: "indiana", citySlug: "indianapolis" },
      { label: "Minneapolis, MN", stateSlug: "minnesota", citySlug: "minneapolis" },
      { label: "Kansas City, MO", stateSlug: "missouri", citySlug: "kansas-city" },
      { label: "Cleveland, OH", stateSlug: "ohio", citySlug: "cleveland" },
    ],
  },
  {
    name: "West & Southwest USA",
    stateSlug: "california",
    areas: [
      { label: "Los Angeles, CA", stateSlug: "california", citySlug: "los-angeles" },
      { label: "Las Vegas, NV", stateSlug: "nevada", citySlug: "las-vegas" },
      { label: "Phoenix, AZ", stateSlug: "arizona", citySlug: "phoenix" },
      { label: "Houston, TX", stateSlug: "texas", citySlug: "houston" },
      { label: "Dallas, TX", stateSlug: "texas", citySlug: "dallas" },
      { label: "Denver, CO", stateSlug: "colorado", citySlug: "denver" },
      { label: "Seattle, WA", stateSlug: "washington", citySlug: "seattle" },
    ],
  },
];

// Build ItemList schema for all regions
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Oz Services Taxi — US Service Areas",
  description: "Cities and states served by Oz Services taxi across the United States",
  numberOfItems: regions.reduce((acc, r) => acc + r.areas.length, 0),
  itemListElement: regions.flatMap((region, ri) =>
    region.areas.map((area, ai) => ({
      "@type": "ListItem",
      position: ri * 10 + ai + 1,
      name: area.label,
      url: area.citySlug
        ? `${BASE_URL}/taxi-in-${area.citySlug}`
        : `${BASE_URL}/locations/${area.stateSlug}`,
    }))
  ),
};

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${BASE}/` },
          { name: "Service Areas", url: `${BASE}/service-areas` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="pt-20 bg-white">
        {/* Hero */}
        <section className="bg-slate-900 pt-16 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase text-xs mb-6">
              <FiMapPin className="w-4 h-4" /> Service Areas
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white font-heading mb-6 tracking-tight">
              Oz Services Covers <span className="text-blue-500">All USA</span>
            </h1>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              From coast to coast, Oz Services has professional drivers ready to pick you up anywhere in the United States — 24/7, with zero surge pricing. Click any city for local details.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/booking" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-colors">
                Book Your Taxi
              </Link>
              <a href="tel:4077938143" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-3.5 rounded-xl border border-white/20 transition-colors">
                <FiPhone className="w-4 h-4" /> Call 407-793-8143
              </a>
            </div>
          </div>
        </section>

        {/* Region Grid */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {regions.map((region) => (
                <div key={region.name}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                      <FiMapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-slate-900 font-black text-2xl font-heading">{region.name}</h2>
                      <Link href={`/locations/${region.stateSlug}`} className="text-blue-600 text-sm font-semibold hover:underline">
                        View state page →
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {region.areas.map((area) => (
                      <Link
                        key={area.label}
                        href={
                          area.citySlug
                            ? `/taxi-in-${area.citySlug}`
                            : `/locations/${area.stateSlug}`
                        }
                        className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full mx-auto mb-3" />
                        <div className="text-slate-800 font-bold text-sm group-hover:text-blue-700 transition-colors">
                          {area.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-20 bg-white border border-blue-100 shadow-xl rounded-2xl p-10 text-center max-w-4xl mx-auto">
              <h3 className="text-slate-900 font-black text-2xl font-heading mb-4">
                Don&apos;t See Your City?
              </h3>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto text-lg">
                Oz Services covers all 50 states! Contact our dispatcher to confirm availability in your specific location anywhere in the USA.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl transition-colors">
                  Contact Us
                </Link>
                <a href="tel:4077938143" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-7 py-3.5 rounded-xl transition-colors">
                  <FiPhone /> Call 407-793-8143
                </a>
              </div>
            </div>

            {/* Internal linking to all states */}
            <div className="mt-16 text-center">
              <p className="text-slate-500 text-sm mb-4 font-medium">Browse all state-level service pages:</p>
              <Link href="/service-areas" className="text-blue-600 font-semibold hover:underline text-sm">
                View Taxi Near Me →
              </Link>
              {" · "}
              <Link href="/taxi-near-me" className="text-blue-600 font-semibold hover:underline text-sm">
                Taxi Near Me →
              </Link>
              {" · "}
              <Link href="/booking" className="text-blue-600 font-semibold hover:underline text-sm">
                Book Online →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
