'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import {
 Twitter
} from 'lucide-react'
import { Icons } from './Icons'


const Footer = () => {
  const pathname = usePathname()
  const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in']

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-70"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <MaxWidthWrapper>
        <div className="relative border-t border-gray-200 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Discover and share */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">UnwhisperedPerhaps</h3>
              <p className="text-md text-gray-600 mb-2">Contact us!</p>
              <Link
                href="https://x.com/FellowTravell20" 
                className="inline-flex items-center text-xl text-muted-foreground hover:text-gray-900"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <p>X</p>
               
              </Link>
            </div>

            {/* Empty Middle Column */}
            <div className="hidden md:block"></div>

            {/* Right Column - Join Our Community */}
            <div className="text-center md:text-right md:mr-4">
              <h4 className="text-lg font-medium text-gray-800 mb-4">Join Our Community</h4>
              <p className="text-sm text-gray-600 mb-4">Ready to showcase your talent?</p>
              <Link 
                href="/sign-up" 
                className="inline-block bg-gray-800 text-white text-sm px-6 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          {/* Footer bottom section */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} UnwhisperedPerhaps. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              {['Terms', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <Link 
                  key={item}
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
