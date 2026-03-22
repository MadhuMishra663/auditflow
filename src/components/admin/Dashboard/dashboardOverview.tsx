"use client";

import dynamic from "next/dynamic";
import StatCard from "@/components/admin/statcard";
import { useAdminDashboard } from "@/components/hooks/useAdminDashboard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  PieLabelRenderProps,
} from "recharts";

const AuditCompletionChart = dynamic(() => import("./auditCompletion"), {
  ssr: false,
});

// ── Static chart data ──────────────────────────────────────────────────────────
const riskDistribution = [
  { name: "Critical", value: 33, color: "#f9a8b8" },
  { name: "High", value: 33, color: "#fde8c8" },
  { name: "Medium", value: 33, color: "#bdd7f0" },
];

const complianceStatus = [
  { name: "Compliant", value: 2 },
  { name: "In Progress", value: 1 },
  { name: "Non-Compliant", value: 0 },
];

const trends = [
  { month: "Jan", risk: 12, compliance: 80 },
  { month: "Feb", risk: 10, compliance: 75 },
  { month: "Mar", risk: 8, compliance: 85 },
  { month: "Apr", risk: 11, compliance: 90 },
  { month: "May", risk: 9, compliance: 88 },
  { month: "Jun", risk: 6, compliance: 95 },
];

const highPriorityRisks = [
  {
    title: "Data Breach Vulnerability",
    severity: "Critical",
    assignee: "Johan Smith",
  },
  {
    title: "Compliance Gap in GDPR",
    severity: "High",
    assignee: "Sarah Johnson",
  },
];

const upcomingReviews = [
  {
    title: "SOC 2",
    subtitle: "CC6.1- Logical Access Controls",
    date: "2026-04-15",
    status: "Compliant",
  },
  {
    title: "GDPR",
    subtitle: "Article 32 - Security of Processing",
    date: "2026-05-01",
    status: "In Progress",
  },
  {
    title: "ISO 27001",
    subtitle: "A.9.2- User Access Management",
    date: "2026-04-20",
    status: "Compliant",
  },
];

const severityStyle: Record<
  string,
  { bg: string; text: string; icon: string }
> = {
  Critical: { bg: "#fee2e2", text: "#ef4444", icon: "#ef4444" },
  High: { bg: "#fef3c7", text: "#d97706", icon: "#f59e0b" },
  Medium: { bg: "#dbeafe", text: "#2563eb", icon: "#3b82f6" },
};

const statusStyle: Record<string, { bg: string; text: string }> = {
  Compliant: { bg: "#ede9fe", text: "#6d28d9" },
  "In Progress": { bg: "#f3f4f6", text: "#374151" },
  "Non-Compliant": { bg: "#fee2e2", text: "#ef4444" },
};

const DashboardOverview = () => {
  const { data, loading, error } = useAdminDashboard();

  if (loading)
    return (
      <div className="p-6">
        <p className="text-sm text-gray-400">Loading dashboard...</p>
      </div>
    );

  if (error || !data)
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">{error || "No data available"}</p>
      </div>
    );

  return (
    <div className="bg-[#f7f8fc] min-h-screen p-4 sm:p-6">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard
          title="Total Risk"
          value={data.totalAudits}
          subtitle="1 critical, 2 open"
          variant="purple"
        />
        <StatCard
          title="Compliance Status"
          value={`${data.completionRate}%`}
          subtitle="2 of 3 compliant"
          variant="green"
        />
        <StatCard
          title="Active Policies"
          value={data.activeAudits}
          subtitle="1 in draft"
          variant="pink"
        />
        <StatCard
          title="Risk Score"
          value={data.closedAudits}
          subtitle="-8 from last month"
          variant="peach"
        />
      </div>

      {/* ── Pie + Bar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">
        {/* Pie */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-3">
            Risk Distribution by Severity
          </h3>

          <div className="w-full h-[220px] sm:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-3">
            Compliance Status Overview
          </h3>

          <div className="w-full h-[220px] sm:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceStatus}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f1f5"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#93c5fd" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Trend ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 mb-5">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-3">
          Risk &amp; Compliance Trends
        </h3>

        <div className="w-full h-[220px] sm:h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f1f5"
                vertical={false}
              />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="compliance"
                stroke="#93c5fd"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* High Priority Risks */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-4">
            High Priority Risks
          </h3>

          <div className="space-y-3">
            {highPriorityRisks.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#ebebf5] rounded-xl px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-bold text-gray-800 truncate">
                      {r.title}
                    </span>
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: severityStyle[r.severity].bg,
                        color: severityStyle[r.severity].text,
                      }}
                    >
                      {r.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{r.assignee}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-4">
            Upcoming Reviews
          </h3>

          <div className="space-y-3">
            {upcomingReviews.map((rev, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#ebebf5] rounded-xl px-4 py-3"
              >
                <div>
                  <p className="text-[14px] font-bold text-gray-800">
                    {rev.title}
                  </p>
                  <p className="text-[11.5px] text-gray-500">{rev.subtitle}</p>
                  <p className="text-[11px] text-gray-400">
                    Next review : {rev.date}
                  </p>
                </div>

                <span
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: statusStyle[rev.status]?.bg,
                    color: statusStyle[rev.status]?.text,
                  }}
                >
                  {rev.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
