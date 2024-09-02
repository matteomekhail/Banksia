import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { Button } from "./ui/button";

function Hero() {
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    return (
        <section className="w-full h-auto flex items-center bg-cover bg-no-repeat bg-center relative overflow-hidden">

            <div className="container mx-auto z-10">
                <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Colonna di sinistra per il testo */}
                    <motion.div
                        className="col-span-12 md:col-span-5 space-y-6 mb-8 md:mb-0 flex flex-col items-center md:items-start"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="space-y-4 text-center md:text-left">
                            <motion.h1
                                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                Indulge in Elegance: A Symphony of Sweetness Awaits
                            </motion.h1>
                            <motion.p
                                className="max-w-[500px] text-gray-500 md:text-xl dark:text-gray-400"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                Discover the ultimate chocolate and dessert experience, where every bite is a masterpiece crafted with passion. Every dessert is a work of art.
                            </motion.p>
                        </div>
                        <motion.div
                            className="w-full flex justify-center md:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button asChild className="bg-[#43534A] text-gray-50 hover:bg-[#43534A]/90">
                                <Link href="/menu">
                                    View Our Menu
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                    {/* Colonna di destra per l'immagine */}
                    <motion.div
                        className="col-span-12 md:col-span-7 flex justify-end"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.img
                            src="/img/Fontain2.png"
                            alt="Delicious pancakes"
                            className="w-4/6 h-1/2"
                            transition={{ type: "spring", stiffness: 300 }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
