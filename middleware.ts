// middleware.ts
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const user = req.auth?.user
  
  const isOnboarding = req.nextUrl.pathname.startsWith("/onboarding")
  const isMemberArea = req.nextUrl.pathname.startsWith("/ruang-belajar")

  // 1. Proteksi Ruang Belajar
  if (isMemberArea) {
    if (!isLoggedIn) {
      // 👇 PERBAIKAN DI SINI: Kita buat URL login lengkap dengan callbackUrl
      const signInUrl = new URL("/api/auth/signin", req.nextUrl)
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }
    
    // @ts-ignore
    if (user?.onboardingCompleted === false) {
      return NextResponse.redirect(new URL("/onboarding", req.nextUrl))
    }
  }

  // 2. Proteksi Halaman Onboarding
  if (isOnboarding) {
    if (!isLoggedIn) {
      const signInUrl = new URL("/api/auth/signin", req.nextUrl)
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(signInUrl)
    }

    // @ts-ignore
    if (user?.onboardingCompleted === true) {
      return NextResponse.redirect(new URL("/ruang-belajar", req.nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/ruang-belajar/:path*", "/onboarding/:path*"],
}