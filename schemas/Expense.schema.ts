import zod from 'zod'

export const expenseSchema = zod.object({
  name: zod.string().min(1, 'Paid by is required').max(50, 'Paid by must be less than 50 characters'),
  amount: zod.number().nonnegative('Amount must be a positive number'),
  splitBetween: zod.array(zod.string().min(1, 'Each person must have a name')).min(1, 'At least one person must be included').max(20, 'Cannot split between more than 20 people'),
})
