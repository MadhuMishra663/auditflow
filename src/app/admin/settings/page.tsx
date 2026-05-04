"use client";
// import { useRoleAccess } from "@/components/hooks/useRoleAccess";

export default function SettingsPage() {
//  useRoleAccess(["settings"]);
  return (
    <div className="min-h-screen bg-[#FAF9FB] p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500">Configure your organization settings here.</p>
      </div>
    </div>
  );
}
