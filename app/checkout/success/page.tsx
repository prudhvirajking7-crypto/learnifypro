import Link from "next/link";
import { CheckCircle, BookOpen, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-50 pt-20 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
          <p className="text-gray-500 mb-8">
            Your payment was processed successfully. You now have access to your courses. Happy learning! 🎉
          </p>
          <div className="space-y-3">
            <Link href="/dashboard/my-learning" className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-600 to-yellow-700 text-white font-bold rounded-xl hover:from-amber-700 hover:to-yellow-800 transition-all">
              <BookOpen className="w-4 h-4" />
              Start Learning Now
            </Link>
            <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-amber-300 transition-all">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
