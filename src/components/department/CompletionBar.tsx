export function CompletionBar({ percentage }: { percentage: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Completion Rate</span>
        <span className="font-semibold text-gray-800">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full">
        <div
          className="h-1.5 rounded-full bg-violet-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}