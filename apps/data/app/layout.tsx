import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Data & Analytics Portfolio | Demore Design",
  description: "Explore data analytics projects, dashboards, and visualizations. GitHub repositories, Tableau dashboards, Power BI reports, and more.",
  keywords: [
    "data analytics",
    "portfolio",
    "Tableau",
    "Power BI",
    "data visualization",
    "Python",
    "SQL",
    "dashboards",
    "business intelligence",
  ],
  authors: [{ name: "Peter Demore", url: "https://demoredesign.com" }],
  openGraph: {
    title: "Data & Analytics Portfolio | Demore Design",
    description: "Explore data analytics projects, dashboards, and visualizations.",
    url: "https://data.demoredesign.com",
    siteName: "Demore Design Data Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data & Analytics Portfolio | Demore Design",
    description: "Explore data analytics projects, dashboards, and visualizations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://data.demoredesign.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
