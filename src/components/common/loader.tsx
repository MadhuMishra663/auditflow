// src/components/common/Loader.tsx
"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#6B9AC4]"></div>
    </div>
  );
}
