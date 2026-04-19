"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiUsers, FiPhone, FiMail, FiUser, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";

const steps = ["Trip Details", "Personal Info", "Review", "Confirmation"];

export default function BookingClient() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    pickupLocation: "", dropoffLocation: "", pickupDate: "", pickupTime: "",
    passengers: "1", serviceType: "local", notes: "",
    name: "", email: "", phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 0) {
      if (!form.pickupLocation || !form.dropoffLocation || !form.pickupDate || !form.pickupTime) {
        toast.error("Please fill in all required trip details.");
        return false;
      }
    }
    if (currentStep === 1) {
      if (!form.name || !form.email || !form.phone) {
        toast.error("Please provide your complete personal details.");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setLoading(true);
    try {
      const payload = {
        name: form.name, email: form.email, phone: form.phone,
        pickup: form.pickupLocation, dropoff: form.dropoffLocation,
        date: form.pickupDate, time: form.pickupTime,
        service_type: form.serviceType, passengers: parseInt(form.passengers), notes: form.notes
      };
      await axios.post("/api/bookings", payload);
      setStep(3); // Move to Success State
    } catch {
      toast.error("Booking failed. Please call us directly or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container max-w-3xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Online Reservation</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Book Your Taxi</h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">Fill in your travel details and we will confirm your ride instantly. Available 24/7 nationwide.</p>
        </div>

        {/* Minimal Progress indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md mx-auto relative hidden sm:flex">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 z-0 rounded transition-all duration-500 ease-in-out"
              style={{ width: `${(Math.min(step, 2) / 2) * 100}%` }}
            ></div>
            
            {steps.slice(0, 3).map((label, i) => (
              <div key={label} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium border-2 transition-all duration-300 ${
                    i < step ? "bg-blue-600 border-blue-600 text-white" : 
                    i === step ? "bg-white border-blue-600 text-blue-600 shadow-md" : 
                    "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {i < step ? <FiCheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <span className={`absolute -bottom-7 text-xs font-medium whitespace-nowrap ${i <= step ? "text-gray-900" : "text-gray-500"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">Trip Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                      <select name="serviceType" value={form.serviceType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option value="local">Local Taxi</option>
                        <option value="airport">Airport Transfer</option>
                        <option value="city">City Tour</option>
                        <option value="corporate">Corporate Account</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="Enter your full pickup address" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input name="dropoffLocation" value={form.dropoffLocation} onChange={handleChange} placeholder="Enter your destination address" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="time" name="pickupTime" value={form.pickupTime} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                      <div className="relative">
                        <FiUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select name="passengers" value={form.passengers} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Passenger{n > 1 ? "s" : ""}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                      <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Flight number, child seat requirement, extra luggage, etc." className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">Contact Details</h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input name="name" value={form.name} onChange={handleChange} placeholder="First and Last Name" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 123-4567" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 font-sans">Review & Confirm</h2>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-500 mb-1">Service Type</span>
                        <span className="text-gray-900 font-medium capitalize">{form.serviceType}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 mb-1">Passengers</span>
                        <span className="text-gray-900 font-medium">{form.passengers}</span>
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <span className="text-gray-500 mb-1">Pickup Information</span>
                        <span className="text-gray-900 font-medium">{form.pickupLocation}</span>
                        <span className="text-gray-600 mt-1">{form.pickupDate} at {form.pickupTime}</span>
                      </div>
                      <div className="flex flex-col sm:col-span-2">
                        <span className="text-gray-500 mb-1">Drop-off Destination</span>
                        <span className="text-gray-900 font-medium">{form.dropoffLocation}</span>
                      </div>
                      <hr className="sm:col-span-2 border-gray-200 my-2" />
                      <div className="flex flex-col">
                        <span className="text-gray-500 mb-1">Passenger Name</span>
                        <span className="text-gray-900 font-medium">{form.name}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 mb-1">Contact</span>
                        <span className="text-gray-900 font-medium">{form.phone}</span>
                        <span className="text-gray-600">{form.email}</span>
                      </div>
                      {form.notes && (
                        <div className="flex flex-col sm:col-span-2">
                          <span className="text-gray-500 mb-1">Additional Notes</span>
                          <span className="text-gray-900 font-medium">{form.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
                    <FiCheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                    <p className="text-sm">By confirming, you agree to our booking terms. You will receive an email confirmation containing your booking reference.</p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 text-center py-10">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 font-heading tracking-tight mb-4">Request Received!</h2>
                  <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed mb-8">
                    Your ride details have been securely processed. Our dispatch team is reviewing your booking and will reach out shortly. You will also receive an email confirmation.
                  </p>
                  <button
                    onClick={() => {
                      setStep(0);
                      setForm({ pickupLocation: "", dropoffLocation: "", pickupDate: "", pickupTime: "", passengers: "1", serviceType: "local", notes: "", name: "", email: "", phone: "" });
                    }}
                    className="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
                  >
                    Book Another Ride
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          {step < 3 && (
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              {step > 0 ? (
                <button 
                  type="button"
                  onClick={handleBack} 
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FiArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div className="hidden sm:block"></div>}
              
              {step < 2 ? (
                <button 
                  type="button"
                  onClick={handleNext} 
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Continue <FiArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleSubmit} 
                  disabled={loading} 
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Confirm Reservation"}
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
