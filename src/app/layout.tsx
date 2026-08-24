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

export const metadata: Metadata = {
  metadataBase: new URL("https://oneyerge.com"),
  title: {
    default: "Oney Erge — Applied AI & Software Systems",
    template: "%s · Oney Erge",
  },
  description:
    "Applied AI, enterprise data, robotics, market research, and real-time software projects by Oney Erge.",
  authors: [{ name: "Oney Erge", url: "https://github.com/oney-erge" }],
  creator: "Oney Erge",
  keywords: [
    "applied AI",
    "enterprise data",
    "robotics",
    "open source",
    "Python",
    "software engineering",
  ],
  openGraph: {
    title: "Oney Erge — Useful software for messy, real-world problems.",
    description:
      "Explore six working systems across applied AI, enterprise data, market research, robotics, and real-time infrastructure.",
    type: "website",
    locale: "en_US",
    siteName: "Oney Erge",
  },
  twitter: {
    card: "summary",
    title: "Oney Erge — Applied AI & Software Systems",
    description:
      "Useful software for messy, real-world problems. Built by Oney Erge.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3f0e7",
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
