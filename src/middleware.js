import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  // Update project ID if needed
  requestHeaders.set("x-wigiart-project-id", "3005f1e6-9ba4-4a45-b869-7f5f193ba980");

  if (!request.nextUrl.pathname.startsWith("/api")) {
    request.nextUrl.href = `https://www.wigiart.com/${request.nextUrl.pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}