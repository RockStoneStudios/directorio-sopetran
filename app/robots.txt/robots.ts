// app/robots.txt/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/

Sitemap: https://www.directoriosopetran.com/sitemap.xml`

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400',
    },
  })
}