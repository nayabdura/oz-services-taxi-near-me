export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.oztaxinearme.com",
  name: "Oz Services Taxi",
  alternateName: "Oz Services",
  description: "America's most trusted taxi service. Professional, reliable, and affordable taxi rides 24/7.",
  url: "https://www.oztaxinearme.com",
  telephone: "+14077938143",
  email: "Ozaseel1978@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" },
  address: { "@type": "PostalAddress", addressCountry: "US", addressRegion: "FL", addressLocality: "Orlando", postalCode: "32801" },
  geo: { "@type": "GeoCoordinates", latitude: 28.5383, longitude: -81.3792 },
  image: "https://www.oztaxinearme.com/og-image.jpg",
  logo: "https://www.oztaxinearme.com/logo.png",
  sameAs: ["https://www.facebook.com/ozservices", "https://twitter.com/ozservices", "https://www.instagram.com/ozservices"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Taxi Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local Taxi", description: "Local taxi service near you in Florida" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airport Transfer", description: "Professional airport taxi transfers to MCO, MIA, TPA" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Corporate Taxi", description: "Executive corporate taxi service" } },
    ],
  },
};

export const taxiServiceSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "Oz Services Taxi Near Me",
  description: "Find a taxi near me instantly with Oz Services. Professional taxi bookings across the USA.",
  provider: { "@type": "LocalBusiness", name: "Oz Services" },
  areaServed: { "@type": "Country", name: "USA" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://www.oztaxinearme.com/booking",
    servicePhone: "+14077938143",
  },
};

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});
