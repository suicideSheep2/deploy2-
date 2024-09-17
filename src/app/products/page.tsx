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

  const title = label ?? 'Browse digital collections'

  return (
    <MaxWidthWrapper>
      {/* <div className="mb-8">
        <h2 className="bg-white/30 px-6 py-3 rounded-full shadow-md max-w-screen-lg border border-white/20 transition-transform duration-300 hover:shadow-md hover:scale-105 inline-block">
          {title}
        </h2>
      </div> */}
      {/* shit doesn't look good at all lol wasted all my time 
      keep it as plain as it is for now */}
      <ProductReel
        title={title}
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