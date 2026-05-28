import type { Department } from "./types";

export const DEPARTMENTS: Department[] = [
  { name: "Human Resources",    head: "Sarah Johnson",   total: 24, completed: 18, pending: 6,  completionRate: 75, riskLevel: "LOW RISK",    done: 18, inProgress: 4, notStarted: 2 },
  { name: "Finance",            head: "Michael Chen",    total: 32, completed: 28, pending: 4,  completionRate: 88, riskLevel: "LOW RISK",    done: 28, inProgress: 4, notStarted: 2 },
  { name: "IT & Security",      head: "David Rodriguez", total: 45, completed: 30, pending: 15, completionRate: 67, riskLevel: "MEDIUM RISK", done: 30, inProgress: 4, notStarted: 2 },
  { name: "Legal & Compliance", head: "Emily Watson",    total: 18, completed: 16, pending: 2,  completionRate: 89, riskLevel: "LOW RISK",    done: 16, inProgress: 4, notStarted: 2 },
  { name: "Operations",         head: "James Miller",    total: 56, completed: 35, pending: 21, completionRate: 63, riskLevel: "HIGH RISK",   done: 35, inProgress: 4, notStarted: 2 },
  { name: "Sales & Marketing",  head: "James Miller",    total: 38, completed: 25, pending: 13, completionRate: 66, riskLevel: "MEDIUM RISK", done: 25, inProgress: 4, notStarted: 2 },
];