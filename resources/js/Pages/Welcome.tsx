import Hero from '@/Components/hero';
import Footer from '@/Components/footer';
import { AppleCardsCarouselDemo } from '@/Components/cards';
import Layout from '@/Components/layout';
import InstagramGallery from '@/Components/instagram';
import LocationSection from '@/Components/location';
import Products from '@/Components/products';
interface WelcomeProps {
  instagramAccessToken: string;
}

export default function Welcome({ instagramAccessToken }: WelcomeProps) {
    return (
        <>
            <Layout>
                <Hero />
                <Products />
                <LocationSection />
                <h1 className="text-4xl font-bold text-center sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-[#43534A] via-green-950 to-[#43534A] leading-relaxed py-2">
                    Follow us on Instagram!
                </h1>
                <InstagramGallery
                    accessToken={instagramAccessToken}
                    limit={12}
                    instagramUsername='Banksiacafe'
                />
                <AppleCardsCarouselDemo />
            </Layout>
        </>
    );
}
