export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Oz Services Taxi",
    "image": `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "telephone": process.env.NEXT_PUBLIC_PHONE,
    "email": "info@ozservices.com",
    "priceRange": "$8 - $20 base fare",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card",
    "openingHours": "Mo-Su 00:00-23:59",
    "description": "Oz Services is America's premier 24/7 nationwide taxi service providing airport transfers, local city rides, corporate accounts, and late night transportation across all USA states.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Orlando",
      "addressLocality": "Orlando",
      "addressRegion": "FL",
      "postalCode": "32801",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5383,
      "longitude": -81.3792
    },
    "areaServed": [
      { "@type": "Country", "name": "United States" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "USA Taxi Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local Taxi Near Me", "description": "Fast, reliable local taxi dispatch across USA cities" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Airport Taxi Transfer", "description": "Professional airport transfers with flight tracking" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Taxi Account", "description": "Dedicated corporate travel management with monthly invoicing" } }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/ozservices",
      "https://www.instagram.com/ozservices"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
