// components/Layout.tsx
import React, { useState } from 'react';
import { Menu, HoveredLink } from './ui/navbar-menu';
import { FaInstagram } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './footer';
import { SparklesCore } from './ui/sparkles';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [active, setActive] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
                        <HoveredLink href="/contact">CONTACT US</HoveredLink>
                    </div>

                    {/* Logo Banksia (centrato) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <a href="/">
                            <img src="/img/Banksia Logo White.svg" alt="Logo" className="w-40 h-20" />
                        </a>
                    </div>

                    {/* Icona Instagram e menu hamburger */}
                    <div className='flex-1 flex justify-end items-center space-x-4 text-2xl'>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-white text-2xl hover:text-gray-400" />
                        </a>
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
                        <HoveredLink href="/contact" className="text-white">CONTACT US</HoveredLink>
                    </div>
                </motion.div>
            </AnimatePresence>

            <main className="flex-grow pt-14">
                {children}
            </main>
            <Footer />

        </div>
    );
};

export default Layout;
