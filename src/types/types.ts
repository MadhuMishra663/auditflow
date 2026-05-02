export interface CreateRiskPayload {
  title: string;
  description?: string;
  severity: string;
  status?: string;
  category?: string; // ✅ FIX
  id: string;
  assigned_to?: string;
  due_date?: string;
}
export type Risk = {
  id: string;
  title: string;
  description: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";

  department_name?: string;
  assigned_to_name?: string;

  created_at: string;
};
export type RiskUI = {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  category?: string;
  owner?: string;
  created: string;
  avatar: string;
};
// types/risk.ts
export type Attachment = {
  id: string;
  file_name: string;
  file_url: string;
  text: string;
};

export type GetAttachmentsResponse = {
  attachments: Attachment[];
};

export type UploadAttachmentResponse = {
  message: string;
  attachment: Attachment;
};
