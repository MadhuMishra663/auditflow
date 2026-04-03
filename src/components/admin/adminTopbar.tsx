"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "@/components/hooks/useAuth";
import Pagination from "@/components/common/pagination";

const MOCK_NOTIFICATIONS = [
  { id: 1,  bold: "Johan",            desc: " commented on your post.",               sub: '"Great insight!"',   time: "2 hours ago",  group: "Today",      read: false },
  { id: 2,  bold: "Reminder",         desc: ": Your meeting is scheduled for 3 PM",   sub: "",                   time: "5 hours ago",  group: "Today",      read: false },
  { id: 3,  bold: "New audit",        desc: " assigned to you.",                       sub: "Risk Assessment Q2", time: "8 hours ago",  group: "Today",      read: true  },
  { id: 4,  bold: "Anna",             desc: " mentioned you",                          sub: "in a discussion.",   time: "1 day ago",    group: "1 day ago",  read: true  },
  { id: 5,  bold: "System update",    desc: " completed successfully.",                sub: "",                   time: "1 day ago",    group: "1 day ago",  read: true  },
  { id: 6,  bold: "Compliance alert", desc: ": GDPR policy review is due in 3 days.", sub: "",                   time: "1 day ago",    group: "1 day ago",  read: true  },
  { id: 7,  bold: "You",              desc: " have a new friend request from ",        sub: "Mike.",              time: "2 days ago",   group: "2 days ago", read: true  },
  { id: 8,  bold: "Password changed", desc: " on your account.",                       sub: "",                   time: "2 days ago",   group: "2 days ago", read: true  },
  { id: 9,  bold: "User role updated",desc: ": Alice promoted to Auditor.",            sub: "",                   time: "3 days ago",   group: "3 days ago", read: true  },
  { id: 10, bold: "Audit report ready",desc: ": Q1 report ready for review.",         sub: "",                   time: "3 days ago",   group: "3 days ago", read: true  },
  { id: 11, bold: "New policy added", desc: " to compliance framework.",               sub: "",                   time: "4 days ago",   group: "4 days ago", read: true  },
  { id: 12, bold: "System backup",    desc: " completed successfully.",                sub: "",                   time: "4 days ago",   group: "4 days ago", read: true  },
];

const PAGE_SIZE = 6;

const PAGE_TITLES: Record<string, string> = {
  "/admin/dashboard":        "Dashboard",
  "/admin/risk-management":  "Risk Management",
  "/admin/compliance":       "Compliance",
  "/admin/policies":         "Policies",
  "/admin/audit-management": "Audit Management",
  "/admin/setting-mamagement":"Settings",
  "/admin/auditor":          "Auditors",
  "/admin/department":       "Departments",
  "/admin/users":            "Users",
};

function getPageTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  const match = Object.keys(PAGE_TITLES).find((k) => pathname.startsWith(k));
  return match ? PAGE_TITLES[match] : "Dashboard";
}

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth={2}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

type AdminTopbarProps = {
  onMenuOpen?: () => void;
};

export default function AdminTopbar({ onMenuOpen }: AdminTopbarProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, logout } = useAuth();

  const [notifOpen,     setNotifOpen]     = useState(false);
  const [notifVisible,  setNotifVisible]  = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [currentPage,   setCurrentPage]   = useState(1);

  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pageTitle   = getPageTitle(pathname);
  const totalItems  = notifications.length;
  const paginated   = notifications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const grouped = paginated.reduce<Record<string, typeof paginated>>((acc, n) => {
    if (!acc[n.group]) acc[n.group] = [];
    acc[n.group].push(n);
    return acc;
  }, {});

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) closeNotif();
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  useEffect(() => {
    if (notifOpen) {
      const t = requestAnimationFrame(() => setNotifVisible(true));
      return () => cancelAnimationFrame(t);
    }
  }, [notifOpen]);

  useEffect(() => {
    if (isMobile && notifOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobile, notifOpen]);

  const closeNotif = () => {
    setNotifVisible(false);
    setTimeout(() => setNotifOpen(false), 300);
  };

  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const markRead    = (id: number) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: number) => {
    const remaining = notifications.filter((n) => n.id !== id);
    setNotifications(remaining);
    const newTotalPages = Math.ceil(remaining.length / PAGE_SIZE);
    if (currentPage > newTotalPages && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 h-[60px] flex items-center justify-between px-4 sm:px-7">

      {/* ── Left ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="md:hidden p-1.5 -ml-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <HamburgerIcon />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">{pageTitle}</h1>
      </div>

      {/* ── Right ── */}
      <div className="flex items-center gap-1">

        {/* ── Bell ── */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { notifOpen ? closeNotif() : setNotifOpen(true); setProfileOpen(false); }}
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
            <>
              {/* Backdrop — mobile only */}
              <div
                className="fixed inset-0 bg-black/30 z-40 sm:hidden"
                style={{
                  opacity: notifVisible ? 1 : 0,
                  transition: "opacity 300ms ease",
                }}
                onClick={closeNotif}
              />

              {/* Panel */}
              <div
                className="
                  fixed sm:absolute z-50 bg-white overflow-hidden flex flex-col
                  bottom-0 left-0 right-0 rounded-t-2xl
                  sm:bottom-auto sm:left-auto sm:right-0 sm:top-[calc(100%+10px)]
                  sm:w-[420px] sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-2xl
                "
                style={{
                  maxHeight: isMobile ? "85vh" : "580px",
                  opacity: notifVisible ? 1 : 0,
                  transform: notifVisible
                    ? "translateY(0) scale(1)"
                    : isMobile
                      ? "translateY(100%)"
                      : "translateY(-8px) scale(0.97)",
                  transition: "opacity 300ms cubic-bezier(0.16,1,0.3,1), transform 300ms cubic-bezier(0.16,1,0.3,1)",
                  transformOrigin: "top right",
                }}
              >
                {/* Mobile drag handle */}
                <div className="sm:hidden flex-shrink-0 flex justify-center pt-3 pb-1 bg-white">
                  <div className="w-10 h-1 rounded-full bg-gray-200" />
                </div>

                {/* ── Header ── */}
                <div className="flex-shrink-0 px-5 py-4 flex items-center justify-between" style={{ background: "#7C3AED" }}>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-bold text-white tracking-tight">Notification</h2>
                    {unreadCount > 0 && (
                      <span className="text-xs font-semibold bg-white/25 text-white px-2.5 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-sm text-white/90 font-medium hover:text-white transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                    {/* Close — mobile only */}
                    <button
                      onClick={closeNotif}
                      className="sm:hidden text-violet-200 hover:text-white transition-colors"
                      aria-label="Close notifications"
                    >
                      <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ── Notification list ── */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1" style={{ background: "#F3F4F6" }}>
                  <style>{`
                    @keyframes notif-slide-in {
                      from { opacity: 0; transform: translateX(10px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }
                    .notif-item { animation: notif-slide-in 280ms cubic-bezier(0.16,1,0.3,1) both; }
                  `}</style>

                  {Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="mb-1">
                      {/* Group label */}
                      <p className="text-sm font-semibold text-gray-800 px-1 pt-2 pb-2">{group}</p>

                      <div className="space-y-2">
                        {items.map((n, i) => (
                          <div
                            key={n.id}
                            onClick={() => markRead(n.id)}
                            className="notif-item rounded-2xl px-4 py-3.5 flex items-start justify-between gap-3 cursor-pointer transition-colors shadow-sm"
                            style={{
                              background: n.read ? "#FFFFFF" : "#EDE9FE",
                              animationDelay: `${i * 40}ms`,
                            }}
                          >
                            {/* Left: unread dot + text */}
                            <div className="flex items-start gap-2.5 flex-1 min-w-0">
                              {/* Unread indicator */}
                              {!n.read && (
                                <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#7C3AED" }} />
                              )}
                              {n.read && <span className="mt-1.5 w-2 h-2 flex-shrink-0" />}

                              <div className="min-w-0">
                                <p className="text-sm text-gray-800 leading-snug">
                                  <span className="font-bold">{n.bold}</span>
                                  <span className="font-normal">{n.desc}</span>
                                  {n.sub && <span className="font-normal text-gray-700">{n.sub}</span>}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                              </div>
                            </div>

                            {/* Right: action buttons */}
                            <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                              <button
                                onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all active:scale-95"
                                style={{ color: "#7C3AED", background: "white", border: "1px solid #DDD6FE" }}
                              >
                                View
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteNotif(n.id); }}
                                className="px-3 py-1 rounded-lg text-xs font-medium transition-all active:scale-95 hover:text-red-500"
                                style={{ color: "#7C3AED", background: "white", border: "1px solid #DDD6FE" }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {notifications.length === 0 && (
                    <div className="py-10 text-center text-sm text-gray-400">No notifications</div>
                  )}
                </div>

                {/* ── Pagination ── */}
                <div className="flex-shrink-0 border-t border-gray-100 bg-white">
                  <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={PAGE_SIZE}
                    onPageChange={(p) => setCurrentPage(p)}
                  />
                </div>

              </div>
            </>
          )}
        </div>

        {/* ── Profile ── */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen((o) => !o); if (notifOpen) closeNotif(); }}
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