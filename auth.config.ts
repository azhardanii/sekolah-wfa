import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    // 1. Masukkan data user dari DB ke dalam Token JWT
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        // @ts-ignore
        token.role = user.role
        // @ts-ignore
        token.onboardingCompleted = user.onboardingCompleted
      }
      
      // Update token jika ada perubahan data (misal setelah submit form)
      if (trigger === "update" && session) {
        token = { ...token, ...session }
      }
      
      return token
    },
    // 2. Masukkan data dari Token ke Session (biar bisa dibaca di frontend)
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        // @ts-ignore
        session.user.role = token.role
        // @ts-ignore
        session.user.onboardingCompleted = token.onboardingCompleted
      }
      return session
    },
  },
} satisfies NextAuthConfig