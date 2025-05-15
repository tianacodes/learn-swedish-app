import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">
            <Link href="/" className="text-xl font-bold bg-gradient-to-br from-blue-600 to-yellow-400 bg-clip-text text-transparent">
                SWEDISH
            </Link>
            <div className="w-10" />
        </nav>
    );
}
