"use client";

import React, { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
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
      <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200 min-h-[400px] flex items-center justify-center">
        <div className="text-slate-500 font-medium text-sm">Loading passenger reviews...</div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    const count = Math.min(5, Math.max(1, Math.round(rating || 5)));
    for (let i = 0; i < count; i++) {
      stars.push(<FiStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />);
    }
    return stars;
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            Passenger Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-4">
            Passenger Feedback
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-normal">
            Real reviews from business travelers, tourists, and families who rely on Oz Services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, i) => (
            <div
              key={review._id || i}
              className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {renderStars(review.rating || 5)}
                </div>

                <p className="text-slate-700 leading-relaxed font-normal mb-6 text-sm">
                  &ldquo;{review.message || review.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                  <div className="text-slate-500 text-xs font-normal">{review.location || "USA"}</div>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {review.service || "Verified Customer"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-black text-slate-900 font-heading">4.9 / 5</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
          <div className="text-slate-600 text-sm font-normal text-center sm:text-right">
            Based on thousands of verified customer rides across the United States.
          </div>
        </div>
      </div>
    </section>
  );
}
