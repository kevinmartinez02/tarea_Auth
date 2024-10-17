import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const protectedRoutes = [
  '/dashboard',
];

async function middleware(request) {
  const cookie = request.cookies.get('token');

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (cookie === undefined) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      const { payload } = await jwtVerify(cookie["value"], new TextEncoder().encode('secret-key'));
      console.log('Payload:', payload);
      return NextResponse.next();
    } catch (error) {
      console.log('Error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export default middleware;