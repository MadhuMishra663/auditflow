"use client";

import Image from "next/image";
import { useState } from "react";
import AuthModal from "../auth/authModal";
import AboutSection from "../about/about";
import { Section } from "../common/navigationContext";

interface HeroSectionProps {
  onLearnMore: () => void; // callback when clicking Learn More
}

const HeroSection = ({ onLearnMore }: HeroSectionProps) => {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Smart Audits.
          <br />
          <span className="text-[#6B9AC4]">Clear Insights.</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Audit Flow helps you analyze, track, and optimize business performance
          with modern audit workflows and intuitive reports.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            className="px-6 py-3 bg-[#6B9AC4] text-white rounded-lg hover:bg-[#5A89B0] transition"
            onClick={() => setOpen(true)}
          >
            Get Started
          </button>
          <button
            className="px-6 py-3 border border-[#6B9AC4] text-[#6B9AC4] rounded-lg hover:bg-[#6B9AC4]/10 transition"
            onClick={onLearnMore}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative w-full h-[360px]">
        <Image
          src="/images/audit-hero.png"
          alt="Audit analytics illustration"
          fill
          className="object-contain"
          priority
        />
      </div>
      <AuthModal
        isOpen={open}
        onClose={() => setOpen(false)}
        setActiveSection={function (section: Section): void {
          throw new Error("Function not implemented.");
        }}
      />
    </section>
  );
};

export default HeroSection;
