"use client";

import { USE_MOCK } from "@/config/env";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Role = "ADMIN" | "AUDITOR" | "DEPARTMENT" | string;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(false);
      setInitialized(true);
      return;
    }
    const init = async () => {
      if (USE_MOCK) {
        const stored = localStorage.getItem("mockUser");
        if (stored) setUser(JSON.parse(stored));

        setLoading(false);
        setInitialized(true);
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
          { withCredentials: true },
        );
        console.log("res", res);
        const user = res.data?.data?.user;

        if (user) {
          setUser(user);
        }
      } catch (err) {
        console.error("AUTH ME ERROR:", err);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      console.log("Calling login...");
      console.log("USE_MOCK:", USE_MOCK);
      // ───────── MOCK LOGIN ─────────
      if (USE_MOCK) {
        console.log("Using MOCK login");

        const mockUser: User = {
          id: "1",
          name: "Demo User",
          email,
          role:
            email === "admin@test.com"
              ? "ADMIN"
              : email === "auditor@test.com"
                ? "AUDITOR"
                : "DEPARTMENT",
        };

        // persist session in localStorage (mock)
        localStorage.setItem("mockUser", JSON.stringify(mockUser));
        document.cookie = "mockSession=1; path=/";
        setUser(mockUser);
        return mockUser;
      }

      // ───────── REAL API LOGIN ─────────
      console.log("Using REAL API login");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const user = res.data?.data?.user;
      if (user) {
        setUser(user);
      }

      return user;
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err instanceof Error
          ? err.message
          : "Login failed";

      console.error("LOGIN ERROR:", message);
      throw new Error(message);
    }
  };

  // Logout
  const logout = async () => {
    if (USE_MOCK) {
      localStorage.removeItem("mockUser");
      document.cookie = "mockSession=; path=/; max-age=0";
      setUser(null);
      return;
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, initialized, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
