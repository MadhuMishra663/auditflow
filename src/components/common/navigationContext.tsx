"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Section =
  | "home"
  | "about"
  | "contact"
  | "dashboard"
  | "auditors"
  | "audits"
  | "settings";

interface NavigationContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  hydrated: boolean; // track if client hydration is done
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSectionState] = useState<Section>("home");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = sessionStorage.getItem("activeSection") as Section | null;

    // Defer to avoid cascading render
    setTimeout(() => {
      if (
        stored === "home" ||
        stored === "about" ||
        stored === "contact" ||
        stored === "dashboard" ||
        stored === "auditors" ||
        stored === "audits" ||
        stored === "settings"
      ) {
        setActiveSectionState(stored);
      }
      setHydrated(true);
    }, 0);
  }, []);

  const setActiveSection = (section: Section) => {
    setActiveSectionState(section);
    sessionStorage.setItem("activeSection", section);
  };

  return (
    <NavigationContext.Provider
      value={{ activeSection, setActiveSection, hydrated }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context)
    throw new Error("useNavigation must be used within NavigationProvider");
  return context;
};
