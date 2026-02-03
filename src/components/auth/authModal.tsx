"use client";

import { useState } from "react";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import { Section } from "../common/navigationContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveSection: (section: Section) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  setActiveSection,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {mode === "login" ? (
          <LoginForm
            onSwitch={() => setMode("signup")}
            onClose={onClose}
            setActiveSection={setActiveSection}
          />
        ) : (
          <SignupForm onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
