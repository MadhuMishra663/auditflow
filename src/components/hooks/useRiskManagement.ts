"use client";
import {
  Attachment,
  CreateRiskPayload,
  GetAttachmentsResponse,
} from "@/types/types";
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
  const [downloading, setDownloading] = useState(false);

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
  const uploadAttachment = async (riskId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks/${riskId}/attachment`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  };
  const updateRiskStatus = async (riskId: string, status: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks/${riskId}/status`,
        { status },
        {
          withCredentials: true,
        },
      );

      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const getAttachments = async (riskId: string): Promise<Attachment[]> => {
    const res = await axios.get<GetAttachmentsResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks/${riskId}/attachments`,
      { withCredentials: true },
    );

    return res.data.attachments;
  };
  const deleteAttachment = async (attachmentId: string) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks/attachment/${attachmentId}`,
      {
        withCredentials: true,
      },
    );
  };
  const downloadFile = async (attachmentId: string, fileName?: string) => {
    try {
      setDownloading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks/attachment/${attachmentId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!res.ok) {
        const err = (await res.json()) as { message?: string };
        throw new Error(err.message || "Download failed");
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName || "download";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(url);
    } catch (error: unknown) {
      console.error("Download error:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Download failed");
      }
    } finally {
      setDownloading(false);
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
    uploadAttachment,
    updateRiskStatus,
    getAttachments,
    deleteAttachment,
    downloadFile,
    downloading,
  };
}
