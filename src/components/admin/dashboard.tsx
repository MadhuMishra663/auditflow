"use client";

import { useAuth } from "@/components/hooks/useAuth";
import AdminSidebar from "@/components/admin/adminSidebar";
import { theme } from "@/styles/theme";
import { Section, useNavigation } from "../common/navigationContext";
import { AdminSection } from "@/types/section";

const ADMIN_SECTIONS: readonly AdminSection[] = [
  "dashboard",
  "auditors",
  "audits",
  "settings",
];
const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const { activeSection, setActiveSection, hydrated } = useNavigation();

  if (!hydrated || loading) return null;

  // ❌ Not admin → don't render admin UI
  if (!user || user.role !== "admin") return null;

  // ❌ Not an admin section → let public pages render
  const isAdminSection = (section: Section): section is AdminSection => {
    return (ADMIN_SECTIONS as readonly Section[]).includes(section);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.secondary }}
    >
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="ml-16 hover:ml-64 transition-all duration-300 p-8">
        {activeSection === "dashboard" && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            Dashboard Content
          </div>
        )}

        {activeSection === "auditors" && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            User Management
          </div>
        )}

        {activeSection === "audits" && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            Audits Section
          </div>
        )}

        {activeSection === "settings" && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">Settings</div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
