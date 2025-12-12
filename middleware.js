import { NextResponse } from "next/server";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Block ALL users access to noon and evening related pages
  const blockedPaths = [
    "/common-number-noon",
    "/common-number-eve",
    "/previous-result-noon",
    "/previous-result-eve",
    "/add-result-noon",
    "/add-result-eve",
  ];

  if (blockedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/common-number-noon/:path*",
    "/common-number-eve/:path*",
    "/previous-result-noon/:path*",
    "/previous-result-eve/:path*",
    "/add-result-noon/:path*",
    "/add-result-eve/:path*",
  ],
};
