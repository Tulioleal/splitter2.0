import zod from "zod";

export const expenseSchema = zod.object({
  name: zod
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  paidBy: zod
    .string()
    .min(1, "Paid by is required")
    .max(50, "Paid by must be less than 50 characters"),
  amount: zod.number().nonnegative("Amount must be a positive number"),
  splitBetween: zod
    .number()
    .nonnegative("Split between must be a positive number")
    .max(20, "Paid by must be less than 50 characters"),
});
