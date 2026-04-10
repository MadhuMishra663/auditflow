//

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

  // ======================
  // AUTH GUARD
  // ======================
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/"); // redirect to login
    }
  }, [user, loading, router]);

  // ======================
  // LOADING STATE
  // ======================
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       Loading...
  //     </div>
  //   );
  // }
  if (!initialized) return <div>Loading...</div>;

  // prevent flash of admin UI
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div className="md:ml-[358px] flex-1 flex flex-col min-h-screen">
        <AdminTopbar onMenuOpen={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
