import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ozservices.com"),
  title: {
    default: "Oz Services | Taxi Near Me – Professional Florida Taxi 24/7",
    template: "%s | Oz Services Florida Taxi",
  },
  description:
    "Oz Services is Florida's most trusted taxi company. Book a taxi near you instantly for airport transfers to MCO, MIA & TPA, city rides, corporate travel, and late-night pickups across Orlando, Miami & Tampa. Available 24/7.",
  keywords: [
    "taxi near me florida",
    "oz services taxi",
    "taxi orlando",
    "airport taxi mco",
    "taxi miami",
    "airport transfer florida",
    "cab near me",
    "taxi service florida 24 7",
    "corporate taxi florida",
  ],
  authors: [{ name: "Oz Services" }],
  creator: "Oz Services",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Oz Services Taxi",
    title: "Oz Services | Taxi Near Me – Professional Florida Taxi 24/7",
    description:
      "Florida's most reliable taxi service. Airport transfers, city rides, corporate accounts. Available 24/7 across Orlando, Miami & Tampa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oz Services Taxi – Florida Taxi Near Me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oz Services | Taxi Near Me Florida",
    description:
      "Book your taxi online. Fast, safe and reliable taxi service across Florida – 24/7.",
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
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_SITE_URL || "https://ozservices.com"}
        />
        <meta name="theme-color" content="#2563EB" />
        <link rel="icon" href="/favicon.ico" />
        <LocalBusinessSchema />
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
      </body>
    </html>
  );
}
