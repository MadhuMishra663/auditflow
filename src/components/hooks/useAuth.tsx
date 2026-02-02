// src/components/hooks/useAuth.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Role = "admin" | "department" | "auditor";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const COOKIE_NAME = process.env.COOKIE_NAME as string;

/* ---------- Cookie Helpers ---------- */
const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /* ✅ Lazy initialization (NO useEffect needed) */
  const [user, setUser] = useState<User | null>(() => {
    const cookieUser = getCookie(COOKIE_NAME);
    return cookieUser ? JSON.parse(cookieUser) : null;
  });

  const [loading] = useState(false);
  // no async restore now

  /* ---------- Login ---------- */
  const login = async (email: string, password: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_LOGIN}`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    setCookie(COOKIE_NAME, JSON.stringify(data.user));
    setUser(data.user);
  };

  /* ---------- Logout ---------- */
  const logout = () => {
    deleteCookie(COOKIE_NAME);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ---------- Hook ---------- */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
