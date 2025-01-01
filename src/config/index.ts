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
      // {
      //   name: 'Best-rated',
      //   href: '/products?category=poems',
      // },
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
      // {
      //   name: 'Best-rated',
      //   href: '/products?category=novels',
      // },
    ],
  },
  {  //maybe draft would be better name ??
    label: 'Miscellaneous',
    value: 'miscellaneous' as const,
    featured: [
      {
        name: 'Editor Picks',
        href: `/products?category=miscellaneous`,
      },
      {
        name: 'Recently Added',
        href: '/products?category=miscellaneous&sort=desc',
      },
      // {
      //   name: 'Best-rated',
      //   href: '/products?category=miscellaneous',
      // },
    ],
  },
]

export const PRODUCT_THEMES = [
  {
    label: 'Romance',
    value: 'romance' as const,
  },
  {
    label: 'Mystery',
    value: 'mystery' as const,
  },
  {
    label: 'Nature',
    value: 'nature' as const,
  },
  {
    label: 'Contemporary',
    value: 'contemporary' as const,
  },
  {
    label: 'Historical',
    value: 'historical' as const,
  },
  {
    label: 'Social Issues',
    value: 'social_issues' as const,
  },
  {
    label: 'Fantasy',
    value: 'fantasy' as const,
  },
  {
    label: 'Philosophy',
    value: 'philosophy' as const,
  },
  {
    label: 'Personal Growth',
    value: 'personal_growth' as const,
  },
  {
    label: 'Cultural',
    value: 'cultural' as const,
  }
] as const;