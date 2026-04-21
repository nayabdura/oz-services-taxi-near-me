"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("/api/testimonials");
        if (data && Array.isArray(data)) {
          setReviews(data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200 min-h-[500px] flex items-center justify-center">
        <div className="text-slate-500 font-medium">Loading passenger reviews...</div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  // Duplicate for infinite scroll to work smoothly
  const duplicatedReviews = [...reviews, ...reviews];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`f-${i}`} className="text-yellow-400 text-lg leading-none">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="h" className="text-yellow-400 text-lg leading-none opacity-80">★</span>);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`e-${i}`} className="text-slate-200 text-lg leading-none">★</span>);
    }
    return stars;
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            Passenger Reviews
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
            Trusted by Thousands
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Over 10,000 verified rides. Here's what our passengers
            say about their Oz Services experience.
          </p>
        </div>
      </div>

      {/* Marquee Carousel */}
      <div className="relative w-full group overflow-hidden">
        {/* Gradient fades for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex gap-6 px-4 w-max animate-marquee">
          {duplicatedReviews.map((review, i) => (
            <div
              key={`${review._id || i}-${i}`}
              className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col w-[320px] sm:w-[400px] flex-shrink-0 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(review.rating || 5)}
              </div>

              {/* Badge */}
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md w-fit mb-5">
                {review.service || "Verified Passenger"}
              </span>

              {/* Review Text */}
              <p className="text-slate-700 leading-relaxed italic flex-grow mb-7 text-[15px]">
                "{review.message || review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100 mt-auto">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-base font-heading flex-shrink-0">
                  {(review.name || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                  <div className="text-slate-500 text-xs font-medium">{review.location || "USA"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Bottom Trust Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left shadow-sm">
          <div className="text-4xl font-black text-slate-900 font-heading">4.9 / 5</div>
          <div className="sm:border-l sm:border-slate-200 sm:pl-6">
            <div className="text-slate-900 font-bold mb-1">Average Star Rating</div>
            <div className="text-slate-500 text-sm font-medium">Based on thousands of verified passenger reviews across Google and our platform</div>
          </div>
        </div>
      </div>
    </section>
  );
}
