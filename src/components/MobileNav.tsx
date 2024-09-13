"use client"

import React, { useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES } from '@/config';
import { Menu, X } from 'lucide-react';
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
    if (isOpen)
      document.body.classList.add('overflow-hidden');
    else
      document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const closeNav = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
      >
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>

      <div
        className={cn(
          'fixed inset-0 z-50 bg-white bg-opacity-90 transition-opacity duration-300 ease-in-out',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            type='button'
            onClick={closeNav}
            className='rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
          >
            <X className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>

        <nav className="mt-4 px-4">
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.label} className="py-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {category.label}
              </h3>
              <ul className="mt-2 space-y-2">
                {category.featured.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-green-600 transition duration-150 ease-in-out"
                      onClick={closeNav}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-200 p-4">
          <Link
            href="/sign-in"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-green-600 transition duration-150 ease-in-out"
            onClick={closeNav}
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-green-600 transition duration-150 ease-in-out"
            onClick={closeNav}
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;