import { NextRequest , NextResponse } from "next/server";

export const config = {
    matcher: ['/dashboard/:path*' , '/auth/sign-in' , '/auth/sign-up' , '/' , "/sellers/:path*" , "/cart" , "/logs"]
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
export async function middleware(request: NextRequest) {
    const token = getCookie("token");
    const url = request.nextUrl;
    if(token && (url.pathname.startsWith("/auth/sign-in") ||url.pathname.startsWith("/auth/sign-up") ||url.pathname === '/')){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (!token && (url.pathname.startsWith('/dashboard')|| url.pathname.startsWith('/sellers')||url.pathname.startsWith('/cart')||url.pathname.startsWith('/logs'))) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
  return NextResponse.next();
}