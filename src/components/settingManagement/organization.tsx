"use client";

import { useState } from "react";

function FormInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-m font-semibold text-black mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl px-5 py-4 text-sm text-black outline-none"
        style={{
          backgroundColor: "#CFC9F3",
          border: "1.5px solid #9080E2",
          boxShadow: "0 0 0 6px #A496F0",
        }}
      />
    </div>
  );
}

export default function OrganizationSettings() {
  const [form, setForm] = useState({
    organizationName: "Acme Corporation",
    industry: "Technology",
    department: "tenant-1",
    email: "Id",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-semibold text-black mb-4">
        Organization Settings
      </h1>

      <div
        className="rounded-2xl px-6 py-8 w-full"
        style={{
          border: "1.5px solid #CCC2FF",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="space-y-6 w-full max-w-5xl">
          <FormInput
            label="Organization Name"
            value={form.organizationName}
            onChange={(v) => handleChange("organizationName", v)}
          />
          <FormInput
            label="Industry"
            value={form.industry}
            onChange={(v) => handleChange("industry", v)}
          />
          <FormInput
            label="Department"
            value={form.department}
            onChange={(v) => handleChange("department", v)}
          />
          <FormInput
            label="Email"
            value={form.email}
            type="email"
            onChange={(v) => handleChange("email", v)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-medium text-black border border-gray-200 hover:bg-gray-50 transition-all">
          Cancel
        </button>
        <button
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: "#7C5CFC" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#6B4EE6")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#7C5CFC")
          }
        >
          Save Changes
        </button>
      </div>
    </>
  );
}