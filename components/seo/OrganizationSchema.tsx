export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.oztaxinearme.com/#organization",
    name: "Oz Taxi Near Me",
    alternateName: "Oz Services",
    legalName: "Oz Services Taxi",
    url: "https://www.oztaxinearme.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.oztaxinearme.com/logo.png",
      width: 200,
      height: 60,
    },
    image: "https://www.oztaxinearme.com/og-image.jpg",
    description:
      "Oz Services is America's premier 24/7 nationwide taxi service providing airport transfers, city rides, corporate accounts, and late-night transportation across all 50 USA states.",
    foundingDate: "2020",
    areaServed: {
      "@type": "Country",
      name: "US",
    },
    knowsAbout: [
      "Taxi Services",
      "Airport Transfers",
      "Corporate Transportation",
      "Ground Transportation USA",
      "Rideshare Alternative",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-407-793-8143",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
    sameAs: [
      "https://www.facebook.com/ozservicestaxi",
      "https://www.twitter.com/ozservicestaxi",
      "https://www.instagram.com/ozservicestaxi",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
