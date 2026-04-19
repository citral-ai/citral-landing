import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Caveat, Courier_Prime } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Citral AI",
  url: "https://citralai.com",
  logo: "https://citralai.com/logo.png",
  description:
    "AI-powered compliance auditing for pharmaceutical batch manufacturing records.",
  sameAs: [
    "https://instagram.com/citral.ai",
    "https://linkedin.com/company/citral-ai",
    "https://twitter.com/citralai",
  ],
};

export const viewport: Viewport = {
  themeColor: "#020a08",
};

export const metadata: Metadata = {
  title: "Citral AI — We Catch What Humans Miss",
  description:
    "AI-powered compliance auditing for pharmaceutical batch manufacturing records. Automated checking against FDA, EU GMP, PICS, WHO, and India Schedule M.",
  alternates: {
    canonical: "https://citralai.com",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
  metadataBase: new URL("https://citralai.com"),
  openGraph: {
    title: "Citral AI — We Catch What Humans Miss",
    description:
      "AI-powered compliance auditing for pharmaceutical batch manufacturing records.",
    type: "website",
    url: "https://citralai.com",
    siteName: "Citral AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Citral AI — We Catch What Humans Miss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Citral AI — We Catch What Humans Miss",
    description:
      "AI-powered compliance auditing for pharmaceutical batch manufacturing records.",
    images: ["/og-image.png"],
    creator: "@citralai",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${caveat.variable} ${courierPrime.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
