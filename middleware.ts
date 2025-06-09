import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './actions'

const publicRoutes = ['/', '/signin', '/signup']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token =await getUser()
  const isPublicRoute = publicRoutes.includes(pathname)

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
