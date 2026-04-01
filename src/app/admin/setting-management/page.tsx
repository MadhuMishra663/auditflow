"use client";

import { useState } from "react";
import TabNav from "@/components/settingManagement/navbar";
import OrganizationSettings from "@/components/settingManagement/organization";
import UserManagementPage from "@/components/settingManagement/userManagment";

export default function RolesPage() {
  const [activeTab, setActiveTab] = useState<string>("roles");

  return (
    <div className="min-h-screen bg-[#F9F7FB] px-4 sm:px-8 py-6 font-sans max-w-7xl mx-auto">
      <div className="flex justify-center mb-6">
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === "roles" && <OrganizationSettings />}
      {activeTab === "UserManagementPage" && <UserManagementPage />}
      {/* Add Department and Notification tabs here when ready */}
    </div>
  );
}