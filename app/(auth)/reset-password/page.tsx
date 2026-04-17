"use client";
import TPLogo from "@/components/ui/tp-logo";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("userId") || "";
  const email = params.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) { toast.error("Enter the 6-digit code"); return; }
    if (newPassword.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        toast.success("Password reset successfully!");
        setTimeout(() => router.push("/login"), 2500);
      } else {
        toast.error(data.error || "Reset failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Invalid reset link.</p>
        <Link href="/forgot-password" className="text-amber-600 font-semibold hover:underline">Request a new code</Link>
      </div>
    );
  }

  return done ? (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-2">Password Reset!</h3>
      <p className="text-gray-500 text-sm">Redirecting to login…</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-5">
      {email && (
        <p className="text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
          Reset code sent to <span className="font-semibold text-gray-700">{email}</span>
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">6-Digit Reset Code</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Enter 6-digit code"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 text-sm text-center tracking-widest text-lg font-mono"
          maxLength={6}
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Min 8 characters"
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 text-sm"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-100 text-sm ${
              confirmPassword && confirmPassword !== newPassword ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
          />
        </div>
        {confirmPassword && confirmPassword !== newPassword && (
          <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-yellow-800 transition-all shadow-lg shadow-amber-200 disabled:opacity-50"
      >
        {loading ? "Resetting…" : "Reset Password"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Didn't get the code?{" "}
        <Link href="/forgot-password" className="text-amber-600 font-semibold hover:underline">Request again</Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <TPLogo size={40} />
            <span className="font-bold text-2xl text-gray-900">TechPro<span className="text-amber-600">wexa</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Set a new password</h1>
          <p className="text-gray-500 mt-1">Enter the code we sent you and choose a new password.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading…</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
