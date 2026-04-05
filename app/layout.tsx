import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://manas-bandhu.vercel.app/'),
  title: {
    default: "Manas Bandhu | Creative Technologist & Data Analyst",
    template: "%s | Manas Bandhu"
  },
  description: "Personal portfolio of Manas Bandhu, exploring the intersection of creative storytelling, data analysis, and technical logic.",
  keywords: ["Manas Bandhu", "Creative Technologist", "Data Analyst", "Portfolio", "Next.js", "Three.js", "Three.js Portfolio", "Kolkata Developer"],
  authors: [{ name: "Manas Bandhu" }],
  creator: "Manas Bandhu",
  openGraph: {
    title: "Manas Bandhu | Creative Technologist & Data Analyst",
    description: "Personal portfolio of Manas Bandhu, exploring the intersection of creative storytelling, data analysis, and technical logic.",
    url: 'https://manas-bandhu.vercel.app/',
    siteName: 'Manas Bandhu Portfolio',
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Bandhu",
    description: "Creative Technologist & Data Analyst",
    creator: "@manas_1303x",
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} ${mono.variable} antialiased bg-black text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
