"use client";

import { useState } from "react";
import { DepartmentCard } from "./DepartmentCard";
import { DEPARTMENTS } from "./data";

export function DepartmentsPage() {
  const [query, setQuery] = useState("");

  const filtered = DEPARTMENTS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 max-w-[1200px]">

      {/* Page header */}
    
      <p className="text-sm text-gray-500 mb-6">
        View employee data and completion rates for each department.
      </p>

      {/* Search */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 mb-6  w-full max-w-lg bg-white">
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search departments..."
          className="text-sm outline-none flex-1 bg-transparent text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((dept) => (
          <DepartmentCard key={dept.name} {...dept} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 mt-10 text-center">
          No departments found for "{query}"
        </p>
      )}

    </div>
  );
}