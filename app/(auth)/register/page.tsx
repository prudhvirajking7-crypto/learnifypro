"use client";
import TPLogo from "@/components/ui/tp-logo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
type RegisterForm = z.infer<typeof registerSchema>;

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["bg-red-400", "bg-yellow-400", "bg-green-500"];
  if (!password) return null;
  return (
    <div className="mt-1.5">
      <div className="flex gap-1 mb-1">
        {[0,1,2].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < score ? colors[score - 1] : "bg-gray-200"}`} />
        ))}
      </div>
      <div className="flex gap-2">
        {checks.map((c) => (
          <span key={c.label} className={`text-xs flex items-center gap-0.5 ${c.ok ? "text-green-600" : "text-gray-400"}`}>
            <CheckCircle className="w-3 h-3" /> {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Registration failed.");
      } else {
        router.push(`/verify-otp?userId=${result.userId}&email=${encodeURIComponent(data.email)}`);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-amber-50 via-white to-yellow-50 overflow-hidden">
      {/* Top nav strip */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-3 shrink-0">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-amber-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>
        <p className="text-sm text-gray-500">
          Have an account?{" "}
          <Link href="/login" className="text-amber-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center px-4 overflow-y-auto py-2">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-4">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <TPLogo size={36} />
              <span className="font-bold text-xl text-gray-900">TechPro<span className="text-amber-600">wexa</span></span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-500 text-sm mt-0.5">Start learning today — it&apos;s free!</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-5">
            {/* Google */}
            <button
              onClick={() => { setGoogleLoading(true); signIn("google", { callbackUrl: "/dashboard" }); }}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all font-medium text-gray-700 text-sm mb-3 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Redirecting..." : "Sign up with Google"}
            </button>

            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-gray-400">or register with email</span></div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-xl mb-2 text-xs text-red-600">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input {...register("name")} placeholder="John Doe" className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 text-sm" />
                </div>
                {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input {...register("email")} type="email" placeholder="you@example.com" className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 text-sm" />
                </div>
                {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Create a strong password" className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 text-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <PasswordStrength password={password} />
                {errors.password && <p className="mt-0.5 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input {...register("confirmPassword")} type={showPassword ? "text" : "password"} placeholder="Confirm your password" className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 text-sm" />
                </div>
                {errors.confirmPassword && <p className="mt-0.5 text-xs text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              <p className="text-xs text-gray-400">By signing up, you agree to our <Link href="#" className="text-amber-600 hover:underline">Terms</Link> and <Link href="#" className="text-amber-600 hover:underline">Privacy Policy</Link>.</p>

              <button type="submit" disabled={isLoading} className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-yellow-800 transition-all shadow-md shadow-amber-200 disabled:opacity-50 text-sm">
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-3">
              Already have an account?{" "}
              <Link href="/login" className="text-amber-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
