import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const ElegantBreadcrumbs = () => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 mt-8 flex justify-left">
      <div className="bg-transparent bg-opacity-80 backdrop-blur-lg px-6 py-3 rounded-full shadow-md max-w-screen-lg">
        <ol className="flex items-center space-x-4">
          {BREADCRUMBS.map((breadcrumb, index) => (
            <li key={breadcrumb.id} className="flex items-center">
              <Link 
                href={breadcrumb.href}
                className={`text-sm font-semibold transition-colors duration-300 ease-in-out
                  ${index === BREADCRUMBS.length - 1 
                    ? 'text-gray-800 cursor-default' 
                    : 'text-gray-600 hover:text-green-600 hover:underline'}`
                }
              >
                {breadcrumb.name}
              </Link>
              {index < BREADCRUMBS.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default ElegantBreadcrumbs;
