import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      if (isOnAdmin && !isLoggedIn) return false
      return true
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        ;(session.user as any).role = (user as any).role
      }
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
