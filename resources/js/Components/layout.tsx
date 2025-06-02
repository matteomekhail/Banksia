// components/Layout.tsx
import React, { useState } from 'react';
import { Menu, HoveredLink } from './ui/navbar-menu';
import { FaInstagram, FaPhone, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './footer';
import { SparklesCore } from './ui/sparkles';
import { Toaster } from "@/Components/ui/toastert";
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    auth?: {
        user?: User;
    };
    [key: string]: any;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [active, setActive] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const handleLogout = () => {
        router.post('/logout');
    };

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Sparkles effect */}
            <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.4}
                maxSize={0.8}
                particleDensity={100}
                className="w-full h-full absolute top-0 left-0 pointer-events-none"
                particleColor="#43534A"
            />
            <Menu setActive={setActive}>
                <div className="flex items-center justify-between w-full relative">
                    {/* Menu e Contact us (visibili su desktop, nascosti su mobile) */}
                    <div className="hidden md:flex space-x-4 flex-1">
                        <HoveredLink href="/menu">MENU</HoveredLink>
                        <HoveredLink href="/book">BOOKINGS</HoveredLink>
                        <HoveredLink href="/contact">CONTACT US</HoveredLink>
                        {user && (
                            <HoveredLink href="/admin/bookings">ADMIN</HoveredLink>
                        )}
                    </div>

                    {/* Logo Banksia (centrato) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <a href="/">
                            <img src="/img/Banksia Logo White.svg" alt="Logo" className="w-40 h-20" />
                        </a>
                    </div>

                    {/* Icona Instagram, user menu e menu hamburger */}
                    <div className='flex-1 flex justify-end items-center space-x-4 text-2xl'>
                        <a href="tel:02 8201 3159" className="hidden md:flex items-center text-white hover:text-gray-400">
                            <FaPhone className="mr-2 text-sm" />
                            <span className="text-sm">02 8201 3159</span>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-white text-2xl hover:text-gray-400" />
                        </a>

                        {/* User menu (visibile solo se autenticato) */}
                        {user && (
                            <div className="relative hidden md:block">
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center text-white hover:text-gray-400 text-sm"
                                >
                                    <FaUser className="mr-2" />
                                    <span>{user.name}</span>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <a
                                            href="/admin/bookings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Admin Dashboard
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <FaSignOutAlt className="inline mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Login link (visibile solo se non autenticato) */}
                        {!user && (
                            <a href="/login" className="hidden md:flex items-center text-white hover:text-gray-400 text-sm">
                                <FaUser className="mr-2" />
                                <span>Login</span>
                            </a>
                        )}

                        {/* Menu hamburger (visibile solo su mobile) */}
                        <button className="md:hidden text-white" onClick={toggleMenu}>
                            <HiMenu className="text-2xl" />
                        </button>
                    </div>
                </div>
            </Menu>

            {/* Menu mobile con animazione migliorata */}
            <AnimatePresence>
                <motion.div
                    key="mobile-menu"
                    initial="closed"
                    animate={isMenuOpen ? "open" : "closed"}
                    exit="closed"
                    variants={menuVariants}
                    className="md:hidden bg-[#43534A] overflow-hidden"
                >
                    <div className="p-4 flex flex-col space-y-4">
                        <HoveredLink href="/menu" className="text-white">MENU</HoveredLink>
                        <HoveredLink href="/book" className="text-white">BOOKINGS</HoveredLink>
                        <HoveredLink href="/contact" className="text-white">CONTACT US</HoveredLink>
                        {user && (
                            <HoveredLink href="/admin/bookings" className="text-white">ADMIN</HoveredLink>
                        )}
                        <a href="tel:02 8201 3159" className="flex items-center text-white">
                            <FaPhone className="mr-2 text-sm" />
                            <span>02 8201 3159</span>
                        </a>
                        {user ? (
                            <div className="border-t border-gray-600 pt-4">
                                <div className="text-white text-sm mb-2">
                                    <FaUser className="inline mr-2" />
                                    {user.name}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-white text-sm hover:text-gray-400"
                                >
                                    <FaSignOutAlt className="inline mr-2" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <a href="/login" className="text-white">
                                <FaUser className="inline mr-2" />
                                Login
                            </a>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            <main className="flex-grow pt-14">
                {children}
            </main>
            <Toaster />
            <Footer />

        </div>
    );
};

export default Layout;
