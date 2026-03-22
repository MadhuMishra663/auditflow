"use client";

import { useState } from "react";
import Sidebar from "@/components/common/sidebar";
import AdminTopbar from "@/components/admin/adminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      {/* Sidebar receives drawer state */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content — no left offset on mobile, offset by sidebar width on desktop */}
      <div className="md:ml-[358px] flex-1 flex flex-col min-h-screen">
        {/* Topbar receives the open handler to trigger the drawer */}
        <AdminTopbar onMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}