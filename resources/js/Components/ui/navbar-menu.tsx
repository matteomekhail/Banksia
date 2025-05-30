"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    return (
        <div onMouseEnter={() => setActive(item)} className="relative ">
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer dark:text-white text-gray-800 transition-all duration-500 ease-in-out hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-300 hover:via-blue-300 hover:to-purple-400 "
            >
                {item}
            </motion.p>
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="relative top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active" // layoutId ensures smooth animation
                                className=" dark:bg-[#0C0C0C] dark:bg-transparent bg-[#FFF5EA] backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                            >
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className="w-max h-full p-4 bg-[#FFF5EA] dark:bg-[#0C0C0C]"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative bg-[#43534A] z-50 border border-transparent backdrop-blur-md dark:border-white/[0.2] shadow-input flex justify-center space-x-4 px-8 py-12"
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}: {
    title: string;
    description: string;
    href: string;
    src: string;
}) => {
    return (
        <Link href={href} className="flex space-x-2">
            <div>
                <h4 className="text-xl font-bold mb-1  dark:text-white text-gray-800 transition-all duration-500 ease-in-out hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-300 hover:via-blue-300 hover:to-purple-400">
                    {title}
                </h4>
                <p className="text-sm max-w-[10rem]  dark:text-white text-gray-800 transition-all duration-500 ease-in-out hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-300 hover:via-blue-300 hover:to-purple-400">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }: any) => {
    return (
        <Link
            {...rest}
            className=" text-white transition-all duration-500 ease-in-out text-xl hover:text-gray-400  "    >
            {children}
        </Link>
    );
};
