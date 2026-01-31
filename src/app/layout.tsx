import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/hooks/useAuth";
import { theme } from "@/styles/theme";
import Navbar from "@/components/navbar/navbar";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";
import { NavigationProvider } from "@/components/common/navigationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audit Flow",
  description: "Professional audit and analytics platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen"
        style={{ backgroundColor: theme.colors.secondary }}
      >
        <AuthProvider>
          <NavigationProvider>
            <NavbarWrapper /> {/* global navbar */}
            <main>{children}</main>
          </NavigationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
