"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/navbar";
import HeroSection from "@/components/hero/heroSection";
import AboutSection from "@/components/about/about";
import ContactSection from "./contact/contact";
// import ContactSection from "@/components/contact/contact";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<
    "home" | "about" | "contact"
  >("home");

  return (
    <>
      <Navbar onNavigate={setActiveSection} />
      {/* Render ONE section at a time */}
      {activeSection === "home" && (
        <HeroSection onLearnMore={() => setActiveSection("about")} />
      )}{" "}
      {activeSection === "about" && <AboutSection />}
      {activeSection === "contact" && <ContactSection />}
    </>
  );
}
