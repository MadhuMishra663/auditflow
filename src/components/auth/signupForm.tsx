import { useState } from "react";
import { useRegister } from "@/components/hooks/useRegister";
import { useDepartments } from "@/components/hooks/useDepartment";
import SuccessModal from "../common/successModal";

const SignupForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const { registerUser, loading, error } = useRegister();
  const { departments, loading: deptLoading } = useDepartments();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    await registerUser(formData);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);

    // 2️⃣ Switch to Login after modal disappears
    onSwitch();
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
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {/* Department Dropdown */}
          <select
            name="departmentId"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
            disabled={deptLoading}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#6B9AC4] text-white rounded-lg"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-[#6B9AC4] font-medium hover:underline"
        >
          Login
        </button>
      </div>
      <SuccessModal
        isOpen={showSuccess}
        title="Registration Successful"
        message="Your account has been created successfully."
        duration={2000}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default SignupForm;
