import { z } from 'zod'
import { publicProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { Product } from '@/payload-types'
import { authRouter } from './auth-router'

export const appRouter = router({
  auth: authRouter,

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator.extend({
          excludeId: z.string().optional(),
        }),
      })
    )
    .query(async ({ input }) => {
      console.log('Server received input:', input); // Add this logging

      const { query, cursor } = input;
      const { sort = 'recent', limit = 10, excludeId, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};
      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      let sortOption: string = '-createdAt';
      switch (sort) {
        case 'recent':
          sortOption = '-createdAt';
          break;
        case 'oldest':
          sortOption = 'createdAt';
          break;
        case 'alphabetical':
          sortOption = 'name';
          break;
        case 'reverse-alphabetical':
          sortOption = '-name';
          break;
      }

      try {
        const {
          docs: items,
          hasNextPage,
          nextPage,
        } = await payload.find({
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
        });

        // Define a runtime validation function to ensure items match the Product type
        const isProduct = (item: any): item is Product => {
          return item && 
            typeof item.name === 'string' &&
            typeof item.author === 'string' &&
            Array.isArray(item.images) &&
            typeof item.category === 'string';
        };

        // Filter and validate the items
        let selectedItems = items.filter(isProduct);

        // If excludeId is provided, shuffle and limit items
        if (excludeId) {
          const shuffledItems = selectedItems.sort(() => 0.5 - Math.random());
          selectedItems = shuffledItems.slice(0, limit);
        } else {
          selectedItems = selectedItems.slice(0, limit);
        }

        return {
          items: selectedItems,
          nextPage: hasNextPage ? nextPage : null,
        };
      } catch (err) {
        console.error('Error in getInfiniteProducts:', err);
        throw err;
      }
    }),
});

export type AppRouter = typeof appRouter;
