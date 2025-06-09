// middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest, context: any) {
  return auth(async (req) => {
    const { nextUrl, auth } = req
    const isPublic = ["/", "/signin", "/signup"].includes(nextUrl.pathname)

    if (!auth && !isPublic) {
      return NextResponse.redirect(new URL("/signin", nextUrl))
    }
    if (auth && nextUrl.pathname === "/signin") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }

    return NextResponse.next()
  })(request, context)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
