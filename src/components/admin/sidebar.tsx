// src/components/admin/sidebar.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const ShieldIcon = ({
  className = "w-4 h-4",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={style}
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V6l-9-4z" />
  </svg>
);

const GridIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="18"
    height="18"
    stroke={color}
    strokeWidth={1.8}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const AlertTriangleIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="18"
    height="18"
    stroke={color}
    strokeWidth={1.8}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ClipboardIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="18"
    height="18"
    stroke={color}
    strokeWidth={1.8}
  >
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
  </svg>
);

const FileTextIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="18"
    height="18"
    stroke={color}
    strokeWidth={1.8}
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const SearchIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="18"
    height="18"
    stroke={color}
    strokeWidth={1.8}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SettingsIcon = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="18"
    height="18"
    stroke={color}
    strokeWidth={1.8}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="13"
    height="13"
    stroke="#9CA3AF"
    strokeWidth={1.8}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

// ── exact colors from Figma ──
const PURPLE = "#6B4EFF"; // active text + icon
const GRAY_TEXT = "#4B5563"; // inactive text  — gray-600
const GRAY_ICON = "#9CA3AF"; // inactive icon  — gray-400
const CARD_BG = "rgba(247,246,250,1)"; // #F7F6FA — cards + nav items
const SIDEBAR_BG = "#FFFFFF";

const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (c: string) => <GridIcon color={c} />,
  },
  {
    id: "risk-management",
    label: "Risk Management",
    icon: (c: string) => <AlertTriangleIcon color={c} />,
  },
  {
    id: "compliance",
    label: "Compliance",
    icon: (c: string) => <ClipboardIcon color={c} />,
  },
  {
    id: "policies",
    label: "policies",
    icon: (c: string) => <FileTextIcon color={c} />,
  },
  {
    id: "audit-management",
    label: "Audit Management",
    icon: (c: string) => <SearchIcon color={c} />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: (c: string) => <SettingsIcon color={c} />,
  },
];

const ROUTES: Record<string, string> = {
  dashboard: "/admin/dashboard",
  "risk-management": "/admin/risk-management",
  compliance: "/admin/compliance",
  policies: "/admin/policies",
  "audit-management": "/admin/audit-management",
  settings: "/admin/settings",
};

type SidebarProps = {
  orgName?: string;
  orgTag?: string;
  userName?: string;
  userRole?: string;
};

export function Sidebar({
  orgName = "Acme Corporation",
  orgTag = "Technology",
  userName = "Johan Admin",
  userRole = "Organization Administrator",
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveItem = () => {
    if (pathname.includes("risk-management")) return "risk-management";
    if (pathname.includes("compliance")) return "compliance";
    if (pathname.includes("policies")) return "policies";
    if (pathname.includes("audit-management")) return "audit-management";
    if (pathname.includes("settings")) return "settings";
    return "dashboard";
  };

  const activeItem = getActiveItem();

  return (
    <>
      {/* Load Inknut Antiqua — exact font from Figma */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <aside
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "358px", // 344px content + 8px each side from Figma padding
          height: "100vh",
          overflow: "hidden",
          backgroundColor: SIDEBAR_BG,
          borderRight: "1px solid #E8F1F8",
          display: "flex",
          flexDirection: "column",
          // Figma padding: 16 top, 8 right, 16 bottom, 8 left (from padding box 16/8/16/8)
          padding: "16px 8px 16px 8px",
          boxSizing: "border-box",
          fontFamily: "'Inter', sans-serif",
          zIndex: 40,
        }}
      >
        {/* ── Logo  ──────────────────────────────────────── */}
        {/* Figma: frame 344×100, padding 16 all, text "GRC Platform" Inknut Antiqua 400 24px */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            height: "62px", // from Figma height 62px
            padding: "0 8px",
            marginBottom: "8px",
            boxSizing: "border-box",
          }}
        >
          {/* Shield icon container */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6B9AC4 0%, #5B21B6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(91,33,182,0.30)",
            }}
          >
            <ShieldIcon className="w-5 h-5" style={{ color: "#fff" }} />
          </div>

          {/* "GRC Platform" — Inknut Antiqua 400 24px from Figma */}
          <span
            style={{
              fontFamily: "'Inknut Antiqua', serif",
              fontWeight: 400,
              fontSize: "20px", // scaled from 24px at 60% zoom ≈ 20px real
              color: "#111827",
              lineHeight: 1.2,
              letterSpacing: "-0.2px",
            }}
          >
            AuditFlow
          </span>
        </div>

        {/* ── Current Organisation card ─────────────────── */}
        {/* Figma: rgba(247,246,250,1) bg, radius 8px, border transparent */}
        <div
          style={{
            backgroundColor: CARD_BG,
            borderRadius: "8px",
            border: "1px solid transparent",
            padding: "10px 12px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "6px",
            }}
          >
            <BuildingIcon />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Current Organization
            </span>
          </div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#1F2937",
              margin: "0 0 6px 0",
              lineHeight: 1.3,
            }}
          >
            {orgName}
          </p>
          <span
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 600,
              color: "#6D28D9",
              backgroundColor: "#E8F1F8",
              padding: "2px 10px",
              borderRadius: "999px",
            }}
          >
            {orgTag}
          </span>
        </div>

        {/* ── Your Role card ────────────────────────────── */}
        <div
          style={{
            backgroundColor: CARD_BG,
            borderRadius: "8px",
            border: "1px solid transparent",
            padding: "10px 12px",
            marginBottom: "16px", // gap before nav section
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "6px",
            }}
          >
            <ShieldIcon className="w-3 h-3" style={{ color: "#9CA3AF" }} />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Your Role
            </span>
          </div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#1F2937",
              margin: "0 0 3px 0",
              lineHeight: 1.3,
            }}
          >
            {userRole}
          </p>
          <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
            {userName}
          </p>
        </div>

        {/* ── Nav items ─────────────────────────────────── */}
        {/* Each item: 303×59px, radius 8px, bg rgba(247,246,250,1), left 27.53px */}
        {/* Active = same bg, text+icon turn purple. NO bg change. */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: 1,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            const textColor = isActive ? PURPLE : GRAY_TEXT;
            const iconColor = isActive ? PURPLE : GRAY_ICON;

            return (
              <button
                key={item.id}
                onClick={() => router.push(ROUTES[item.id])}
                style={{
                  width: "100%", // fills 303px (344 - 8 - 8 - 12 - 12 padding)
                  height: "59px", // exact from Figma
                  borderRadius: "8px", // exact from Figma
                  backgroundColor: CARD_BG, // rgba(247,246,250,1) — SAME for active & inactive
                  border: "1px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  // left: 27.53px from sidebar edge. sidebar padding=8, so item padding-left ≈ 20px
                  paddingLeft: "20px",
                  paddingRight: "16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  color: textColor,
                  fontFamily: "'Inter', sans-serif",
                  transition: "color 0.15s ease",
                  textAlign: "left",
                  boxSizing: "border-box",
                }}
              >
                {item.icon(iconColor)}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
