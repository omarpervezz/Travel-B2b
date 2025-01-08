'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb: React.FC = () => {
  const pathname = usePathname() || ''; // Ensure pathname is a string
  const pathSegments = pathname.split('/').filter((segment) => segment);

  return (
    <nav aria-label="Breadcrumb" >
      <ul className="flex items-center  text-sm text-gray-600 font-medium">
        <li>
          <Link href="/" className="hover:text-blue-600 font-medium text-sm">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-1 text-gray-400 font-medium text-sm">/</span>
              {isLast ? (
                <span className="text-blue-600 font-medium capitalize text-sm">
                  {segment.replace('-', ' ')}
                </span>
              ) : (
                <Link href={href} className="hover:text-blue-600 capitalize font-medium text-sm">
                  {segment.replace('-', ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
