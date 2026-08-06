export default function EntityGeoSchema({
  title = "Oz Services Taxi",
  description = "America's premier nationwide 24/7 taxi service network. Fast, reliable, and affordable rides available 24/7 across all 50 USA states with zero surge pricing.",
  url = "https://www.oztaxinearme.com",
}: {
  title?: string;
  description?: string;
  url?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TaxiService",
        "@id": `${url}#taxiservice`,
        name: "Oz Services Taxi",
        alternateName: ["Oz Services", "Oz Taxi", "Oz Taxi Near Me"],
        description: description,
        url: url,
        telephone: ["+1-407-793-8143"],
        email: "oztaxinearme.com@gmail.com",
        priceRange: "$$",
        currenciesAccepted: "USD",
        paymentAccepted: "Cash, Credit Card, Debit Card, Corporate Account",
        openingHours: "Mo-Su 00:00-23:59",
        areaServed: {
          "@type": "Country",
          name: "United States",
          sameAs: "https://en.wikipedia.org/wiki/United_States",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Taxi & Transportation Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "24/7 Airport Taxi Transfer",
                description: "Flight tracking, instant pickup, and flat-rate airport drop-off across all major US airports.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Local Taxi Near Me",
                description: "Immediate city and suburb cab dispatch with zero surge pricing.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Corporate Executive Taxi",
                description: "Dedicated account management, executive luxury sedans, and priority billing.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Flat Rate Long Distance Taxi",
                description: "Intercity and state-to-state fixed fare passenger transportation.",
              },
            },
          ],
        },
        knowsAbout: [
          "Taxicab Transportation",
          "Airport Ground Logistics",
          "Flight Arrival Tracking",
          "Flat Rate Fare Pricing",
          "Corporate Travel Management",
          "Chauffeur Services",
        ],
        provider: {
          "@type": "Organization",
          name: "Oz Services Logistics Corp",
          url: "https://www.oztaxinearme.com",
          logo: "https://www.oztaxinearme.com/logo.png",
          sameAs: [
            "https://www.facebook.com/oztaxinearme",
            "https://twitter.com/oztaxinearme",
            "https://www.instagram.com/oztaxinearme",
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1280",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url: url,
        name: title,
        description: description,
        publisher: {
          "@id": `${url}#taxiservice`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}/taxi-near-me?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
