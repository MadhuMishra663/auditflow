"use client";

import { USE_MOCK } from "@/config/env";
import { Role } from "@/types/admin";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API;
  // Load user on mount
  useEffect(() => {
    if (USE_MOCK) {
      // Restore session from localStorage on reload instead of wiping it
      const stored = localStorage.getItem("mockUser");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
          localStorage.removeItem("mockUser");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  // const login = async (email: string, password: string): Promise<User> => {
  //   try {
  //     console.log("Calling login...");

  //     // ───────── MOCK LOGIN ─────────
  //     if (USE_MOCK) {
  //       console.log("Using MOCK login");

  //       const mockUser: User = {
  //         id: "1",
  //         name: "Demo User",
  //         email,
  //         role:
  //           email === "admin@test.com"
  //             ? "ADMIN"
  //             : email === "auditor@test.com"
  //               ? "AUDITOR"
  //               : "DEPARTMENT",
  //       };

  //       // persist session
  //       localStorage.setItem("mockUser", JSON.stringify(mockUser));
  //       document.cookie = "mockSession=1; path=/";

  //       setUser(mockUser);
  //       return mockUser;
  //     }

  //     // ───────── REAL API LOGIN ─────────
  //     console.log("Using REAL API login");

  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
  //       { email, password },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     console.log("Login response:", res.data);

  //     // Force the token cookie so the Next.js middleware gets it immediately
  //     const token = res.data?.data?.token || res.data?.token;
  //     if (token) {
  //       localStorage.setItem("token", token);

  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     }

  //     const user: User = res.data.data.user;

  //     setUser(user);
  //     localStorage.setItem("user", JSON.stringify(user));

  //     return user;
  //   } catch (err: unknown) {
  //     const message = axios.isAxiosError(err)
  //       ? err.response?.data?.message || err.message
  //       : err instanceof Error
  //         ? err.message
  //         : "Login failed";

  //     console.error("LOGIN ERROR:", message);
  //     throw new Error(message);
  //   }
  // };

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

        // persist session (mock)
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

      console.log("Login response:", res.data);

      const token = res.data?.data?.token || res.data?.token;
      const user: User = res.data.data.user;
      console.log("User after login:", user);
      if (token) {
        // ✅ Set token cookie instead of localStorage
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
        // Optional: set default Authorization header for axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      // ✅ Set user cookie so you can restore after page reload
      const userCookie = encodeURIComponent(JSON.stringify(user));
      document.cookie = `user=${userCookie}; path=/; max-age=86400; SameSite=Lax`;

      // Set user state for immediate access
      setUser(user);

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
      // Clear both localStorage and the cookie
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
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
