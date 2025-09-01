import { NextRequest , NextResponse } from "next/server";

export const config = {
    matcher: ['/dashboard/:path*' , '/auth/sign-in' , '/auth/sign-up'  , "/sellers/:path*" , "/logs" , "/products/:path*"]
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value || null;
    const url = request.nextUrl;
    if(token && (url.pathname.startsWith("/auth/sign-in") ||url.pathname.startsWith("/auth/sign-up") ||url.pathname === '/')){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (!token && (url.pathname.startsWith('/dashboard')|| url.pathname.startsWith('/sellers')||url.pathname.startsWith('/cart')||url.pathname.startsWith('/logs'))) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
  return NextResponse.next();
}