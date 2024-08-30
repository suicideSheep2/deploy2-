'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/payload-types'
import { Star } from 'lucide-react'

const AddToFavoritesButton = ({
  product,
}: {
  product: Product
}) => {
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  return (
    <Button
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 2000)
      }}
      size='sm'
      variant='ghost'
      className='group relative'
      title='Add to Favorites'>
      <Star
        className={`h-5 w-5 transition-colors ${
          isSuccess ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
        }`}
      />
      <span className='absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
        {isSuccess ? 'Added to Favorites!' : 'Add to Favorites'}
      </span>
    </Button>
  )
}

export default AddToFavoritesButton
