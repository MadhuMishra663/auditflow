"use client";
import { useState } from "react";
import useRisk from "@/components/hooks/useRiskManagement";
import { theme } from "@/styles/theme";
import useDepartment from "@/components/hooks/useDepartment";
import useCompanyUsers from "@/components/hooks/useUsers";
import { Severity, Status } from "../enums";

type CreateRiskModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateRiskModal({
  open,
  onClose,
}: CreateRiskModalProps) {
  const { createRisk, loading } = useRisk();
  const { departments } = useDepartment();
  const { departmentUsers } = useCompanyUsers();
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: Severity.MEDIUM,
    status: Status.OPEN,
    id: "",
    assigned_to: "",
    due_date: "",
  });
  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "id" && { assigned_to: "" }),
    }));
  };

  const handleSubmit = async () => {
    const res = await createRisk(form);
    if (!res) return;

    onClose();

    setForm({
      title: "",
      description: "",
      severity: Severity.MEDIUM,
      status: Status.OPEN,
      id: "",
      assigned_to: "",
      due_date: "",
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div
        className="w-full max-w-xl rounded-3xl p-6 space-y-5 shadow-xl"
        style={{ backgroundColor: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className="text-lg font-semibold"
            style={{ color: theme.colors.textDark }}
          >
            Create Risk
          </h2>

          <button
            onClick={onClose}
            className="text-sm"
            style={{ color: theme.colors.textLight }}
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Title */}
          <input
            placeholder="Risk title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              backgroundColor: theme.colors.secondary,
              border: "1px solid #E5E7EB",
              color: theme.colors.textDark,
            }}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              backgroundColor: theme.colors.secondary,
              border: "1px solid #E5E7EB",
              color: theme.colors.textDark,
            }}
          />

          {/* Row */}
          <div className="grid grid-cols-2 gap-3">
            {/* Severity */}
            <select
              value={form.severity}
              onChange={(e) => handleChange("severity", e.target.value)}
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{
                backgroundColor: theme.colors.secondary,
                border: "1px solid #E5E7EB",
                color: theme.colors.textDark,
              }}
            >
              <option value={Severity.LOW}>Low</option>
              <option value={Severity.MEDIUM}>Medium</option>
              <option value={Severity.HIGH}>High</option>
              <option value={Severity.CRITICAL}>Critical</option>
            </select>

            {/* Status */}
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="px-4 py-3 rounded-xl text-sm focus:outline-none"
              style={{
                backgroundColor: theme.colors.secondary,
                border: "1px solid #E5E7EB",
                color: theme.colors.textDark,
              }}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          {/* Department */}
          <select
            value={form.id}
            onChange={(e) => handleChange("id", e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              backgroundColor: theme.colors.secondary,
              border: "1px solid #E5E7EB",
              color: theme.colors.textDark,
            }}
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

          {/* Assigned */}
          <select
            value={form.assigned_to}
            onChange={(e) => handleChange("assigned_to", e.target.value)}
            disabled={!form.id}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              backgroundColor: theme.colors.secondary,
              border: "1px solid #E5E7EB",
              color: theme.colors.textDark,
            }}
          >
            <option value="">Select User</option>

            {form.id &&
              departmentUsers[form.id]?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>

          {/* Date */}
          <input
            type="date"
            value={form.due_date}
            onChange={(e) => handleChange("due_date", e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
            style={{
              backgroundColor: theme.colors.secondary,
              border: "1px solid #E5E7EB",
              color: theme.colors.textDark,
            }}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm"
            style={{
              border: "1px solid #E5E7EB",
              color: theme.colors.textLight,
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-xl text-sm"
            style={{
              background: theme.colors.buttonColor,
              color: theme.colors.textColor,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Risk"}
          </button>
        </div>
      </div>
    </div>
  );
}
