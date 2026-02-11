"use client";
import dynamic from "next/dynamic";
import StatCard from "@/components/admin/statcard";
import { theme } from "@/styles/theme";
import { useAdminDashboard } from "@/components/hooks/useAdminDashboard";

const AuditCompletionChart = dynamic(() => import("./auditCompletion"), {
  ssr: false,
});

const DashboardOverview = () => {
  const { data, loading, error } = useAdminDashboard();

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  if (error || !data) {
    return <p className="text-red-500">{error || "No data available"}</p>;
  }

  return (
    <div className="space-y-10">
      {/* STAT CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Audits" value={data.totalAudits} />
        <StatCard title="Active Audits" value={data.activeAudits} />
        <StatCard title="Closed Audits" value={data.closedAudits} />

        <StatCard title="Auditors" value={data.auditors} />
        <StatCard title="Employees" value={data.departmentUsers} />
        <StatCard title="Completion %" value={`${data.completionRate}%`} />
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl max-w-xl">
        <h3
          className="font-semibold mb-4"
          style={{ color: theme.colors.textDark }}
        >
          Audit Completion
        </h3>

        <AuditCompletionChart
          total={data.totalAudits}
          attempted={data.closedAudits}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
