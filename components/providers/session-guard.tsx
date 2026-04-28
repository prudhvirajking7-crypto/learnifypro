"use client";
import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const AUTH_PATHS = ["/login", "/register", "/verify-otp", "/forgot-password", "/reset-password"];
const WARNING_BEFORE_MS = 60 * 1000; // warn 1 minute before expiry

export default function SessionGuard() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnedRef      = useRef(false);

  useEffect(() => {
    // Clear any existing timers
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (warnTimerRef.current)   clearTimeout(warnTimerRef.current);
    warnedRef.current = false;

    // Only run for authenticated users not on auth pages
    const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));
    if (status !== "authenticated" || !session?.expires || isAuthPage) return;

    const expiresAt   = new Date(session.expires).getTime();
    const now         = Date.now();
    const msUntilEnd  = expiresAt - now;

    if (msUntilEnd <= 0) {
      // Already expired — sign out immediately
      signOut({ callbackUrl: "/login" });
      return;
    }

    // Warning toast 1 minute before expiry
    const msUntilWarn = msUntilEnd - WARNING_BEFORE_MS;
    if (msUntilWarn > 0) {
      warnTimerRef.current = setTimeout(() => {
        if (!warnedRef.current) {
          warnedRef.current = true;
          toast("⏰ Your session expires in 1 minute. Save your work!", {
            duration: 10000,
            style: {
              background: "#92400e",
              color: "#fef3c7",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "14px",
            },
          });
        }
      }, msUntilWarn);
    }

    // Auto sign-out at expiry
    logoutTimerRef.current = setTimeout(() => {
      toast.error("Session expired. Please sign in again.", { duration: 4000 });
      setTimeout(() => signOut({ callbackUrl: "/login" }), 1500);
    }, msUntilEnd);

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (warnTimerRef.current)   clearTimeout(warnTimerRef.current);
    };
  }, [session, status, pathname]);

  return null;
}
