"use client";

import { theme } from "@/styles/theme";
import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90 focus:outline-none ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{
        background: theme.colors.buttonColor,
        color: theme.colors.textColor,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
