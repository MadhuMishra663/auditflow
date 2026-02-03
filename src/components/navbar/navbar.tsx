"use client";

import { useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import AuthModal from "@/components/auth/authModal";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "../common/navigationContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { activeSection, setActiveSection } = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="w-full bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <div
            className="text-2xl font-extrabold tracking-wide text-[#6B9AC4] cursor-pointer"
            onClick={() => setActiveSection("home")}
          >
            Audit<span className="text-[#A3C4BC]">Flow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            {!user && ( // Hide Home button if logged in
              <button
                // onClick={() => setActiveSection("home")}
                onClick={() => router.push("/home")}
                className="hover:text-[#6B9AC4]"
              >
                Home
              </button>
            )}
            <button
              onClick={() => setActiveSection("about")}
              className="hover:text-[#6B9AC4]"
            >
              About
            </button>
            <button
              // onClick={() => setActiveSection("contact")}
              onClick={() => router.push("/contact")}
              className="hover:text-[#6B9AC4]"
            >
              Contact
            </button>

            {/* Login / Logout + Notification */}
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  // onClick={() => setActiveSection("dashboard")}
                  onClick={() => router.push("/admin/dashboard")}
                  className="hover:text-[#6B9AC4]"
                >
                  Dashboard
                </button>
                <button className="relative">
                  <Bell
                    size={22}
                    className="text-gray-700 hover:text-[#6B9AC4]"
                  />
                  <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    router.push("/home"); // ✅ REQUIRED
                  }}
                  className="px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
              >
                Login
              </button>
            )}
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
              {!user && (
                <button
                  onClick={() => {
                    // setActiveSection("home");
                    router.push("/home");
                    setMenuOpen(false);
                  }}
                >
                  Home
                </button>
              )}
              {user && (
                <button
                  onClick={() => {
                    // setActiveSection("dashboard");
                    router.push("/admin/dashboard"); // ✅ DASHBOARD
                    setMenuOpen(false);
                  }}
                  className="hover:text-[#6B9AC4]"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => {
                  // setActiveSection("about");
                  router.push("/about");

                  setMenuOpen(false);
                }}
              >
                About
              </button>
              <button
                onClick={() => {
                  // setActiveSection("contact");
                  router.push("/contact");

                  setMenuOpen(false);
                }}
              >
                Contact
              </button>

              {user ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                      // setActiveSection("home");
                      router.push("/home");
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
                  >
                    Logout
                  </button>
                  <div className="flex items-center gap-2">
                    <Bell size={20} className="text-gray-700" />
                    <span className="text-sm text-gray-700">Notifications</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-[#6B9AC4] text-white hover:bg-[#5A89B0] transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        setActiveSection={setActiveSection}
      />
    </>
  );
};

export default Navbar;
