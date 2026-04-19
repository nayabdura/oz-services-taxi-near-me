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
    <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
      {/* Widget Header */}
      <div className="bg-slate-900 px-6 py-5">
        <h2 className="text-white text-xl font-bold font-heading">Get Instant Quote</h2>
        <p className="text-slate-400 text-sm mt-1 font-medium">Real-time availability — No hidden fees</p>
      </div>

      {/* Form Body */}
      <form onSubmit={handleBook} className="p-6 space-y-5">
        {/* Pickup */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
            Pickup Location
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              required
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Hotel, Airport, or Address"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
        </div>

        {/* Dropoff */}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
            Drop-off Destination
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              required
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter destination"
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 font-medium placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
              Date
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-3 py-3 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
              Time
            </label>
            <div className="relative">
              <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <input
                type="time"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-3 py-3 font-medium focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-600/20 active:scale-95"
        >
          Check Availability <FiArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Trust Strip */}
      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Drivers Available Now
        </div>
        <div className="text-slate-300 text-sm">|</div>
        <div className="text-slate-500 text-xs font-semibold">Instant Confirmation</div>
      </div>
    </div>
  );
}
