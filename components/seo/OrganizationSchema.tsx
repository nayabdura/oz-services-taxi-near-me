export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Oz Services Taxi Network",
    url: "https://ozservices.com",
    logo: "https://ozservices.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-407-793-8143",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
    },
    sameAs: [
      "https://www.facebook.com/ozservicestaxi",
      "https://www.twitter.com/ozservicestaxi",
      "https://www.instagram.com/ozservicestaxi"
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
