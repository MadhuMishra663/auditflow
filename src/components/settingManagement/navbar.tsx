"use client";

import { useState } from "react";

type Tab = {
  id: string;
  label: string;
};

export const tabs: Tab[] = [
  { id: "roles", label: "Roles & permissions" },
  { id: "UserManagementPage", label: "User Management" },
  { id: "department", label: "Department" },
  { id: "notification", label: "Notification" },
];

interface TabNavProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function TabNav({ activeTab, setActiveTab }: TabNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLabel = tabs.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <div className="mb-8">
      {/* Desktop */}
      <div
        className="hidden sm:flex items-center gap-2 rounded-2xl px-3 py-2 w-fit"
        style={{ backgroundColor: "#E7DFFF" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-black whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-white shadow-sm font-semibold"
                : "hover:bg-white/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mobile */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center justify-between w-full rounded-2xl px-4 py-3 text-sm font-semibold text-black"
          style={{ backgroundColor: "#E7DFFF" }}
        >
          <span>{activeLabel}</span>
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {menuOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-lg z-50 border border-purple-100"
            style={{ backgroundColor: "#E7DFFF" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-sm transition-all duration-150 text-black ${
                  activeTab === tab.id
                    ? "bg-white font-semibold"
                    : "hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}