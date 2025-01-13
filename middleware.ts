// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered", {
    path: req.nextUrl.pathname,
    headers: req.headers,
  });
  console.log("NEXTAUTH_SECRET in middleware:", process.env.NEXTAUTH_SECRET);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("Token in middleware:", token);

  if (!token) {
    if (req.nextUrl.pathname === "/api/auth/signin") {
      return NextResponse.next();
    }

    const returnUrl = req.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(
        `/api/auth/signin?callbackUrl=${encodeURIComponent(returnUrl)}`,
        req.url,
      ),
    );
  }

  const userRole = token?.role as string;

  console.log("User Role:", userRole);

  switch (userRole) {
    case "superadmin":
      if (!req.nextUrl.pathname.startsWith("/superadmin")) {
        return NextResponse.redirect(new URL("/superadmin", req.url));
      }
      break;

    case "admin":
      if (!req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      break;

    case "teacher":
      if (!req.nextUrl.pathname.startsWith("/teacher")) {
        return NextResponse.redirect(new URL("/teacher", req.url));
      }
      break;

    case "student":
      if (!req.nextUrl.pathname.startsWith("/student")) {
        return NextResponse.redirect(new URL("/student", req.url));
      }
      break;

    default:
      return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/signin"], 
};

// "/superadmin","/admin","/teacher","/student"