"use client"

import React, { useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES } from '@/config';
import { Menu, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => { // Added TouchEvent
      const nav = document.getElementById('mobile-nav'); // Reference to the mobile nav
      if (nav && !nav.contains(event.target as Node)) { // Type assertion for event.target
        setIsOpen(false); // Close nav if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // Added touchstart event
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside); // Clean up touchstart event
    };
  }, []);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      <button
        type='button'
        onClick={toggleNav}
        className='fixed top-3 left-0 z-50 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>

      <div
        id="mobile-nav" // Added ID for reference
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-full shadow-xl transition-transform duration-0 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ maxWidth: 'auto', top: '3.5rem', background: 'linear-gradient(to right, #ffffff, #abbaab)' }} // Added gradient background
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 py-6">
            <nav className="mt-0"> 
              {PRODUCT_CATEGORIES.map((category, index) => (
                <div key={category.label} className="">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.label}
                    </h3>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {category.featured.map((item) => (
                      <li key={item.name} className="flex justify-between items-center">
                        <Link
                          href={item.href}
                          className="block py-2 text-base text-gray-500 hover:text-green-600 transition duration-150 ease-in-out"
                          onClick={toggleNav}
                        >
                          {item.name}
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </li>
                    ))}
                  </ul>
                  {category.label === "Poems" && ( // Add SVG after Poems category
                  // change the svg to horizonatal line later
                    <div className="my-4">
                       <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                  className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                  <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                </svg>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/sign-in"
              className="w-full px-4 py-3 text-center font-medium text-gray bg-green-600 rounded-md hover:bg-green-700 hover:shadow-lg transition duration-150 ease-in-out"
              onClick={toggleNav}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="w-full px-4 py-3 text-center font-medium text-gray bg-green-600 border border-green-700 rounded-md hover:bg-green-700 hover:shadow-lg transition duration-150 ease-in-out"
              onClick={toggleNav}
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;