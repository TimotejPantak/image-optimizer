import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';


export const metadata: Metadata = {
  metadataBase: new URL('https://media-optimizer.metinas.dev'),
  title: 'Free Image Converter | Convert PNG, JPG to WebP & AVIF',
  description: 'Ultra-fast free online image optimizer. Bulk convert and compress images to WebP and AVIF formats for free. Improve your website loading speed.',
  keywords: ['image converter', 'webp converter', 'avif optimizer', 'compress images', 'bulk image conversion'],
  authors: [{ name: 'METINAS' }],
  icons: {
    icon: '/favicon.ico',
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
