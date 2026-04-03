"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Zap, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

interface EnrollButtonProps {
  course: { id: string; title: string; price: number; discountPrice?: number | null; slug: string };
  session: any;
}

export default function EnrollButton({ course, session }: EnrollButtonProps) {
  const router = useRouter();
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingStripe, setLoadingStripe] = useState(false);
  const [loadingRazorpay, setLoadingRazorpay] = useState(false);

  if (!session) {
    return (
      <button
        onClick={() => router.push(`/login?callbackUrl=/courses/${course.slug}`)}
        className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-yellow-800 transition-all shadow-lg"
      >
        Enroll Now
      </button>
    );
  }

  const handleAddToCart = async () => {
    setLoadingCart(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Added to cart!");
        router.push("/cart");
      } else {
        toast.error(data.error || "Failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoadingCart(false);
    }
  };

  const handleStripeCheckout = async () => {
    setLoadingStripe(true);
    try {
      const res = await fetch("/api/payment/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseIds: [course.id] }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Payment initialization failed"); return; }
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Payment initialization failed");
      }
    } catch {
      toast.error("Payment failed");
    } finally {
      setLoadingStripe(false);
    }
  };

  const loadRazorpayScript = (): Promise<void> =>
    new Promise((resolve) => {
      if ((window as any).Razorpay) { resolve(); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });

  const handleRazorpayCheckout = async () => {
    setLoadingRazorpay(true);
    try {
      const res = await fetch("/api/payment/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseIds: [course.id] }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Payment initialization failed"); setLoadingRazorpay(false); return; }

      await loadRazorpayScript();

      const rzp = new (window as any).Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "LearnifyPro",
        description: course.title,
        order_id: data.orderId,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payment/razorpay-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            toast.success("Payment successful!");
            router.push("/dashboard/my-learning");
          } else {
            toast.error(verifyData.error || "Payment verification failed");
            setLoadingRazorpay(false);
          }
        },
        prefill: {
          name: session?.user?.name || "",
          email: session?.user?.email || "",
        },
        theme: { color: "#7c3aed" },
        modal: {
          ondismiss: () => {
            setLoadingRazorpay(false);
            toast.error("Payment cancelled");
          },
        },
      });
      setLoadingRazorpay(false);
      rzp.open();
    } catch {
      toast.error("Payment failed");
      setLoadingRazorpay(false);
    }
  };

  const isFree = course.price === 0;

  if (isFree) {
    return (
      <button
        onClick={async () => {
          const res = await fetch("/api/enrollment/free", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: course.id }),
          });
          if (res.ok) {
            toast.success("Enrolled successfully!");
            router.push(`/courses/${course.slug}/learn`);
          }
        }}
        className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg"
      >
        Enroll for Free
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleRazorpayCheckout}
        disabled={loadingRazorpay}
        className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-yellow-800 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" />
        {loadingRazorpay ? "Loading..." : "Buy Now (UPI / Cards)"}
      </button>
      <button
        onClick={handleStripeCheckout}
        disabled={loadingStripe}
        className="w-full py-3.5 bg-white border-2 border-amber-600 text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 11h18v2H3zm0-4h18v2H3zm0 8h18v2H3z"/></svg>
        {loadingStripe ? "Loading..." : "Pay with Card (Stripe)"}
      </button>
      <button
        onClick={handleAddToCart}
        disabled={loadingCart}
        className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        {loadingCart ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
