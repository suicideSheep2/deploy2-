export const PRODUCT_CATEGORIES = [
  {
    label: 'Poems',
    value: 'poems' as const,
    featured: [
      {
        name: 'Editor Picks',
        href: `/products?category=poems`,
      },
      {
        name: 'Recently Added',
        href: '/products?category=poems&sort=desc',
      },
      {
        name: 'Best-rated',
        href: '/products?category=poems',
      },
    ],
  },
  {
    label: 'Novels',
    value: 'novels' as const,
    featured: [
      {
        name: 'Editor Picks',
        href: `/products?category=novels`,
      },
      {
        name: 'Recently Added',
        href: '/products?category=novels&sort=desc',
      },
      {
        name: 'Best-rated',
        href: '/products?category=novels',
      },
    ],
  },
]