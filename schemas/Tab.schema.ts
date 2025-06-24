import zod from 'zod'

export const tabSchema = zod.object({
  name: zod.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be at most 50 characters'),
  currency: zod.string().length(3, 'Currency must be 3 characters')
})
