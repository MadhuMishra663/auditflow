"use client";

import HeroSection from "@/components/hero/heroSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <HeroSection onLearnMore={() => router.push("/about")} />
    </>
  );
}
