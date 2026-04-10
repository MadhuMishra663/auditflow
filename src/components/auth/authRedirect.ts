"use client";

import { useAuth } from "@/components/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRedirectHandler() {
  const { user, loading } = useAuth();
  const router = useRouter();
  console.log("AuthRedirectHandler mounted");
  //   useEffect(() => {
  //     if (loading || !user) return;

  //     const role = user.role;

  //     console.log("USER:", user);
  //     console.log("LOADING:", loading);
  //     // console.log("PATH:", pathname);

  //     if (role === "ADMIN") {
  //       router.replace("/admin");
  //     } else if (role === "AUDITOR") {
  //       router.replace("/auditor");
  //     } else if (role === "DEPARTMENT") {
  //       router.replace("/department");
  //     }
  //   }, [user, loading, router]);

  useEffect(() => {
    if (loading || !user) return;

    console.log("Redirecting...");

    setTimeout(() => {
      if (user.role === "ADMIN") {
        router.replace("/admin");
      } else if (user.role === "AUDITOR") {
        router.replace("/auditor");
      }
    }, 0); // ⛔ MAGIC
  }, [user, loading, router]);
  return null;
}
