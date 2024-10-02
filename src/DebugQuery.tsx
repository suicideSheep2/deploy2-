"use client"
import { trpc } from '@/trpc/client'

export default function DebugQuery() {
  const utils = trpc.useContext()

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-lg opacity-50 hover:opacity-100">
      <button
        onClick={() => {
          const state = utils.getInfiniteProducts.getInfiniteData({
            limit: 4,
            query: { sort: 'recent' },
          })
          console.log('Current query state:', state)
        }}
      >
        Debug Query State
      </button>
    </div>
  )
}