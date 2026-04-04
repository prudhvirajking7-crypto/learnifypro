"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, BookOpen, Users, BarChart3,
  LogOut, ChevronLeft, ChevronRight, GraduationCap, ShieldCheck,
  Eye, PlusCircle, Briefcase, Handshake, FileText,
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
  const pathname = usePathname();
  const nav = role === "ADMIN" ? ADMIN_NAV : INSTRUCTOR_NAV;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      className={`flex flex-col h-full transition-all duration-300 shrink-0 ${collapsed ? "w-16" : "w-60"}`}
      style={{
        background: "linear-gradient(180deg, #1a1205 0%, #1e1508 50%, #241a08 100%)",
        borderRight: "1px solid rgba(245,158,11,0.15)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4" style={{ borderBottom: "1px solid rgba(245,158,11,0.15)" }}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">LearnifyPro</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-amber-600/60 hover:text-amber-300 hover:bg-amber-500/10 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border"
            style={{ background: "rgba(245,158,11,0.12)", borderColor: "rgba(245,158,11,0.25)" }}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-amber-400">{role === "ADMIN" ? "Administrator" : "Instructor"}</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "text-amber-400 border-l-[3px] border-amber-500 pl-[9px]"
                  : "text-amber-200/50 hover:text-amber-300"
              }`}
              style={
                active
                  ? { background: "rgba(245,158,11,0.15)", borderColor: "rgba(245,158,11,0.25)" }
                  : undefined
              }
              onMouseEnter={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.08)";
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.background = "";
              }}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? "text-amber-400" : "text-amber-600/60 group-hover:text-amber-300"}`} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}

        {role === "ADMIN" && !collapsed && (
          <>
            <div className="pt-3 pb-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider px-3" style={{ color: "rgba(217,119,6,0.6)" }}>Quick Actions</p>
            </div>
            <Link href="/admin/courses/new"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-200/50 hover:text-amber-300 transition-all"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
            >
              <PlusCircle className="w-4 h-4 text-amber-600/60 shrink-0" />
              New Course
            </Link>
            <Link href="/" target="_blank"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-200/50 hover:text-amber-300 transition-all"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(245,158,11,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
            >
              <Eye className="w-4 h-4 text-amber-600/60 shrink-0" />
              View Site
            </Link>
          </>
        )}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 space-y-2" style={{ borderTop: "1px solid rgba(245,158,11,0.15)" }}>
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)" }}>
            {user?.image ? (
              <img src={user.image} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0] || "A"}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-amber-100 text-xs font-semibold truncate">{user?.name}</p>
              <p className="text-amber-600/60 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-amber-200/50 hover:text-amber-300 hover:bg-amber-500/10 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
