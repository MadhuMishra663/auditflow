// src/app/admin/layout.tsx
import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8F9FB" }}>
      <Sidebar
        orgName="Acme Corporation"
        orgTag="Technology"
        userName="Johan Admin"
        userRole="Organization Administrator"
      />
      {/* offset must match sidebar width exactly: 358px */}
      <main style={{
        marginLeft: "358px",
        flex: 1,
        minHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}>
        {children}
      </main>
    </div>
  );
}