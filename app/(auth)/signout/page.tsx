"use client";
import TPLogo from "@/components/ui/tp-logo";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0d0900 0%, #1a1200 50%, #0a0600 100%)" }}>
      <div className="text-center px-8 py-12 rounded-3xl border border-amber-800/30 max-w-sm w-full mx-4"
        style={{ background: "rgba(255,191,36,0.04)", backdropFilter: "blur(20px)" }}>
        <div className="flex justify-center mb-6">
          <TPLogo size={64} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Sign Out</h1>
        <p className="text-amber-200/60 mb-8">Are you sure you want to sign out of TechProwexa?</p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", boxShadow: "0 4px 16px rgba(245,158,11,0.35)" }}
        >
          <LogOut className="w-4 h-4" /> Yes, Sign Out
        </button>
        <button
          onClick={() => window.history.back()}
          className="w-full mt-3 py-3 rounded-xl text-amber-400/80 text-sm font-medium hover:text-amber-300 hover:bg-amber-500/8 transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
