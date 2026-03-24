"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

// ── Icon Components ──────────────────────────────────────────────────────────

const ShieldIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V6l-9-4z" />
  </svg>
);

const GridIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"
    stroke={active ? "#6B4EFF" : "#9CA3AF"} strokeWidth={1.8}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const AlertTriangleIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"
    stroke={active ? "#6B4EFF" : "#9CA3AF"} strokeWidth={1.8}>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ClipboardIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"
    stroke={active ? "#6B4EFF" : "#9CA3AF"} strokeWidth={1.8}>
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
  </svg>
);

const FileTextIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"
    stroke={active ? "#6B4EFF" : "#9CA3AF"} strokeWidth={1.8}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const SearchIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"
    stroke={active ? "#6B4EFF" : "#9CA3AF"} strokeWidth={1.8}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SettingsIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"
    stroke={active ? "#6B4EFF" : "#9CA3AF"} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13" stroke="#9CA3AF" strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

type NavItemId =
  | "dashboard"
  | "risk-management"
  | "compliance"
  | "policies"
  | "audit-management"
  | "settings";

interface NavItem {
  id: NavItemId;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

type SidebarProps = {
  orgName?: string;
  orgTag?: string;
  userName?: string;
  userRole?: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

// ── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",        label: "Dashboard",        icon: (a) => <GridIcon active={a} /> },
  { id: "risk-management",  label: "Risk Management",  icon: (a) => <AlertTriangleIcon active={a} /> },
  { id: "compliance",       label: "Compliance",       icon: (a) => <ClipboardIcon active={a} /> },
  { id: "policies",         label: "Policies",         icon: (a) => <FileTextIcon active={a} /> },
  { id: "audit-management", label: "Audit Management", icon: (a) => <SearchIcon active={a} /> },
  { id: "settings",         label: "Settings",         icon: (a) => <SettingsIcon active={a} /> },
];

const ROUTES: Record<NavItemId, string> = {
  "dashboard":        "/admin/dashboard",
  "risk-management":  "/admin/risk-management",
  "compliance":       "/admin/compliance",
  "policies":         "/admin/policies",
  "audit-management": "/admin/audit-management",
  "settings":         "/admin/settings",
};

// ── Sidebar Inner Content ────────────────────────────────────────────────────

function SidebarContent({
  orgName,
  orgTag,
  userName,
  userRole,
  activeItem,
  onNavigate,
}: {
  orgName: string;
  orgTag: string;
  userName: string;
  userRole: string;
  activeItem: NavItemId;
  onNavigate: (route: string) => void;
}) {
  return (
    <>
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 w-full h-[62px] px-2 mb-2 box-border">
        <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#6B9AC4] to-[#5B21B6] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(91,33,182,0.30)]">
          <ShieldIcon className="w-5 h-5 text-white" />
        </div>
        <span
          className="text-[20px] text-gray-900 leading-tight tracking-tight"
          style={{ fontFamily: "'Inknut Antiqua', serif", fontWeight: 400 }}
        >
          AuditFlow
        </span>
      </div>

      {/* ── Current Organisation card ── */}
      <div className="bg-[#F7F6FA] rounded-lg border border-transparent px-3 py-[10px] mb-2">
        <div className="flex items-center gap-1.5 mb-1.5">
          <BuildingIcon />
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.07em]">
            Current Organization
          </span>
        </div>
        <p className="text-[15px] font-bold text-gray-800 mb-1.5 leading-snug">{orgName}</p>
        <span className="inline-block text-[11px] font-semibold text-violet-700 bg-[#E8F1F8] px-2.5 py-0.5 rounded-full">
          {orgTag}
        </span>
      </div>

      {/* ── Your Role card ── */}
      <div className="bg-[#F7F6FA] rounded-lg border border-transparent px-3 py-[10px] mb-4">
        <div className="flex items-center gap-1.5 mb-1.5">
          <ShieldIcon className="w-3 h-3 text-gray-400" />
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-[0.07em]">
            Your Role
          </span>
        </div>
        <p className="text-[15px] font-bold text-gray-800 mb-0.5 leading-snug">{userRole}</p>
        <p className="text-xs text-gray-500">{userName}</p>
      </div>

      {/* ── Nav items ── */}
      <nav className="flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(ROUTES[item.id])}
              className={`
                w-full h-[59px] rounded-lg bg-[#F7F6FA] border border-transparent
                flex items-center gap-3 pl-5 pr-4 cursor-pointer text-sm text-left
                transition-colors duration-150 box-border
                ${isActive
                  ? "font-semibold text-[#6B4EFF]"
                  : "font-medium text-gray-600 hover:text-gray-800"
                }
              `}
            >
              {item.icon(isActive)}
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}

// ── Sidebar Component ────────────────────────────────────────────────────────

export function Sidebar({
  orgName       = "Acme Corporation",
  orgTag        = "Technology",
  userName      = "Johan Admin",
  userRole      = "Organization Administrator",
  mobileOpen    = false,
  onMobileClose = () => {},
}: SidebarProps) {
  const router   = useRouter();
  const pathname = usePathname();

  const getActiveItem = (): NavItemId => {
    if (pathname.includes("risk-management"))  return "risk-management";
    if (pathname.includes("compliance"))       return "compliance";
    if (pathname.includes("policies"))         return "policies";
    if (pathname.includes("audit-management")) return "audit-management";
    if (pathname.includes("settings"))         return "settings";
    return "dashboard";
  };

  const activeItem = getActiveItem();

  const handleNavigate = (route: string) => {
    router.push(route);
    onMobileClose();
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400&display=swap"
        rel="stylesheet"
      />

      {/* ── DESKTOP Sidebar ── */}
      <aside className="hidden md:flex fixed left-0 top-0 w-[358px] h-screen overflow-hidden bg-white border-r border-[#E8F1F8] flex-col px-2 py-4 z-40">
        <SidebarContent
          orgName={orgName}
          orgTag={orgTag}
          userName={userName}
          userRole={userRole}
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />
      </aside>

      {/* ── MOBILE: Backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      {/* ── MOBILE: Slide-in drawer ── */}
      <aside
        className={`
          md:hidden fixed top-0 left-0 h-screen w-[300px] bg-white border-r border-[#E8F1F8]
          flex flex-col px-2 py-4 z-[60] overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-end mb-2 pr-1">
          <button
            onClick={onMobileClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <SidebarContent
          orgName={orgName}
          orgTag={orgTag}
          userName={userName}
          userRole={userRole}
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />
      </aside>
    </>
  );
}

export default Sidebar;