import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/hooks/useAuth";
import { Role } from "@/types/admin";

const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: ["dashboard", "risk-management", "compliance", "policies", "audit-management", "settings"],
  ADMIN:      ["dashboard", "risk-management", "compliance", "policies", "audit-management"],
  AUDITOR:    ["dashboard", "audit-management", "compliance"],
  DEPARTMENT: ["dashboard"],
};

export function useRoleAccess(allowedItems: string[]) {
  const { user, loading, initialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialized || loading) return;
    if (!user) return;

    const allowed = ROLE_PERMISSIONS[user.role as string] ?? [];
    const hasAccess = allowedItems.some((item) => allowed.includes(item));

    if (!hasAccess) {
      // Redirect to dashboard if user doesn't have access
      router.replace("/admin/dashboard");
    }
  }, [user, loading, initialized, allowedItems, router]);

  return { user, loading, initialized };
}
