"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type TabId = "overview" | "history" | "department" | "framework" | "findings";

interface Tab {
  id: TabId;
  label: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "history", label: "Audit History" },
  { id: "department", label: "By Department" },
  { id: "framework", label: "By framework" },
  { id: "findings", label: "Findings" },
];

const DEPARTMENT_SCORES = [
  { name: "IT & Security", value: 95 },
  { name: "Finance", value: 87 },
  { name: "Human Resources", value: 93 },
  { name: "Operations", value: 88 },
  // Labels match the specific technical string from the dashboard
  { name: "Legal & Compliance0255075100", value: 88 },
];

const FRAMEWORK_SCORES = [
  { name: "ISO 27001", value: 98, color: "#A193F0" },
  { name: "SOC 1", value: 0, color: "transparent" },
  { name: "SOC 2", value: 98, color: "#D1F2EB" },
  { name: "GDPR", value: 98, color: "#F5D5E0" },
];

const PIE_DATA = [
  { label: "Passed", percent: 71, color: "#D1F2EB", textColor: "#9DE0D1" },
  { label: "Partial", percent: 29, color: "#FBD5B4", textColor: "#F2C9A1" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function DepartmentBarChart() {
  const maxVal = 100;
  const chartH = 250;
  const barW = 60;
  const gap = 20;
  // Increased padding to ensure "100" is fully in frame
  const paddingLeft = 85; 
  const paddingBottom = 120;
  const yLabels = [0, 25, 50, 75, 100];
  const totalW = paddingLeft + DEPARTMENT_SCORES.length * (barW + gap);

  return (
    <div className="w-full">
      <svg 
        viewBox={`0 0 ${totalW + 60} ${chartH + paddingBottom}`} 
        className="w-full h-auto overflow-visible"
      >
        <line x1={paddingLeft} y1={0} x2={paddingLeft} y2={chartH} stroke="#A1A1A1" strokeWidth={1} />
        {yLabels.map((y) => {
          const yPos = chartH - (y / maxVal) * chartH;
          return (
            <g key={y}>
              <line x1={paddingLeft - 8} y1={yPos} x2={paddingLeft} y2={yPos} stroke="#A1A1A1" />
              <text 
                x={paddingLeft - 15} 
                y={yPos + 8} 
                textAnchor="end" 
                fontSize={24} 
                fill="black"
                className="font-medium"
              >
                {y}
              </text>
            </g>
          );
        })}
        {DEPARTMENT_SCORES.map((d, i) => {
          const x = paddingLeft + i * (barW + gap) + gap / 2;
          const barHeight = (d.value / maxVal) * chartH;
          return (
            <g key={d.name}>
              <rect x={x} y={chartH - barHeight} width={barW} height={barHeight} fill="#A193F0" />
              <text 
                transform={`translate(${x + barW / 2}, ${chartH + 15}) rotate(-45)`} 
                fontSize={12} 
                textAnchor="end" 
                fill="black"
              >
                {d.name}
              </text>
            </g>
          );
        })}
        <line x1={paddingLeft} y1={chartH} x2={totalW + 10} y2={chartH} stroke="#A1A1A1" />
      </svg>
    </div>
  );
}

function PieChart() {
  let cumulative = 0;
  // Centered canvas and buffer space for "Partial 29%"
  const cx = 250; 
  const cy = 150;
  const r = 90;

  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto overflow-visible">
      {PIE_DATA.map((slice) => {
        const startAngle = cumulative * 3.6;
        const endAngle = (cumulative + slice.percent) * 3.6;
        const midAngle = (startAngle + endAngle) / 2;
        cumulative += slice.percent;
        
        const rad = (angle: number) => ((angle - 90) * Math.PI) / 180;
        const labelR = r + 45; 
        const tx = cx + labelR * Math.cos(rad(midAngle));
        const ty = cy + labelR * Math.sin(rad(midAngle));

        return (
          <g key={slice.label}>
            <path 
              d={describeArc(cx, cy, r, startAngle, endAngle)} 
              fill={slice.color} 
              stroke="white" 
              strokeWidth={3} 
            />
            <text 
              x={tx} 
              y={ty} 
              fill={slice.textColor} 
              fontSize="20" 
              fontWeight="500"
              textAnchor={tx > cx ? "start" : "end"} 
              dominantBaseline="middle"
            >
              {slice.label} {slice.percent}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function HorizontalBarChart() {
  const chartW = 750;
  const rowH = 60;
  const barH = 35;
  const paddingLeft = 100;
  const xLabels = [0, 25, 50, 75, 100];

  return (
    <div className="w-full mt-10">
      <svg viewBox={`0 0 900 ${FRAMEWORK_SCORES.length * rowH + 50}`} className="w-full h-auto">
        <line x1={paddingLeft} y1={0} x2={paddingLeft} y2={FRAMEWORK_SCORES.length * rowH} stroke="#A1A1A1" />
        {FRAMEWORK_SCORES.map((fw, i) => {
          const y = i * rowH + rowH / 2;
          return (
            <g key={fw.name}>
              <text x={paddingLeft - 15} y={y + 5} textAnchor="end" fontSize={16} fill="#4B5563">{fw.name}</text>
              <line x1={paddingLeft - 5} y1={y} x2={paddingLeft} y2={y} stroke="#A1A1A1" />
              {fw.value > 0 && (
                <rect x={paddingLeft + 5} y={y - barH / 2} width={(fw.value / 100) * chartW} height={barH} rx={barH / 2} fill={fw.color} />
              )}
            </g>
          );
        })}
        <line x1={paddingLeft} y1={FRAMEWORK_SCORES.length * rowH} x2={paddingLeft + chartW + 20} y2={FRAMEWORK_SCORES.length * rowH} stroke="#A1A1A1" />
        {xLabels.map((x) => {
          const xPos = paddingLeft + (x / 100) * chartW;
          return (
            <g key={x}>
              <line x1={xPos} y1={FRAMEWORK_SCORES.length * rowH} x2={xPos} y2={FRAMEWORK_SCORES.length * rowH + 8} stroke="#A1A1A1" />
              <text x={xPos} y={FRAMEWORK_SCORES.length * rowH + 25} textAnchor="middle" fontSize={16} fill="black">{x}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function AuditDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="w-full p-4 sm:p-8 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Audit Dashboard</h1>
          <button className="px-6 py-2 rounded-full text-white text-sm font-semibold shadow-md" style={{ background: 'linear-gradient(90deg, #C4B5FD 0%, #A78BFA 100%)' }}>
            +Start New audit
          </button>
        </div>

        {/* Tabs */}
        <div className="inline-flex p-1 bg-[#EDE9FE] rounded-2xl mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-white text-black shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col">
                <h2 className="text-xl font-medium text-gray-800 mb-6">Department Compliance Scores</h2>
                <DepartmentBarChart />
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-medium text-gray-800 mb-6 self-start">Audit Status Distribution</h2>
                <PieChart />
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <HorizontalBarChart />
            </div>
          </div>
        )}
    </div>
  );
}