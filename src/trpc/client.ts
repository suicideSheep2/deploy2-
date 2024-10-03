import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import { AppRouter } from '@/trpc'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/trpc',
      // Optional: Add headers here if needed
      headers() {
        return {
          // Add any necessary headers
        }
      },
    }),
  ],
})