// src/app/admin/layout.tsx
import Sidebar from "@/components/common/sidebar";
import AdminTopbar from "@/components/admin/adminTopbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      <Sidebar />
      <div className="ml-[358px] flex-1 flex flex-col min-h-screen">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}