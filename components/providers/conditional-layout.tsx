"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const AUTH_PATHS = ["/login", "/register", "/verify-otp", "/forgot-password", "/reset-password", "/signout"];
const PANEL_PATHS = ["/admin", "/instructor"];

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
  const isPanelPage = PANEL_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  return (
    <>
      {!isAuthPage && !isPanelPage && navbar}
      {isPanelPage ? children : (
        <div key={pathname} className="animate-page-enter">
          {children}
        </div>
      )}
      {!isAuthPage && !isPanelPage && footer}
    </>
  );
}
