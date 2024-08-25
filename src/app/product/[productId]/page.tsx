// this page is causing fkin error 
// to not even view the main homepage fkk
// not in this ideally but due to addition of this neeeds to change all wrong "" and ''

import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { getPayloadClient } from '@/get-payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import fetch from 'node-fetch';

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

  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'> 
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
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
                 ): null }
                </div>
              </li>
              ))}
          </ol>

          {/* <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>

              </h1>
            </div> */}

        </div>
      </div>
    </div>
  </MaxWidthWrapper>
 )
}

export default Page 