//

"use client";

import { useEffect, useState } from "react";
import { Status } from "../enums";
import { Attachment, RiskUI } from "@/types/types";
import useRisk from "../hooks/useRiskManagement";

type Props = {
  risk: RiskUI | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function RiskDetailModal({
  risk,
  open,
  onClose,
  onSuccess,
}: Props) {
  const {
    uploadAttachment,
    getAttachments,
    deleteAttachment,
    updateRiskStatus,
    downloadFile,
    downloading,
  } = useRisk();

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // ── LOAD ──
  useEffect(() => {
    if (!open || !risk) return;

    const loadAttachments = async () => {
      try {
        const data = await getAttachments(risk.id);
        setAttachments(data);
        setStatus(risk.status);
      } catch (error) {
        console.error("Failed to load attachments:", error);
        setAttachments([]);
      }
    };

    loadAttachments();
  }, [open, risk?.id]);

  if (!open || !risk) return null;

  // ── UPLOAD (FILE OR TEXT) ──
  const handleUpload = async (): Promise<void> => {
    if (!file && !text.trim()) {
      alert("Provide file or text");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      if (file) formData.append("file", file);
      if (text.trim()) formData.append("text", text.trim());

      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/risks/${risk.id}/attachment`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const updated = await getAttachments(risk.id);
      setAttachments(updated);

      setFile(null);
      setText("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ── DELETE ──
  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteAttachment(id);
      setAttachments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  // ── SUBMIT ──
  const handleSubmit = async (): Promise<void> => {
    try {
      setSubmitting(true);

      if (status !== risk.status) {
        await updateRiskStatus(risk.id, status);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[500px] space-y-4">
        <h2 className="text-lg font-semibold">{risk.title}</h2>

        {/* ATTACHMENTS */}
        <div className="space-y-2">
          {attachments.length === 0 ? (
            <p className="text-gray-400 text-sm">No evidence added</p>
          ) : (
            attachments.map((a) => (
              <div
                key={a.id}
                className="flex justify-between items-start gap-2"
              >
                <div className="flex flex-col">
                  {/* FILE */}
                  {a.file_url && a.file_name && (
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${a.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      📎 {a.file_name}
                    </a>
                  )}

                  {/* TEXT */}
                  {a.text && (
                    <p className="text-sm text-gray-700">📝 {a.text}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  {/* DOWNLOAD */}
                  {a.file_url && a.file_name && (
                    <button
                      onClick={() => downloadFile(a.id, a.file_name)}
                      className="text-green-600 text-xs"
                      disabled={downloading}
                    >
                      {downloading ? "Downloading..." : "Download"}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* TEXT INPUT */}
        <textarea
          placeholder="Write evidence..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {/* FILE INPUT */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {/* ADD EVIDENCE */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {uploading ? "Uploading..." : "Add Evidence"}
        </button>

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CLOSED">Closed</option>
        </select>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {submitting ? "Saving..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
