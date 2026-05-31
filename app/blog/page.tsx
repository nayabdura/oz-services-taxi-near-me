import { Metadata } from "next";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "USA Taxi Tips & Travel Guides | Oz Services Blog",
  description:
    "Expert taxi travel tips, airport guides, and USA transportation advice from the Oz Services team. Stay informed and travel smarter across America.",
  alternates: { canonical: "https://www.oztaxinearme.com/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.oztaxinearme.com/blog",
    siteName: "Oz Services Taxi",
    title: "USA Taxi Tips & Travel Guides | Oz Services Blog",
    description:
      "Expert travel tips, airport taxi guides, and USA transportation advice from Oz Services.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "USA Taxi Tips & Travel Guides - Oz Services Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USA Taxi Tips & Travel Guides | Oz Services Blog",
    description:
      "Expert travel tips, airport taxi guides, and USA transportation advice from Oz Services.",
    images: ["https://www.oztaxinearme.com/og-image.jpg"],
  },
};

export default function BlogPage() {
  return <BlogListClient />;
}
