export type RiskLevel = "LOW RISK" | "MEDIUM RISK" | "HIGH RISK";

export interface Department {
  name: string;
  head: string;
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
  riskLevel: RiskLevel;
  done: number;
  inProgress: number;
  notStarted: number;
}