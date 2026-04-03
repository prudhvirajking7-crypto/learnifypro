"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const AUTH_PATHS = ["/login", "/register", "/verify-otp", "/forgot-password", "/reset-password"];

export default function ConditionalLayout({
  navbar,
  footer,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + "?"));

  return (
    <>
      {!isAuthPage && navbar}
      {children}
      {!isAuthPage && footer}
    </>
  );
}
