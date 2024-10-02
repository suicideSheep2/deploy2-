import { z } from 'zod'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { authRouter } from './auth-router'

export const appRouter = router({
  auth: authRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort = 'recent', limit = 10, category, excludeId } = query

      try {
        const payload = await getPayloadClient()

        const parsedQueryOpts: Record<string, { equals: string }> = {}
        if (category) {
          parsedQueryOpts.category = {
            equals: category,
          }
        }

        const page = cursor || 1

        let sortOption: string = '-createdAt'
        switch (sort) {
          case 'recent':
            sortOption = '-createdAt'
            break
          case 'oldest':
            sortOption = 'createdAt'
            break
          case 'alphabetical':
            sortOption = 'name'
            break
          case 'reverse-alphabetical':
            sortOption = '-name'
            break
        }

        const { docs: items, hasNextPage, nextPage } = await payload.find({
          collection: 'products',
          where: {
            approvedForSale: {
              equals: 'approved',
            },
            ...parsedQueryOpts,
            ...(excludeId
              ? {
                  id: {
                    not_equals: excludeId,
                  },
                }
              : {}),
          },
          sort: sortOption,
          depth: 1,
          limit: limit * 2,
          page,
        })

        return {
          items,
          nextPage: hasNextPage ? nextPage : null,
        }
      } catch (err) {
        console.error('Server error:', err)
        throw err
      }
    }),
})

export type AppRouter = typeof appRouter