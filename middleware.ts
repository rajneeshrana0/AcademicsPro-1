import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL(`/`, req.url)); // Redirect to the home page
  }
  

  const userRole = token?.role as string;
  const path = req.nextUrl.pathname;

  const roleAccessMap: { [key: string]: string[] } = {
    superadmin: ["/superadmin", "/admin", "/teacher", "/student"],
    admin: ["/admin", "/teacher", "/student"],
    teacher: ["/teacher", "/student"],
    student: ["/student"],
  };


  const allowedRoutes = roleAccessMap[userRole] || [];
  const isAllowed = allowedRoutes.some((route) => path.startsWith(route));

  if (!isAllowed) {
   
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/superadmin/:path*", "/admin/:path*", "/teacher/:path*", "/student/:path*"],
};
