import { auth } from "@/app/lib/auth"
import { NextResponse } from "next/server"

const protectedRoutes = ["/blogs", "/create", "/edit"]

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !req.auth) {
    const signInUrl = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(signInUrl)
  }
})

export const config = {
  matcher: ["/blogs/:path*", "/create/:path*", "/edit/:path*"],
}