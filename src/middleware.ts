import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add security headers
  const headers = new Headers(request.headers)
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'origin-when-cross-origin')

  // Basic rate limiting
  const ip = request.ip ?? '127.0.0.1'
  const rateLimit = request.headers.get('X-RateLimit-Limit')

  if (rateLimit && parseInt(rateLimit) > 100) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  return NextResponse.next({
    request: {
      headers,
    },
  })
}

export const config = {
  matcher: '/api/:path*',
}
