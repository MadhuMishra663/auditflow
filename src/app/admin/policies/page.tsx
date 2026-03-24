import PolicyStats from "@/components/policies/policies";
import PoliciesByCategory from "@/components/policies/PoliciesByCategory";
import PoliciesTable from "@/components/policies/policiesTable";

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-white p-6 sm:p-10 flex flex-col gap-6">
      <PolicyStats activePolicies={2} draftPolicies={1} archived={0} />
      <PoliciesByCategory />
      <PoliciesTable />
    </main>
  );
}