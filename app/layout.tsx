import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/providers/session-provider";
import ConditionalLayout from "@/components/providers/conditional-layout";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnifyPro - World Class Learning Platform",
  description: "Learn from industry experts. 1000+ courses in web development, data science, design, business and more. Start learning today.",
  keywords: "online learning, courses, education, web development, data science",
  openGraph: {
    title: "LearnifyPro - World Class Learning Platform",
    description: "Learn from industry experts. Start your learning journey today.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ConditionalLayout navbar={<Navbar />} footer={<Footer />}>
          {children}
          </ConditionalLayout>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1f2937",
                color: "#f9fafb",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#7c3aed", secondary: "#fff" } },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
