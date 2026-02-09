import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma, withPrismaFallback } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const authSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  // adapter: PrismaAdapter(prisma), // Not strictly necessary for Credentials only but good practice
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await withPrismaFallback(
          () =>
            prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            }),
          null,
          "auth.authorize.userLookup"
        )

        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    }
  }
}
