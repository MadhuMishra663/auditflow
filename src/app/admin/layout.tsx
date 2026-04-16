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
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, initialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialized && !loading && !user) {
      router.replace("/");
    }
  }, [initialized, loading, user]);

  if (loading || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Preparing dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="md:ml-[358px] flex-1 flex flex-col min-h-screen">
        <AdminTopbar onMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
