import { z } from 'zod'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'

export const appRouter = router({
  // ... other routers

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
      const { sort, limit, ...queryOpts } = query

      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<string, { equals: string }> = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = cursor || 1

      let sortOption = '-createdAt' // Default to most recent

      switch (sort) {
        case 'recent':
          sortOption = '-createdAt'
          break
        case 'oldest':
          sortOption = 'createdAt'
          break
        case 'alphabetical':
          sortOption = 'title'
          break
        case 'reverse-alphabetical':
          sortOption = '-title'
          break
          // this would be useful to dispaly 
          // content lsting in front page
          // yup its kded up
        case 'random':
           sortOption = '-id'
           break
          
       
      }

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products',  // You might want to rename this to 'poems' or 'literature'
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOpts,
        },
        sort: sortOption,
        depth: 1,
        limit,
        page,
      })

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      }
    }),
})

export type AppRouter = typeof appRouter