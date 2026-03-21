// src/components/admin/adminTopbar.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "@/components/hooks/useAuth";

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "New audit assigned",  desc: "Risk Assessment Q2 has been assigned to you.", time: "2 min ago",  read: false },
  { id: 2, title: "Compliance alert",    desc: "GDPR policy review is due in 3 days.",          time: "1 hr ago",   read: false },
  { id: 3, title: "User role updated",   desc: "Alice has been promoted to Auditor.",            time: "3 hrs ago",  read: true  },
  { id: 4, title: "Audit report ready",  desc: "Q1 Audit report is ready for review.",          time: "Yesterday",  read: true  },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard":        "Dashboard",
  "/admin/risk-management":  "Risk Management",
  "/admin/compliance":       "Compliance",
  "/admin/policies":         "Policies",
  "/admin/audit-management": "Audit Management",
  "/admin/settings":         "Settings",
  "/admin/auditor":          "Auditors",
  "/admin/department":       "Departments",
  "/admin/users":            "Users",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  const match = Object.keys(PAGE_TITLES).find((k) => pathname.startsWith(k));
  return match ? PAGE_TITLES[match] : "Dashboard";
}

// Hamburger icon
const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth={2}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ── Props ────────────────────────────────────────────────────────────────────

type AdminTopbarProps = {
  onMenuOpen?: () => void; // called when hamburger is tapped on mobile
};

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminTopbar({ onMenuOpen }: AdminTopbarProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuth();

  const [notifOpen,     setNotifOpen]     = useState(false);
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pageTitle   = getPageTitle(pathname);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const markRead    = (id: number) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 h-[60px] flex items-center justify-between px-7">

      {/* ── Left: hamburger (mobile only) + page title ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger — only visible on mobile (md:hidden) */}
        <button
          onClick={onMenuOpen}
          className="md:hidden p-1.5 -ml-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <HamburgerIcon />
        </button>

        {/* Page title */}
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">{pageTitle}</h1>
      </div>

      {/* ── Right: bell + profile ── */}
      <div className="flex items-center gap-1">

        {/* ── Bell ── */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] font-bold text-white flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] w-[340px] bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-[#6B9AC4] font-medium hover:underline">
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`flex gap-3 px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${n.read ? "bg-white" : "bg-violet-50/40"}`}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "bg-gray-300" : "bg-violet-600"}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[13px] text-gray-900 mb-0.5 ${n.read ? "font-medium" : "font-bold"}`}>{n.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed mb-1">{n.desc}</p>
                      <p className="text-[11px] text-gray-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                <button onClick={() => setNotifOpen(false)} className="text-xs text-[#6B9AC4] font-medium hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Profile ── */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-violet-100 border-2 border-violet-200 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#7c3aed" strokeWidth={1.8}>
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[13px] font-semibold text-gray-900 leading-tight whitespace-nowrap">
                {user?.name ?? "Johan Admin"}
              </p>
              <p className="text-[11px] text-gray-400 leading-tight whitespace-nowrap">Organization Administrator</p>
            </div>
            <svg
              viewBox="0 0 24 24" fill="none" width="13" height="13" stroke="#9ca3af" strokeWidth={2.2}
              className="flex-shrink-0 transition-transform duration-200 hidden sm:block"
              style={{ transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] w-44 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50">
              <button
                onClick={() => { setProfileOpen(false); router.push("/admin/profile"); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#6b7280" strokeWidth={1.8}>
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Profile
              </button>
              <div className="h-px bg-gray-100 mx-3" />
              <button
                onClick={async () => { setProfileOpen(false); await logout(); router.push("/"); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#dc2626" strokeWidth={1.8}>
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}