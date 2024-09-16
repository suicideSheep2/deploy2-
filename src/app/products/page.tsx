import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProductsPage = ({
  searchParams,
}: ProductsPageProps) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label

  const pageTitle = label ?? 'Browse digital collections'

  return (
    <MaxWidthWrapper>
      <div className="my-12 relative">
        <h1 className="font-light text-2xl md:text-3xl text-gray-700 pb-2 inline-block">
          {pageTitle}
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
      </div>
      <ProductReel
        query={{
          category,
          limit: 40,
          sort:
            sort === 'recent' || sort === 'oldest'
              ? sort
              : undefined,
        }}
      />
    </MaxWidthWrapper>
  )
}

export default ProductsPage