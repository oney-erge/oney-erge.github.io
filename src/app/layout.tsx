import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
});

const DESCRIPTION =
  "Oney Erge is an applied AI researcher and engineer building agent systems, local inference tools, robotics simulations, and hybrid physical models.";
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://oneyerge.com"),
  title: {
    default: "Oney Erge | Applied AI, Agents, and Physical Systems",
    template: "%s | Oney Erge",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "https://oneyerge.com/",
  },
  authors: [{ name: "Oney Erge", url: "https://github.com/oney-erge" }],
  creator: "Oney Erge",
  keywords: [
    "Oney Erge",
    "agent systems",
    "local AI",
    "language models",
    "AI inference",
    "robotics simulation",
    "machine learning",
    "physics-informed machine learning",
    "hybrid physical modeling",
    "open source",
  ],
  openGraph: {
    title: "Oney Erge | Applied AI, Agents, and Physical Systems",
    description: DESCRIPTION,
    type: "profile",
    locale: "en_US",
    siteName: "Oney Erge",
    url: "https://oneyerge.com",
    images: [
      {
        url: "/media/oney-erge-social.png",
        width: 1200,
        height: 630,
        alt: "Oney Erge, applied AI researcher and engineer building grounded AI systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oney Erge | Applied AI, Agents, and Physical Systems",
    description: DESCRIPTION,
    images: ["/media/oney-erge-social.png"],
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
  verification: GOOGLE_VERIFICATION
    ? { google: GOOGLE_VERIFICATION }
    : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
