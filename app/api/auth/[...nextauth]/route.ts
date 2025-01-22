import NextAuth  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db/index";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface User {
    schoolId?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
      schoolId?: string;
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        console.log("Authorize function triggered");
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          console.error("Invalid email or password");
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          console.error("Password does not match");
          throw new Error("Invalid email or password");
        }

        console.log("User found:", {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          schoolId: user.schoolId,
        });

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          schoolId: user.schoolId ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback triggered", { token, user });
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.schoolId = user.schoolId;
      }
      console.log("Updated JWT token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback triggered", { session, token });
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email ?? "",
          role: token.role as string,
          name: token.name as string,
          schoolId: token.schoolId as string,
        };
      }
      console.log("Updated session data:", session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
});

export { handler as GET, handler as POST };
