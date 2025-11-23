export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://al-asr.centers.pk' 
    : 'http://localhost:3000';

  const robotsTxt = `
User-agent: *
Allow: /

# Block sensitive areas
Disallow: /api/
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-json/
Disallow: /_next/
Disallow: /_vercel/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`.trim()

  try {
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    // ✅ FALLBACK: Simple response if error occurs
    return new Response('User-agent: *\nAllow: /', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}