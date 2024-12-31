"use client"

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const ContentContextButton = () => {
  return (
    <div className="flex justify-end">
      <button 
        className="bg-white/30 px-6 py-3 rounded-full shadow-md border border-white/20 
                   transition-transform duration-300 hover:shadow-md hover:scale-105 
                   flex items-center space-x-2"
      >
        <span className="text-sm font-semibold text-gray-400">
          Content Context
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
      </button>
    </div>
  )
}

export default ContentContextButton