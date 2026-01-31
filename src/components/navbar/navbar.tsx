"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthModal from "@/components/auth/authModal";

interface NavbarProps {
  onNavigate: (section: "home" | "about" | "contact") => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <div
            className="text-2xl font-extrabold tracking-wide text-[#6B9AC4] cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            Audit<span className="text-[#A3C4BC]">Flow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <button
              onClick={() => onNavigate("home")}
              className="hover:text-[#6B9AC4]"
            >
              Home
            </button>

            <button
              onClick={() => onNavigate("about")}
              className="hover:text-[#6B9AC4]"
            >
              About
            </button>

            <button
              className="hover:text-[#6B9AC4]"
              onClick={() => onNavigate("contact")}
            >
              Contact Us
            </button>

            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
              <button
                onClick={() => {
                  onNavigate("home");
                  setMenuOpen(false);
                }}
              >
                Home
              </button>

              <button
                onClick={() => {
                  onNavigate("about");
                  setMenuOpen(false);
                }}
              >
                About
              </button>

              <button onClick={() => setMenuOpen(false)}>Contact Us</button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  setOpen(true);
                }}
                className="w-full px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
