"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Search, ShoppingCart, Menu, X, BookOpen, ChevronDown,
  LogOut, User, LayoutDashboard, Code2,
  BarChart3, Smartphone, Palette, Briefcase, Megaphone,
  DollarSign, Wrench, ShieldCheck, PenSquare,
} from "lucide-react";
import { getInitials } from "@/lib/utils";

const CATEGORIES = [
  { name: "Web Development",   slug: "web-development",    icon: Code2 },
  { name: "Data Science",      slug: "data-science",       icon: BarChart3 },
  { name: "Mobile Dev",        slug: "mobile-development", icon: Smartphone },
  { name: "Design",            slug: "design",             icon: Palette },
  { name: "Business",          slug: "business",           icon: Briefcase },
  { name: "Marketing",         slug: "marketing",          icon: Megaphone },
  { name: "Finance",           slug: "finance",            icon: DollarSign },
  { name: "IT & Software",     slug: "it-software",        icon: Wrench },
];

/** 3D tilt on a single category row item */
function CatItem({ name, slug, icon: Icon, onClick }: {
  name: string; slug: string; icon: React.ElementType; onClick: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, z: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - r.top)  / r.height - 0.5) * 12;
    const y = ((e.clientX - r.left) / r.width  - 0.5) * -12;
    setTilt({ x, y, z: 1 });
  };

  return (
    <Link
      href={`/courses?category=${slug}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0, z: 0 }); }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 transition-colors duration-150"
      style={{
        transform: hovered
          ? `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(6px) scale(1.03)`
          : "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
        transition: hovered ? "transform 0.05s linear" : "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        background: hovered ? "rgba(251,191,36,0.08)" : "transparent",
        boxShadow: hovered ? "0 4px 16px rgba(217,119,6,0.12)" : "none",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
        style={{
          background: hovered ? "linear-gradient(135deg,#fef3c7,#fde68a)" : "#fef9ee",
          boxShadow: hovered ? "0 4px 12px rgba(217,119,6,0.25),inset 0 1px 0 rgba(255,255,255,0.8)" : "0 2px 6px rgba(217,119,6,0.12)",
          transform: hovered ? "translateZ(4px) scale(1.1) rotate(-4deg)" : "none",
        }}
      >
        <Icon className="w-4 h-4 text-amber-600" />
      </div>
      <span className="font-medium leading-tight" style={{ color: hovered ? "#b45309" : "#374151" }}>
        {name}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState("");
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCatOpen, setIsCatOpen]         = useState(false);
  const [cartCount, setCartCount]         = useState(0);
  const profileRef  = useRef<HTMLDivElement>(null);
  const catRef      = useRef<HTMLDivElement>(null);
  const catCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/cart")
        .then((r) => r.json())
        .then((d) => setCartCount(d.cartItems?.length || 0))
        .catch(() => {});
    }
  }, [session]);

  // Hover-open / delayed-close for categories
  const openCat  = useCallback(() => {
    if (catCloseRef.current) clearTimeout(catCloseRef.current);
    setIsCatOpen(true);
  }, []);
  const closeCat = useCallback(() => {
    catCloseRef.current = setTimeout(() => setIsCatOpen(false), 180);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const closeAll = () => { setIsMenuOpen(false); setIsProfileOpen(false); setIsCatOpen(false); };

  return (
    <>
      <div className="h-16" />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-white/30 shadow-[0_4px_24px_rgba(0,0,0,0.10),0_1px_4px_rgba(0,0,0,0.06)]"
            : "bg-white/97 border-b border-gray-200/60"
        }`}
      >
        {/* Amber accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500" />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center h-16 gap-2 sm:gap-3">

            {/* ── Logo ──────────────────────────────────── */}
            <Link href="/" onClick={closeAll} className="flex items-center gap-2 shrink-0 group">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all duration-300
                  group-hover:-translate-y-0.5 group-active:translate-y-0 group-active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#f59e0b 0%,#d97706 50%,#b45309 100%)",
                  boxShadow: "0 4px 12px rgba(217,119,6,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                <span className="font-black text-white text-xs leading-none tracking-tight">TP</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-gray-900 hidden sm:block tracking-tight">
                TechPro<span className="text-amber-600">wexa</span>
              </span>
            </Link>

            {/* ── Categories — hover open/close ─────────── */}
            <div
              className="relative hidden lg:block shrink-0"
              ref={catRef}
              onMouseEnter={openCat}
              onMouseLeave={closeCat}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap
                  active:scale-95 active:translate-y-px ${
                  isCatOpen
                    ? "text-amber-600 bg-amber-50 shadow-[inset_0_2px_6px_rgba(217,119,6,0.12)]"
                    : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                }`}
              >
                Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCatOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega-menu */}
              <div
                onMouseEnter={openCat}
                onMouseLeave={closeCat}
                className={`absolute top-full left-0 mt-1 w-[420px] z-50 transition-all duration-300 origin-top-left ${
                  isCatOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
                style={{
                  background: "rgba(255,255,255,0.98)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "18px",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.13), 0 6px 20px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                {/* Glossy top bar */}
                <div className="h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-t-[18px]" />
                <div className="p-3 grid grid-cols-2 gap-1" style={{ perspective: "800px" }}>
                  {CATEGORIES.map((cat) => (
                    <CatItem key={cat.slug} {...cat} onClick={() => setIsCatOpen(false)} />
                  ))}
                </div>
                <div className="px-4 pb-3 pt-1 border-t border-gray-100/80">
                  <Link
                    href="/courses"
                    onClick={() => setIsCatOpen(false)}
                    className="flex items-center justify-center gap-1.5 text-sm font-semibold text-amber-600 py-2 rounded-xl transition-all duration-200
                      hover:bg-amber-50 hover:text-amber-700 active:scale-95"
                  >
                    Browse all courses
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Search bar ─────────────────────────────── */}
            <form onSubmit={handleSearch} className="flex-1 hidden md:block min-w-0">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-amber-500 transition-colors duration-200" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses, topics..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm outline-none transition-all duration-300
                    bg-gray-50 border border-gray-200
                    shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]
                    focus:bg-white focus:border-amber-400
                    focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.03),0_0_0_3px_rgba(245,158,11,0.15),0_2px_8px_rgba(217,119,6,0.08)]"
                />
              </div>
            </form>

            {/* ── Right actions ──────────────────────────── */}
            <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0">

              {/* Cart */}
              {session && (
                <Link href="/cart"
                  className="relative p-2 sm:p-2.5 text-gray-500 rounded-xl transition-all duration-200
                    hover:text-amber-600 hover:bg-amber-50 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(217,119,6,0.15)]
                    active:translate-y-0 active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-amber-500 to-orange-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold shadow-[0_2px_8px_rgba(217,119,6,0.5)]">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Auth */}
              {session ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-1.5 p-1 rounded-xl transition-all duration-200
                      active:scale-95 ${
                      isProfileOpen
                        ? "ring-2 ring-amber-400 ring-offset-1"
                        : "hover:ring-2 hover:ring-amber-200 hover:ring-offset-1"
                    }`}
                  >
                    {session.user?.image ? (
                      <img src={session.user.image} alt={session.user.name || "User"}
                        className="w-8 h-8 rounded-xl object-cover shadow-[0_2px_8px_rgba(0,0,0,0.15)]" />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                        style={{
                          background: "linear-gradient(135deg,#f59e0b,#d97706,#b45309)",
                          boxShadow: "0 4px 12px rgba(217,119,6,0.35)",
                        }}
                      >
                        {getInitials(session.user?.name || session.user?.email || "U")}
                      </div>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div
                    className={`absolute right-0 top-full mt-2 w-56 sm:w-60 z-50 transition-all duration-300 origin-top-right ${
                      isProfileOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                    style={{
                      background: "rgba(255,255,255,0.98)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "16px",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.12),0 4px 16px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-t-2xl" />
                    <div className="px-4 py-3">
                      <p className="font-bold text-sm text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <div className="border-t border-gray-100 py-1.5 px-2">
                      {[
                        ...(session.user?.role === "ADMIN" ? [{ href: "/admin", icon: ShieldCheck, label: "Admin Panel" }] : []),
                        ...(session.user?.role === "INSTRUCTOR" ? [{ href: "/instructor", icon: PenSquare, label: "Instructor Panel" }] : []),
                        { href: "/dashboard",             icon: LayoutDashboard, label: "Dashboard" },
                        { href: "/dashboard/my-learning", icon: BookOpen,        label: "My Learning" },
                        { href: "/profile",               icon: User,            label: "Profile" },
                      ].map(({ href, icon: Icon, label }) => (
                        <Link key={href} href={href} onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-xl transition-all duration-150
                            hover:bg-amber-50 hover:text-amber-700 hover:translate-x-0.5
                            active:scale-95 group/mi"
                        >
                          <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover/mi:bg-amber-100 flex items-center justify-center transition-all duration-150 group-hover/mi:scale-110 group-hover/mi:shadow-[0_2px_8px_rgba(217,119,6,0.2)]">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          {label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 py-1.5 px-2 pb-2">
                      <button onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 rounded-xl transition-all duration-150
                          hover:bg-red-50 hover:translate-x-0.5 active:scale-95 group/mi"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover/mi:bg-red-100 flex items-center justify-center transition-all duration-150 group-hover/mi:scale-110">
                          <LogOut className="w-3.5 h-3.5" />
                        </div>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Log In — desktop only, with animated underline */}
                  <Link href="/login"
                    className="hidden lg:block relative px-4 py-2 text-sm font-medium text-gray-700 rounded-xl overflow-hidden
                      transition-all duration-200 active:scale-95
                      hover:text-amber-700 hover:bg-amber-50/60
                      group"
                  >
                    <span className="relative z-10">Log In</span>
                    {/* Sliding underline */}
                    <span className="absolute bottom-1.5 left-4 right-4 h-[2px] rounded-full bg-amber-500
                      scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    {/* Glow pulse on hover */}
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-r from-amber-50 to-yellow-50" />
                  </Link>

                  {/* Sign Up — 3D press effect */}
                  <Link href="/register"
                    className="relative px-3 sm:px-4 py-2 text-sm font-bold text-white rounded-xl whitespace-nowrap
                      transition-all duration-200
                      hover:-translate-y-0.5
                      active:translate-y-px active:scale-[0.97]"
                    style={{
                      background: "linear-gradient(135deg,#f59e0b 0%,#d97706 50%,#b45309 100%)",
                      boxShadow: "0 4px 12px rgba(217,119,6,0.45), inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 0 rgba(0,0,0,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(217,119,6,0.55), inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 0 rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(217,119,6,0.45), inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 0 rgba(0,0,0,0.1)";
                    }}
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {/* Hamburger */}
              <button
                className="p-2 text-gray-600 rounded-xl lg:hidden transition-all duration-200
                  hover:bg-gray-100 hover:text-gray-900 active:scale-90 active:bg-gray-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className={`transition-all duration-300 ${isMenuOpen ? "rotate-90 scale-90" : ""}`}>
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile / Tablet drawer ─────────────────── */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            background: "rgba(255,255,255,0.98)",
            borderTop: isMenuOpen ? "1px solid rgba(0,0,0,0.06)" : "none",
            boxShadow: isMenuOpen ? "0 16px 40px rgba(0,0,0,0.10)" : "none",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm"
                />
              </div>
            </form>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map(({ name, slug, icon: Icon }) => (
                  <Link key={slug} href={`/courses?category=${slug}`} onClick={closeAll}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl transition-all duration-150
                      hover:bg-amber-50 hover:text-amber-700 active:scale-95"
                  >
                    <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">{name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/courses" onClick={closeAll}
              className="block text-center text-sm font-semibold text-amber-600 py-2.5 rounded-xl border border-amber-200
                hover:bg-amber-50 active:scale-95 transition-all duration-150"
            >
              Browse All Courses
            </Link>

            {!session && (
              <div className="flex gap-2 lg:hidden pt-1 border-t border-gray-100">
                <Link href="/login" onClick={closeAll}
                  className="flex-1 text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl
                    hover:bg-gray-50 active:scale-95 transition-all duration-150"
                >
                  Log In
                </Link>
                <Link href="/register" onClick={closeAll}
                  className="flex-1 text-center py-2.5 text-sm font-bold text-white rounded-xl sm:hidden
                    active:scale-95 transition-all duration-150"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#d97706,#b45309)", boxShadow: "0 4px 12px rgba(217,119,6,0.4)" }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
