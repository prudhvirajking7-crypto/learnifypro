import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Admin routes require ADMIN role
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Instructor routes require INSTRUCTOR or ADMIN role
    if (
      pathname.startsWith("/instructor") &&
      token?.role !== "INSTRUCTOR" &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const protectedPaths = [
          "/dashboard",
          "/cart",
          "/checkout",
          "/profile",
          "/instructor",
          "/admin",
        ];
        const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
        // Learn pages also protected
        const isLearnPage = pathname.includes("/learn");
        if (isProtected || isLearnPage) return !!token;
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/instructor/:path*",
    "/admin/:path*",
    "/courses/:slug/learn/:path*",
  ],
};
