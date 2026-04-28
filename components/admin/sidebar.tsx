"use client";

import BrandLockup from "@/components/ui/brand-lockup";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, BookOpen, Users, BarChart3,
  LogOut, ChevronLeft, ChevronRight, ShieldCheck,
  Eye, PlusCircle, Briefcase, Handshake, FileText,
  Menu, X,
} from "lucide-react";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Partners", href: "/admin/partners", icon: Handshake },
  { label: "Page Content", href: "/admin/content", icon: FileText },
];

const INSTRUCTOR_NAV = [
  { label: "Dashboard", href: "/instructor", icon: LayoutDashboard, exact: true },
  { label: "My Courses", href: "/instructor/courses", icon: BookOpen },
  { label: "Students", href: "/instructor/students", icon: Users },
];

export default function AdminSidebar({ role, user }: { role: "ADMIN" | "INSTRUCTOR"; user: any }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const nav = role === "ADMIN" ? ADMIN_NAV : INSTRUCTOR_NAV;
  const panelLabel = role === "ADMIN" ? "Admin Panel" : "Instructor Studio";

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const closeMobile = () => setMobileOpen(false);

  const sidebar = (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 shrink-0 flex-col transition-all duration-300 lg:relative lg:z-auto lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } ${collapsed ? "lg:w-[76px]" : "lg:w-64"}`}
      style={{
        background: "linear-gradient(180deg, #120f0b 0%, #19130b 48%, #211609 100%)",
        borderRight: "1px solid rgba(245,158,11,0.16)",
        boxShadow: "18px 0 44px rgba(0,0,0,0.22)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: "1px solid rgba(245,158,11,0.15)" }}>
        {!collapsed && (
          <Link href="/" onClick={closeMobile} className="min-w-0">
            <BrandLockup size={32} theme="light" compact />
          </Link>
        )}
        {collapsed && (
          <Link href="/" onClick={closeMobile} className="hidden lg:inline-flex">
            <BrandLockup size={34} theme="light" compact className="[&>div:last-child]:hidden" />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto hidden rounded-lg p-1.5 text-amber-600/70 transition-colors hover:bg-amber-500/10 hover:text-amber-300 lg:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <button
          onClick={closeMobile}
          className="rounded-lg p-1.5 text-amber-100/70 transition-colors hover:bg-amber-500/10 hover:text-white lg:hidden"
          aria-label="Close panel menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-4 py-3">
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${collapsed ? "lg:justify-center lg:px-2" : ""}`}
          style={{ background: "rgba(245,158,11,0.11)", borderColor: "rgba(245,158,11,0.24)" }}
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" />
          {!collapsed && <span className="text-xs font-semibold text-amber-300">{panelLabel}</span>}
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {nav.map(({ label, href, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={closeMobile}
              title={collapsed ? label : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                collapsed ? "lg:justify-center" : ""
              } ${
                active
                  ? "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/20"
                  : "text-amber-100/55 hover:bg-amber-500/10 hover:text-amber-200"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-amber-300" : "text-amber-600/70 group-hover:text-amber-300"}`} />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}

        {role === "ADMIN" && (
          <div className="pt-3">
            {!collapsed && (
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-600/70">Quick Actions</p>
            )}
            <Link
              href="/admin/courses/new"
              onClick={closeMobile}
              title={collapsed ? "New Course" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-amber-100/55 transition-all hover:bg-amber-500/10 hover:text-amber-200 ${
                collapsed ? "lg:justify-center" : ""
              }`}
            >
              <PlusCircle className="h-4 w-4 shrink-0 text-amber-600/70 group-hover:text-amber-300" />
              {!collapsed && "New Course"}
            </Link>
            <Link
              href="/"
              target="_blank"
              onClick={closeMobile}
              title={collapsed ? "View Site" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-amber-100/55 transition-all hover:bg-amber-500/10 hover:text-amber-200 ${
                collapsed ? "lg:justify-center" : ""
              }`}
            >
              <Eye className="h-4 w-4 shrink-0 text-amber-600/70 group-hover:text-amber-300" />
              {!collapsed && "View Site"}
            </Link>
          </div>
        )}
      </nav>

      <div className="space-y-2 px-3 py-4" style={{ borderTop: "1px solid rgba(245,158,11,0.15)" }}>
        {!collapsed && (
          <div className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)" }}>
            {user?.image ? (
              <img src={user.image} alt={user.name || "User"} className="h-8 w-8 rounded-lg object-cover" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-xs font-bold text-white">
                {getInitials(user?.name || user?.email || "TP")}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-amber-100">{user?.name || "TechProwexa user"}</p>
              <p className="truncate text-[10px] text-amber-600/70">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-amber-100/55 transition-all hover:bg-amber-500/10 hover:text-amber-200 ${
            collapsed ? "lg:justify-center" : ""
          }`}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-amber-500/15 bg-[#120f0b]/95 px-4 backdrop-blur-xl lg:hidden">
        <Link href="/" className="min-w-0">
          <BrandLockup size={32} theme="light" compact />
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-amber-100"
          aria-label="Open panel menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
          aria-label="Close panel menu overlay"
        />
      )}
      {sidebar}
    </>
  );
}
