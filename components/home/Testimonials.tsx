const reviews = [
  {
    name: "Michael T.",
    location: "Chicago, IL",
    rating: 5,
    text: "The best taxi service I've ever used. Driver arrived 10 minutes early for my early-morning ORD flight. Immaculate car and extremely professional attitude — I won't use anything else.",
    service: "Airport Transfer",
  },
  {
    name: "Sarah Jenkins",
    location: "Miami, FL",
    rating: 5,
    text: "We rely on Oz Services for all our corporate clients visiting Miami. Billing is always accurate, drivers are dressed impeccably, and the rides are smooth. Our whole team trusts them completely.",
    service: "Corporate Account",
  },
  {
    name: "David R.",
    location: "Houston, TX",
    rating: 5,
    text: "Saved us during a torrential downpour in Houston last December. Driver was calm, courteous, and the quoted price didn't change one cent despite the awful conditions. Remarkable consistency.",
    service: "Local Taxi",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">
            Passenger Reviews
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 font-heading mb-5">
            Trusted by Thousands Nationwide
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            Over 10,000 verified rides across the USA. Here's what our passengers
            say about their Oz Services experience.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col hover:shadow-lg hover:border-blue-100 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-5">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-lg leading-none">{star}</span>
                ))}
              </div>

              {/* Badge */}
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md w-fit mb-5">
                {review.service}
              </span>

              {/* Review Text */}
              <p className="text-slate-700 leading-relaxed italic flex-grow mb-7 text-[15px]">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-base font-heading flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                  <div className="text-slate-500 text-xs font-medium">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Bar */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <div className="text-4xl font-black text-slate-900 font-heading">4.9 / 5</div>
          <div className="sm:border-l sm:border-slate-200 sm:pl-6">
            <div className="text-slate-900 font-bold mb-1">Average Star Rating</div>
            <div className="text-slate-500 text-sm font-medium">Based on 847+ verified passenger reviews across Google and our platform</div>
          </div>
        </div>
      </div>
    </section>
  );
}
