export default function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.oztaxinearme.com/#website",
    name: "Oz Taxi Near Me",
    alternateName: "Oz Services",
    url: "https://www.oztaxinearme.com/",
    description:
      "Oz Services – America's trusted nationwide taxi service. Book a cab online or call for instant dispatch 24/7 across all 50 US states.",
    publisher: {
      "@id": "https://www.oztaxinearme.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.oztaxinearme.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
