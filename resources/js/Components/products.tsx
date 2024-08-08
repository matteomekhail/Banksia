import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button";
import Link from 'next/link';
import { motion } from 'framer-motion';

const MenuSection = () => {
    const menuItems = [
        { title: 'Coffe', image: '/img/Immagine senza sfondo.png' },
        { title: "Milkshake, Frappe's and Blend", image: '/img/Milkshake.png' },
        { title: 'Dessert & Sweets', image: '/img/Crepe.png' },
        { title: 'Breakfast, Lunch & Dinner', image: '/img/meal.png' },

    ];

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {menuItems.map((item, index) => (
                    <Card key={index} className="w-full flex flex-col">
                        <CardHeader className="text-center">
                            <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center p-4">
                            <div className="w-full aspect-square relative overflow-hidden rounded-md">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </div>
                        </CardContent>
                        <motion.div
                            className="w-full flex justify-center items-center "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Button asChild className="bg-[#43534A] text-gray-50 hover:bg-[#43534A]/90">
                                <Link href="#services">
                                    View Our Menu
                                </Link>
                            </Button>
                        </motion.div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default MenuSection;
