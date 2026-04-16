import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Citral AI — We Catch What Humans Miss",
  description:
    "AI-powered compliance auditing for pharmaceutical batch manufacturing records. Automated checking against FDA, EU GMP, PICS, WHO, and India Schedule M.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Citral AI — We Catch What Humans Miss",
    description:
      "AI-powered compliance auditing for pharmaceutical batch manufacturing records.",
    type: "website",
    url: "https://citral.ai",
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
