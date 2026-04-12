"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/common/sidebar";
import AdminTopbar from "@/components/admin/adminTopbar";
import { useAuth } from "@/components/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("ADMIN LAYOUT LOADED");

  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, initialized } = useAuth();
  const router = useRouter();

  // 🔥 SAFE REDIRECT (no race condition)
  useEffect(() => {
    if (!initialized) return;

    if (initialized && user === null) {
      router.replace("/");
    }
  }, [initialized, user, router]);

  // 🔥 LOADING STATE (only wait for auth init)
  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // ❌ DO NOT BLOCK UI HERE (important fix)
  // if (!user) return ...  ❌ REMOVED

  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <div className="md:ml-[358px] flex-1 flex flex-col min-h-screen">
        <AdminTopbar onMenuOpen={() => setMobileOpen(true)} />

        {/* 🔥 ALWAYS RENDER CHILDREN */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
