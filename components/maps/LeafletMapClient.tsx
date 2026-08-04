"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoLocationConfig } from "@/lib/data/locations-geo";
import { FiNavigation, FiPhone, FiExternalLink } from "react-icons/fi";

// CustomDivIcon for Taxi Dispatch Center
const createTaxiIcon = (cityName: string) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background: #2563eb;
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: 800;
        font-size: 12px;
        font-family: sans-serif;
        box-shadow: 0 4px 14px rgba(37,99,235,0.4);
        display: flex;
        align-items: center;
        gap: 6px;
        border: 2px solid white;
        white-space: nowrap;
      ">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.53-3.06A1 1 0 0 0 16.386 8H14"/>
          <circle cx="7" cy="18" r="2"/>
          <circle cx="17" cy="18" r="2"/>
        </svg>
        <span>Oz Taxi ${cityName}</span>
      </div>
    `,
    iconSize: [120, 36],
    iconAnchor: [60, 18],
  });
};

// CustomDivIcon for Airport Hub
const createAirportIcon = (code: string) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background: #0f172a;
        color: white;
        padding: 5px 10px;
        border-radius: 16px;
        font-weight: 800;
        font-size: 11px;
        font-family: sans-serif;
        box-shadow: 0 4px 12px rgba(15,23,42,0.3);
        display: flex;
        align-items: center;
        gap: 5px;
        border: 2px solid #38bdf8;
        white-space: nowrap;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.5-.1-1 .1-1.3.5l-.8.8c-.3.3-.3.9 0 1.2l4.8 4.8-3.1 3.1-2-.6c-.3-.1-.7 0-.9.3l-.4.4c-.2.2-.2.6 0 .8l2.6 2.6c.2.2.6.2.8 0l.4-.4c.3-.2.4-.6.3-.9l-.6-2 3.1-3.1 4.8 4.8c.3.3.9.3 1.2 0l.8-.8c.4-.3.6-.8.5-1.3z"/>
        </svg>
        <span>${code} Airport</span>
      </div>
    `,
    iconSize: [100, 30],
    iconAnchor: [50, 15],
  });
};

// Helper component to smoothly re-center map when props change
function MapRecenter({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], zoom, { animate: true });
  }, [lat, lng, zoom, map]);
  return null;
}

export default function LeafletMapClient({ location }: { location: GeoLocationConfig }) {
  const { name, state, lat, lng, zoom, serviceRadiusMeters, airport } = location;

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 flex flex-col">
      
      {/* Top Header Strip */}
      <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-xs sm:text-sm font-heading">
            Live OpenStreetMap Coverage: {name}, {state}
          </span>
        </div>
        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
        >
          <FiNavigation className="w-3.5 h-3.5" />
          <span>Get Directions</span>
          <FiExternalLink className="w-3 h-3 text-blue-200" />
        </a>
      </div>

      {/* Map Element */}
      <div className="w-full flex-grow relative min-h-[350px]">
        <MapContainer
          center={[lat, lng]}
          zoom={zoom}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          style={{ width: "100%", height: "100%", minHeight: "350px" }}
        >
          <MapRecenter lat={lat} lng={lng} zoom={zoom} />

          {/* OpenStreetMap Tile Layer (100% Free, No API Key Required) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Service Area Coverage Radius Circle */}
          <Circle
            center={[lat, lng]}
            radius={serviceRadiusMeters}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.12,
              weight: 2,
              dashArray: "6, 6",
            }}
          />

          {/* Primary City Taxi Marker */}
          <Marker position={[lat, lng]} icon={createTaxiIcon(name)}>
            <Popup className="custom-leaflet-popup">
              <div className="p-2 text-slate-900 font-sans">
                <h4 className="font-bold text-sm text-slate-900 mb-1">Oz Services Taxi — {name}</h4>
                <p className="text-slate-600 text-xs mb-2">24/7 Primary Dispatch &amp; Service Coverage Bounds</p>
                <div className="flex flex-col gap-1.5 border-t border-slate-200 pt-2">
                  <a
                    href="tel:4077938143"
                    className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-xs hover:underline"
                  >
                    <FiPhone className="w-3.5 h-3.5" /> Call 407-793-8143
                  </a>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-700 font-bold text-xs hover:underline"
                  >
                    <FiNavigation className="w-3.5 h-3.5 text-blue-600" /> Open Navigation
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Airport Marker (If applicable) */}
          {airport && (
            <Marker position={[airport.lat, airport.lng]} icon={createAirportIcon(airport.code)}>
              <Popup className="custom-leaflet-popup">
                <div className="p-2 text-slate-900 font-sans">
                  <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider block mb-1">
                    Airport Hub
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mb-0.5">{airport.name} ({airport.code})</h4>
                  <p className="text-slate-600 text-xs mb-2">Flat Rate Airport Transfers &amp; Flight Tracking</p>
                  <a
                    href="/booking"
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white font-bold text-xs py-1.5 rounded hover:bg-blue-700 transition-colors"
                  >
                    Book Airport Transfer
                  </a>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Footer Info Strip */}
      <div className="bg-slate-50 border-t border-slate-200 p-3 px-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600 z-10">
        <div>
          Service Coverage: <strong className="text-slate-900">{name}, {state}</strong> (Radius: {Math.round(serviceRadiusMeters / 1000)}km)
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Taxi Zone
          </span>
          {airport && (
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" /> {airport.code} Airport
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
