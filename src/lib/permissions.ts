import { Role } from "@/types/admin";

export type NavItemId =
  | "dashboard"
  | "risk-management"
  | "compliance"
  | "policies"
  | "audit-management"
  | "settings";

export const ROLE_PERMISSIONS: Record<Role, NavItemId[]> = {
  SUPER_ADMIN: [
    "dashboard",
    "risk-management",
    "compliance",
    "policies",
    "audit-management",
    "settings",
  ],
  ADMIN: [
    "dashboard",
    "risk-management",
    "compliance",
    "policies",
    "audit-management",
  ],
  AUDITOR: [
    "dashboard",
    "audit-management",
    "compliance",
  ],
  DEPARTMENT: ["dashboard"],
};

export const ROUTES: Record<NavItemId, string> = {
  dashboard:        "/admin/dashboard",
  "risk-management": "/admin/risk-management",
  compliance:        "/admin/compliance",
  policies:          "/admin/policies",
  "audit-management": "/admin/audit-management",
  settings:          "/admin/settings",
};

export const NAV_ITEMS: { id: NavItemId; label: string }[] = [
  { id: "dashboard",         label: "Dashboard" },
  { id: "risk-management",  label: "Risk Management" },
  { id: "compliance",       label: "Compliance" },
  { id: "policies",          label: "Policies" },
  { id: "audit-management",  label: "Audit Management" },
  { id: "settings",          label: "Settings" },
];

export function canAccess(role: Role, item: NavItemId): boolean {
  return ROLE_PERMISSIONS[role]?.includes(item) ?? false;
}

export function getAccessibleNavItems(role: Role) {
  const allowed = ROLE_PERMISSIONS[role] ?? [];
  return NAV_ITEMS.filter((item) => allowed.includes(item.id));
}
