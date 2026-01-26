import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['hr', 'en']
const defaultLocale = 'hr'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Match root
    '/',
    // Skip internal paths (_next, api) and static files
    '/((?!_next|api|.*\\..*).*)',
  ],
}
