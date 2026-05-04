// "use client";
// import ComplianceDashboard from "@/components/admin/compliance";
// import { useRoleAccess } from "@/components/hooks/useRoleAccess";

// export default function CompliancePage() {
//   useRoleAccess(["compliance"]);
//   return <ComplianceDashboard />;
// }

import ComplianceDashboard from "@/components/admin/compliance";
export default function compliancepage(){
  return <ComplianceDashboard />
}