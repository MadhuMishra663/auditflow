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

  // const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API;
  // Load user on mount
  // useEffect(() => {
  //   if (USE_MOCK) {
  //     // Restore session from localStorage on reload instead of wiping it
  //     const stored = localStorage.getItem("mockUser");
  //     if (stored) {
  //       try {
  //         setUser(JSON.parse(stored));
  //       } catch {
  //         setUser(null);
  //         localStorage.removeItem("mockUser");
  //       }
  //     } else {
  //       setUser(null);
  //     }
  //     setLoading(false);
  //     return;
  //   }

  //   const loadUser = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
  //         {
  //           credentials: "include",
  //         },
  //       );

  //       if (!res.ok) throw new Error("Not logged in");

  //       const data = await res.json();
  //       setUser(data.user);
  //     } catch {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //       setInitialized(true);
  //     }
  //   };

  //   loadUser();
  // }, []);

  useEffect(() => {
    const init = async () => {
      if (USE_MOCK) {
        const stored = localStorage.getItem("mockUser");
        if (stored) setUser(JSON.parse(stored));

        setLoading(false);
        setInitialized(true); // ✅ IMPORTANT
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
          { withCredentials: true },
        );

        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true); // ✅ IMPORTANT
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
      // const meRes = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
      //   { withCredentials: true },
      // );
      console.log("Login response:", res.data);

      const user = res.data?.data?.user;
      console.log(user);
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
