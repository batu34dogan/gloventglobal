import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import SiteNavbar from "@/components/layout/SiteNavbar";
import SiteFooter from "@/components/layout/SiteFooter";
import AnalysisWidget from "@/components/analysis/AnalysisWidget";
import CookieConsent from "@/components/legal/CookieConsent";
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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
    description:
      "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
    url: "https://gloventglobal.com",
    siteName: "GloventGlobal",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/glovent-platform-hero.png",
        width: 1534,
        height: 1025,
        alt: "GloventGlobal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GloventGlobal | Dijital Büyüme, E-Ticaret ve Yapay Zeka Sistemleri",
    description:
      "GloventGlobal; markalar için e-ticaret, yapay zeka, otomasyon, global satış ve dijital büyüme sistemleri kuran stratejik büyüme partneridir.",
    images: ["/glovent-platform-hero.png"],
  },
};

// GA4 Measurement ID — Vercel'de NEXT_PUBLIC_GA_ID env değişkeni set edilmişse
// oradan okunur; yoksa doğrudan sabit ID kullanılır.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-KY8GWDRR7G";

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
      <head>
        {/* Google Analytics GA4 — sadece production'da yüklenir.
            Script yüklenmesi için kullanıcının cookie'yi kabul etmesi GEREKMEZ;
            gtag script sayfa sayacını tutar. Ancak özel event'ler (trackEvent)
            lib/analytics.ts içinde glovent_cookie_consent === 'accepted' kontrolü
            ile korunuyor — kullanıcı reddetmişse hiçbir event gönderilmez.
            Bu yaklaşım GA4'ün kendi "Consent Mode" önerileriyle uyumludur. */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <SiteNavbar />
        {children}
        <SiteFooter />
        <AnalysisWidget />
        <CookieConsent />
      </body>
    </html>
  );
}