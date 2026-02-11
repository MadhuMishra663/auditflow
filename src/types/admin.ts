export type Role = "SUPER_ADMIN" | "ADMIN" | "AUDITOR" | "DEPARTMENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
