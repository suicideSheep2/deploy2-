import { z } from 'zod'

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(['recent', 'oldest', 'alphabetical', 'reverse-alphabetical', 'novel', 'poem', 'random']).optional(),
  limit: z.number().optional(),
})

export type TQueryValidator = z.infer<typeof QueryValidator>