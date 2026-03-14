"use client";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────────

const riskDistribution = [
  { name: "Critical", value: 33, color: "#f87171" },
  { name: "High",     value: 33, color: "#fbbf24" },
  { name: "Medium",   value: 33, color: "#93c5fd" },
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
  { title: "SOC 2",     subtitle: "COI1- Logical Access Controls",       date: "2026-04-15", status: "Compliant"   },
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

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, icon, accent,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ReactNode; accent: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-label">{label}</span>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <div className="stat-value" style={{ color: accent }}>{value}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────────────

function Topbar() {
  return (
    <div className="topbar">
      <h1 className="topbar-title">Dashboard</h1>
      <div className="topbar-right">
        {/* Bell */}
        <div className="topbar-bell">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>

        {/* User */}
        <div className="topbar-user">
          <div className="topbar-avatar">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <div className="topbar-name">Johan Admin</div>
            <div className="topbar-role">Organization Administrator</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-wrap {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f7f8fc;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Topbar ── */
        .topbar {
          background: #ffffff;
          border-bottom: 1px solid #e8eaf0;
          padding: 0 28px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .topbar-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.3px;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .topbar-bell {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 6px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .topbar-bell:hover { background: #f3f4f6; }
        .topbar-user {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .topbar-user:hover { background: #f3f4f6; }
        .topbar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ede9fe;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .topbar-name {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          line-height: 1.3;
        }
        .topbar-role {
          font-size: 11px;
          color: #9ca3af;
          line-height: 1.3;
        }

        /* ── Main body ── */
        .dash-body {
          padding: 22px 26px 32px;
          flex: 1;
        }

        /* ── Stat grid ── */
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }
        .stat-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 12px;
          padding: 18px 20px;
          transition: box-shadow 0.18s;
        }
        .stat-card:hover {
          box-shadow: 0 3px 14px rgba(0,0,0,0.07);
        }
        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .stat-label {
          font-size: 10.5px;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .stat-value {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 5px;
        }
        .stat-sub {
          font-size: 11.5px;
          color: #9ca3af;
        }

        /* ── Charts row ── */
        .charts-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 14px;
          margin-bottom: 18px;
        }
        .chart-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 12px;
          padding: 20px;
        }
        .chart-title {
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 14px;
        }

        /* ── Trend card ── */
        .trend-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 18px;
        }

        /* ── Bottom row ── */
        .bottom-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .bottom-card {
          background: #ffffff;
          border: 1px solid #e8eaf0;
          border-radius: 12px;
          padding: 20px;
        }

        /* ── Risk items ── */
        .risk-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 13px;
          border-radius: 9px;
          background: #f9f9fb;
          border: 1px solid #f0f1f5;
          margin-bottom: 10px;
        }
        .risk-item:last-child { margin-bottom: 0; }
        .risk-name {
          font-size: 13px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 2px;
        }
        .risk-assignee { font-size: 11.5px; color: #9ca3af; }
        .sev-badge {
          margin-left: auto;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          flex-shrink: 0;
        }

        /* ── Review items ── */
        .review-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f1f5;
        }
        .review-item:last-child { border-bottom: none; padding-bottom: 0; }
        .review-title {
          font-size: 13px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 3px;
        }
        .review-sub { font-size: 11.5px; color: #9ca3af; }
        .review-date { font-size: 11px; color: #d1d5db; margin-top: 3px; }
        .status-badge {
          flex-shrink: 0;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 11px;
          border-radius: 20px;
          margin-top: 2px;
        }

        /* recharts */
        .recharts-tooltip-wrapper { outline: none !important; }

        @media (max-width: 960px) {
          .stat-grid { grid-template-columns: repeat(2,1fr); }
          .charts-row, .bottom-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-wrap">
        <Topbar />

        <div className="dash-body">

          {/* ── Stat Cards ── */}
          <div className="stat-grid">
            <StatCard
              label="Total Risk" value="3" sub="1critical, 2 open"
              accent="#ef4444"
              icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
            />
            <StatCard
              label="Compliance Status" value="67%" sub="2 of 3 compliant"
              accent="#6366f1"
              icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
            />
            <StatCard
              label="Active Policies" value="2" sub="1 in draft"
              accent="#10b981"
              icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>}
            />
            <StatCard
              label="Risk Score" value="72" sub="-8 from last month"
              accent="#f59e0b"
              icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
            />
          </div>

          {/* ── Pie + Bar ── */}
          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-title">Risk Distribution by Severity</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%" cy="50%"
                    innerRadius={45} outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                    labelLine={false}
                  >
                    {riskDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, fontSize:12, color:"#374151" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-title">Compliance Status Overview</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={complianceStatus} barSize={68}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, fontSize:12 }}
                    cursor={{ fill:"rgba(0,0,0,0.03)" }}
                  />
                  <Bar dataKey="value" fill="#93c5fd" radius={[5,5,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Trend ── */}
          <div className="trend-card">
            <div className="chart-title">Risk &amp; Compliance Trends</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
                <XAxis dataKey="month" tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left"  tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill:"#9ca3af", fontSize:11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background:"#fff", border:"1px solid #e8eaf0", borderRadius:8, fontSize:12 }}
                />
                <Legend wrapperStyle={{ fontSize:12, color:"#9ca3af", paddingTop:12 }} />
                <Line yAxisId="left"  type="monotone" dataKey="risk"       stroke="#6366f1" strokeWidth={2} dot={false} name="Risk Level" />
                <Line yAxisId="right" type="monotone" dataKey="compliance" stroke="#93c5fd" strokeWidth={2} dot={false} name="Compliance %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ── Bottom Row ── */}
          <div className="bottom-row">

            {/* High Priority Risks */}
            <div className="bottom-card">
              <div className="chart-title">High Priority Risks</div>
              {highPriorityRisks.map((r, i) => (
                <div className="risk-item" key={i}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={severityStyle[r.severity].icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  </svg>
                  <div>
                    <div className="risk-name">{r.title}</div>
                    <div className="risk-assignee">{r.assignee}</div>
                  </div>
                  <span
                    className="sev-badge"
                    style={{ background: severityStyle[r.severity].bg, color: severityStyle[r.severity].text }}
                  >
                    {r.severity}
                  </span>
                </div>
              ))}
            </div>

            {/* Upcoming Reviews */}
            <div className="bottom-card">
              <div className="chart-title">Upcoming Reviews</div>
              {upcomingReviews.map((rev, i) => (
                <div className="review-item" key={i}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:9 }}>
                    <svg style={{ marginTop:2, flexShrink:0 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <div>
                      <div className="review-title">{rev.title}</div>
                      <div className="review-sub">{rev.subtitle}</div>
                      <div className="review-date">Next review · {rev.date}</div>
                    </div>
                  </div>
                  <span
                    className="status-badge"
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
    </>
  );
}