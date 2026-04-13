// // app/admin/page.tsx
"use client";

import { useAuth } from "@/components/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardOverview from "@/components/admin/Dashboard/dashboardOverview";

export default function AdminDashboardPage() {
  const { user, loading, initialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. If we are still fetching the user (/auth/me), DO NOTHING.
    if (!initialized || loading) return;

    // 2. If initialization is DONE and there is still no user, then redirect.
    if (!user) {
      router.push("/login");
    }
  }, [user, loading, initialized, router]);

  // 3. DO NOT render the dashboard OR redirect until initialized is true
  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading session...</p>
      </div>
    );
  }

  // 4. If we reach here, initialized is true. If user is still null,
  // the useEffect above will handle the redirect.
  if (!user) return null;

  return (
    <div className="space-y-10">
      <DashboardOverview />
    </div>
  );
}
