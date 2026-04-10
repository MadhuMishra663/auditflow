"use client";

import DashboardOverview from "@/components/admin/Dashboard/dashboardOverview";
//import AuditorManagement from "@/components/admin/auditorManagement";
import { useAuth } from "@/components/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  console.log(user?.role);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login"); // optional
      return;
    }
    const role = user.role?.toUpperCase() || "";
    if (!role.includes("ADMIN")) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (!user) return null;
  return (
    <div className="space-y-10">
      <DashboardOverview />
    </div>
  );
}
