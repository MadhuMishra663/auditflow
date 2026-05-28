import { CompletionBar } from "./CompletionBar";
import { RiskBadge } from "./RiskBadge";
import type { Department } from "./types";

export function DepartmentCard({
  name, head, total, completed, pending,
  completionRate, riskLevel, done, inProgress, notStarted,
}: Department) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 shadow-sm">

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="#6B4EFF" strokeWidth={1.8}>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-[15px] leading-snug">{name}</p>
          <p className="text-xs text-gray-500">Head: {head}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <div className="text-center">
          <p className="text-[15px] font-bold text-gray-800">{total}</p>
          <p className="text-[11px] text-gray-400">Total</p>
        </div>
        <div className="text-center">
          <p className="text-[15px] font-bold text-green-600">{completed}</p>
          <p className="text-[11px] text-gray-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-[15px] font-bold text-orange-500">{pending}</p>
          <p className="text-[11px] text-gray-400">Pending</p>
        </div>
      </div>

      {/* Progress */}
      <CompletionBar percentage={completionRate} />

      {/* Legend */}
      <div className="flex gap-3 text-[11px] text-gray-500 flex-wrap">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          {done} Done
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
          {inProgress} In Progress
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
          {notStarted} Not Started
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <RiskBadge level={riskLevel} />
        <button className="text-xs text-violet-600 font-medium hover:underline">
          View Details →
        </button>
      </div>

    </div>
  );
}