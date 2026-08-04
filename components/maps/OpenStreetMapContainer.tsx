"use client";

import dynamic from "next/dynamic";
import { GeoLocationConfig } from "@/lib/data/locations-geo";
import { FiMapPin } from "react-icons/fi";

const LeafletMapClient = dynamic(() => import("./LeafletMapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-8 text-center animate-pulse">
      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
        <FiMapPin className="w-6 h-6 animate-bounce" />
      </div>
      <span className="font-bold text-slate-700 text-sm">Loading OpenStreetMap Service Coverage...</span>
      <span className="text-xs text-slate-500 mt-1">Zero surge pricing • 24/7 Dispatch</span>
    </div>
  ),
});

export default function OpenStreetMapContainer({ location }: { location: GeoLocationConfig }) {
  return <LeafletMapClient location={location} />;
}
