// types/nextauth.d.ts or @types/nextauth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    role: string;
  }
}
