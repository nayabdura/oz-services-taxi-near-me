"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiCalendar, FiArrowRight, FiClock } from "react-icons/fi";

export default function BookingWidget() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/booking?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&date=${date}`
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-5 border-b border-slate-800">
        <h2 className="text-white text-lg font-bold font-heading">Get Instant Fare Quote</h2>
        <p className="text-slate-400 text-xs mt-0.5 font-medium">Real-time dispatch — Guaranteed flat rates</p>
      </div>

      <form onSubmit={handleBook} className="p-6 space-y-4">
        <div>
          <label htmlFor="pickup-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Pickup Location
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4 pointer-events-none" />
            <input
              id="pickup-input"
              type="text"
              required
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Address, Airport, or Hotel"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dropoff-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Destination
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              id="dropoff-input"
              type="text"
              required
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Destination Address or Airport"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="date-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Date
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                id="date-input"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-3 py-3 font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>
          <div>
            <label htmlFor="time-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Time
            </label>
            <div className="relative">
              <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                id="time-input"
                type="time"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-3 py-3 font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-600/20 active:scale-95 mt-2"
        >
          Check Availability & Rates <FiArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-3 text-center text-xs font-medium text-slate-500">
        Dispatch Active 24 Hours a Day • Instant Email Confirmation
      </div>
    </div>
  );
}
