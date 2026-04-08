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
