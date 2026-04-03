"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart, Tag, ArrowRight, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<"stripe" | "razorpay" | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (res.ok) setCartItems(data.cartItems || []);
    } catch {} finally { setLoading(false); }
  };

  const removeItem = async (courseId: string) => {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    setCartItems(cartItems.filter(item => item.courseId !== courseId));
    toast.success("Removed from cart");
  };

  const total = cartItems.reduce((sum, item) => sum + (item.course.discountPrice || item.course.price), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + item.course.price, 0);
  const savings = originalTotal - total;
  const courseIds = cartItems.map(item => item.courseId);

  const handleStripeCheckout = async () => {
    setCheckoutLoading("stripe");
    try {
      const res = await fetch("/api/payment/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseIds }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Checkout failed"); return; }
      if (data.url) window.location.href = data.url;
      else toast.error("Checkout failed");
    } catch { toast.error("Checkout failed"); } finally { setCheckoutLoading(null); }
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
    setCheckoutLoading("razorpay");
    try {
      const res = await fetch("/api/payment/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseIds }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Payment initialization failed"); setCheckoutLoading(null); return; }

      await loadRazorpayScript();

      const rzp = new (window as any).Razorpay({
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "LearnifyPro",
        description: `${cartItems.length} Course(s)`,
        order_id: data.orderId,
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payment/razorpay-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (verifyRes.ok) {
            toast.success("Payment successful! Redirecting...");
            window.location.href = "/dashboard/my-learning";
          } else {
            const vData = await verifyRes.json();
            toast.error(vData.error || "Payment verification failed");
            setCheckoutLoading(null);
          }
        },
        prefill: { name: "", email: "" },
        theme: { color: "#7c3aed" },
        modal: {
          ondismiss: () => {
            setCheckoutLoading(null);
            toast.error("Payment cancelled");
          },
        },
      });
      setCheckoutLoading(null);
      rzp.open();
    } catch { toast.error("Checkout failed"); setCheckoutLoading(null); }
  };

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-500 mb-8">{cartItems.length} course{cartItems.length !== 1 ? "s" : ""} in cart</p>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some courses to get started!</p>
            <Link href="/courses" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4">
                  <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-100 overflow-hidden shrink-0">
                    {item.course.thumbnail ? (
                      <img src={item.course.thumbnail} alt={item.course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-amber-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/courses/${item.courseId}`} className="font-semibold text-gray-900 text-sm hover:text-amber-600 line-clamp-2">{item.course.title}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">By {item.course.instructor.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-gray-900">{formatPrice(item.course.discountPrice || item.course.price)}</div>
                    {item.course.discountPrice && (
                      <div className="text-xs text-gray-400 line-through">{formatPrice(item.course.price)}</div>
                    )}
                    <button onClick={() => removeItem(item.courseId)} className="mt-2 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm"><span className="text-gray-600">Original Price</span><span>{formatPrice(originalTotal)}</span></div>
                  {savings > 0 && <div className="flex justify-between text-sm text-green-600"><span>Discounts</span><span>-{formatPrice(savings)}</span></div>}
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-4 mb-6">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleRazorpayCheckout}
                    disabled={!!checkoutLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-yellow-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {checkoutLoading === "razorpay" ? "Loading..." : "Checkout with UPI / Cards"}
                    {checkoutLoading !== "razorpay" && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleStripeCheckout}
                    disabled={!!checkoutLoading}
                    className="w-full py-3 border-2 border-amber-600 text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-all disabled:opacity-50"
                  >
                    {checkoutLoading === "stripe" ? "Loading..." : "Pay with Stripe"}
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <Tag className="w-4 h-4" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
