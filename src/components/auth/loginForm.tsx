interface LoginFormProps {
  onSwitch: () => void;
}

const LoginForm = ({ onSwitch }: LoginFormProps) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Login to AuditFlow
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4]"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B9AC4]"
        />

        <button
          type="submit"
          className="w-full py-2 bg-[#6B9AC4] text-white rounded-lg hover:bg-[#5A89B0] transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        or{" "}
        <button
          onClick={onSwitch}
          className="text-[#6B9AC4] font-medium hover:underline"
        >
          Sign up
        </button>
      </div>
    </>
  );
};

export default LoginForm;
