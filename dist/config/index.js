"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_CATEGORIES =  exports.PRODUCT_THEMES = void 0;

exports.PRODUCT_THEMES = [
    {
        label: 'Romance',
        value: 'romance',
    },
    {
        label: 'Mystery',
        value: 'mystery',
    },
    {
        label: 'Nature',
        value: 'nature',
    },
    {
        label: 'Contemporary',
        value: 'contemporary',
    },
    {
        label: 'Historical',
        value: 'historical',
    },
    {
        label: 'Social Issues',
        value: 'social_issues',
    },
    {
        label: 'Fantasy',
        value: 'fantasy',
    },
    {
        label: 'Philosophy',
        value: 'philosophy',
    },
    {
        label: 'Personal Growth',
        value: 'personal_growth',
    },
    {
        label: 'Cultural',
        value: 'cultural',
    }
];

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
