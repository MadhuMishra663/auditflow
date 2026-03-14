// src/components/admin/statcard.tsx
"use client";

import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: "purple" | "green" | "pink" | "peach";
  icon?: React.ReactNode;
};

const variantStyles = {
  purple: {
    wrapper: "bg-purple-50 border border-purple-100",
    icon: "text-purple-400",
  },
  green: {
    wrapper: "bg-emerald-50 border border-emerald-100",
    icon: "text-emerald-400",
  },
  pink: {
    wrapper: "bg-pink-50 border border-pink-100",
    icon: "text-pink-400",
  },
  peach: {
    wrapper: "bg-orange-50 border border-orange-100",
    icon: "text-orange-400",
  },
};

const DefaultIcons: Record<string, React.ReactNode> = {
  purple: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  green: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <polyline points="9 15 11 17 15 13"/>
    </svg>
  ),
  pink: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  peach: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
};

export default function StatCard({ title, value, subtitle, variant = "purple", icon }: StatCardProps) {
  const styles = variantStyles[variant];
  const iconEl = icon ?? DefaultIcons[variant];

  return (
    <div className={`${styles.wrapper} rounded-2xl p-5 flex flex-col gap-1 hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between mb-1">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{title}</span>
        <span className={styles.icon}>{iconEl}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900 tracking-tight leading-none">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}