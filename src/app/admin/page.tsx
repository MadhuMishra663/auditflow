// "use client";

// import DashboardOverview from "@/components/admin/Dashboard/dashboardOverview";
// //import AuditorManagement from "@/components/admin/auditorManagement";
// import { useAuth } from "@/components/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AdminDashboardPage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   console.log(user?.role);
//   useEffect(() => {
//     if (loading) return;
//     if (!user) {
//       router.push("/login"); // optional
//       return;
//     }
//     const role = user.role?.toUpperCase() || "";
//     if (!role.includes("ADMIN")) {
//       router.push("/");
//     }
//   }, [user, loading, router]);

//   if (!user) return null;
//   return (
//     <div className="space-y-10">
//       <DashboardOverview />
//     </div>
//   );
// }

"use client";

import DashboardOverview from "@/components/admin/Dashboard/dashboardOverview";
import { useAuth } from "@/components/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log("ADMIN PAGE RENDER");

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }
    console.log("USER:", user);
    console.log("LOADING:", loading);
    const role = user.role?.toUpperCase() || "";

    if (!role.includes("ADMIN")) {
      router.push("/");
    }
  }, [user, loading, router]);

  // ✅ WAIT for auth
  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  // ✅ only block AFTER loading
  if (!user) return null;

  console.log("USER ROLE:", user.role);

  return (
    <div className="space-y-10">
      <DashboardOverview />
    </div>
  );
}
