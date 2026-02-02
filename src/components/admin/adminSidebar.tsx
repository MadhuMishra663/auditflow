"use client";

import { LayoutDashboard, Users, ClipboardList, Settings } from "lucide-react";
import { theme } from "@/styles/theme";
import { useState } from "react";
import { Section } from "../common/navigationContext";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: Section) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "auditors", label: "Users", icon: Users },
  { id: "audits", label: "Audits", icon: ClipboardList },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminSidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50
      transition-all duration-300
      ${expanded ? "w-64" : "w-16"}`}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center justify-center border-b"
        style={{ backgroundColor: theme.colors.secondary }}
      >
        <span
          className="font-extrabold text-xl"
          style={{ color: theme.colors.primary }}
        >
          {expanded ? "ADMIN" : "A"}
        </span>
      </div>

      {/* Menu */}
      <nav className="mt-4 space-y-2 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition
              ${isActive ? "text-white" : "text-gray-600 hover:bg-gray-100"}`}
              style={{
                backgroundColor: isActive
                  ? theme.colors.primary
                  : "transparent",
              }}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {expanded && (
                <span className="font-medium text-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
