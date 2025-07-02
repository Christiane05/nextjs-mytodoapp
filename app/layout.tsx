import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
 title: "Ma To-Do App ton application de productivité",
  description: "Une application simple et efficace pour gérer ta liste de tâches quotidienne.",
  keywords: ["to-do list", "productivité", "application tâches", "graphique", "statistique"],
  openGraph: {
    title: "Ma To-Do App",
    description: "Visualise ta productivité avec une to-do liste intuitive.",
    url: "https://nextjs-mytodoapp.vercel.app",
    siteName: "Ma To-Do App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aperçu de Ma To-Do App",
      },
    ],
    locale: "fr_FR",
    type: "website",
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="IEEP5WnX5KiWuuIAtd1cSsIrmXPN28gXLV8Lan96XLI" />
        <title>Ma to do application</title>
        <meta name="description" content="Ta feuille de to do list" />      
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
