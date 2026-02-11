import Sidebar from "@/components/admin/sidebar";

export default function AuditorsPage() {
  return (
    <div className="flex">
      <main className="flex-1 p-8 bg-[#E8F1F8]">
        <h1 className="text-2xl font-bold">Auditor Management</h1>
        <p className="text-gray-600 mt-2">
          Add / remove auditors, assign departments.
        </p>
      </main>
    </div>
  );
}
