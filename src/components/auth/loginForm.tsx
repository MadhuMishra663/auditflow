"use client";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import SuccessModal from "@/components/common/successModal";
import { useAuth } from "../hooks/useAuth";
import { Section } from "../common/navigationContext";
import { useRouter } from "next/navigation";
import Button from "../common/button";

interface LoginFormProps {
  onSwitch: () => void;
  onClose: () => void;
  setActiveSection: (section: Section) => void;
}

const LoginForm = ({ onSwitch, onClose, setActiveSection }: LoginFormProps) => {
  const { login } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Visible debugging
    alert("LOGIN FORM: Starting login process");

    try {
      alert("LOGIN FORM: Calling login function");
      const user = await login(formData.email, formData.password);
      alert(`LOGIN FORM: Login result: ${user ? "SUCCESS" : "FAILED"}`);

      if (user) {
        setShowSuccess(true);

        // wait for state to propagate
        setTimeout(() => {
          router.push("/admin");
        }, 300);
      }

      onClose?.();
    } catch (err) {
      alert(
        `LOGIN FORM ERROR: ${err instanceof Error ? err.message : "Login failed"}`,
      );
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      {!showSuccess && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login to AuditFlow
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black"
            />

            <Button
              text={loading ? "Logging in..." : "Login"}
              type="submit"
              disabled={loading}
              fullWidth
              className="py-2"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            or{" "}
            <button
              type="button"
              onClick={onSwitch}
              disabled
              className="text-[#6B9AC4] font-medium hover:underline"
            >
              Start Demo Video
            </button>
          </div>
        </>
      )}

      {showSuccess && (
        <SuccessModal
          isOpen={showSuccess}
          title="Login Successful"
          message="Welcome back! Redirecting..."
          duration={2000}
          onClose={handleSuccessClose}
        />
      )}
    </>
  );
};

export default LoginForm;
