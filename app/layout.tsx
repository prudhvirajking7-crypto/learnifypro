import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/providers/session-provider";
import ConditionalLayout from "@/components/providers/conditional-layout";
import SessionGuard from "@/components/providers/session-guard";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechProwexa | Career-Focused Learning Platform",
  description: "TechProwexa helps ambitious learners build job-ready skills with expert-led courses, real projects, and flexible learning paths.",
  keywords: "TechProwexa, online learning, career education, web development, data science, project based learning",
  openGraph: {
    title: "TechProwexa | Career-Focused Learning Platform",
    description: "Build practical skills with expert-led courses, project-based training, and a platform designed for real career outcomes.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <SessionProvider session={session}>
          <SessionGuard />
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
              success: { iconTheme: { primary: "#d97706", secondary: "#fff" } },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
