import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import StickyCallButton from "@/components/ui/StickyCallButton";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.oztaxinearme.com"),
  title: {
    default: "Oz Services | Taxi Near Me – Book a Cab 24/7 Across the USA",
    template: "%s | Oz Services Taxi",
  },
  description:
    "Oz Services is America's trusted 24/7 nationwide taxi company. Book a taxi near you instantly for airport transfers, city rides, corporate travel, and late-night pickups across all 50 USA states. No surge pricing. Call 407-793-8143 or book online.",
  keywords: [
    "taxi near me",
    "Oz Services",
    "Oz Services taxi",
    "cab near me",
    "taxi service near me",
    "affordable taxi near me",
    "24/7 taxi near me",
    "best taxi service USA",
    "airport taxi transfer",
    "nationwide taxi service",
    "taxi service near me 24 7",
    "corporate taxi usa",
    "book taxi online USA",
    "cheap taxi service USA",
    "local cab service near me",
    "private taxi service USA",
    "Oz Services cab service",
    "Oz Services USA",
    "online taxi booking USA",
    "24 hour taxi service usa",
  ],
  // ✅ NO global canonical — each page declares its own via alternates.canonical
  authors: [{ name: "Oz Services" }],
  creator: "Oz Services",
  publisher: "Oz Services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Oz Services Taxi",
    title: "Oz Services | Taxi Near Me – Book a Cab 24/7 Across the USA",
    description:
      "Oz Services – America's most reliable taxi near me. Airport transfers, city rides, corporate accounts. Serving all 50 USA states 24/7. No surge pricing. Call 407-793-8143.",
    images: [
      {
        url: "https://www.oztaxinearme.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oz Services – Taxi Near Me | Nationwide USA Cab Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oz Services Taxi Near Me | 24/7 Cab Booking USA",
    description:
      "Book your taxi with Oz Services online. Fast, safe, and reliable cab service across all 50 USA states – 24/7. No surge pricing. Call 407-793-8143.",
    images: ["https://www.oztaxinearme.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="li8J4CvRGePXTHxmhALH5UemqkYbLIxlfG6q2wmasbk" />
        <meta name="theme-color" content="#2563EB" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <LocalBusinessSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <ServiceSchema />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1E293B",
              color: "#F8FAFC",
              fontWeight: 600,
              borderRadius: "12px",
            },
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <StickyCallButton />
      </body>
    </html>
  );
}
