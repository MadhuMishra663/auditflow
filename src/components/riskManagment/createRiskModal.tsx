"use client";
import { useState } from "react";
import useRisk from "@/components/hooks/useRiskManagement";
import { theme } from "@/styles/theme";
import useDepartment from "@/components/hooks/useDepartment";
import useCompanyUsers from "@/components/hooks/useUsers";
import { Severity, Status } from "../enums";
import { CreateRiskPayload } from "@/types/types";

type CreateRiskModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  createRisk: (data: CreateRiskPayload) => Promise<unknown>;
  loading: boolean;
};

export default function CreateRiskModal({
  open,
  onClose,
  onSuccess,
}: CreateRiskModalProps) {
  const { createRisk, loading } = useRisk();
  const { departments } = useDepartment();
  const { departmentUsers } = useCompanyUsers();
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    const result = createRiskSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.errors.forEach((err) => {
        const field = err.path[0];
        if (field) {
          fieldErrors[field as string] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    // ✅ clear errors
    setErrors({});
    const res = await createRisk(form);
    if (!res) return;

    onClose();
    onSuccess();
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
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}

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
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}

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
            {errors.severity && (
              <p className="text-xs text-red-500 mt-1">{errors.severity}</p>
            )}

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
            {errors.status && (
              <p className="text-xs text-red-500 mt-1">{errors.status}</p>
            )}
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
          {errors.id && (
            <p className="text-xs text-red-500 mt-1">{errors.id}</p>
          )}

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
          {errors.assigned_to && (
            <p className="text-xs text-red-500 mt-1">{errors.assigned_to}</p>
          )}

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
          {errors.due_date && (
            <p className="text-xs text-red-500 mt-1">{errors.due_date}</p>
          )}
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
