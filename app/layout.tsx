import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
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
  // ✅ PWA Metadata
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
  maximumScale: 1,
  userScalable: false,
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
        
        {/* ✅ Basic Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
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

        {/* ✅ Google Fonts - Optimized */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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

        {/* ✅ PWA Install Prompt */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // PWA Install Prompt
              let deferredPrompt;
              window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Show install button
                const installButton = document.getElementById('install-button');
                if (installButton) {
                  installButton.style.display = 'block';
                  installButton.addEventListener('click', async () => {
                    if (deferredPrompt) {
                      deferredPrompt.prompt();
                      const { outcome } = await deferredPrompt.userChoice;
                      if (outcome === 'accepted') {
                        deferredPrompt = null;
                      }
                    }
                  });
                }
              });

              // Detect device type for responsive PWA
              function detectDeviceType() {
                const userAgent = navigator.userAgent;
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
                const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);
                
                if (isMobile) {
                  document.documentElement.classList.add('mobile-device');
                } else if (isTablet) {
                  document.documentElement.classList.add('tablet-device');
                } else {
                  document.documentElement.classList.add('desktop-device');
                }
              }
              
              // Load fonts after critical content
              function loadFonts() {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap';
                document.head.appendChild(link);
              }
              
              // Initialize on load
              window.addEventListener('load', () => {
                detectDeviceType();
                
                // Load fonts when page is idle
                if ('requestIdleCallback' in window) {
                  window.requestIdleCallback(loadFonts);
                } else {
                  setTimeout(loadFonts, 500);
                }
              });
            `,
          }}
        />

        {/* ✅ Critical CSS Inline */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for above-the-fold content */
              body {
                font-family: system-ui, -apple-system, sans-serif;
                margin: 0;
                padding: 0;
                background: #ffffff;
                color: #111827;
              }
              .min-h-screen {
                min-height: 100vh;
              }
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
              
              /* PWA Responsive Classes */
              .mobile-device .desktop-only {
                display: none !important;
              }
              .desktop-device .mobile-only {
                display: none !important;
              }
              .tablet-device .mobile-only {
                display: none !important;
              }
              
              /* Install Button */
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
              }
            `,
          }}
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* PWA Install Button */}
        <button id="install-button" className="hidden md:flex">
          📱 Install App
        </button>

        <ThemeProvider>
          <main role="main" id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}