import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  console.log("Session in middleware:", session);

  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url))
  }

  const userRole = session?.role as string; // Access role directly from session

  console.log("User Role:", userRole); 

  // Role-based redirection logic (using a switch statement for clarity)
  switch (userRole) {
    case 'SUPER_ADMIN':
      if (!req.nextUrl.pathname.startsWith('/superadmin')) {
        return NextResponse.redirect(new URL('/superadmin', req.url));
      }
      break;

    case 'ADMIN':
      if (!req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      break;

    case 'TEACHER':
      if (!req.nextUrl.pathname.startsWith('/teacher')) {
        return NextResponse.redirect(new URL('/teacher', req.url));
      }
      break;

    case 'STUDENT':
      if (!req.nextUrl.pathname.startsWith('/student')) {
        return NextResponse.redirect(new URL('/student', req.url));
      }
      break;

    default:
      return NextResponse.redirect(new URL('/', req.url)); 
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/teacher', '/superadmin', '/admin', '/student'],
};