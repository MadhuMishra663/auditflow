"use client";

import DashboardOverview from "@/components/admin/dashboardOverview";

export default function AdminDashboardPage() {
  console.log("🔥 DASHBOARD PAGE RENDERED");

  return (
    <div className="flex">
      <main className="flex-1 p-8 bg-[#E8F1F8]">
        <DashboardOverview />
      </main>
    </div>
  );
}
