"use client";

// ── Types ──────────────────────────────────────────────────────────────────

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  backgroundColor: string;
  borderColor: string;
  valueColor: string;
  progress?: number;
  progressColor?: string;
}

// ── Individual Card ────────────────────────────────────────────────────────

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  backgroundColor,
  borderColor,
  valueColor,
  progress,
  progressColor,
}: StatCardProps) {
  return (
    <div
      className="
        w-full
        sm:flex-1
        rounded-2xl
        p-4 sm:p-5
        flex flex-col gap-2 sm:gap-3
      "
      style={{
        backgroundColor,
        border: `1.5px solid ${borderColor}`,
      }}
    >
      {/* Title + Icon row */}
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-gray-500 truncate pr-2">
          {title}
        </span>
        <span className="shrink-0">{icon}</span>
      </div>

      {/* Value */}
      <div>
        <span
          className="text-3xl sm:text-4xl font-semibold leading-none"
          style={{ color: valueColor }}
        >
          {value}
        </span>
      </div>

      {/* Progress bar (Overall Score only) */}
      {progress !== undefined && progressColor && (
        <div className="w-full h-1.5 sm:h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              backgroundColor: progressColor,
            }}
          />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-gray-400 leading-tight">{subtitle}</p>
      )}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────

function TrendUpIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    </svg>
  );
}

function CheckCircleIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function WarningIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

function ClipboardIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

// ── Stats Cards Row ────────────────────────────────────────────────────────

export default function StatsCards() {
  const cards: StatCardProps[] = [
    {
      title: "Overall Score",
      value: "89%",
      subtitle: "",
      icon: <TrendUpIcon color="#BE89F5" />,
      backgroundColor: "#F7F6FA",
      borderColor: "#EBE4FE",
      valueColor: "#71B5DF",
      progress: 89,
      progressColor: "#9B72E8",
    },
    {
      title: "Passed Audits",
      value: "5",
      subtitle: "of 7 completed",
      icon: <CheckCircleIcon color="#B4D8EB" />,
      backgroundColor: "#F2F8F8",
      borderColor: "#DBF2F2",
      valueColor: "#1a1a1a",
    },
    {
      title: "Total Finding",
      value: "3",
      subtitle: "30 total findings",
      icon: <WarningIcon color="#FFAFC2" />,
      backgroundColor: "#F9F3F6",
      borderColor: "#EED2E0",
      valueColor: "#EFA5BC",
    },
    {
      title: "Total Audits",
      value: "8",
      subtitle: "across 6 departments",
      icon: <ClipboardIcon color="#92C7E6" />,
      backgroundColor: "#EBF3F8",
      borderColor: "#92C7E6",
      valueColor: "#1a1a1a",
    },
  ];

  return (
    /*
      Breakpoints:
      - mobile  (<640px)  : 1 column stack
      - sm      (≥640px)  : 2 columns grid
      - lg      (≥1024px) : 4 columns in a single row
    */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}