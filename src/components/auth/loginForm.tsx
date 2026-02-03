import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import SuccessModal from "@/components/common/successModal";
import { useAuth } from "../hooks/useAuth";
import { Section } from "../common/navigationContext";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSwitch: () => void;
  onClose: () => void;
  setActiveSection: (section: Section) => void;
}

const LoginForm = ({ onSwitch, onClose, setActiveSection }: LoginFormProps) => {
  const { login } = useAuth();
  const { loginUser } = useLogin();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await login(formData.email, formData.password); // stores user inside context

  //     setShowSuccess(true);
  //     onClose();

  //     // Redirect based on role
  //     if (user?.role === "admin") {
  //       router.push("/admin/dashboard"); // go to admin dashboard
  //     } else {
  //       router.push("/home"); // go to home for other roles
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await login(formData.email, formData.password);

      onClose(); // close modal first

      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/");
      }
    } catch (err) {
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#6B9AC4] text-white rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            or{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="text-[#6B9AC4] font-medium hover:underline"
            >
              Sign up
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
