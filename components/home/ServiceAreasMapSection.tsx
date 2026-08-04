"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMapPin, FiNavigation, FiPhone, FiExternalLink, FiArrowRight } from "react-icons/fi";
import OpenStreetMapContainer from "@/components/maps/OpenStreetMapContainer";
import { getLocationGeoData } from "@/lib/data/locations-geo";

type CityArea = {
  name: string;
  state: string;
  stateSlug: string;
  citySlug: string;
  airport?: string;
  region: "northeast" | "southeast" | "midwest" | "west";
  lat: number;
  lng: number;
};

const serviceCities: CityArea[] = [
  // Northeast
  { name: "New York", state: "New York", stateSlug: "new-york", citySlug: "new-york", airport: "JFK / LGA", region: "northeast", lat: 40.7128, lng: -74.006 },
  { name: "Brooklyn", state: "New York", stateSlug: "new-york", citySlug: "brooklyn", region: "northeast", lat: 40.6782, lng: -73.9442 },
  { name: "Queens", state: "New York", stateSlug: "new-york", citySlug: "queens", airport: "LGA", region: "northeast", lat: 40.7282, lng: -73.7949 },
  { name: "Boston", state: "Massachusetts", stateSlug: "massachusetts", citySlug: "boston", airport: "BOS", region: "northeast", lat: 42.3601, lng: -71.0589 },
  { name: "Philadelphia", state: "Pennsylvania", stateSlug: "pennsylvania", citySlug: "philadelphia", airport: "PHL", region: "northeast", lat: 39.9526, lng: -75.1652 },
  { name: "Newark", state: "New Jersey", stateSlug: "new-jersey", citySlug: "newark", airport: "EWR", region: "northeast", lat: 40.7357, lng: -74.1724 },

  // Southeast
  { name: "Orlando", state: "Florida", stateSlug: "florida", citySlug: "orlando", airport: "MCO", region: "southeast", lat: 28.5383, lng: -81.3792 },
  { name: "Miami", state: "Florida", stateSlug: "florida", citySlug: "miami", airport: "MIA", region: "southeast", lat: 25.7617, lng: -80.1918 },
  { name: "Tampa", state: "Florida", stateSlug: "florida", citySlug: "tampa", airport: "TPA", region: "southeast", lat: 27.9506, lng: -82.4572 },
  { name: "Atlanta", state: "Georgia", stateSlug: "georgia", citySlug: "atlanta", airport: "ATL", region: "southeast", lat: 33.749, lng: -84.388 },
  { name: "Charlotte", state: "North Carolina", stateSlug: "north-carolina", citySlug: "charlotte", airport: "CLT", region: "southeast", lat: 35.2271, lng: -80.8431 },
  { name: "Nashville", state: "Tennessee", stateSlug: "tennessee", citySlug: "nashville", airport: "BNA", region: "southeast", lat: 36.1627, lng: -86.7816 },

  // Midwest
  { name: "Chicago", state: "Illinois", stateSlug: "illinois", citySlug: "chicago", airport: "ORD / MDW", region: "midwest", lat: 41.8781, lng: -87.6298 },
  { name: "Detroit", state: "Michigan", stateSlug: "michigan", citySlug: "detroit", airport: "DTW", region: "midwest", lat: 42.3314, lng: -83.0458 },
  { name: "Columbus", state: "Ohio", stateSlug: "ohio", citySlug: "columbus", airport: "CMH", region: "midwest", lat: 39.9612, lng: -82.9988 },
  { name: "Minneapolis", state: "Minnesota", stateSlug: "minnesota", citySlug: "minneapolis", airport: "MSP", region: "midwest", lat: 44.9778, lng: -93.265 },

  // West & Southwest
  { name: "Los Angeles", state: "California", stateSlug: "california", citySlug: "los-angeles", airport: "LAX", region: "west", lat: 34.0522, lng: -118.2437 },
  { name: "Las Vegas", state: "Nevada", stateSlug: "nevada", citySlug: "las-vegas", airport: "LAS", region: "west", lat: 36.1699, lng: -115.1398 },
  { name: "Phoenix", state: "Arizona", stateSlug: "arizona", citySlug: "phoenix", airport: "PHX", region: "west", lat: 33.4484, lng: -112.074 },
  { name: "Houston", state: "Texas", stateSlug: "texas", citySlug: "houston", airport: "IAH / HOU", region: "west", lat: 29.7604, lng: -95.3698 },
  { name: "Dallas", state: "Texas", stateSlug: "texas", citySlug: "dallas", airport: "DFW / DAL", region: "west", lat: 32.7767, lng: -96.797 },
  { name: "Denver", state: "Colorado", stateSlug: "colorado", citySlug: "denver", airport: "DEN", region: "west", lat: 39.7392, lng: -104.9903 },
  { name: "Seattle", state: "Washington", stateSlug: "washington", citySlug: "seattle", airport: "SEA", region: "west", lat: 47.6062, lng: -122.3321 },
  { name: "San Francisco", state: "California", stateSlug: "california", citySlug: "san-francisco", airport: "SFO", region: "west", lat: 37.7749, lng: -122.4194 },
];

export default function ServiceAreasMapSection() {
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<CityArea>(serviceCities[6]); // Default Orlando / MCO

  const filteredCities = activeRegion === "all" 
    ? serviceCities 
    : serviceCities.filter(c => c.region === activeRegion);

  const selectedLocationGeo = getLocationGeoData(selectedCity.stateSlug, selectedCity.citySlug);

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <FiMapPin className="w-3.5 h-3.5" />
            <span>OpenStreetMap Interactive Coverage</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-4 tracking-tight">
            Nationwide Service Areas &amp; Airport Coverage
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
            Oz Services dispatches licensed drivers across all major metropolitan regions and airport corridors in the United States. Powered by 100% open-source OpenStreetMap.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All USA Cities" },
            { id: "northeast", label: "Northeast" },
            { id: "southeast", label: "Southeast" },
            { id: "midwest", label: "Midwest" },
            { id: "west", label: "West & Southwest" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRegion(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeRegion === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Map + Cities Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Leaflet Map Column */}
          <div className="lg:col-span-7 h-[460px]">
            <OpenStreetMapContainer location={selectedLocationGeo} />
          </div>

          {/* Cities Directory Grid Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Select City for Live Map Bounds
              </h3>
              <p className="text-slate-500 text-xs mb-4">
                Click any location below to update map coordinates and view direct location pages:
              </p>

              <div className="grid grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
                {filteredCities.map((city) => {
                  const isSelected = selectedCity.name === city.name;
                  return (
                    <div
                      key={city.name + city.state}
                      onClick={() => setSelectedCity(city)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 shadow-sm"
                          : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold text-xs ${isSelected ? "text-blue-700" : "text-slate-900"}`}>
                          {city.name}
                        </span>
                        <FiMapPin className={`w-3.5 h-3.5 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">{city.state}</span>
                        <Link
                          href={`/locations/${city.stateSlug}/taxi-in-${city.citySlug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:underline font-bold"
                        >
                          View Page →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Strong Bottom CTA Card */}
        <div className="mt-14 bg-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div>
            <span className="text-blue-400 font-bold uppercase tracking-widest text-xs block mb-2">
              Immediate Dispatch Network
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mb-2">
              Need a Ride in Your Area?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-normal max-w-xl">
              Professional, licensed drivers are available 24/7 across all 50 US states. Guaranteed flat rates with zero surge fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-7 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap"
            >
              Book Your Taxi Today <FiArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:4077938143"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-6 py-4 rounded-xl border border-slate-700 transition-colors whitespace-nowrap"
            >
              <FiPhone className="w-4 h-4 text-blue-400" /> Call 407-793-8143
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
