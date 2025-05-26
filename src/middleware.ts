import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Allow static files and Next.js internal paths
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/static/") ||
    url.pathname.startsWith("/public/") || // Add public directory
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.match(
      /\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf|eot|mp4|webm|ogg|mp3|wav|pdf|json)$/
    )
  ) {
    return NextResponse.next();
  }

  // Redirect root to login
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow login and dashboard access
  if (url.pathname === "/login" || url.pathname === "/dashboard") {
    return NextResponse.next();
  }

  // Redirect all other routes to login
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/:path*"],
};
