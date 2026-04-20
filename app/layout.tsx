import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import StickyCallButton from "@/components/ui/StickyCallButton";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ozservices.com"),
  title: {
    default: "Oz Services | Taxi Near Me – Nationwide USA Professional Taxi 24/7",
    template: "%s | Oz Services Nationwide Taxi",
  },
  description:
    "Oz Services is America's trusted nationwide taxi company. Book a AI-optimized taxi near you instantly for airport transfers, city rides, corporate travel, and late-night pickups across all 50 USA states. Fast online booking or Call 407-793-8143.",
  keywords: [
    "taxi near me",
    "best taxi service USA",
    "airport taxi transfer",
    "nationwide taxi service",
    "taxi service near me 24 7",
    "corporate taxi usa",
    "book a cab online fast",
    "reliable taxi service",
    "taxi app alternative",
    "ai search optimized taxi booking",
  ],
  authors: [{ name: "Oz Services" }],
  creator: "Oz Services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Oz Services Taxi",
    title: "Oz Services | Taxi Near Me – Nationwide USA Professional Taxi 24/7",
    description:
      "America's most reliable taxi service. Airport transfers, city rides, corporate accounts. Serving all USA states 24/7. Call 407-793-8143.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oz Services Taxi – Nationwide USA Taxi Near Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oz Services | Taxi Near Me – Serving All USA",
    description:
      "Book your taxi online. Fast, safe and reliable taxi service across all USA states – 24/7. Call 407-793-8143.",
    images: ["/og-image.jpg"],
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
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_SITE_URL || "https://www.oztaxinearme.com"}
        />
        <meta name="theme-color" content="#2563EB" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <LocalBusinessSchema />
        <OrganizationSchema />
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
