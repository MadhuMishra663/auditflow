import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API;
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (USE_MOCK) {
    // In mock mode, protect admin routes using the mockSession cookie
    // (middleware runs server-side so it cannot read localStorage)
    const mockSession = request.cookies.get("mockSession");
    if (isAdminRoute && !mockSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Real API mode — protect admin routes using the real auth token cookie
  const token = request.cookies.get("token");
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
