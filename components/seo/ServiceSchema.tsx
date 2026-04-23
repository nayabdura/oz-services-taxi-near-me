export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.oztaxinearme.com/#service",
    name: "Oz Services Taxi & Ground Transportation",
    serviceType: "Taxi Service",
    description:
      "Professional 24/7 taxi and ground transportation services across all 50 US states. Includes airport transfers, corporate travel, local city rides, late-night pickups, and long-distance routes.",
    url: "https://www.oztaxinearme.com",
    telephone: "+1-407-793-8143",
    priceRange: "$8 - $20 base fare",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    provider: {
      "@id": "https://www.oztaxinearme.com/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "US",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.oztaxinearme.com/booking",
      servicePhone: "+1-407-793-8143",
      availableLanguage: "en",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Taxi & Transportation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Taxi Transfers",
            description:
              "Reliable, punctual airport pickup and drop-off at all major US airports. Flight tracking included.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Travel",
            description:
              "Dedicated corporate taxi accounts with consolidated billing and priority dispatch for business clients.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local City Rides",
            description:
              "Instant local taxi dispatch within city limits. No surge pricing, ever.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Late Night Taxi Service",
            description:
              "24/7 available taxi service including late-night rides with fully vetted licensed drivers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Long Distance Taxi Service",
            description:
              "Fixed-rate long-distance ground transportation between cities and states across the USA.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
