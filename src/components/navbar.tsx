import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">
            {/* Back Button */}
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
                <ArrowLeftIcon className="w-5 h-5 mr-1" />
                <span className="text-sm font-bold">All Categories</span>
            </Link>

            {/* Center Title */}
            {/* <h1 className="text-sm font-bold text-gray-800">Word Practice</h1> */}

            {/* Placeholder (e.g., user menu) */}
            <div className="w-10" />
        </nav>
    );
}
