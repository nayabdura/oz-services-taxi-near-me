export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService"],
    "@id": "https://www.oztaxinearme.com/#localbusiness",
    name: "Oz Taxi Near Me",
    alternateName: "Oz Services",
    image: {
      "@type": "ImageObject",
      url: "https://www.oztaxinearme.com/og-image.jpg",
      width: 1200,
      height: 630,
    },
    logo: {
      "@type": "ImageObject",
      url: "https://www.oztaxinearme.com/logo.png",
    },
    url: "https://www.oztaxinearme.com",
    telephone: "+1-407-793-8143",
    email: "Ozaseel1978@gmail.com",
    priceRange: "$8 - $20 base fare",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    openingHours: "Mo-Su 00:00-23:59",
    description:
      "Oz Services (Oz Taxi Near Me) is America's premier 24/7 nationwide taxi service providing airport transfers, local city rides, corporate accounts, and late-night transportation across all 50 USA states. No surge pricing. Book online or call for instant dispatch.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Orlando",
      addressLocality: "Orlando",
      addressRegion: "FL",
      postalCode: "32801",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5383,
      longitude: -81.3792,
    },
    hasMap: "https://maps.google.com/?q=Oz+Services+Taxi+Orlando+FL",
    areaServed: "US",
    serviceArea: {
      "@type": "AdministrativeArea",
      name: "United States",
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Taxi Service",
        description: "24/7 professional taxi service across all 50 US states",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 847,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Michael T.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "The best taxi service I've ever used. Driver arrived 10 minutes early for my early-morning ORD flight. Immaculate car and extremely professional attitude — I won't use anything else.",
        datePublished: "2024-03-10",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Jenkins",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "We rely on Oz Taxi Near Me for all our corporate clients visiting Miami. Billing is always accurate, drivers are dressed impeccably, and the rides are smooth. Our whole team trusts them completely.",
        datePublished: "2024-04-02",
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "David R.",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "Saved us during a torrential downpour in Houston last December. Driver was calm, courteous, and the quoted price didn't change one cent despite the awful conditions. Remarkable consistency.",
        datePublished: "2023-12-19",
      },
    ],
    sameAs: [
      "https://www.facebook.com/ozservicestaxi",
      "https://www.instagram.com/ozservicestaxi",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
