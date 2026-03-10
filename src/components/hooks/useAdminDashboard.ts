"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStats {
  totalAudits: number;
  activeAudits: number;
  closedAudits: number;
  overdueAudits: number;
  completionRate: number;
  auditors: number;
  departmentUsers: number;
}

interface DashboardResponse {
  success: boolean;
  data: {
    stats: DashboardStats;
  };
}

export const useAdminDashboard = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // MOCK DATA
        if (USE_MOCK) {
          const mockData: DashboardStats = {
            totalAudits: 24,
            activeAudits: 8,
            closedAudits: 12,
            overdueAudits: 4,
            completionRate: 65,
            auditors: 6,
            departmentUsers: 32,
          };

          setData(mockData);
          return;
        }

        // REAL API
        const res = await axios.get<DashboardResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard`,
          { withCredentials: true },
        );

        setData(res.data.data.stats);
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
};
