"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_CATEGORIES = void 0;
exports.PRODUCT_CATEGORIES = [
    {
        label: 'Poems',
        value: 'poems',
        featured: [
            {
                name: 'Editor Picks',
                href: "/products?category=poems",
            },
            {
                name: 'Recently Added',
                href: '/products?category=poems&sort=desc',
            },
            // {
            //     name: 'Best-rated',
            //     href: '/products?category=poems',
            // },
        ],
    },
    {
        label: 'Novels',
        value: 'novels',
        featured: [
            {
                name: 'Editor Picks',
                href: "/products?category=novels",
            },
            {
                name: 'Recently Added',
                href: '/products?category=novels&sort=desc',
            },
            // {
            //     name: 'Best-rated',
            //     href: '/products?category=novels',
            // },
        ],
    },
    {  
        label: 'Miscellaneous',
        value: 'miscellaneous' ,
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
];
