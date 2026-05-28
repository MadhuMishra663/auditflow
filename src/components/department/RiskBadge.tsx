export type RiskLevel = "LOW RISK" | "MEDIUM RISK" | "HIGH RISK";

export function RiskBadge({ level }: { level: RiskLevel }) {
  const styles: Record<RiskLevel, string> = {
    "LOW RISK":    "bg-green-100 text-green-800",
    "MEDIUM RISK": "bg-orange-100 text-orange-800",
    "HIGH RISK":   "bg-red-100 text-red-800",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${styles[level]}`}>
      {level}
    </span>
  );
}