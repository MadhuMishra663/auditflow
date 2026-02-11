"use client";

import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, Building2, Shield } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[#6B9AC4] mb-8">AuditFlow</h2>

      <nav className="space-y-4">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-3 text-gray-700 hover:text-[#6B9AC4]"
        >
          <LayoutDashboard /> Dashboard
        </button>

        <button
          onClick={() => router.push("/admin/users")}
          className="flex items-center gap-3 text-gray-700 hover:text-[#6B9AC4]"
        >
          <Users /> User Management
        </button>

        <button
          onClick={() => router.push("/admin/auditors")}
          className="flex items-center gap-3 text-gray-700 hover:text-[#6B9AC4]"
        >
          <Shield /> Auditors
        </button>

        <button
          onClick={() => router.push("/admin/departments")}
          className="flex items-center gap-3 text-gray-700 hover:text-[#6B9AC4]"
        >
          <Building2 /> Departments
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
