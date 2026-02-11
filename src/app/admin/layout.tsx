"use client";

import { useAuth } from "@/components/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      router.replace("/");
    }
  }, [user, router]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#E8F1F8]">{children}</main>
    </div>
  );
}
