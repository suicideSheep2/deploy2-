"use client"
import React, { useState } from 'react';
import { TQueryValidator } from '@/lib/validators/query-validator'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import ProductListing from './ProductListing'
import { Label } from '@radix-ui/react-dropdown-menu';

interface ProductReelProps {
  query: TQueryValidator;
  href?: string;
  title?: string;
  subtitle?: string;
  isMainPage?: boolean;
  showSorting?:boolean;
}

const FALLBACK_LIMIT = 4;

const ProductReel = ({ query: initialQuery, href, title,subtitle, showSorting =true }: ProductReelProps) => {
  const [query, setQuery] = useState<TQueryValidator>(initialQuery);

  const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT,
      query,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  const products = queryResults?.pages.flatMap((page) => page.items as unknown as Product[]) || [];

  const handleSortChange = (newSort: string) => {
    setQuery(prevQuery => ({
      ...prevQuery,
      sort: newSort as TQueryValidator['sort']
    }));
  };

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'reverse-alphabetical', label: 'Z-A' },
    // { value: 'most-read', label: 'Most Read' },
    // { value: 'highest-rated', label: 'Highest Rated' },
    // { value:  'random' , Label: 'Random'}
    // ya fked up lol,
  ];

  return (
    <section className='py-12'>
      <div className='md:flex md:items-center md:justify-between mb-4'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title && (
            <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>{title}</h2>
          )}
          {subtitle && (
            <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>
          )}
        </div>
        
        <div className='flex items-center justify-between mt-4 md:mt-0'>
          {showSorting && (
            <select 
              value={query.sort} 
              onChange={(e) => handleSortChange(e.target.value)}
              className='block w-full rounded-full px-4 py-2 text-sm font-medium text-green-600 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-green-600 focus:outline-bold focus:ring-2 focus:ring-green-600 focus:border-transparent transition duration-300 ease-in-out hover:bg-transparent'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {href && (
            <Link
              href={href}
              className='hidden text-sm font-medium text-green-600 hover:text-green-700 md:block px-4 py-2 ml-4'
            >
              Browse the collection
              <span aria-hidden='true'> &rarr;</span>
            </Link>
          )}
        </div>
      </div>

      <div className='relative'>
        <div className='mt-6 flex items-center w-full'>
          <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
            {isLoading ? (
              Array.from({ length: query.limit ?? FALLBACK_LIMIT }).map((_, i) => (
                <div key={i} className='animate-pulse'>
                  <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200'></div>
                  <div className='mt-4 h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='mt-1 h-4 bg-gray-200 rounded w-1/2'></div>
                </div>
              ))
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <ProductListing
                  key={`product-${product.id}`}
                  product={product}
                  index={products.indexOf(product)}
                />
              ))
            ) : (
              <p className='col-span-full text-center text-muted-foreground'>
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;