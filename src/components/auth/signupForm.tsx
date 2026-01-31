"use client";

import { useState } from "react";
import { useRegister } from "@/components/hooks/useRegister";
import { useDepartments } from "@/components/hooks/useDepartment";
import SuccessModal from "@/components/common/successModal";

interface SignupFormProps {
  onSwitch: () => void;
}

type Role = "admin" | "department" | "auditor";

const SignupForm = ({ onSwitch }: SignupFormProps) => {
  const { registerUser, loading, error } = useRegister();
  const { departments, loading: deptLoading } = useDepartments();

  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: Role;
    departmentId: string;
  }>({
    name: "",
    email: "",
    password: "",
    role: "department",
    departmentId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.role === "admin") {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
      });
    } else {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        departmentId: formData.departmentId,
      });
    }

    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onSwitch(); // switch to login
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Create Account
      </h2>

      {!showSuccess && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="department">Department User</option>
            <option value="auditor">Auditor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Department (only for non-admin) */}
          {formData.role !== "admin" && (
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              disabled={deptLoading}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#6B9AC4] text-white rounded-lg"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-[#6B9AC4] font-medium hover:underline"
        >
          Login
        </button>
      </div>

      {showSuccess && (
        <SuccessModal
          isOpen={showSuccess}
          title="Registration Successful"
          message="Your account has been created successfully."
          duration={2000}
          onClose={handleSuccessClose}
        />
      )}
    </>
  );
};

export default SignupForm;
