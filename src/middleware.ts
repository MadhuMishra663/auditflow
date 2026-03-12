import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
  if (USE_MOCK) {
    return NextResponse.next();
  }
  const token = request.cookies.get("token");
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
