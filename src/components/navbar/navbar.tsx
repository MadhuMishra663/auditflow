// src/components/navbar/main.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AuthModal from "@/components/auth/authModal";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "../common/navigationContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user } = useAuth();
  const { setActiveSection } = useNavigation();
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  // ── Hide public navbar entirely for logged-in admin/auditor/department users
  // Their layout (src/app/admin/layout.tsx) renders AdminTopbar instead.
  const isAdminUser = user && (
    user.role === "ADMIN" ||
    user.role === "AUDITOR" ||
    user.role === "DEPARTMENT"
  );
  if (isAdminUser) return null;

  return (
    <>
      <nav className="w-full bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Brand */}
          <div
            className="text-2xl font-extrabold tracking-wide text-[#6B9AC4] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Audit<span className="text-[#A3C4BC]">Flow</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <button onClick={() => router.push("/about")}   className="hover:text-[#6B9AC4]">About</button>
            <button onClick={() => router.push("/contact")} className="hover:text-[#6B9AC4]">Contact</button>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
            >
              Login
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
              <button onClick={() => { router.push("/about");   setMenuOpen(false); }}>About</button>
              <button onClick={() => { router.push("/contact"); setMenuOpen(false); }}>Contact</button>
              <button
                onClick={() => { setAuthModalOpen(true); setMenuOpen(false); }}
                className="w-full px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        setActiveSection={setActiveSection}
      />
    </>
  );
};

export default Navbar;