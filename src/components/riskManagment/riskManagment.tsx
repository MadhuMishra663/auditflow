"use client";
import { useState } from "react";
import Pagination from "@/components/common/pagination";
import { theme } from "@/styles/theme";
import Button from "../common/button";

const allRisks = [
  {
    id: 1,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 2,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 3,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 4,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 5,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 6,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 7,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 8,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 9,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 10,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 11,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 12,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 13,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 14,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 15,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 16,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 17,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 18,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 19,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 20,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 21,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 22,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 23,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 24,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 25,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 26,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 27,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
  {
    id: 28,
    title: "Data Breach Vulnerability",
    description: "Potential security gaps in customer database",
    severity: "Critical",
    status: "Open",
    category: "Security",
    owner: "John Smith",
    created: "2026-02-20",
    avatar: "https://i.pravatar.cc/32?img=1",
  },
  {
    id: 29,
    title: "Compliance Gap in GDPR",
    description: "Missing data processing agreements",
    severity: "High",
    status: "In Progress",
    category: "Compliance",
    owner: "Sarah Johnson",
    created: "2026-02-18",
    avatar: "https://i.pravatar.cc/32?img=5",
  },
  {
    id: 30,
    title: "Third-party Vendor Risk",
    description: "New vendor lacks adequate security controls",
    severity: "Medium",
    status: "Open",
    category: "Vendor",
    owner: "Mike Davis",
    created: "2026-02-15",
    avatar: "https://i.pravatar.cc/32?img=9",
  },
];

const PAGE_SIZE = 3;

// ── EXACT COLORS AS SPECIFIED ──
function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, { bg: string; color: string }> = {
    Critical: { bg: "#EEA9B8", color: "#1a1415" },
    High: { bg: "#F6D6AB", color: "#1a1415" },
    Medium: { bg: "#88C6E1", color: "#1a1415" },
    Low: { bg: "#F1F7F6", color: "#1a1415" },
  };
  const s = styles[severity] || styles.Low;
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        padding: "5px 14px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; color: string; border: string }> =
    {
      Open: { bg: "#FCF5F6", color: "#F1BFCA", border: "1.5px solid #F1BFCA" },
      "In Progress": {
        bg: "#E6F4F9",
        color: "#6bb8d4",
        border: "1.5px solid #E1F1F7",
      },
      Closed: {
        bg: "#F3F3F3",
        color: "#999999",
        border: "1.5px solid #DDDDDD",
      },
    };
  const s = styles[status] || styles.Closed;
  return (
    <span
      style={{
        backgroundColor: s.bg,
        color: s.color,
        border: s.border,
        padding: "5px 14px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

export default function RiskManagment() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showOptionMenu, setShowOptionMenu] = useState(false);
  const [sortBy, setSortBy] = useState("created");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = allRisks.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchSeverity =
      severityFilter === "All" || r.severity === severityFilter;
    const matchCategory =
      categoryFilter === "All" || r.category === categoryFilter;
    return matchSearch && matchSeverity && matchCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "severity") return a.severity.localeCompare(b.severity);
    return b.created.localeCompare(a.created);
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const pageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= Math.min(7, totalPages); i++) pages.push(i);
    return pages;
  };

  return (
    <div
      className="min-h-screen p-4 sm:p-6"
      style={{ backgroundColor: "#F5F5F7" }}
    >
      <div className="max-w-6xl mx-auto space-y-5">
        {/* ── Stat Cards ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ backgroundColor: "#F9F3F6" }}
        >
          <div
            className="rounded-2xl p-5 flex items-center justify-between"
            style={{
              backgroundColor: "#F9F3F6",
              border: "1.5px solid rgb(243, 218, 223)",
            }}
          >
            <div>
              <p className="text-xs mb-2" style={{ color: "#AAAAAA" }}>
                Critical
              </p>
              <p className="text-3xl font-light" style={{ color: "#444444" }}>
                {allRisks.filter((r) => r.severity === "Critical").length}
              </p>
            </div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(249,176,190)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div
            className="rounded-2xl p-5 flex items-center justify-between"
            style={{
              backgroundColor: "rgb(250,245,240)",
              border: "1.5px solid #e8e2d3",
            }}
          >
            <div>
              <p className="text-xs mb-2" style={{ color: "#AAAAAA" }}>
                High
              </p>
              <p className="text-3xl font-light" style={{ color: "#444444" }}>
                {allRisks.filter((r) => r.severity === "High").length}
              </p>
            </div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CF9F33"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div
            className="rounded-2xl p-5 flex items-center justify-between"
            style={{
              backgroundColor: "#EAF2F8",
              border: "1.5px solid #c8e5f6",
            }}
          >
            <div>
              <p className="text-xs mb-2" style={{ color: "#AAAAAA" }}>
                Medium
              </p>
              <p className="text-3xl font-light" style={{ color: "#444444" }}>
                {allRisks.filter((r) => r.severity === "Medium").length}
              </p>
            </div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#96CEEE"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div
            className="rounded-2xl p-5 flex items-center justify-between"
            style={{
              backgroundColor: "#F1F7F6",
              border: "1.5px solid #dae4dd",
            }}
          >
            <div>
              <p className="text-xs mb-2" style={{ color: "#AAAAAA" }}>
                Low
              </p>
              <p className="text-3xl font-light" style={{ color: "#444444" }}>
                {allRisks.filter((r) => r.severity === "Low").length}
              </p>
            </div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C3D4C9"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
        </div>

        {/* ── Risk Register Panel ── */}
        <div
          className="bg-white rounded-2xl p-5 sm:p-8"
          style={{ border: "1.5px solid #E0DBF8" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-lg font-medium" style={{ color: "#222222" }}>
              Risk Register
            </h1>
          </div>

          {/* Search + Sort + Option — ONE LINE */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            {/* Search */}
            <div className="relative w-full sm:flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                type="text"
                placeholder="Search risk..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl focus:outline-none placeholder-gray-300"
                style={{
                  backgroundColor: "#F7F7F9",
                  color: "#555555",
                  border: "1px solid #EEEEEE",
                }}
              />
            </div>
            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSortMenu(!showSortMenu);
                  setShowOptionMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-3 text-sm rounded-2xl whitespace-nowrap"
                style={{
                  backgroundColor: "#F7F7F9",
                  color: "#666666",
                  border: "1px solid #EEEEEE",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BBBBBB"
                  strokeWidth="2"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                sort
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BBBBBB"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showSortMenu && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-44 py-1">
                  {[
                    ["created", "Date Created"],
                    ["title", "Risk Title"],
                    ["severity", "Severity"],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => {
                        setSortBy(val);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${sortBy === val ? "text-violet-500 font-medium" : "text-gray-600"}`}
                    >
                      {label}
                      {sortBy === val && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
              {/* Sort */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => {
                    setShowSortMenu(!showSortMenu);
                    setShowOptionMenu(false);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-2xl"
                  style={{
                    backgroundColor: "#F7F7F9",
                    color: "#666666",
                    border: "1px solid #EEEEEE",
                  }}
                >
                  short
                </button>

                {showSortMenu && (
                  <div className="absolute right-0 mt-1 w-full sm:w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
                    {[
                      ["created", "Date Created"],
                      ["title", "Risk Title"],
                      ["severity", "Severity"],
                    ].map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => {
                          setSortBy(val);
                          setShowSortMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Option */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => {
                    setShowOptionMenu(!showOptionMenu);
                    setShowSortMenu(false);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 text-sm rounded-2xl"
                  style={{
                    backgroundColor: "#F7F7F9",
                    color: "#666666",
                    border: "1px solid #EEEEEE",
                  }}
                >
                  Option
                </button>

                {showOptionMenu && (
                  <div className="absolute right-0 mt-1 w-full sm:w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-2">
                    {/* keep your existing menu content unchanged */}
                  </div>
                )}
              </div>

              {/* Button */}
              <div className="w-full sm:w-auto">
                <Button
                  text="+ Add Risk"
                  onClick={() => console.log("Add Risk clicked")}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </div>

          {/* ── Table Header ── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid #DCD7F8" }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #DCD7F8" }}
            >
              <div
                className="hidden sm:grid gap-4 px-4 py-3"
                style={{
                  gridTemplateColumns: "2.5fr 1fr 1.2fr 1fr 1.3fr 1fr",
                  backgroundColor: "#F7F6FA",
                  borderBottom: "1px solid #DCD7F8",
                }}
              >
                {[
                  "Risk Title",
                  "Severity",
                  "Status",
                  "Category",
                  "Owner",
                  "Created",
                ].map((h) => (
                  <div
                    key={h}
                    className="text-sm font-medium font"
                    style={{ color: "#000000" }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* ── Table Rows Desktop — each row in its own bordered box ── */}
              <div className="hidden sm:block">
                {paginated.length === 0 && (
                  <div
                    className="py-12 text-center"
                    style={{ color: "#AAAAAA" }}
                  >
                    No risks found.
                  </div>
                )}
                {paginated.map((r) => (
                  <div
                    key={r.id}
                    className="grid gap-4 px-4 py-4 items-center"
                    style={{
                      gridTemplateColumns: "2.5fr 1fr 1.2fr 1fr 1.3fr 1fr",
                      border: "1px solid #F0F0F0",
                    }}
                  >
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "#222222" }}
                      >
                        {r.title}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#6d6d6d" }}
                      >
                        {r.description}
                      </p>
                    </div>
                    <div>
                      <SeverityBadge severity={r.severity} />
                    </div>
                    <div>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="text-sm" style={{ color: "#000000" }}>
                      {r.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={r.avatar}
                        alt={r.owner}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <span className="text-sm" style={{ color: "#000000" }}>
                        {r.owner}
                      </span>
                    </div>
                    <div className="text-sm" style={{ color: "#BBBBBB" }}>
                      {r.created}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Cards Mobile ── */}
              <div className="sm:hidden space-y-3 mt-3">
                {paginated.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl p-4 space-y-2"
                    style={{ border: "1px solid #F0F0F0" }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "#222222" }}
                        >
                          {r.title}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#BBBBBB" }}
                        >
                          {r.description}
                        </p>
                      </div>
                      <SeverityBadge severity={r.severity} />
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-xs">
                      <StatusBadge status={r.status} />
                      <span style={{ color: "#DDDDDD" }}>•</span>
                      <span style={{ color: "#888888" }}>{r.category}</span>
                      <span style={{ color: "#DDDDDD" }}>•</span>
                      <div className="flex items-center gap-1">
                        <img
                          src={r.avatar}
                          alt={r.owner}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span style={{ color: "#888888" }}>{r.owner}</span>
                      </div>
                      <span style={{ color: "#DDDDDD" }}>•</span>
                      <span style={{ color: "#AAAAAA" }}>{r.created}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Pagination ── */}
              <Pagination
                currentPage={currentPage}
                totalItems={sorted.length}
                itemsPerPage={PAGE_SIZE}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
