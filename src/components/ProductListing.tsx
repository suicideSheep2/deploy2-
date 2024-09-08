'use client'

import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import ImageSlider from './ImageSlider'

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  if (isVisible && product) {
    return (
      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer group',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={`/product/${product.id}`}
      >
        <div className="relative flex flex-col w-full rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-sm group-hover:shadow-lg bg-transparent group-hover:z-10">
          <div className="aspect-square overflow-hidden rounded-lg">
            <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105">
              <ImageSlider
                urls={validUrls}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-4 transition-all duration-300 ease-in-out group-hover:translate-x-2">
            <h3 className="font-medium text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300 ease-in-out">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 ease-in-out">
              {label}
            </p>
          </div>
        </div>
      </Link>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  )
}

export default ProductListing

// Add this to your global styles or a parent component
