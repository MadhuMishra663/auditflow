"use client";

import StatsCards from "@/components/auditMangement/statsCards";
import AuditDashboard from "@/components/auditMangement/auditDashboard";
import { useRoleAccess } from "@/components/hooks/useRoleAccess";

export default function DashboardPage() {
  useRoleAccess(["audit-management"]);
  return (
    <div className="min-h-screen bg-[#F9F7FB] px-4 sm:px-8 py-8 font-sans ">
      
      {/* Stats Row */}
      <StatsCards />

      {/* Audit Dashboard */}
      <div className="mt-6 bg-white px-4 sm:px-8 py-8 font-sans ">
        <AuditDashboard />
      </div>

    </div>
  );
}