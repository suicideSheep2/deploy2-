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

// Add subtitle to ProductReelProps interface
interface ProductReelProps {
  href: string;
  query: { category: string; limit: number; };
  title: string;
  isMainPage: boolean;
  subtitle: string; // {{ edit_1 }} Ensure this is defined
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
   //@ts-ignore
  const validUrls = product.images
   //@ts-expect-error
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  return (
<MaxWidthWrapper className='bg-transparent'>
  <div className='bg-transparent '>
    <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-3xl lg:px-8'>

      {/* Breadcrumbs */}
      <ol className='flex items-center space-x-2 mb-2 mt-0'> {/* Set mt to 0 */}
        {BREADCRUMBS.map((breadcrumb, i) => (
          <li key={breadcrumb.href}>
            <div className='flex items-center text-xl'> {/* Increased font size to text-xl */}
              <Link 
                href={breadcrumb.href}
                className='font-medium text-lg text-muted-foreground hover:text-gray-900'> {/* Changed text size to text-lg */}
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
     <h1 className='text-2xl font-serif font-bold text-grey-400;'>
       {product.name as string}
        </h1>






        {/* Category */}
        <div className='mt-4 flex items-center'>
          <p className='font-medium text-gray-900'>
            <span className="text-muted-foreground">Category</span>
          </p>
          <div className='ml-4 border-l font-medium text-muted-foreground text-gray-900 pl-4'>
            {label}
          </div>
        </div>

        {/* Product Description */}
        <div className='mt-4 space-y-6'>
          <StyledProductDescription descriptionHtml={product.description_html as string} />
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
           
            <AddToCartButton
            //@ts-ignore
             product={product} />
          </div>
        </div>
      </div>

    </div>

    {/* Similar Products */}
    <ProductReel
      href='/products'
      query={{ category: product.category as string, limit: 4 }}
      title={`Similar ${label}`}
      subtitle={`Browse similar contents like '${product.name}'`} // {{ edit_2 }}
      showSorting={false} 
    />
  </div>
</MaxWidthWrapper>


  
 )
}

export default Page