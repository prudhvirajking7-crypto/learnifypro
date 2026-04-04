import Link from "next/link";
import {
  BookOpen,
  CreditCard,
  Award,
  Monitor,
  RefreshCw,
  Search,
  HelpCircle,
  MessageCircle,
  PlayCircle,
  UserCircle,
} from "lucide-react";

const TOPICS = [
  {
    icon: BookOpen,
    title: "Getting Started",
    desc: "New to LearnifyPro? Learn how to create an account, browse courses, and enroll in minutes.",
    href: "#getting-started",
  },
  {
    icon: CreditCard,
    title: "Account & Billing",
    desc: "Manage your subscription, update payment methods, and review past transactions.",
    href: "#account-billing",
  },
  {
    icon: PlayCircle,
    title: "Courses",
    desc: "Learn how to access course materials, track progress, and pick up where you left off.",
    href: "#courses",
  },
  {
    icon: Award,
    title: "Certificates",
    desc: "Understand how to earn, download, and share your completion certificates.",
    href: "#certificates",
  },
  {
    icon: Monitor,
    title: "Technical Issues",
    desc: "Troubleshoot video playback, browser compatibility, and app performance issues.",
    href: "#technical",
  },
  {
    icon: RefreshCw,
    title: "Refunds",
    desc: "Review our refund policy and learn how to submit a refund request for eligible courses.",
    href: "#refunds",
  },
];

const FAQS = [
  {
    id: "faq-1",
    question: "How do I enroll in a course?",
    answer:
      "Browse our course catalog at /courses, click on any course you're interested in, then click the 'Enroll Now' button. If the course is paid, you'll be taken to the checkout page. Once payment is confirmed, the course is immediately accessible from your dashboard.",
  },
  {
    id: "faq-2",
    question: "Can I access my courses on mobile?",
    answer:
      "Yes. LearnifyPro is fully responsive and works on any modern smartphone or tablet browser. Simply visit learnifypro.com from your mobile browser and log in. We are also working on native iOS and Android apps.",
  },
  {
    id: "faq-3",
    question: "How long do I have access to a course after enrolling?",
    answer:
      "Once you enroll in a course, you have lifetime access to all its content including any future updates the instructor adds. You can learn at your own pace without any expiry pressure.",
  },
  {
    id: "faq-4",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex) as well as UPI, net banking, and wallets via Razorpay for Indian customers. International payments are processed securely through Stripe.",
  },
  {
    id: "faq-5",
    question: "How do I download my certificate of completion?",
    answer:
      "Once you complete all required lessons and any final assessments in a course, a certificate is automatically generated. Navigate to My Learning in your dashboard, open the completed course, and click 'Download Certificate'. You can also share it directly to LinkedIn.",
  },
  {
    id: "faq-6",
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all courses. If you're unsatisfied for any reason, contact support@learnifypro.com within 30 days of purchase with your order details. Refunds are processed to the original payment method within 5–7 business days.",
  },
];

export default function HelpPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-28 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <HelpCircle className="w-4 h-4 text-yellow-400" />
            Help Center
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            How can we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              help you?
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-xl mx-auto mb-10">
            Search our knowledge base or browse popular topics below to find the answers you need.
          </p>
          {/* Decorative search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles…"
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-base"
              readOnly
            />
          </div>
        </div>
      </section>

      {/* ── Popular Topics ───────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Browse Topics</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">Popular Help Topics</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Find answers to the most common questions our learners ask.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map(({ icon: Icon, title, desc, href }) => (
              <a
                key={title}
                href={href}
                className="bg-white rounded-2xl p-7 border border-amber-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block"
              >
                <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-5 group-hover:from-amber-200 group-hover:to-yellow-200 transition-colors">
                  <Icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Accordion ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-3">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-3">
              Quick answers to the questions we hear most often.
            </p>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ id, question, answer }) => (
              <details
                key={id}
                className="group bg-white border border-amber-100 rounded-2xl shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none font-semibold text-gray-800 hover:text-amber-700 transition-colors">
                  <span>{question}</span>
                  <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1 text-gray-600 leading-relaxed text-sm border-t border-amber-50">
                  {answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Still Need Help ──────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-yellow-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <MessageCircle className="w-12 h-12 text-amber-200 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
          <p className="text-amber-200 text-lg mb-10 max-w-xl mx-auto">
            Our support team is available Monday–Friday, 9 AM–6 PM IST. We typically respond within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-amber-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@learnifypro.com"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
