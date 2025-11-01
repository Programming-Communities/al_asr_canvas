import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Al-Asr ( Islamic Service )",
  description: "Islamic Services, Calendar Events, and Community Programs",
  metadataBase: new URL("https://al-asr.centers.pk"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Al-Asr Islamic Service",
  },
  openGraph: {
    title: "Al-Asr ( Islamic Service )",
    description: "Islamic Services, Calendar Events, and Community Programs",
    url: "https://al-asr.centers.pk",
    siteName: "Al-Asr Islamic Service",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Al-Asr Islamic Service",
        type: "image/png",
      },
    ],
    locale: "ur_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al-Asr ( Islamic Service )",
    description: "Islamic Services, Calendar Events, and Community Programs",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://al-asr.centers.pk" },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ur"
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <head>
        {/* ✅ PWA Meta Tags */}
        <meta name="application-name" content="Al-Asr Islamic Service" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Al-Asr" />
        <meta name="description" content="Islamic Services, Calendar Events, and Community Programs" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#991b1b" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#991b1b" />
        
        {/* ✅ Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />
        
        {/* ✅ PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* ✅ Basic Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/android/android-launchericon-48-48.png" />

        {/* ✅ Preconnect + Prefetch */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://admin-al-asr.centers.pk" />

        {/* ✅ Google Fonts for Urdu/Arabic support - Optimized */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* ✅ Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/notonastaliqurdu/v20/LhWlMzb5Xumg7Yu1_mrqPfxxMduQdH0pY4k.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* ✅ FOUC Prevention Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent FOUC
              document.addEventListener('DOMContentLoaded', function() {
                document.body.classList.add('loaded');
              });
              // Initial body state
              document.body.classList.add('loading');
            `,
          }}
        />

        {/* ✅ Inline tiny critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                margin: 0;
                padding: 0;
                font-family: 'Noto Sans Arabic', 'Noto Nastaliq Urdu', system-ui, -apple-system, sans-serif;
                background-color: #ffffff;
                color: #111827;
                -webkit-font-smoothing: antialiased;
              }
              body.loading {
                opacity: 0;
                visibility: hidden;
              }
              body.loaded {
                opacity: 1;
                visibility: visible;
                transition: opacity 0.3s ease-in-out;
              }
              .min-h-screen { min-height: 100vh; }
              
              /* Urdu/Arabic text styling */
              .urdu-text {
                font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
                line-height: 1.8;
                font-weight: 400;
              }
              .arabic-text {
                font-family: 'Noto Sans Arabic', 'Noto Nastaliq Urdu', serif;
                line-height: 1.6;
              }
            `,
          }}
        />

        {/* ✅ OG + Twitter Meta */}
        <meta property="og:image" content="https://al-asr.centers.pk/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Al-Asr Islamic Service" />
        <meta name="twitter:image" content="https://al-asr.centers.pk/og-image.png" />
        <meta name="twitter:image:alt" content="Al-Asr Islamic Service" />

        {/* ✅ Prevent dark-mode filter */}
        <meta name="darkreader-lock" />
      </head>

      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider>
          <main role="main" id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}