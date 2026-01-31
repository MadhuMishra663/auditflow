"use client";

import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#E8F1F8]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            About <span className="text-[#6B9AC4]">AuditFlow</span>
          </h2>

          <p className="text-gray-700 text-lg mb-4">
            AuditFlow is a cutting-edge audit management platform designed to
            help organizations streamline auditing processes, ensure compliance,
            and gain actionable insights into business operations.
          </p>

          <p className="text-gray-700 text-lg mb-4">
            With intuitive dashboards, real-time reporting, and structured
            workflows, AuditFlow empowers teams to track, analyze, and optimize
            audits efficiently while minimizing manual effort.
          </p>

          <p className="text-gray-700 text-lg">
            Our mission is to make auditing transparent, simple, and insightful
            for all organizations—from small teams to enterprise-level
            operations.
          </p>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[300px] md:h-[360px]">
          <Image
            src="/images/about.png"
            alt="Audit management illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
