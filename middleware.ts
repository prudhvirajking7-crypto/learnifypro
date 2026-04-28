import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const nonce = nanoid(16);

    // Role-based route guards
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (
      pathname.startsWith("/instructor") &&
      token?.role !== "INSTRUCTOR" &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    const res = NextResponse.next();

    // Nonce-based Content Security Policy
    const csp = [
      `default-src 'self'`,
      `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:`,
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      `font-src 'self' https://fonts.gstatic.com`,
      `img-src 'self' data: blob: https: http:`,
      `media-src 'self' blob: https: http:`,
      `connect-src 'self' https: wss:`,
      `frame-src 'self' https://www.youtube.com https://player.vimeo.com https://iframe.mediadelivery.net https://customer-*.cloudflarestream.com`,
      `worker-src 'self' blob:`,
      `object-src 'none'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      `upgrade-insecure-requests`,
    ].join("; ");

    res.headers.set("Content-Security-Policy", csp);
    res.headers.set("X-Nonce", nonce);
    res.headers.set("X-Frame-Options", "SAMEORIGIN");
    res.headers.set("X-Content-Type-Options", "nosniff");
    res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    return res;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const protectedPaths = ["/dashboard", "/cart", "/checkout", "/profile", "/instructor", "/admin"];
        const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
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
    "/api/admin/:path*",
    "/api/instructor/:path*",
  ],
};
