import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({token, session}) {
      // console.log({session})
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session.user.id
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})