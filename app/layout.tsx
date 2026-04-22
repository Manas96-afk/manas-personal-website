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
  title: "Manas Bandhu | Personal Portfolio",
  description: "Manas Bandhu - Personal portfolio website showcasing projects in creative technology, data analysis, and technical storytelling.",
  keywords: ["Manas Bandhu", "manas bandhu portfolio"],
  authors: [{ name: "Manas Bandhu" }],
  creator: "Manas Bandhu",
  openGraph: {
    title: "Manas Bandhu",
    description: "Personal website of Manas Bandhu",
    url: 'https://manas-bandhu.vercel.app/',
    siteName: 'Manas Bandhu Portfolio',
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Bandhu",
    description: "Personal portfolio website of Manas Bandhu",
    creator: "@manas_1303x",
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
