'use client'

import { Star, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from './ui/sheet'

import { Separator } from './ui/separator'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

const CartItem = ({ product, className, onClose }: { product: any; className?: string; onClose: () => void }) => {
  const { removeItem } = useCart()

  return (
    <div className={cn(
      "flex items-center space-x-4 rounded-lg p-4 transition-all duration-200 ease-in-out mb-4",
      "bg-white bg-opacity-20 backdrop-blur-lg shadow-lg hover:shadow-xl",
      "border border-gray-200 hover:border-gray-300",
      className
    )}>
      <Link 
        href={`/product/${product.id}`} 
        className="flex-grow flex items-center space-x-4"
        onClick={(e) => {
          e.preventDefault();
          onClose();
          window.location.href = `/product/${product.id}`;
        }}
      >
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
          <Image
            src={product.images[0].image.url || '/placeholder-image.jpg'}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeItem(product.id);
        }}
        className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

const Cart = () => {
  const { items } = useCart()
  const itemCount = items.length
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const closeSheet = () => {
    const closeButton = document.querySelector('[data-radix-collection-item]') as HTMLButtonElement | null;
    if (closeButton) closeButton.click();
  }

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2 relative'>
        <Star
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
        />
        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          {isMounted ? itemCount : 0}
        </span>
        <span className='absolute left-1/2 -translate-x-1/2 top-full mt-2 text-xs font-medium text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none'>
          Favourites
        </span>
      </SheetTrigger>
      
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg bg-gradient-to-r from-white to-[#abbaab] bg-opacity-50'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>Favourites ({itemCount})</SheetTitle>
        </SheetHeader>
       
        <div className='flex flex-col h-full'>
          {itemCount > 0 ? (
            <>
              <ScrollArea className='flex-grow pr-6'>
                <div className='space-y-4 pt-4'>
                  {items.map(({ product }) => (
                    <CartItem
                      product={product}
                      key={product.id}
                      onClose={closeSheet}
                    />
                  ))}
                </div>
              </ScrollArea>
              <div className='mt-6 space-y-4 pr-6'>
                <Separator />
                <SheetFooter>
                  <SheetClose asChild>
                    <Link 
                      href='/cart'
                      className={buttonVariants({
                        variant: 'outline',
                        className: 'w-full bg-green-500 hover:bg-green-600 text-gray',
                      })}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      View All Favorites
                    </Link>
                  </SheetClose>
                </SheetFooter>
              </div>
            </>
          ) : (
            <div className='flex h-full flex-col items-center justify-center space-y-1'>
              <div aria-hidden="true" className='relative mb-4 h-60 w-60 text-muted-foreground'>
                <Image 
                  src='/hippo-empty-cart.png' 
                  fill 
                  alt='empty-shopping-cart-hippo-photo' 
                />
              </div> 
              <div className='text-xl font-semibold'>
                Your favourites is empty
              </div>
              <SheetClose asChild>
                <Link 
                  href='/products'
                  className={buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'text-sm text-muted-foreground',
                  })}
                >
                  Add items to your favourites
                </Link>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Cart