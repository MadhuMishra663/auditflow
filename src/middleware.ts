import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { USE_MOCK } from "./config/env";

export function middleware(request: NextRequest) {
  
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
