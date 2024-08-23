export const PRODUCT_CATEGORIES = [
    {
      label: 'Poems',
      value: 'ui_kits' as const,
      featured: [
        {
          name: 'Editor Picks',
          href: `/products?category=ui_kits`,
          imageSrc: '/nav/ui-kits/mixed.jpg',
        },
        {
          name: 'Recently Added',
          href: '/products?category=ui_kits&sort=desc',
          imageSrc: '/nav/ui-kits/blue.jpg',
        },
        {
          name: 'Best-rated',
          href: '/products?category=ui_kits',
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
          href: `/products?category=icons`,
          imageSrc: '/nav/icons/picks.jpg',
        },
        {
          name: 'Recently Added',
          href: '/products?category=icons&sort=desc',
          imageSrc: '/nav/icons/new.jpg',
        },
        {
          name: 'Best-rated',
          href: '/products?category=icons',
          imageSrc: '/nav/icons/bestsellers.jpg',
        },
      ],
    },
  ]
  