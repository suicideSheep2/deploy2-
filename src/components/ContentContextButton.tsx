"use client"

import { ChevronDown, BookOpen, Feather, Clock, Heart } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface ContentContextButtonProps {
  category?: string;
  title?: string;
  author?: string;
  description?: string | object;
}

const ContentContextButton = ({ 
  category = 'Uncategorized', 
  title = 'Untitled', 
  author = 'Unknown Author', 
  description = 'No description available' 
}: ContentContextButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Auto-open effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const safeCategory = typeof category === 'string' ? category : 'Uncategorized'
  const safeAuthor = typeof author === 'string' ? author : 'Unknown Author'

  const contextInfo = {
    timeToRead: "4 min read",
    genre: safeCategory,
    mood: safeAuthor,
    themes: [safeCategory],
    writtenOn: `By: ${safeAuthor}`
  }

  return (
    <div className="relative flex justify-end w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group px-6 py-3 rounded-full shadow-md border border-white/20
                   transition-all duration-300 hover:shadow-lg hover:scale-105
                   flex items-center space-x-2 backdrop-blur-sm
                   hover:border-green-400/20
                   ${isOpen ? 'bg-white/30' : 'bg-white/10 hover:bg-white/30'}`}
      >
        <span className="text-sm font-semibold text-gray-400 transition-colors duration-300 
                       group-hover:text-green-800">
          Context
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-all duration-300
                    group-hover:text-green-800
                    ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 w-72 rounded-2xl bg-white/30 backdrop-blur-md
                       border border-white/20 shadow-xl transition-all duration-300
                       animate-in slide-in-from-top-5 fade-in-20 z-50">
          <div className="p-4 space-y-4 max-h-[80vh]">
            <div className="border-b border-gray-200/30 pb-2">
              <h3 className="text-lg font-serif text-gray-700">{title}</h3>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2 max-h-[60vh] 
                          [&::-webkit-scrollbar]:w-1.5
                          [&::-webkit-scrollbar-track]:bg-transparent
                          [&::-webkit-scrollbar-thumb]:bg-white/20
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar]:hover:w-1.5
                          [&::-webkit-scrollbar-thumb]:hover:bg-white/30
                          hover:[&::-webkit-scrollbar-thumb]:bg-white/40
                          transition-all duration-300">
              <div className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg 
                            transition-colors duration-200">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{contextInfo.timeToRead}</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg 
                            transition-colors duration-200">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm">{contextInfo.genre}</span>
              </div>

              <div className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg 
                            transition-colors duration-200">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{contextInfo.mood}</span>
              </div>

              <div className="space-y-2 p-2 rounded-lg">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Feather className="h-4 w-4" />
                  <span className="text-sm">Themes</span>
                </div>
                <div className="flex flex-wrap gap-2 pl-7">
                  {contextInfo.themes.map((theme, index) => (
                    <span
                      key={`${theme}-${index}`}
                      className="px-2 py-1 text-xs rounded-full bg-white/30 text-gray-600
                               hover:bg-green-100/50 hover:text-green-800 hover:scale-105
                               transition-all duration-200 cursor-pointer"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <div className="text-sm text-gray-600 leading-relaxed">
                  {contextInfo.writtenOn}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentContextButton