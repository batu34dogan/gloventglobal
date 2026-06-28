import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteNavbar from "@/components/layout/SiteNavbar";
import AnalysisWidget from "@/components/analysis/AnalysisWidget";
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
  metadataBase: new URL("https://gloventglobal.com"),
  title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
  description:
    "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
    description:
      "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
    url: "https://gloventglobal.com",
    siteName: "GloventGlobal",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
    description:
      "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNavbar />
        {children}
        <AnalysisWidget />
      </body>
    </html>
  );
}