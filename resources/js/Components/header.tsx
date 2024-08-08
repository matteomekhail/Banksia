import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    // Assicurati che il drawer sia nascosto a sinistra dello schermo quando è chiuso
    const drawerClasses = isOpen ? "translate-x-0" : "-translate-x-full";

    return (
        <nav className={`fixed top-0 w-full z-50 flex items-center flex-wrap p-6 shadow-xl backdrop-blur-lg transition-colors duration-150 ${scrollPosition > 50 ? 'bg-[#f4f4f4] text-black' : 'bg-transparent text-white'}`}>
            <div className="lg:hidden flex justify-end">
                <button onClick={() => setIsOpen(!isOpen)} className="flex px-3 py-2 border rounded border-none outline-none transition duration-300 ease-in-out">
                    <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className={`lg:hidden fixed top-0 left-0 w-1/2 h-screen bg-gradient-to-b from-transparent to-gray-900 shadow-lg p-5 transition-transform duration-500 ease-in-out ${drawerClasses} backdrop-blur-md`}>
                <Link href="/" className="block mt-4 text-black dark:text-white hover:bg-gray-700 hover:text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 rounded px-2 py-1">
                    Services
                </Link>
                <Link href="/about" className="block mt-4 text-black dark:text-white hover:bg-gray-700 hover:text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 rounded px-2 py-1">
                    Projects
                </Link>
                <Link href="/contact" className="block mt-4 text-black dark:text-white hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 rounded px-2 py-1">
                    Contact
                </Link>
            </div>
            <div className="hidden lg:flex space-x-4 items-end justify-end mr-40 flex-grow">
<Link href="/" className="block mt-4 text-black dark:text-white hover:bg-gray-700 hover:text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 rounded px-2 py-1">
    Services
</Link>
<Link href="/about" className="block mt-4 text-black dark:text-white hover:bg-gray-700 hover:text-white mr-4 transition duration-300 ease-in-out transform hover:scale-110 rounded px-2 py-1">
    Projects
</Link>
<Link href="/contact" className="block mt-4 text-black dark:text-white hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 rounded px-2 py-1">
    Contact
</Link>
            </div>
        </nav>
    );
}

export default Navbar;
