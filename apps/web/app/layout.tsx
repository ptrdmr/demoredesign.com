import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Neighborhood Bookings — Know your neighborhood. Fill your slow days.",
  description:
    "I find the groups near you and build you a plan to book them. Area audit, partner map, playbook, and strategy page for restaurants, diners, bowling, bar-grills, and family entertainment centers.",
  openGraph: {
    title: "Neighborhood Bookings — Know your neighborhood. Fill your slow days.",
    description:
      "I find the groups near you and build you a plan to book them. Hospitality consulting for venues with slow days to fill.",
    url: "https://web.demoredesign.com",
    siteName: "Neighborhood Bookings",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
