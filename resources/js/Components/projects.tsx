/**
 * v0 by Vercel.
 * @see https://v0.dev/t/s2GOOKsmAag
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { WobbleCard } from "./ui/wobble-card"

export default function Project() {
    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32" id="projects">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-300 to-purple-400">My Featured Projects</h2>
                    <p className="mx-auto max-w-[700px] text-gray-800 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Check out some of our latest and greatest projects that showcase our design and development expertise.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-14">
                <WobbleCard
                    containerClassName="col-span-1 lg:col-span-2 h-auto bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                    className=""
                    onClick={() => window.open("https://fitfoodco.au", "_blank")}
                >
                    <div className="max-w-xs">
                        <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            FitFoodCo
                        </h2>
                        <h3 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">Fuel Your Energy with Healthy and Delicious Meals!</h3>
                        <p className="mt-4 text-left text-base/6 text-neutral-200">
                            Experience the perfect blend of health and taste with our expertly crafted meals. Try FitFoodCo and revolutionize your eating habits.
                        </p>
                    </div>
                    <img
                        src="/img/fitfoodcoWebsite.png"
                        width={500}
                        height={500}
                        alt="FitFoodco Image"
                        className="absolute -right-4 lg:-right-[40%] -bottom-20 object-contain rounded-2xl"
                    />
                </WobbleCard>
                <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                    <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Discover My Creative Projects
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                        Explore a curated selection of my best work, showcasing innovation, creativity, and dedication across various fields and disciplines.
                    </p>
                </WobbleCard>
                <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]" onClick={() => window.open("https://caribbeanpools.net.au", "_blank")}
                >
                    <div className="max-w-sm">
                        <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                            Caribbean Pools
                        </h2>
                        <h3 className="text-left text-balance text-base md:text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white">Transform Your Home with a Bespoke Caribbean Pool!</h3>
                        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                            Bring the luxury of the Caribbean to your backyard with our custom-designed pools. Discover the elegance and quality that only Caribbean Pools can offer.
                        </p>
                    </div>
                    <img
                        src="/img/caribbean.png"
                        width={500}
                        height={500}
                        alt="Caribbean Pools Image"
                        className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-20    object-contain rounded-2xl"
                    />
                </WobbleCard>
            </div>
        </section>
    )
}
