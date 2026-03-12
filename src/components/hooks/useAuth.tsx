"use client";

import { Role } from "@/types/admin";
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
  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";
  // Load user on mount using cookie
  useEffect(() => {
    if (USE_MOCK) {
       localStorage.removeItem("mockUser"); // ← wipe any stale session
    setUser(null);
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
  const login = async (email: string, password: string): Promise<User> => {
    if (USE_MOCK) {
      const mockUser: User = {
        id: "1",
        name: "Demo Admin",
        email,
        role:
          email === "admin@test.com"
            ? "ADMIN"
            : email === "auditor@test.com"
              ? "AUDITOR"
              : "DEPARTMENT",
      };

      localStorage.setItem("mockUser", JSON.stringify(mockUser));

      setUser(mockUser);

      return mockUser;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    const user: User = {
      id: data.data.user.id,
      name: data.data.user.name,
      email: data.data.user.email,
      role: data.data.user.role,
    };

    setUser(user);
    return user;
  };

  // Logout
  const logout = async () => {
    if (USE_MOCK) {
      localStorage.removeItem("mockUser");
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
