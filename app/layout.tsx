import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

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
  applicationName: "Al-Asr Islamic Service",
  authors: [{ name: "Al-Asr Islamic Service" }],
  generator: "Next.js",
  keywords: ["islamic", "prayer", "quran", "muslim", "community", "religious"],
  creator: "Al-Asr Islamic Service",
  publisher: "Al-Asr Islamic Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#991b1b',
  colorScheme: 'light',
}

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
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* ✅ Apple Touch Icons */}
        <link rel="preconnect" href="https://admin-al-asr.centers.pk" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://admin-al-asr.centers.pk" />
        
        <link rel="apple-touch-icon" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />
        
        {/* ✅ PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* ✅ Fixed: Viewport meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/android/android-launchericon-48-48.png" />

        {/* ✅ Preconnect + Prefetch - Optimized */}
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

        {/* ✅ Google Fonts - Simplified */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
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

        {/* ✅ Critical CSS Inline - Optimized */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /*! Critical Above-the-Fold CSS */
              :root {
                --background: #ffffff;
                --foreground: #171717;
                --header-bg: #991b1b;
                --header-text: #ffffff;
              }
              
              [data-theme="dark"] {
                --background: #1a1a1a;
                --foreground: #f5f5f5;
                --header-bg: #2d2d2d;
                --header-text: #f5f5f5;
              }
              
              * {
                box-sizing: border-box;
              }
              
              html {
                scroll-behavior: smooth;
              }
              
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                margin: 0;
                padding: 0;
                background: var(--background);
                color: var(--foreground);
                line-height: 1.6;
                overflow-x: hidden;
                min-height: 100vh;
                opacity: 1 !important;
              }
              
              /* Fix for Next.js Image fill positioning */
              .next-image-container {
                position: relative !important;
                width: 100%;
                height: 100%;
              }
              
              /* Header Critical Styles */
              .header-critical {
                background: var(--header-bg) !important;
                color: var(--header-text) !important;
              }
              
              /* Main Content Area */
              #main-content {
                min-height: 100vh;
              }
              
              /* Accessibility */
              .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
              }
              
              /* Focus styles for accessibility */
              button:focus-visible,
              a:focus-visible {
                outline: 2px solid #3b82f6;
                outline-offset: 2px;
                border-radius: 2px;
              }
              
              /* PWA Install Button */
              #install-button {
                display: none;
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                background: #991b1b;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              }
              
              #install-button:hover {
                background: #7f1d1d;
                transform: translateY(-1px);
              }
              
              /* Loading states */
              .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
              }
              
              @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              
              /* Reduced motion support */
              @media (prefers-reduced-motion: reduce) {
                * {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                }
              }
            `,
          }}
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* ✅ Performance Monitoring */}
        <PerformanceMonitor />
        
        {/* ✅ PWA Install Button */}
        <button id="install-button" className="hidden md:flex items-center gap-2">
          <span>📱</span>
          Install App
        </button>

        {/* ✅ Apollo Wrapper - Theme Provider ke bahar */}
        <ApolloWrapper>
          <ThemeProvider>
            <main role="main" id="main-content" tabIndex={-1} className="min-h-screen">
              {children}
            </main>
          </ThemeProvider>
        </ApolloWrapper>

        {/* ✅ Analytics */}
        <SpeedInsights />
        <Analytics />

        {/* ✅ PWA Script - Deferred */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // PWA Install Prompt - Deferred
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Show install button after 3 seconds
                setTimeout(() => {
                  const installButton = document.getElementById('install-button');
                  if (installButton && deferredPrompt) {
                    installButton.style.display = 'flex';
                    
                    installButton.addEventListener('click', async () => {
                      if (deferredPrompt) {
                        deferredPrompt.prompt();
                        const { outcome } = await deferredPrompt.userChoice;
                        if (outcome === 'accepted') {
                          installButton.style.display = 'none';
                          deferredPrompt = null;
                        }
                      }
                    });
                    
                    // Auto-hide after 10 seconds
                    setTimeout(() => {
                      if (installButton.style.display !== 'none') {
                        installButton.style.display = 'none';
                      }
                    }, 10000);
                  }
                }, 3000);
              });

              // Service Worker Registration for PWA
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                      console.log('SW registered: ', registration);
                    },
                    (registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}