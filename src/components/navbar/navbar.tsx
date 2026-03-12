"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import AuthModal from "@/components/auth/authModal";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "../common/navigationContext";
import { useRouter } from "next/navigation";

// ── Mock notifications ─────────────────────────────────────────────────────────
const MOCK_NOTIFICATIONS = [
  { id: 1, title: "New audit assigned",  desc: "Risk Assessment Q2 has been assigned to you.", time: "2 min ago",  read: false },
  { id: 2, title: "Compliance alert",    desc: "GDPR policy review is due in 3 days.",          time: "1 hr ago",   read: false },
  { id: 3, title: "User role updated",   desc: "Alice has been promoted to Auditor.",            time: "3 hrs ago",  read: true  },
  { id: 4, title: "Audit report ready",  desc: "Q1 Audit report is ready for review.",          time: "Yesterday",  read: true  },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { setActiveSection } = useNavigation();
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [authModalOpen,  setAuthModalOpen]  = useState(false);
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [profileOpen,    setProfileOpen]    = useState(false);
  const [notifications,  setNotifications]  = useState(MOCK_NOTIFICATIONS);
  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead    = (id: number) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <>
      <nav className="w-full bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* ── Brand ── */}
          <div
            className="text-2xl font-extrabold tracking-wide text-[#6B9AC4] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Audit<span className="text-[#A3C4BC]">Flow</span>
          </div>

          {/* ── Desktop Menu ── */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">

            {!user && (
              <button onClick={() => router.push("/")} className="hover:text-[#6B9AC4]">
                Home
              </button>
            )}
            <button onClick={() => router.push("/about")}   className="hover:text-[#6B9AC4]">About</button>
            <button onClick={() => router.push("/contact")} className="hover:text-[#6B9AC4]">Contact</button>

            {user ? (
              <div className="flex items-center gap-4">

                {/* ── Bell ── */}
                <div ref={notifRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
                    style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                  >
                    <Bell size={22} className="text-gray-700 hover:text-[#6B9AC4]" />
                    {unreadCount > 0 && (
                      <span style={{
                        position: "absolute", top: 0, right: 0,
                        width: "17px", height: "17px",
                        backgroundColor: "#EF4444", borderRadius: "50%",
                        fontSize: "10px", fontWeight: 700, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "Inter, sans-serif",
                      }}>
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification dropdown */}
                  {notifOpen && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 12px)", right: 0,
                      width: "340px", backgroundColor: "#fff",
                      borderRadius: "12px", border: "1px solid #E5E7EB",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      zIndex: 50, overflow: "hidden",
                      fontFamily: "Inter, sans-serif",
                    }}>
                      {/* Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "1px solid #F3F4F6" }}>
                        <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
                          Notifications
                          {unreadCount > 0 && (
                            <span style={{ marginLeft: "8px", fontSize: "11px", fontWeight: 600, color: "#7C3AED", backgroundColor: "#EDE9FE", padding: "2px 8px", borderRadius: "999px" }}>
                              {unreadCount} new
                            </span>
                          )}
                        </span>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllRead}
                            style={{ fontSize: "12px", color: "#6B9AC4", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      {/* List */}
                      <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markRead(n.id)}
                            style={{
                              display: "flex", gap: "12px", padding: "12px 16px",
                              borderBottom: "1px solid #F9FAFB", cursor: "pointer",
                              backgroundColor: n.read ? "#fff" : "#FAFAFF",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = n.read ? "#fff" : "#FAFAFF")}
                          >
                            <div style={{ paddingTop: "5px", flexShrink: 0 }}>
                              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: n.read ? "#D1D5DB" : "#7C3AED" }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: "13px", fontWeight: n.read ? 500 : 700, color: "#111827", margin: "0 0 3px 0" }}>{n.title}</p>
                              <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 4px 0", lineHeight: 1.4 }}>{n.desc}</p>
                              <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{n.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div style={{ padding: "10px 16px", borderTop: "1px solid #F3F4F6", textAlign: "center" }}>
                        <button
                          onClick={() => setNotifOpen(false)}
                          style={{ fontSize: "12px", color: "#6B9AC4", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* ── End Bell ── */}

                {/* ── User Profile ── */}
                <div ref={profileRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "4px 6px", borderRadius: "8px", transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F3F4F6")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      backgroundColor: "#EDE9FE", border: "2px solid #C4B5FD",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" width="15" height="15" stroke="#7C3AED" strokeWidth={1.8}>
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>

                    {/* Name + role */}
                    <div style={{ textAlign: "left" }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", margin: 0, lineHeight: 1.3 }}>
                        {user?.name ?? "Johan Admin"}
                      </p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0, lineHeight: 1.3 }}>
                        Organization Administrator
                      </p>
                    </div>

                    {/* Chevron */}
                    <svg viewBox="0 0 24 24" fill="none" width="13" height="13" stroke="#9CA3AF" strokeWidth={2}
                      style={{ transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Profile dropdown */}
                  {profileOpen && (
                    <div style={{
                      position: "absolute", top: "calc(100% + 10px)", right: 0,
                      width: "180px", backgroundColor: "#fff",
                      borderRadius: "10px", border: "1px solid #E5E7EB",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                      overflow: "hidden", zIndex: 50,
                      fontFamily: "Inter, sans-serif",
                    }}>
                      {/* Profile option */}
                      <button
                        onClick={() => { setProfileOpen(false); router.push("/admin/profile"); }}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", gap: "9px",
                          padding: "11px 14px", fontSize: "13px", fontWeight: 500,
                          color: "#374151", backgroundColor: "transparent",
                          border: "none", cursor: "pointer", textAlign: "left",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#6B7280" strokeWidth={1.8}>
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        Profile
                      </button>

                      <div style={{ height: "1px", backgroundColor: "#F3F4F6", margin: "0 10px" }} />

                      {/* Logout option */}
                      <button
                        onClick={async () => { setProfileOpen(false); await logout(); router.push("/"); }}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", gap: "9px",
                          padding: "11px 14px", fontSize: "13px", fontWeight: 500,
                          color: "#DC2626", backgroundColor: "transparent",
                          border: "none", cursor: "pointer", textAlign: "left",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="#DC2626" strokeWidth={1.8}>
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                {/* ── End User Profile ── */}

              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
              >
                Login
              </button>
            )}
          </div>

          {/* ── Mobile Menu Button ── */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
              {!user && (
                <button onClick={() => { router.push("/"); setMenuOpen(false); }}>Home</button>
              )}
              <button onClick={() => { router.push("/about");   setMenuOpen(false); }}>About</button>
              <button onClick={() => { router.push("/contact"); setMenuOpen(false); }}>Contact</button>

              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Bell size={20} className="text-gray-700" />
                    <span className="text-sm text-gray-700">
                      Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </span>
                  </div>
                  <button
                    onClick={() => { router.push("/admin/profile"); setMenuOpen(false); }}
                    className="text-left hover:text-[#6B9AC4]"
                  >
                    Profile
                  </button>
                  <button
                    onClick={async () => { await logout(); setMenuOpen(false); router.push("/"); }}
                    className="w-full px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setAuthModalOpen(true); setMenuOpen(false); }}
                  className="w-full px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        setActiveSection={setActiveSection}
      />
    </>
  );
};

export default Navbar;