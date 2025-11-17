/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Image optimizations - PERFORMANCE FOCUSED
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-al-asr.centers.pk',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Reduced from 8 to 6
    imageSizes: [16, 32, 64, 96, 128, 256], // Reduced from 8 to 6
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: true,
  },

  // ✅ Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ Performance optimizations
  poweredByHeader: false,
  compress: true,

  // ✅ Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ✅ Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = nextConfig