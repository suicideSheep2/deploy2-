import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton';
import ProductDescription from '@/components/ProductDescription'
import React from 'react';
import StyledProductDescription from '@/components/ui/styledPD'

import fetch from 'node-fetch';


interface Product {
  id: string;
  name: string;
  description: string;
  description_html: string;
  category: string;
  author: string;
  images: Array<{ image: string | { url: string } }>;
  // Add any other fields your product has
}

interface PageProps {
  params: {
    productId: string
  };
}


const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

// this is to get product access from backend reyy 
const Page = async ({ params }: PageProps) => {
  const {productId} = params;

  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  const [product] = products;

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({value}) => value === product.category
  )?.label

  // to view image 
  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  return (
<MaxWidthWrapper className='bg-white'>
  <div className='bg-white'>
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-3xl lg:px-8'>

      {/* Breadcrumbs */}
      <ol className='flex items-center space-x-2'>
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className='flex items-center text-sm'>
              <Link 
                href={breadcrumb.href}
                className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                {breadcrumb.name}
              </Link>
              {i !== BREADCRUMBS.length - 1 ? (
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                  <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                </svg>
              ) : null }
            </div>
          </li>
        ))}
      </ol>

      {/* Product Image */}
      <div className='mt-4 aspect-square rounded-lg'>
        <ImageSlider urls={validUrls} />
      </div>

      {/* Product Details */}
      <div className='mt-6'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          {product.name as string}
        </h1>

        {/* Category */}
        <div className='mt-4 flex items-center'>
          <p className='font-medium text-gray-900'>
            <span className="text-muted-foreground">Category:</span>
          </p>
          <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
            {label}
          </div>
        </div>

        {/* Product Description */}
        <div className='mt-4 space-y-6'>
          <StyledProductDescription descriptionHtml={product.description_html} />
        </div>

        {/* Author and Add to Cart Button */}
        <div className='mt-6 flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className="group relative">
              <span className='text-sm text-muted-foreground'>
                © {product.author as string}
              </span>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Copyright Content
              </span>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

    </div>

    {/* Similar Products */}
    <ProductReel
      href='/products'
      query={{ category: product.category as string, limit: 4 }}
      title={`Similar ${label}`}
      subtitle={`Browse similar contents just like '${product.name}'`}
    />
  </div>
</MaxWidthWrapper>


  
 )
}

export default Page