"use client";
import { CreateRiskPayload } from "@/types/types";
import { useEffect, useState } from "react";
import axios from "axios";

type Risk = {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  department_name?: string;
  assigned_to_name?: string;
  created_at: string;
};

export default function useRisk() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── GET RISKS ──
  const getRisks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks`,
        { withCredentials: true },
      );
      setRisks(res.data.risks || []);
    } catch (err: unknown) {
      setError("Failed to fetch risks");
    } finally {
      setLoading(false);
    }
  };

  // ── CREATE RISK ──
  const createRisk = async (payload: CreateRiskPayload) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks/create`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // ✅ auto refresh after create
      await getRisks();
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Server error");
      } else {
        setError("Unexpected error");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ── AUTO FETCH ON LOAD ──
  useEffect(() => {
    getRisks();
  }, []);

  return {
    risks,
    loading,
    error,
    createRisk,
    getRisks, // optional manual refetch
  };
}
