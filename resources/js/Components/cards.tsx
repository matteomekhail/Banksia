"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A]">
                Get to know Banksia
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const data = [
    {
        category: "Breakfast",
        title: "Start your day with a delicious meal",
        src: "/img/0O2A7069.jpg",
        link: "/menu"

    },
    {
        category: "Lunch",
        title: "Enjoy a satisfying lunch",
        src: "/img/0O2A7136.jpg",
        link: "/menu"

    },
    {
        category: "Dessert",
        title: "Indulge in a sweet treat",
        src: "/img/0O2A7178.jpg",
        link: "/menu"

    },
    {
        category: "Specialty Latte",
        title: "Experience the perfect blend",
        src: "/img/0O2A7249.jpg",
        link: "/menu"

    },
    {
        category: "Dinner",
        title: "Savor a appetizing dinner",
        src: "/img/0O2A7089.jpg",
        link: "/menu"

    },
    {
        category: "Hiring",
        title: "Looking to join the staff at Banksia?",
        src: "/img/0O2A7274.jpg",
        link: "/contact"
    },
];
