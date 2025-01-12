// import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");
  console.log(token);
  
//   const role = token?.role; 
// console.log(role);
//   if (req.nextUrl.pathname.startsWith("/super-admin") && role !== "SUPER_ADMIN") {
//     return NextResponse.redirect(new URL("/auth/signin", req.url));
//   }

//   if (req.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN" && role !== "SUPER_ADMIN") {
//     return NextResponse.redirect(new URL("/auth/signin", req.url));
//   }
}
