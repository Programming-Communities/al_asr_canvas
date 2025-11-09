import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Al-Asr ( Islamic Service )",
    template: "%s | Al-Asr ( Islamic Service )"
  },
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
        
        {/* ✅ Performance Optimizations */}
        <link rel="dns-prefetch" href="https://admin-al-asr.centers.pk" />
        <link rel="preconnect" href="https://admin-al-asr.centers.pk" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ✅ Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ios/167.png" />
        
        {/* ✅ PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* ✅ Fixed: Viewport meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/android/android-launchericon-48-48.png" />

        {/* ✅ Google Fonts - Optimized */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap&display=swap"
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
              /*! Critical Above-the-Fold CSS - Optimized */
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

              /* Install Button Styles */
              #install-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                background: #991b1b;
                color: white;
                border: none;
                padding: 12px 16px;
                border-radius: 12px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                display: none;
                align-items: center;
                gap: 8px;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255,255,255,0.2);
              }

              #install-button:hover {
                background: #7f1d1d;
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(0,0,0,0.4);
              }

              #install-button:active {
                transform: translateY(0);
              }

              @media (max-width: 768px) {
                #install-button {
                  bottom: 80px;
                  right: 20px;
                  padding: 14px 18px;
                  font-size: 15px;
                }
              }
            `,
          }}
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* ✅ Performance Monitoring - Only in development */}
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        
        {/* ✅ PWA Install Button - FIXED POSITION */}
        <button 
          id="install-button" 
          aria-label="Install App"
          style={{ display: 'none' }}
        >
          <span style={{ fontSize: '18px' }}>📱</span>
          Install App
        </button>

        <ThemeProvider>
          <ApolloWrapper>
            <main role="main" id="main-content" tabIndex={-1} className="min-h-screen">
              {children}
            </main>
          </ApolloWrapper>
        </ThemeProvider>

        {/* ✅ Analytics - Only in production */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <SpeedInsights />
            <Analytics />
          </>
        )}

        {/* ✅ PWA Script - FIXED & IMPROVED */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                let deferredPrompt;
                let installButton;

                function initializePWA() {
                  installButton = document.getElementById('install-button');
                  
                  if (!installButton) {
                    console.error('Install button element not found');
                    return;
                  }

                  // Install button click handler
                  installButton.addEventListener('click', async function() {
                    console.log('Install button clicked');
                    
                    if (deferredPrompt) {
                      try {
                        deferredPrompt.prompt();
                        const choiceResult = await deferredPrompt.userChoice;
                        
                        console.log('User choice:', choiceResult.outcome);
                        
                        if (choiceResult.outcome === 'accepted') {
                          console.log('User accepted the install prompt');
                          hideInstallButton();
                        } else {
                          console.log('User dismissed the install prompt');
                        }
                        
                        deferredPrompt = null;
                      } catch (error) {
                        console.error('Error during install prompt:', error);
                      }
                    }
                  });

                  // Check if already installed
                  if (isPWAInstalled()) {
                    console.log('App is already installed');
                    hideInstallButton();
                    return;
                  }

                  console.log('PWA initialization complete');
                }

                // Before install prompt event
                window.addEventListener('beforeinstallprompt', function(e) {
                  console.log('beforeinstallprompt event fired');
                  e.preventDefault();
                  deferredPrompt = e;
                  
                  // Show install button after a short delay
                  setTimeout(function() {
                    if (!isPWAInstalled() && deferredPrompt) {
                      showInstallButton();
                    }
                  }, 2000);
                });

                // After app is installed
                window.addEventListener('appinstalled', function(evt) {
                  console.log('PWA was successfully installed');
                  hideInstallButton();
                  deferredPrompt = null;
                });

                // Page load event
                window.addEventListener('load', function() {
                  console.log('Page loaded, initializing PWA...');
                  initializePWA();
                  
                  // Service Worker Registration
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                      });
                  }
                });

                function showInstallButton() {
                  if (installButton && !isPWAInstalled()) {
                    installButton.style.display = 'flex';
                    console.log('Showing install button');
                    
                    // Auto-hide after 15 seconds
                    setTimeout(function() {
                      if (installButton.style.display !== 'none') {
                        hideInstallButton();
                      }
                    }, 15000);
                  }
                }

                function hideInstallButton() {
                  if (installButton) {
                    installButton.style.display = 'none';
                    console.log('Hiding install button');
                  }
                }

                function isPWAInstalled() {
                  return window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
                }

                // Initialize when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', initializePWA);
                } else {
                  initializePWA();
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}