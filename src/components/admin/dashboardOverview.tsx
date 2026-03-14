"use client";

import dynamic from "next/dynamic";
import StatCard from "@/components/admin/statcard";
import { useAdminDashboard } from "@/components/hooks/useAdminDashboard";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";

const AuditCompletionChart = dynamic(() => import("./auditCompletion"), { ssr: false });

// ── Static chart data ──────────────────────────────────────────────────────────
const riskDistribution = [
  { name: "Critical", value: 33, color: "#f9a8b8" },
  { name: "High",     value: 33, color: "#fde8c8" },
  { name: "Medium",   value: 33, color: "#bdd7f0" },
];

const complianceStatus = [
  { name: "Compliant",     value: 2 },
  { name: "In Progress",   value: 1 },
  { name: "Non-Compliant", value: 0 },
];

const trends = [
  { month: "Jan", risk: 12, compliance: 80 },
  { month: "Feb", risk: 10, compliance: 75 },
  { month: "Mar", risk:  8, compliance: 85 },
  { month: "Apr", risk: 11, compliance: 90 },
  { month: "May", risk:  9, compliance: 88 },
  { month: "Jun", risk:  6, compliance: 95 },
];

const highPriorityRisks = [
  { title: "Data Breach Vulnerability", severity: "Critical", assignee: "Johan Smith" },
  { title: "Compliance Gap in GDPR",    severity: "High",     assignee: "Sarah Johnson" },
];

const upcomingReviews = [
  { title: "SOC 2",     subtitle: "CC6.1- Logical Access Controls",      date: "2026-04-15", status: "Compliant"   },
  { title: "GDPR",      subtitle: "Article 32 - Security of Processing", date: "2026-05-01", status: "In Progress" },
  { title: "ISO 27001", subtitle: "A.9.2- User Access Management",       date: "2026-04-20", status: "Compliant"   },
];

const severityStyle: Record<string, { bg: string; text: string; icon: string }> = {
  Critical: { bg: "#fee2e2", text: "#ef4444", icon: "#ef4444" },
  High:     { bg: "#fef3c7", text: "#d97706", icon: "#f59e0b" },
  Medium:   { bg: "#dbeafe", text: "#2563eb", icon: "#3b82f6" },
};

const statusStyle: Record<string, { bg: string; text: string }> = {
  "Compliant":     { bg: "#ede9fe", text: "#6d28d9" },
  "In Progress":   { bg: "#f3f4f6", text: "#374151" },
  "Non-Compliant": { bg: "#fee2e2", text: "#ef4444" },
};

// ── Component ──────────────────────────────────────────────────────────────────
const DashboardOverview = () => {
  const { data, loading, error } = useAdminDashboard();

  if (loading) return (
    <div className="p-8">
      <p className="text-sm text-gray-400">Loading dashboard...</p>
    </div>
  );

  if (error || !data) return (
    <div className="p-8">
      <p className="text-sm text-red-500">{error || "No data available"}</p>
    </div>
  );

  return (
    <div className="bg-[#f7f8fc] min-h-screen p-6">

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard title="Total Risk"        value={data.totalAudits}          subtitle="1 critical, 2 open"   variant="purple" />
        <StatCard title="Compliance Status" value={`${data.completionRate}%`} subtitle="2 of 3 compliant"     variant="green"  />
        <StatCard title="Active Policies"   value={data.activeAudits}         subtitle="1 in draft"           variant="pink"   />
        <StatCard title="Risk Score"        value={data.closedAudits}         subtitle="-8 from last month"   variant="peach"  />
      </div>

      {/* ── Pie + Bar ── */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-3">Risk Distribution by Severity</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%" cy="50%"
                outerRadius={95}
                paddingAngle={1}
                dataKey="value"
                labelLine={{ stroke: "#d1d5db", strokeWidth: 1 }}
                label={({ cx, cy, midAngle, outerRadius, name, value, index }: {
                  cx: number; cy: number; midAngle: number;
                  outerRadius: number; name: string; value: number; index: number;
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 30;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  const labelColors = ["#f472b6", "#f59e0b", "#93c5fd"];
                  return (
                    <text x={x} y={y} fill={labelColors[index]} textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12} fontWeight={500}>
                      {`${name} ${value}%`}
                    </text>
                  );
                }}
              >
                {riskDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="#fff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, fontSize:12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-3 bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-3">Compliance Status Overview</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={complianceStatus} barSize={125}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
              <XAxis dataKey="name" tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, fontSize:12 }} cursor={{ fill:"rgba(0,0,0,0.03)" }} />
              <Bar dataKey="value" fill="#93c5fd" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Trend ── */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-3">Risk &amp; Compliance Trends</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
            <XAxis dataKey="month" tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left"  tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, fontSize:12 }} />
            <Legend wrapperStyle={{ fontSize:12, color:"#9ca3af", paddingTop:12 }} />
            <Line yAxisId="left"  type="monotone" dataKey="risk"       stroke="#6366f1" strokeWidth={2} dot={false} name="Risk Level" />
            <Line yAxisId="right" type="monotone" dataKey="compliance" stroke="#93c5fd" strokeWidth={2} dot={false} name="Compliance %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-2 gap-4">

        {/* High Priority Risks */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-4">High Priority Risks</h3>
          <div className="space-y-3">
            {highPriorityRisks.map((r, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#ebebf5] rounded-xl px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke={severityStyle[r.severity].icon} strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-bold text-gray-800">{r.title}</span>
                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: severityStyle[r.severity].bg, color: severityStyle[r.severity].text }}
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
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-[13px] font-semibold text-gray-700 mb-4">Upcoming Reviews</h3>
          <div className="space-y-3">
            {upcomingReviews.map((rev, i) => (
              <div key={i} className="flex items-center justify-between gap-3 bg-[#ebebf5] rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <polyline points="9 15 11 17 15 13"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-800 mb-0.5">{rev.title}</p>
                    <p className="text-[11.5px] text-gray-500 mb-0.5">{rev.subtitle}</p>
                    <p className="text-[11px] text-gray-400">Next review : {rev.date}</p>
                  </div>
                </div>
                <span
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0"
                  style={{ background: statusStyle[rev.status]?.bg, color: statusStyle[rev.status]?.text }}
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