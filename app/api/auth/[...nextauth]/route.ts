import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }
      
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
      
          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }
      
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordMatch) {
            throw new Error("Invalid email or password");
          }
      
          // Log the token here for debugging
          console.log("User authenticated, returning user data:", { id: user.id, email: user.email, role: user.role });
          return { id: user.id, email: user.email, role: user.role };
        } catch (error) {
          console.error("Error in authorization:", error);
          throw error;
        }
      }
      
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      console.log('JWT Token:', token);
      return token;
    },
  
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
        };
      }
      console.log('Session:', session); 
      return session;
    },
    // async signIn({ user }) {
    //   console.log('SignIn User:', user);
    //   if (user) {
    //     const userRole = user.role;

    //     switch (userRole) {
    //       case "superadmin":
    //         return "/superadmin";
    //       case "admin":
    //         return "/admin";
    //       case "teacher":
    //         return "/teacher";
    //       case "student":
    //         return "/student";
    //       default:
    //         return "/";
    //     }
    //   }
    //   return "/";
    // },
    async redirect({ url, baseUrl }) {
      // Ensure the URL is fully qualified
      const fullUrl = url.startsWith("http") ? url : new URL(url, baseUrl).toString();
    
      // Extract the callbackUrl from the full URL
      const callbackUrl = new URL(fullUrl).searchParams.get("callbackUrl");
    
      // If a callbackUrl is present, redirect to it
      if (callbackUrl) {
        return callbackUrl;
      }
    
      // Otherwise, use the default redirect logic
      return baseUrl;
    },
    

  
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  
});

export { handler as GET, handler as POST };