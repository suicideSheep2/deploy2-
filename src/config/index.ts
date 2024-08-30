export const PRODUCT_CATEGORIES = [
    {
      label: 'Poems',
      value: 'ui_kits' as const,
      featured: [
        {
          name: 'Editor Picks',
          href: `/products?category=poems`,
          imageSrc: '/nav/ui-kits/mixed.jpg',
        },
        {
          name: 'Recently Added',
          href: '/products?category=poems&sort=desc',
          imageSrc: '/nav/ui-kits/blue.jpg',
        },
        {
          name: 'Best-rated',
          href: '/products?category=poems',
          imageSrc: '/nav/ui-kits/purple.jpg',
        },
      ],
    },
    {
      label: 'Novels',
      value: 'icons' as const,
      featured: [
        {
          name: 'Editor Picks',
          href: `/products?category=novels`,
          imageSrc: '/nav/icons/picks.jpg',
        },
        {
          name: 'Recently Added',
          href: '/products?category=novels&sort=desc',
          imageSrc: '/nav/icons/new.jpg',
        },
        {
          name: 'Best-rated',
          href: '/products?category=novels',
          imageSrc: '/nav/icons/bestsellers.jpg',
        },
      ],
    },
  ]
  