import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // Redirect authenticated users away from auth pages
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow unauthenticated users to access auth pages and the homepage
  // if (
  //   !token &&
  //   (url.pathname === "/" ||
  //     url.pathname.startsWith("/sign-in") ||
  //     url.pathname.startsWith("/sign-up") ||
  //     url.pathname.startsWith("/verify"))
  // ) {
  //   return NextResponse.next();
  // }

  // Redirect unauthenticated users trying to access protected pages
  // if (!token) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow authenticated users to access protected pages
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Homepage
    "/sign-in", // Sign-in page
    "/sign-up", // Sign-up page
    "/verify", // Verify page
    "/dashboard/:path*", // Dashboard and protected pages
  ],
};
