import zod from "zod";

export const tabSchema = zod.object({
  name: zod.string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 100 characters"),
  totalAmount: zod.number()
    .nonnegative("Total amount must be a positive number"),
});