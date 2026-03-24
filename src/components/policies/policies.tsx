// components/policies/PolicyStats.tsx

interface PolicyStatsProps {
  activePolicies: number;
  draftPolicies: number;
  archived: number;
}

export default function PolicyStats({
  activePolicies = 2,
  draftPolicies = 1,
  archived = 0,
}: PolicyStatsProps) {
  const stats: { label: string; value: number; bgColor: string; labelColor: string; borderColor: string }[] = [
    {
      label: "Active policies",
      value: activePolicies,
      bgColor: "rgb(240, 247, 246)",
      labelColor: "#6F7275",
      borderColor: "#D5F0EC",
    },
    {
      label: "Draft Policies",
      value: draftPolicies,
      bgColor: "#ECF3F8",
      labelColor: "#6F7275",
      borderColor: "#CCE5F8",
    },
    {
      label: "Archived",
      value: archived,
      bgColor: "#F6F4FA",
      labelColor: "#6F7275",
      borderColor: "#E6DAFF",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl px-6 py-5 flex flex-col gap-3"
          style={{ backgroundColor: stat.bgColor, border: `1.5px solid ${stat.borderColor}` }}
        >
          <span
            className="text-sm font-medium"
            style={{ color: stat.labelColor }}
          >
            {stat.label}
          </span>
          <span className="text-4xl font-light" style={{ color: "#000000" }}>
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}