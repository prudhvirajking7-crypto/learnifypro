import Link from "next/link";
import { Cookie, ShieldCheck, Settings, BarChart2, Target, Sliders } from "lucide-react";

const COOKIE_TABLE = [
  {
    name: "lp_session",
    purpose: "Maintains your login session and authentication state.",
    duration: "Session",
    type: "Essential",
  },
  {
    name: "lp_csrf",
    purpose: "Protects against cross-site request forgery attacks.",
    duration: "Session",
    type: "Essential",
  },
  {
    name: "_ga",
    purpose: "Distinguishes unique users for Google Analytics traffic analysis.",
    duration: "2 years",
    type: "Analytics",
  },
  {
    name: "_gid",
    purpose: "Stores and updates page view counts on each visit.",
    duration: "24 hours",
    type: "Analytics",
  },
  {
    name: "lp_prefs",
    purpose: "Remembers your display preferences such as theme and language.",
    duration: "1 year",
    type: "Preferences",
  },
  {
    name: "lp_utm",
    purpose: "Tracks marketing campaign source to measure ad effectiveness.",
    duration: "30 days",
    type: "Marketing",
  },
];

const CATEGORIES = [
  {
    icon: ShieldCheck,
    name: "Essential",
    color: "text-green-700",
    bg: "bg-green-100",
    badge: "bg-green-100 text-green-700",
    desc: "These cookies are strictly necessary for the website to function. They cannot be disabled. They enable core features like authentication and security.",
  },
  {
    icon: BarChart2,
    name: "Analytics",
    color: "text-blue-700",
    bg: "bg-blue-100",
    badge: "bg-blue-100 text-blue-700",
    desc: "These cookies help us understand how visitors interact with our site by collecting anonymous data. This helps us improve the platform experience.",
  },
  {
    icon: Target,
    name: "Marketing",
    color: "text-pink-700",
    bg: "bg-pink-100",
    badge: "bg-pink-100 text-pink-700",
    desc: "Marketing cookies track your visits across websites to deliver relevant advertisements and measure campaign performance.",
  },
  {
    icon: Sliders,
    name: "Preferences",
    color: "text-amber-700",
    bg: "bg-amber-100",
    badge: "bg-amber-100 text-amber-700",
    desc: "Preference cookies remember your settings and choices — such as language or theme — to personalise your experience on return visits.",
  },
];

const TYPE_BADGE: Record<string, string> = {
  Essential: "bg-green-100 text-green-700",
  Analytics: "bg-blue-100 text-blue-700",
  Marketing: "bg-pink-100 text-pink-700",
  Preferences: "bg-amber-100 text-amber-700",
};

const BROWSERS = [
  {
    name: "Google Chrome",
    steps: "Settings → Privacy and security → Cookies and other site data",
  },
  {
    name: "Mozilla Firefox",
    steps: "Options → Privacy & Security → Cookies and Site Data",
  },
  {
    name: "Safari",
    steps: "Preferences → Privacy → Manage Website Data",
  },
  {
    name: "Microsoft Edge",
    steps: "Settings → Cookies and site permissions → Cookies and site data",
  },
];

export default function CookiesPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-24 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Cookie className="w-4 h-4 text-yellow-400" />
            Legal
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Cookie{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Policy
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Last updated:{" "}
            <span className="text-amber-300 font-semibold">January 1, 2025</span>
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          {/* What are cookies */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed text-sm mb-4">
              Cookies are small text files that are placed on your device (computer, phone, or tablet) by websites you visit. They are widely used to make websites work, improve efficiency, and provide information to site owners.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              Cookies can be &ldquo;persistent&rdquo; (they remain on your device for a specified period or until you delete them) or &ldquo;session&rdquo; cookies (they are deleted as soon as you close your browser). This policy explains which cookies TechProwexa uses and why.
            </p>
          </div>

          {/* Cookie Categories */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Categories</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {CATEGORIES.map(({ icon: Icon, name, color, bg, desc }) => (
                <div key={name} className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 flex gap-4 items-start">
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-base mb-2 ${color}`}>{name} Cookies</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cookie Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cookies We Use</h2>
            <p className="text-gray-500 text-sm mb-6">
              The table below lists the specific cookies set by TechProwexa.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b-2 border-amber-100">
                    <th className="pb-3 pr-4 font-semibold text-gray-700">Cookie Name</th>
                    <th className="pb-3 pr-4 font-semibold text-gray-700">Purpose</th>
                    <th className="pb-3 pr-4 font-semibold text-gray-700 whitespace-nowrap">Duration</th>
                    <th className="pb-3 font-semibold text-gray-700">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {COOKIE_TABLE.map((row) => (
                    <tr key={row.name} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-4 pr-4 font-mono text-xs font-semibold text-gray-800 whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="py-4 pr-4 text-gray-600 leading-relaxed">{row.purpose}</td>
                      <td className="py-4 pr-4 text-gray-600 whitespace-nowrap">{row.duration}</td>
                      <td className="py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_BADGE[row.type]}`}>
                          {row.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Control Cookies */}
          <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Settings className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How to Control Cookies</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              You can control and/or delete cookies at any time. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, some services and functionality of the website may not work.
            </p>
            <p className="text-gray-600 text-sm mb-5 font-medium">Browser cookie settings:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {BROWSERS.map(({ name, steps }) => (
                <div key={name} className="bg-amber-50 rounded-xl border border-amber-100 p-4">
                  <p className="font-semibold text-gray-800 text-sm mb-1">{name}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{steps}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-5">
              Note: disabling cookies labelled <span className="font-semibold text-gray-700">Essential</span> will affect your ability to log in and use core platform features.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Questions?</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@learnifypro.com" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">
                privacy@learnifypro.com
              </a>{" "}
              or visit our{" "}
              <Link href="/privacy" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
