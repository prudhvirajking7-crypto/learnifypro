import Link from "next/link";
import { Shield, FileText } from "lucide-react";

const TOC = [
  { id: "information-we-collect", label: "1. Information We Collect" },
  { id: "how-we-use", label: "2. How We Use Your Information" },
  { id: "information-sharing", label: "3. Information Sharing" },
  { id: "cookies", label: "4. Cookies" },
  { id: "data-security", label: "5. Data Security" },
  { id: "your-rights", label: "6. Your Rights" },
  { id: "childrens-privacy", label: "7. Children's Privacy" },
  { id: "changes", label: "8. Changes to This Policy" },
  { id: "contact-us", label: "9. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <main className="pt-20">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-amber-950 to-stone-900 py-24 overflow-hidden">
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Shield className="w-4 h-4 text-yellow-400" />
            Legal
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Privacy{" "}
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

      {/* ── Body ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-12 items-start">
            {/* Table of Contents */}
            <aside className="lg:col-span-1 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                    Contents
                  </h2>
                </div>
                <ul className="space-y-2">
                  {TOC.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className="text-sm text-gray-600 hover:text-amber-700 transition-colors block py-0.5 leading-snug"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Intro */}
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8">
                <p className="text-gray-600 leading-relaxed">
                  TechProwexa (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is
                  committed to protecting your personal information. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when you visit our
                  website and use our services. Please read it carefully. By using TechProwexa, you
                  agree to the practices described herein.
                </p>
              </div>

              {/* Section 1 */}
              <div id="information-we-collect" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">1</span>
                  Information We Collect
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                  <p>We collect information you provide directly to us and information collected automatically as you use our platform.</p>
                  <h3 className="font-semibold text-gray-800">1.1 Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li><strong>Account data:</strong> name, email address, password (hashed), and profile picture when you register.</li>
                    <li><strong>Payment data:</strong> billing address and payment method details (processed by Stripe / Razorpay — we do not store full card numbers).</li>
                    <li><strong>Communications:</strong> messages you send to our support team, forum posts, and course reviews.</li>
                    <li><strong>Profile data:</strong> bio, social links, or learning preferences you choose to add.</li>
                  </ul>
                  <h3 className="font-semibold text-gray-800">1.2 Automatically Collected Data</h3>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li><strong>Usage data:</strong> pages visited, videos watched, time spent, and click events.</li>
                    <li><strong>Device data:</strong> IP address, browser type and version, operating system, and screen resolution.</li>
                    <li><strong>Cookie data:</strong> see Section 4 for details.</li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div id="how-we-use" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">2</span>
                  How We Use Your Information
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li>Create and manage your account and authenticate your identity.</li>
                    <li>Process purchases and deliver course access.</li>
                    <li>Personalize your learning feed and recommend courses.</li>
                    <li>Send transactional emails (receipts, password resets, certificate notifications).</li>
                    <li>Send marketing communications where you have opted in (you can opt out at any time).</li>
                    <li>Improve platform features through aggregated analytics.</li>
                    <li>Detect and prevent fraud, abuse, and security incidents.</li>
                    <li>Comply with applicable legal obligations.</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div id="information-sharing" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">3</span>
                  Information Sharing
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>We do not sell your personal information. We share data only in the following circumstances:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li><strong>Service providers:</strong> We share data with vendors who help operate our platform (payment processors, cloud hosting, email delivery, analytics). They are contractually obligated to protect your data.</li>
                    <li><strong>Instructors:</strong> Course instructors see aggregate enrollment data but not your personal contact information.</li>
                    <li><strong>Legal requirements:</strong> We may disclose information if required by law, court order, or to protect rights and safety.</li>
                    <li><strong>Business transfers:</strong> If TechProwexa is acquired or merged, your data may transfer to the successor entity under the same protections.</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div id="cookies" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">4</span>
                  Cookies
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>
                    We use cookies and similar tracking technologies to operate the platform, analyze usage, and improve your experience. You can control cookies through your browser settings. For full details, see our{" "}
                    <Link href="/cookies" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="data-security" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">5</span>
                  Data Security
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>
                    We implement industry-standard safeguards to protect your information, including TLS/HTTPS encryption in transit, bcrypt password hashing, and access controls that limit who can view personal data. However, no method of electronic storage or transmission is 100% secure. We encourage you to use a strong, unique password and to notify us immediately if you suspect unauthorised access.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div id="your-rights" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">6</span>
                  Your Rights
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                    <li><strong>Deletion:</strong> Request deletion of your data, subject to legal retention requirements.</li>
                    <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                    <li><strong>Objection:</strong> Object to processing based on legitimate interests or direct marketing.</li>
                    <li><strong>Withdrawal of consent:</strong> Withdraw consent at any time where processing is consent-based.</li>
                  </ul>
                  <p>
                    To exercise any of these rights, email us at{" "}
                    <a href="mailto:privacy@techprowexa.com" className="text-amber-600 underline underline-offset-2">
                      privacy@techprowexa.com
                    </a>
                    . We will respond within 30 days.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div id="childrens-privacy" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">7</span>
                  Children&apos;s Privacy
                </h2>
                <div className="text-gray-600 leading-relaxed text-sm">
                  <p>
                    TechProwexa is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will delete it without delay.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div id="changes" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">8</span>
                  Changes to This Policy
                </h2>
                <div className="text-gray-600 leading-relaxed text-sm">
                  <p>
                    We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email or by displaying a prominent notice on our platform prior to the change becoming effective. The &ldquo;Last updated&rdquo; date at the top of this page indicates when the most recent revision was made. Continued use of TechProwexa after changes take effect constitutes your acceptance of the revised policy.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div id="contact-us" className="bg-white rounded-2xl shadow-lg border border-amber-100 p-8 scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">9</span>
                  Contact Us
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                  <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 space-y-1">
                    <p className="font-semibold text-gray-800">TechProwexa — Privacy Team</p>
                    <p>
                      Email:{" "}
                      <a href="mailto:privacy@techprowexa.com" className="text-amber-600 underline underline-offset-2">
                        privacy@techprowexa.com
                      </a>
                    </p>
                    <p>Address: Bengaluru, Karnataka, India</p>
                  </div>
                  <p>
                    You may also use our{" "}
                    <Link href="/contact" className="text-amber-600 underline underline-offset-2 hover:text-amber-700">
                      contact form
                    </Link>{" "}
                    for general enquiries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
