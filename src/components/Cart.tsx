'use client'

import { Star } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

import { Separator } from './ui/separator'
// import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
// import { useCart } from '@/hooks/use-cart'
import { ScrollArea } from './ui/scroll-area'
// import CartItem from './CartItem'
import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'
import CartItem from './CartItem'

const Cart = () => {
  const { items} = useCart()

  const itemCount = items.length
// kinda useless ??? 
// maybe show total favourites haha 

const [isMounted, setIsMounted] = useState<boolean>(false)

useEffect(() => {
  setIsMounted(true)
}, [])

  const cartTotal = items.reduce((total, {product}) =>total + product.price,
0
)

  const fee = 1

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
      <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
        <SheetTitle>Favourites ({itemCount})</SheetTitle>
        </SheetHeader>
       
         {itemCount > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6'>
              {/* this is for cart items 
              modify it  kkkk */}

            <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem
                    product={product}
                    key={product.id}
                  />
                ))}
              </ScrollArea>
            </div>
            <div className='space-y-4 pr-6'>
              <Separator />
              <SheetFooter>
                <SheetTrigger asChild> 
                  <Link 
                  href= '/cart'
                  className={buttonVariants({
                  className: 'w-full',
                  })}>
                  Buy me a coffee 
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
      <div className='flex h-full flex-col items-center justify-center space-y-1'>
        <div 
        aria-hidden="true" className= 'relative mb-4 h-60 w-60 text-muted-foreground'>
          <Image 
          src='/hippo-empty-cart.png' 
          fill 
          alt='empty-shopping-cart-hippo-photo' 
          />
          </div> 
          <div className='text-xl font-semibold '>
             Your favourites is empty
              </div>
          <SheetTrigger asChild>
            <Link 
            href= '/products'
            className= {buttonVariants ({
            variant:'link',
            size: 'sm',
            className:
            'text-sm text-muted-foreground',
            })}>
              Add items to your favourites
            </Link>
          </SheetTrigger>
        </div>
          )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
