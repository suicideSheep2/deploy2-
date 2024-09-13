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
    if (isOpen)
      document.body.classList.add('overflow-hidden');
    else
      document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      <button
        type='button'
        onClick={toggleNav}
        className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <Menu className={cn('h-6 w-6 transition-transform duration-200', isOpen && 'transform rotate-90')} aria-hidden='true' />
      </button>

      <div
        className={cn(
          'fixed inset-0 z-40 transition-opacity duration-300 ease-in-out backdrop-blur-sm',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(171,186,171,0.95))'
        }}
      >
        <div className="h-16"></div> {/* Space for the top navbar */}
        <nav className="mt-4 px-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {PRODUCT_CATEGORIES.map((category) => (
            <div key={category.label} className="py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  {category.label}
                </h3>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </div>
              <ul className="mt-2 space-y-2">
                {category.featured.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-white hover:bg-opacity-50 hover:text-green-600 transition duration-150 ease-in-out"
                      onClick={toggleNav}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 p-4 backdrop-blur-md"
             style={{background: 'linear-gradient(to right, rgba(255,255,255,0.8), rgba(171,186,171,0.8))'}}>
          <div className="flex space-x-4">
            <Link
              href="/sign-in"
              className="flex-1 px-4 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 transition duration-150 ease-in-out text-center shadow-md hover:shadow-lg"
              onClick={toggleNav}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="flex-1 px-4 py-2 rounded-md text-base font-medium text-green-600 bg-white border border-green-600 hover:bg-green-50 transition duration-150 ease-in-out text-center shadow-md hover:shadow-lg"
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