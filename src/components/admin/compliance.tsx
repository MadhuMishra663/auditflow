"use client";

import { useState, useEffect, useRef } from "react";
// Add this import at the top
import Pagination from "@/components/common/pagination";

// Types

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Status = "Compliant" | "In Progress" | "Non-Compliant";
type Framework = "SOC 2" | "GDPR" | "ISO 27001" | "PCI DSS";

interface Control {
  id: number;
  framework: Framework;
  control: string;
  status: Status;
  owner: string;
  lastReview: string;
  nextReview: string;
}


// Mock Data
const allControls: Control[] = [
  { id: 1,  framework: "SOC 2",     control: "CC6.1 – Logical Access Controls",         status: "Compliant",     owner: "Security Team", lastReview: "2026-01-15", nextReview: "2026-04-15" },
  { id: 2,  framework: "GDPR",      control: "Article 32 – Security of Processing",     status: "In Progress",   owner: "Privacy Team",  lastReview: "2026-02-01", nextReview: "2026-05-01" },
  { id: 3,  framework: "ISO 27001", control: "Article 32 – Security of Processing",     status: "Compliant",     owner: "IT Team",       lastReview: "2026-01-20", nextReview: "2026-04-20" },
  { id: 4,  framework: "SOC 2",     control: "CC7.2 – System Monitoring",               status: "Compliant",     owner: "Security Team", lastReview: "2026-01-18", nextReview: "2026-04-18" },
  { id: 5,  framework: "GDPR",      control: "Article 25 – Data Protection by Design",  status: "Non-Compliant", owner: "Privacy Team",  lastReview: "2026-01-10", nextReview: "2026-04-10" },
  { id: 6,  framework: "PCI DSS",   control: "Req 8 – Identify and Authenticate",       status: "In Progress",   owner: "IT Team",       lastReview: "2026-02-05", nextReview: "2026-05-05" },
  { id: 7,  framework: "ISO 27001", control: "A.9.1 – Access Control Policy",           status: "Compliant",     owner: "IT Team",       lastReview: "2026-01-25", nextReview: "2026-04-25" },
  { id: 8,  framework: "SOC 2",     control: "CC6.6 – Logical Access Security",         status: "In Progress",   owner: "Security Team", lastReview: "2026-02-10", nextReview: "2026-05-10" },
  { id: 9,  framework: "GDPR",      control: "Article 33 – Breach Notification",        status: "Compliant",     owner: "Privacy Team",  lastReview: "2026-01-30", nextReview: "2026-04-30" },
  { id: 10, framework: "PCI DSS",   control: "Req 6 – Secure Systems and Software",     status: "Compliant",     owner: "IT Team",       lastReview: "2026-02-08", nextReview: "2026-05-08" },
  { id: 11, framework: "SOC 2",     control: "CC8.1 – Change Management",               status: "Compliant",     owner: "Security Team", lastReview: "2026-01-22", nextReview: "2026-04-22" },
  { id: 12, framework: "ISO 27001", control: "A.12.6 – Technical Vulnerability Mgmt",   status: "In Progress",   owner: "IT Team",       lastReview: "2026-02-03", nextReview: "2026-05-03" },
  { id: 13, framework: "GDPR",      control: "Article 30 – Records of Processing",      status: "Compliant",     owner: "Privacy Team",  lastReview: "2026-01-28", nextReview: "2026-04-28" },
  { id: 14, framework: "PCI DSS",   control: "Req 10 – Log and Monitor Access",         status: "Non-Compliant", owner: "IT Team",       lastReview: "2026-01-12", nextReview: "2026-04-12" },
  { id: 15, framework: "SOC 2",     control: "A1.1 – Availability Principles",          status: "Compliant",     owner: "Security Team", lastReview: "2026-02-15", nextReview: "2026-05-15" },
];

const frameworkTabs: ("All frameworks" | Framework)[] = [
  "All frameworks", "SOC 2", "GDPR", "ISO 27001", "PCI DSS",
];

const PAGE_SIZE = 3;
const DISPLAY_TOTAL_PAGES = 10;

// Status config
const statusConfig: Record<Status, { bg: string; text: string; border: string }> = {
  "Compliant":     { bg: "bg-emerald-50",  text: "text-emerald-600", border: "border-emerald-200" },
  "In Progress":   { bg: "bg-sky-50",      text: "text-sky-500",     border: "border-sky-200"     },
  "Non-Compliant": { bg: "bg-rose-50",     text: "text-rose-500",    border: "border-rose-200"    },
};

function complianceForFramework(fw: Framework) {
  const relevant = allControls.filter((c) => c.framework === fw);
  if (relevant.length === 0) return { pct: 0, compliant: 0, total: 0 };
  const compliant = relevant.filter((c) => c.status === "Compliant").length;
  return { pct: Math.round((compliant / relevant.length) * 100), compliant, total: relevant.length };
}
// Animated counter hook

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}
// Animated progress bar
// ─────────────────────────────────────────────
function AnimatedBar({ pct, color = "bg-violet-500" }: { pct: number; color?: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

// SVG Icons
// ─────────────────────────────────────────────
const TrendUpIcon = () => (
  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const XCircleIcon = () => (
  <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const UploadIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);
const FilterIcon = () => (
  <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);
const ChevronLeftIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
// StatCard with fade-in + count-up
// ─────────────────────────────────────────────
function StatCard({
  label, rawValue, icon, progress, cardBg, iconBg, delay = 0,
}: {
  label: string;
  rawValue: number;
  icon: React.ReactNode;
  progress?: number;
  cardBg: string;
  iconBg: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const counted = useCountUp(visible ? rawValue : 0, 900);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const display = label === "Compliance Rate" ? `${counted}%` : counted;

  return (
    <div
      className={`rounded-xl border border-slate-100 ${cardBg} px-4 py-3.5 flex items-start justify-between gap-2
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800 leading-tight tabular-nums">{display}</p>
        {progress !== undefined && (
          <div className="mt-1.5 h-1.5 w-24 rounded-full bg-white/70 overflow-hidden">
            <AnimatedBar pct={visible ? progress : 0} color="bg-violet-500" />
          </div>
        )}
      </div>
      <div className={`rounded-full p-1.5 ${iconBg} mt-0.5`}>{icon}</div>
    </div>
  );
}

// StatusBadge
// ─────────────────────────────────────────────
function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      {status}
    </span>
  );
}

// FrameworkCard with slide-up + animated bar
// ─────────────────────────────────────────────
function FrameworkCard({ fw, delay = 0 }: { fw: Framework; delay?: number }) {
  const { pct, compliant, total } = complianceForFramework(fw);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-3
        transition-all duration-500 ease-out hover:shadow-md hover:-translate-y-0.5
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{fw}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-extrabold text-slate-800 tabular-nums">{pct}%</span>
        <span className="text-xs text-slate-400">compliant</span>
      </div>
      <AnimatedBar pct={visible ? pct : 0} />
      <p className="text-xs text-slate-400">{compliant} of {total} controls</p>
    </div>
  );
}

// Dropdown
// ─────────────────────────────────────────────
function Dropdown({ value, options, open, onToggle, onSelect }: {
  value: string;
  options: string[];
  open: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onSelect: (v: string, e: React.MouseEvent) => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
      >
        <FilterIcon />
        <span>{value}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 animate-fadeIn">
          {options.map((o) => (
            <button
              key={o}
              onClick={(e) => onSelect(o, e)}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 transition-colors ${value === o ? "text-violet-600 font-semibold" : "text-slate-600"}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Table row with fade-in
// ─────────────────────────────────────────────
function TableRow({ c, index }: { c: Control; index: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <tr
      className={`border-b border-slate-50 hover:bg-violet-50/30 transition-all duration-300
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
    >
      <td className="px-5 py-3">
        <span className="inline-flex px-2 py-0.5 rounded border border-slate-200 text-xs font-medium text-slate-600 bg-white">
          {c.framework}
        </span>
      </td>
      <td className="px-5 py-3 text-xs text-slate-700 whitespace-nowrap">{c.control}</td>
      <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
      <td className="px-5 py-3 text-xs text-slate-500 whitespace-nowrap">{c.owner}</td>
      <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap tabular-nums">{c.lastReview}</td>
      <td className="px-5 py-3 text-xs text-slate-400 whitespace-nowrap tabular-nums">{c.nextReview}</td>
    </tr>
  );
}

// Main Page
// ─────────────────────────────────────────────

export default function ComplianceDashboard() {
  const [activeTab, setActiveTab]     = useState<"All frameworks" | Framework>("All frameworks");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOpen, setSortOpen]       = useState(false);
  const [optionOpen, setOptionOpen]   = useState(false);
  const [sortValue, setSortValue]     = useState("short");
  const [optionValue, setOptionValue] = useState("Option");
  const [pageKey, setPageKey]         = useState(0); // force re-animate on page change

  const compliantCount    = allControls.filter((c) => c.status === "Compliant").length;
  const inProgressCount   = allControls.filter((c) => c.status === "In Progress").length;
  const nonCompliantCount = allControls.filter((c) => c.status === "Non-Compliant").length;
  const overallPct = allControls.length > 0 ? Math.round((compliantCount / allControls.length) * 100) : 0;

  const filtered = activeTab === "All frameworks"
    ? allControls
    : allControls.filter((c) => c.framework === activeTab);

  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleTabChange = (tab: "All frameworks" | Framework) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setPageKey((k) => k + 1);
  };

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    setPageKey((k) => k + 1);
  };

  const closeAll = () => { setSortOpen(false); setOptionOpen(false); };

  const frameworkCards: Framework[] = ["SOC 2", "GDPR", "ISO 27001", "PCI DSS"];

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.15s ease-out forwards; }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-sans" onClick={closeAll}>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5 space-y-4">

          {/* ── 1. Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard label="Compliance Rate" rawValue={overallPct} progress={overallPct}
              cardBg="bg-emerald-50/80" iconBg="bg-emerald-100" icon={<TrendUpIcon />} delay={0} />
            <StatCard label="Compliant" rawValue={compliantCount}
              cardBg="bg-emerald-50/40" iconBg="bg-emerald-100" icon={<CheckCircleIcon />} delay={80} />
            <StatCard label="In Progress" rawValue={inProgressCount}
              cardBg="bg-sky-50/50" iconBg="bg-sky-100" icon={<ClockIcon />} delay={160} />
            <StatCard label="Non-compliant" rawValue={nonCompliantCount}
              cardBg="bg-rose-50/50" iconBg="bg-rose-100" icon={<XCircleIcon />} delay={240} />
          </div>

          {/* ── 2. Framework Cards (SOC cards above table) ── */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {frameworkCards.slice(0, 3).map((fw, i) => (
              <FrameworkCard key={fw} fw={fw} delay={i * 100} />
            ))}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <FrameworkCard fw="PCI DSS" delay={300} />
          </div>

          {/* ── 3. Compliance Controls Table ── */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Top bar */}
            <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700">Compliance Controls</h2>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-xs font-semibold transition-all duration-150 shadow-sm hover:shadow-md">
                <UploadIcon />
                Upload
              </button>
            </div>

            {/* Tabs + filters */}
            <div className="px-5 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100">
              <div className="flex flex-wrap gap-1.5">
                {frameworkTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-violet-100 text-violet-700 scale-105"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Dropdown
                  value={sortValue}
                  options={["short", "A → Z", "Z → A", "Newest"]}
                  open={sortOpen}
                  onToggle={(e) => { e.stopPropagation(); setSortOpen(!sortOpen); setOptionOpen(false); }}
                  onSelect={(v, e) => { e.stopPropagation(); setSortValue(v); setSortOpen(false); }}
                />
                <Dropdown
                  value={optionValue}
                  options={["Option", "Compliant", "In Progress", "Non-Compliant"]}
                  open={optionOpen}
                  onToggle={(e) => { e.stopPropagation(); setOptionOpen(!optionOpen); setSortOpen(false); }}
                  onSelect={(v, e) => { e.stopPropagation(); setOptionValue(v); setOptionOpen(false); }}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Framework", "Control", "Status", "Owner", "Last Review", "Next Review"].map((h) => (
                      <th key={h} className="px-5 py-2.5 text-left text-xs font-medium text-slate-400 whitespace-nowrap bg-white">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody key={`${activeTab}-${pageKey}`}>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">
                        No controls found.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((c, i) => <TableRow key={c.id} c={c} index={i} />)
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── 4. Pagination ── */}
          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            itemsPerPage={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
=======
          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all active:scale-95"
            >
              <ChevronLeftIcon /> Previous
            </button>

            {[1, 2, 3, 4, 5, 6, 7].map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-all active:scale-90 ${
                  currentPage === p
                    ? "bg-violet-600 text-white shadow-sm scale-105"
                    : "text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 hover:border-violet-300"
                }`}
              >
                {p}
              </button>
            ))}

            <span className="px-1 text-slate-300 text-xs select-none tracking-widest">·········</span>

            <button
              onClick={() => handlePageChange(DISPLAY_TOTAL_PAGES)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all active:scale-90 ${
                currentPage === DISPLAY_TOTAL_PAGES
                  ? "bg-violet-600 text-white shadow-sm scale-105"
                  : "text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 hover:border-violet-300"
              }`}
            >
              {DISPLAY_TOTAL_PAGES}
            </button>

            <button
              onClick={() => handlePageChange(Math.min(DISPLAY_TOTAL_PAGES, currentPage + 1))}
              disabled={currentPage === DISPLAY_TOTAL_PAGES}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all active:scale-95"
            >
              Next <ChevronRightIcon />
            </button>
          </div>

        </main>
      </div>
    </>
  );
}