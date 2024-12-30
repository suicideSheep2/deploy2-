"use client"

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageSliderProps {
  urls: string[]
  className?: string
}

const ImageSlider = ({ urls, className }: ImageSliderProps) => {
  if (!urls.length) return null
  
  if (urls.length === 1) {
    return (
      <div className={cn('group relative aspect-square rounded-xl overflow-hidden', className)}>
        <Image
          fill
          src={urls[0]}
          alt="Image"
          className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
        />
      </div>
    )
  }

  return (
    <div className={cn('grid gap-[2px] rounded-xl overflow-hidden group', className, {
      'grid-cols-2 grid-rows-2 aspect-square': urls.length === 4,
      'grid-cols-2 aspect-[2/1]': urls.length === 1,
      '[grid-template-areas:"main_top""main_bottom"] md:grid-cols-2 aspect-[1/1.1]': urls.length === 3,
    })}>
      {urls.map((url, i) => {
        const isFirst = i === 0
        const isThree = urls.length === 3
        
        return (
          <div
            key={url}
            style={isFirst && isThree ? { gridArea: 'main' } : undefined}
            className={cn(
              'relative overflow-hidden',
              'transition-all duration-300',
              {
                'row-span-2': isFirst && isThree,
                'hover:z-10 hover:brightness-110': true,
              }
            )}>
            <Image
              fill
              src={url}
              alt={`Image ${i + 1}`}
              className="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}

export default ImageSlider