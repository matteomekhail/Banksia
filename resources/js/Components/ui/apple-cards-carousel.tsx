import React, { useEffect, useRef } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

interface CarouselProps {
    items: JSX.Element[];
    initialScroll?: number;
}

type Card = {
    src: string;
    title: string;
    category: string;
    link: string;
};

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full">
            <div
                className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
                ref={carouselRef}
                onScroll={checkScrollability}
            >
                <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>

                <div className={cn("flex flex-row justify-start gap-4 pl-4", "max-w-7xl mx-auto")}>
                    {items.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" },
                            }}
                            key={"card" + index}
                            className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="flex justify-end gap-2 mr-10">
                <button
                    className="relative z-40 h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-50"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                >
                    <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
                </button>
                <button
                    className="relative z-40 h-10 w-10 rounded-full flex items-center justify-center disabled:opacity-50"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                >
                    <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
                </button>
            </div>
        </div>
    );
};

export const BlurImage = ({ height, width, src, fetchPriority, fill, className, alt, ...rest }: ImageProps) => {
    const [isLoading, setLoading] = React.useState(true);
    return (
        <img
            className={cn("transition duration-300 ", isLoading ? "blur-sm" : "blur-0", className)}
            onLoad={() => setLoading(false)}
            src={typeof src === "string" ? src : undefined}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            alt={alt ? alt : "Background of a beautiful view"}
            {...rest}
        />
    );
};


export const Card = ({ card }: { card: Card }) => {
    return (
        <Link href={card.link} passHref>
            <div className="relative rounded-3xl h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start z-10 cursor-pointer">
                <BlurImage
                    src={card.src}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                />
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
                <div className="relative z-40 p-8">
                    <p className="text-white text-sm md:text-base font-medium font-sans text-left">
                        {card.category}
                    </p>
                    <p className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
                        {card.title}
                    </p>
                </div>
            </div>
        </Link>
    );
}
