"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// ✅ EXPORT the props type
export interface AuditCompletionChartProps {
  total: number;
  attempted: number;
}

const AuditCompletionChart = ({
  total,
  attempted,
}: AuditCompletionChartProps) => {
  const data = {
    labels: ["Attempted", "Pending"],
    datasets: [
      {
        data: [attempted, total - attempted],
        backgroundColor: ["#6B9AC4", "#E8F1F8"],
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default AuditCompletionChart;
