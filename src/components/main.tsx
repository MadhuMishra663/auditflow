"use client";

import { Suspense, lazy } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNavigation } from "./common/navigationContext";
import Loader from "@/components/common/loader";

const HeroSection = lazy(() => import("@/components/hero/heroSection"));
const AboutSection = lazy(() => import("@/components/about/about"));
const ContactSection = lazy(() => import("./contact/contact"));
const AdminDashboard = lazy(() => import("./admin/dashboard"));

export default function HomePage() {
  const { user } = useAuth();
  const { activeSection, setActiveSection, hydrated } = useNavigation();

  // Show loader until hydrated
  if (!hydrated) return <Loader />;

  // Admin dashboard
  if (user?.role === "admin") {
    return (
      <Suspense fallback={<Loader />}>
        <AdminDashboard />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      {activeSection === "home" && (
        <HeroSection
          onLearnMore={() => setActiveSection("about")} // ✅ Navigate to About
        />
      )}
      {activeSection === "about" && <AboutSection />}
      {activeSection === "contact" && <ContactSection />}
    </Suspense>
  );
}
