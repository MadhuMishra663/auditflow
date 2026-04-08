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

  // const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Always load frontend mock data because backend dashboard route is not built yet
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
