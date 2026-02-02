"use client";

import { Suspense, lazy, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNavigation } from "./common/navigationContext";
import Loader from "@/components/common/loader";
import { AdminSection, Section } from "@/types/section";

const HeroSection = lazy(() => import("@/components/hero/heroSection"));
const AboutSection = lazy(() => import("@/components/about/about"));
const ContactSection = lazy(() => import("./contact/contact"));
const AdminDashboard = lazy(() => import("./admin/dashboard"));

const ADMIN_SECTIONS: readonly AdminSection[] = [
  "dashboard",
  "auditors",
  "audits",
  "settings",
];

const isAdminSection = (section: Section): section is AdminSection => {
  return (ADMIN_SECTIONS as readonly Section[]).includes(section);
};

export default function HomePage() {
  const { user } = useAuth();
  const { activeSection, setActiveSection, hydrated } = useNavigation();

  // Redirect admin to dashboard if first login / landing
  useEffect(() => {
    if (user?.role === "admin" && !isAdminSection(activeSection)) {
      setActiveSection("dashboard");
    }
  }, [user, activeSection, setActiveSection]);

  if (!hydrated) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      {/* 🌐 PUBLIC SECTIONS */}
      {activeSection === "home" && (
        <HeroSection onLearnMore={() => setActiveSection("about")} />
      )}
      {activeSection === "about" && <AboutSection />}
      {activeSection === "contact" && <ContactSection />}

      {/* 🔐 ADMIN SECTIONS */}
      {user?.role === "admin" && isAdminSection(activeSection) && (
        <AdminDashboard />
      )}
    </Suspense>
  );
}
