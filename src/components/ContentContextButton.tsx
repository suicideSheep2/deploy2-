"use client"

import { ChevronDown, BookOpen, Feather, Heart, Calendar } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface ContentContextButtonProps {
  name?: string;
  category?: string;
  author?: string;
  themes?: string[];
  excerpt?: string;
  context?: string;
  publishedDate?: string;
}

const ContentContextButton = ({ 
  name = 'Untitled', 
  category = 'Uncategorized', 
  author = 'Unknown Author',
  themes = [],
  excerpt = 'No excerpt available',
  context = '',
  publishedDate = ''
}: ContentContextButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        const timer = setTimeout(() => {
          setIsOpen(true)
        }, 500)
        return () => clearTimeout(timer)
      } else {
        setIsOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  const formattedDate = publishedDate ? new Date(publishedDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : 'Date not available'

  return (
    <div className="relative flex justify-end w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group rounded-full shadow-md border border-white/20
                   transition-all duration-300 hover:shadow-lg hover:scale-105
                   flex items-center backdrop-blur-sm
                   hover:border-green-400/20
                   md:px-6 md:py-3 
                   px-3 py-2 
                   ${isOpen ? 'bg-white/30' : 'bg-white/10 hover:bg-white/30'}`}
      >
        <span className="text-sm font-semibold text-gray-400 transition-colors duration-300 
                       group-hover:text-green-800 hidden md:block">
          Context
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-all duration-300
                    group-hover:text-green-800 md:ml-2
                    ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 rounded-2xl bg-white/30 backdrop-blur-md
                       border border-white/20 shadow-xl transition-all duration-300
                       animate-in slide-in-from-top-5 fade-in-20 z-50
                       w-80 md:w-96">
          <div className="p-6 space-y-6 max-h-[80vh]">
            {/* Header Section */}
            <div className="space-y-2">
              <h3 className="text-xl font-serif text-gray-800 leading-tight">{name}</h3>
              <div className="flex items-center space-x-2 text-gray-500">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-light">{formattedDate}</span>
              </div>
            </div>

            {/* Metadata Row */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/20 rounded-xl">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">{category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">{author}</span>
              </div>
            </div>

            {/* Themes Section */}
            {themes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Feather className="h-4 w-4" />
                  <span className="text-sm font-medium">Themes</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme, index) => (
                    <span
                      key={`${theme}-${index}`}
                      className="px-3 py-1 text-xs rounded-full bg-white/40 text-gray-700
                               hover:bg-green-100/50 hover:text-green-800 hover:scale-105
                               transition-all duration-200 cursor-pointer
                               border border-white/50 backdrop-blur-sm"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Excerpt Section */}
            {excerpt && (
              <div className="bg-gradient-to-br from-white/20 to-white/10 p-6 rounded-xl
                            backdrop-blur-sm border border-white/30 shadow-inner">
                <div className="font-serif text-sm text-gray-700 leading-relaxed italic 
                              tracking-wide first-letter:text-lg first-letter:font-medium">
                  &ldquo;{excerpt}&rdquo;
                </div>
              </div>
            )}

            {/* Context Section */}
            {context && (
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="text-sm text-gray-600 leading-relaxed">
                  {context}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentContextButton