import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Oney Erge — AI Manager, Language Modeling Engineering. PhD, UT Austin. Language models, agent systems, and hybrid physics/data modeling.";

export const metadata: Metadata = {
  metadataBase: new URL("https://oneyerge.com"),
  title: {
    default: "Oney Erge — Language Models & Agent Systems",
    template: "%s · Oney Erge",
  },
  description: DESCRIPTION,
  authors: [{ name: "Oney Erge", url: "https://github.com/oney-erge" }],
  creator: "Oney Erge",
  keywords: [
    "Oney Erge",
    "language models",
    "agent systems",
    "machine learning",
    "hybrid modeling",
    "open source",
    "Python",
  ],
  openGraph: {
    title: "Oney Erge — Language Models & Agent Systems",
    description: DESCRIPTION,
    type: "profile",
    locale: "en_US",
    siteName: "Oney Erge",
    url: "https://oneyerge.com",
  },
  twitter: {
    card: "summary",
    title: "Oney Erge — Language Models & Agent Systems",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f12" },
  ],
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
