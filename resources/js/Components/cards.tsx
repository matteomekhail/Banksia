"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "./ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
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

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="/img/0O2A7053.jpg"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Breakfast",
        title: "Start your day with a delicious meal",
        src: "/img/0O2A7069.jpg",
        content: <DummyContent />,
    },
    {
        category: "Lunch",
        title: "Enjoy a satisfying lunch",
        src: "/img/0O2A7136.jpg",
        content: <DummyContent />,
    },
    {
        category: "Dessert",
        title: "Indulge in a sweet treat",
        src: "/img/0O2A7178.jpg",
        content: <DummyContent />,
    },
    {
        category: "Specialty Latte",
        title: "Experience the perfect blend",
        src: "/img/0O2A7249.jpg",
        content: <DummyContent />,
    },
    {
        category: "Dinner",
        title: "Savor a appetizing dinner",
        src: "/img/0O2A7089.jpg",
        content: <DummyContent />,
    },
    {
        category: "Hiring",
        title: "Looking to join the staff at Banksia?",
        src: "/img/0O2A7274.jpg",
        content: <DummyContent />,
    },
];
