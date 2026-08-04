"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GeoLocationConfig } from "@/lib/data/locations-geo";
import { FiNavigation, FiPhone, FiExternalLink, FiMaximize2, FiCompass, FiCalendar } from "react-icons/fi";

// SVG Taxi Marker Icon (Clean Vector Cab)
const createTaxiSvgIcon = (cityName: string) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background: #1e293b;
        color: #ffffff;
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: 800;
        font-size: 12px;
        font-family: var(--font-sans, system-ui, sans-serif);
        box-shadow: 0 8px 20px rgba(15,23,42,0.3);
        display: flex;
        align-items: center;
        gap: 6px;
        border: 2px solid #2563eb;
        white-space: nowrap;
        transform: scale(1);
        transition: transform 0.2s ease;
      ">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.53-3.06A1 1 0 0 0 16.386 8H14"/>
          <circle cx="7" cy="18" r="2"/>
          <circle cx="17" cy="18" r="2"/>
        </svg>
        <span>Oz Taxi ${cityName}</span>
      </div>
    `,
    iconSize: [130, 36],
    iconAnchor: [65, 18],
  });
};

// SVG Airport Marker Icon
const createAirportSvgIcon = (code: string) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background: #0284c7;
        color: #ffffff;
        padding: 5px 11px;
        border-radius: 18px;
        font-weight: 800;
        font-size: 11px;
        font-family: var(--font-sans, system-ui, sans-serif);
        box-shadow: 0 6px 16px rgba(2,132,199,0.4);
        display: flex;
        align-items: center;
        gap: 5px;
        border: 2px solid #ffffff;
        white-space: nowrap;
      ">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.5-.1-1 .1-1.3.5l-.8.8c-.3.3-.3.9 0 1.2l4.8 4.8-3.1 3.1-2-.6c-.3-.1-.7 0-.9.3l-.4.4c-.2.2-.2.6 0 .8l2.6 2.6c.2.2.6.2.8 0l.4-.4c.3-.2.4-.6.3-.9l-.6-2 3.1-3.1 4.8 4.8c.3.3.9.3 1.2 0l.8-.8c.4-.3.6-.8.5-1.3z"/>
        </svg>
        <span>${code} Airport</span>
      </div>
    `,
    iconSize: [105, 32],
    iconAnchor: [52, 16],
  });
};

// Helper component for smooth animated flyToBounds & re-centering
function MapRecenterAndBounds({ lat, lng, serviceRadiusMeters }: { lat: number; lng: number; serviceRadiusMeters: number }) {
  const map = useMap();

  useEffect(() => {
    // Calculate bounding box based on service circle radius
    const circle = L.circle([lat, lng], { radius: serviceRadiusMeters });
    const bounds = circle.getBounds();
    
    // Smooth animated fly to bounds
    map.flyToBounds(bounds, {
      padding: [40, 40],
      duration: 1.4,
      easeLinearity: 0.25,
    });
  }, [lat, lng, serviceRadiusMeters, map]);

  return null;
}

// Controls Toolbar Component inside Map
function CustomMapControls({ lat, lng, serviceRadiusMeters }: { lat: number; lng: number; serviceRadiusMeters: number }) {
  const map = useMap();

  const handleResetView = () => {
    const circle = L.circle([lat, lng], { radius: serviceRadiusMeters });
    map.flyToBounds(circle.getBounds(), { padding: [40, 40], duration: 1.2 });
  };

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: "12px", marginRight: "12px", zIndex: 1000 }}>
      <div className="flex flex-col gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200/80">
        <button
          onClick={handleResetView}
          title="Fit Service Area Bounds"
          className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm cursor-pointer"
        >
          <FiCompass className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function LeafletMapClient({ location }: { location: GeoLocationConfig }) {
  const { name, state, lat, lng, serviceRadiusMeters, airport } = location;

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 flex flex-col">
      
      {/* Premium Header Strip */}
      <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between z-10 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shrink-0 shadow-sm shadow-blue-500/50" />
          <span className="font-bold text-xs sm:text-sm font-heading tracking-tight text-white">
            Dispatch Bounds: {name}, {state}
          </span>
        </div>
        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md shadow-blue-600/20 whitespace-nowrap"
        >
          <FiNavigation className="w-3.5 h-3.5" />
          <span>Get Directions</span>
          <FiExternalLink className="w-3 h-3 text-blue-200" />
        </a>
      </div>

      {/* Map Element */}
      <div className="w-full flex-grow relative min-h-[360px]">
        <MapContainer
          center={[lat, lng]}
          zoom={11}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          style={{ width: "100%", height: "100%", minHeight: "360px" }}
        >
          <MapRecenterAndBounds lat={lat} lng={lng} serviceRadiusMeters={serviceRadiusMeters} />
          <CustomMapControls lat={lat} lng={lng} serviceRadiusMeters={serviceRadiusMeters} />

          {/* Premium CartoDB Voyager Tile Layer (100% Free, Modern Enterprise Style) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            maxZoom={19}
          />

          {/* Service Area Coverage Radius Circle */}
          <Circle
            center={[lat, lng]}
            radius={serviceRadiusMeters}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#3b82f6",
              fillOpacity: 0.15,
              weight: 2.5,
              dashArray: "8, 8",
            }}
          />

          {/* Primary City Taxi SVG Marker */}
          <Marker position={[lat, lng]} icon={createTaxiSvgIcon(name)}>
            <Popup className="custom-leaflet-popup">
              <div className="p-3 text-slate-900 font-sans max-w-[240px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    24/7 Active Zone
                  </span>
                </div>
                <h4 className="font-black text-base text-slate-900 mb-1 font-heading">Oz Services Taxi {name}</h4>
                <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                  Licensed taxi drivers stationed across {name}, {state} with zero surge pricing.
                </p>
                <div className="grid grid-cols-2 gap-2 border-t border-slate-200 pt-2.5">
                  <a
                    href="tel:4077938143"
                    className="inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
                  >
                    <FiPhone className="w-3.5 h-3.5" /> Call
                  </a>
                  <a
                    href="/booking"
                    className="inline-flex items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-lg transition-colors"
                  >
                    <FiCalendar className="w-3.5 h-3.5" /> Book
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Airport SVG Marker (If applicable) */}
          {airport && (
            <Marker position={[airport.lat, airport.lng]} icon={createAirportSvgIcon(airport.code)}>
              <Popup className="custom-leaflet-popup">
                <div className="p-3 text-slate-900 font-sans max-w-[240px]">
                  <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider block mb-1.5">
                    Airport Transfer Corridor
                  </span>
                  <h4 className="font-black text-sm text-slate-900 mb-0.5 font-heading">{airport.name} ({airport.code})</h4>
                  <p className="text-slate-600 text-xs mb-3">Flight tracking &amp; flat rate pickup/dropoff.</p>
                  <a
                    href="/booking"
                    className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors"
                  >
                    Reserve Airport Ride
                  </a>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Footer Info Toolbar */}
      <div className="bg-slate-900 border-t border-slate-800 p-3 px-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300 z-10">
        <div className="font-medium">
          Service Radius: <strong className="text-white">{name}, {state}</strong> ({Math.round(serviceRadiusMeters / 1609)} Miles Coverage)
        </div>
        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Taxi Hub
          </span>
          {airport && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> {airport.code} Airport
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
