import { z } from "zod";
import { Severity, Status } from "../enums";

export const createRiskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  severity: z
    .string()
    .min(1, "Select severity")
    .refine((val) => Object.values(Severity).includes(val as Severity), {
      message: "Invalid severity",
    }),
  status: z
    .string()
    .min(1, "Select status")
    .refine((val) => Object.values(Status).includes(val as Status), {
      message: "Invalid status",
    }),
  id: z.string().min(1, "Department is required"),
  assigned_to: z.string().min(1, "User is required"),
  due_date: z.string().min(1, "Due date is required"),
});
