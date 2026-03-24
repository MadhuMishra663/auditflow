"use client";
import { useState } from "react";

const policies = [
  { id: 1,  title: "Information Security Policy", version: "2.1", category: "Security",   status: "Active", approvedBy: "CEO",     approvedDate: "2026-01-01" },
  { id: 2,  title: "Data Privacy Policy",          version: "1.5", category: "Privacy",    status: "Active", approvedBy: "CPO",     approvedDate: "2026-01-15" },
  { id: 3,  title: "Incident Response Plan",        version: "3.0", category: "Security",   status: "Draft",  approvedBy: "Pending", approvedDate: "N/A" },
  { id: 4,  title: "Business Continuity Plan",      version: "1.2", category: "Operations", status: "Active", approvedBy: "COO",     approvedDate: "2026-01-10" },
  { id: 5,  title: "Access Control Policy",         version: "2.3", category: "Security",   status: "Draft",  approvedBy: "Pending", approvedDate: "N/A" },
  { id: 6,  title: "Data Retention Policy",         version: "1.0", category: "Compliance", status: "Active", approvedBy: "CLO",     approvedDate: "2026-01-20" },
  { id: 7,  title: "Vendor Management Policy",      version: "1.1", category: "Vendor",     status: "Draft",  approvedBy: "Pending", approvedDate: "N/A" },
  { id: 8,  title: "Change Management Policy",      version: "2.0", category: "Operations", status: "Active", approvedBy: "CTO",     approvedDate: "2026-01-05" },
  { id: 9,  title: "Encryption Policy",             version: "1.4", category: "Security",   status: "Active", approvedBy: "CISO",    approvedDate: "2026-01-18" },
  { id: 10, title: "Acceptable Use Policy",         version: "3.1", category: "Compliance", status: "Draft",  approvedBy: "Pending", approvedDate: "N/A" },
  { id: 11, title: "Password Policy",               version: "2.2", category: "Security",   status: "Active", approvedBy: "CISO",    approvedDate: "2026-01-12" },
  { id: 12, title: "Remote Work Policy",            version: "1.3", category: "Operations", status: "Draft",  approvedBy: "Pending", approvedDate: "N/A" },
];

const PAGE_SIZE = 5;

function StatusBadge({ status }: { status: string }) {
  return (
    <span style={{
      backgroundColor: "#E6F6F2",
      color: "#1B4861",
      border: "1.5px solid #B8F4E5",
      padding: "5px 16px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: 400,
      whiteSpace: "nowrap" as const,
    }}>
      {status}
    </span>
  );
}

function VersionBadge({ version }: { version: string }) {
  return (
    <span style={{
      color: "#000000",
      border: "1.5px solid #DCD7F8",
      padding: "4px 14px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: 400,
      whiteSpace: "nowrap" as const,
      backgroundColor: "#FFFFFF",
    }}>
      {version}
    </span>
  );
}

export default function PoliciesTable() {
  const [search, setSearch]                 = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter]     = useState("All");
  const [showSortMenu, setShowSortMenu]     = useState(false);
  const [showOptionMenu, setShowOptionMenu] = useState(false);
  const [sortBy, setSortBy]                 = useState("title");
  const [currentPage, setCurrentPage]       = useState(1);

  const filtered = policies.filter((p) => {
    const matchSearch   = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchStatus   = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "version") return a.version.localeCompare(b.version);
    if (sortBy === "status")  return a.status.localeCompare(b.status);
    return a.title.localeCompare(b.title);
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated  = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const pageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8" style={{ border: "1.5px solid #E0DBF8" }}>
      {/* ── Row 1: Add + Sort + Option ── */}
      <div className="flex items-center justify-end gap-3 mb-5">

        <button
          className="px-8 py-2.5 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: "#B4A0E9", color: "#FFFFFF" }}>
          Add
        </button>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => { setShowSortMenu(!showSortMenu); setShowOptionMenu(false); }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl whitespace-nowrap"
            style={{ backgroundColor: "#FFFFFF", color: "#000000", border: "1px solid #DCD7F8" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Sort
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {showSortMenu && (
            <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-lg z-20 w-44 py-1"
              style={{ border: "1px solid #DCD7F8" }}>
              {[["title","Policy Title"],["version","Version"],["status","Status"]].map(([val, label]) => (
                <button key={val} onClick={() => { setSortBy(val); setShowSortMenu(false); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                  style={{ color: sortBy === val ? "#8B6FD4" : "#000000", fontWeight: sortBy === val ? 600 : 400 }}>
                  {label}
                  {sortBy === val && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B6FD4" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Option */}
        <div className="relative">
          <button
            onClick={() => { setShowOptionMenu(!showOptionMenu); setShowSortMenu(false); }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl whitespace-nowrap"
            style={{ backgroundColor: "#FFFFFF", color: "#000000", border: "1px solid #DCD7F8" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Option
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {showOptionMenu && (
            <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-lg z-20 w-48 py-2"
              style={{ border: "1px solid #DCD7F8" }}>
              <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "#000000" }}>Status</p>
              {["All", "Active", "Draft"].map((s) => (
                <button key={s} onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                  style={{ color: statusFilter === s ? "#8B6FD4" : "#000000", fontWeight: statusFilter === s ? 600 : 400 }}>
                  {s === "All" ? "All Statuses" : s}
                  {statusFilter === s && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B6FD4" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ))}
              <hr className="my-2" style={{ borderColor: "#DCD7F8" }} />
              <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "#000000" }}>Category</p>
              {["All", "Security", "Privacy", "Compliance", "Operations", "Vendor"].map((c) => (
                <button key={c} onClick={() => { setCategoryFilter(c); setCurrentPage(1); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
                  style={{ color: categoryFilter === c ? "#8B6FD4" : "#000000", fontWeight: categoryFilter === c ? 600 : 400 }}>
                  {c === "All" ? "All Categories" : c}
                  {categoryFilter === c && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B6FD4" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="flex items-center gap-3 mb-6">
      <div className="relative flex-1">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2" 
             width="15" 
             height="15" 
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="#000000" 
             strokeWidth="2" 
             strokeLinecap="round">
             <circle cx="11" cy="11" r="8"/>
             <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search policies..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl focus:outline-none placeholder-black"
          style={{
            backgroundColor: "#F7F6FA",
            color: "#000000",
          }}
        />
      </div>
      </div>
      {/* ── Inner Table Box ── */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #DCD7F8" }}>

        {/* Table Header */}
        <div className="hidden sm:grid gap-4 px-4 py-3"
          style={{ gridTemplateColumns: "2.5fr 0.8fr 1fr 1fr 1fr 1.2fr 0.8fr", backgroundColor: "#F7F6FA", borderBottom: "1px solid #DCD7F8" }}>
          {["Policy Title", "Version", "Category", "Status", "Approved By", "Approved Date", "Actions"].map((h) => (
            <div key={h} className="text-xs font-medium" style={{ color: "#000000" }}>{h}</div>
          ))}
        </div>

        {/* Table Rows — Desktop */}
        <div className="hidden sm:block">
          {paginated.length === 0 && (
            <div className="py-12 text-center" style={{ color: "#000000" }}>No policies found.</div>
          )}
          {paginated.map((p, idx) => (
            <div key={p.id}
              className="grid gap-4 px-5 py-4 items-center hover:bg-purple-50 transition-colors"
              style={{
                gridTemplateColumns: "2.5fr 0.8fr 1fr 1fr 1fr 1.2fr 0.8fr",
                borderBottom: idx !== paginated.length - 1 ? "1px solid #DCD7F8" : "none",
              }}>
              <div className="text-sm font-medium" style={{ color: "#000000" }}>{p.title}</div>
              <div><VersionBadge version={p.version} /></div>
              <div className="text-sm" style={{ color: "#000000" }}>{p.category}</div>
              <div><StatusBadge status={p.status} /></div>
              <div className="text-sm" style={{ color: "#6B6B6B" }}>{p.approvedBy}</div>
              <div className="text-sm" style={{ color: "#6B6B6B" }}>{p.approvedDate}</div>
              <div className="flex items-center gap-3">
                {/* Eye icon — dark filled style */}
                <button className="hover:opacity-60 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C7.5 5 3.73 7.61 2 12c1.73 4.39 5.5 7 10 7s8.27-2.61 10-7c-1.73-4.39-5.5-7-10-7z" fill="#4B4B4B"/>
                    <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
                    <circle cx="12" cy="12" r="1.5" fill="#4B4B4B"/>
                  </svg>
                </button>
                {/* Download icon */}
                <button className="hover:opacity-60 transition-opacity">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cards — Mobile */}
        <div className="sm:hidden divide-y" style={{ borderColor: "#DCD7F8" }}>
          {paginated.map((p) => (
            <div key={p.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-sm" style={{ color: "#000000" }}>{p.title}</p>
                <StatusBadge status={p.status} />
              </div>
              <div className="flex flex-wrap gap-2 text-xs items-center" style={{ color: "#000000" }}>
                <VersionBadge version={p.version} />
                <span>•</span>
                <span>{p.category}</span>
                <span>•</span>
                <span>{p.approvedBy}</span>
                <span>•</span>
                <span>{p.approvedDate}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between mt-6 pt-2">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
          className="flex items-center gap-1 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: "#000000" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Previous
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers().map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)}
              className="w-10 h-10 text-sm font-medium transition-colors rounded-full"
              style={currentPage === page
                ? { backgroundColor: "#EDE8F9", color: "#8B6FD4", fontWeight: 600 }
                : { color: "#000000" }}>
              {page}
            </button>
          ))}
        </div>

        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
          className="flex items-center gap-1 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ color: "#000000" }}>
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}