import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } = credentials || {};

          if (!email || !password) {
            return null;
          }

 
          const user = await prisma.user.findUnique({
            where: { email },
          });

          
          if (user && user.password && (await bcrypt.compare(password, user.password))) {
            return { id: user.id, email: user.email, role: user.role };
          }

       
          return null;
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (token) {
          session.user = token.user as typeof session.user;
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.user = user;
        }
        return token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
