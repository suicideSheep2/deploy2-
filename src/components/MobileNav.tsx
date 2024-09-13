"use client"

import React, { useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES } from '@/config';
import { Menu, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      <button
        type='button'
        onClick={toggleNav}
        className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className='h-6 w-6' aria-hidden='true' />
        ) : (
          <Menu className='h-6 w-6' aria-hidden='true' />
        )}
      </button>

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full bg-white shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ maxWidth: '20rem' }} // Adjust width as needed
      >
        <div className="h-full overflow-y-auto">
          <div className="px-4 py-6">
            <nav className="mt-4">
              {PRODUCT_CATEGORIES.map((category) => (
                <div key={category.label} className="py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.label}
                    </h3>
                    {/* <ChevronRight className="h-5 w-5 text-gray-400" /> */}
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
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/sign-in"
              className="w-full px-4 py-3 text-center font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-150 ease-in-out"
              onClick={toggleNav}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="w-full px-4 py-3 text-center font-medium text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50 transition duration-150 ease-in-out"
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