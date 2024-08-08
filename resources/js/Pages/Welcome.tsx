import Hero from '@/Components/hero';
import Footer from '@/Components/footer';
import { AppleCardsCarouselDemo } from '@/Components/cards';
import Layout from '@/Components/layout';
import InstagramGallery from '@/Components/instagram';
import LocationSection from '@/Components/location';
import Products from '@/Components/products';

export default function Welcome() {
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
                    accessToken="IGQWROd2lPTGFKRTB3Q1RqOE1IWktwN2hkSm14RGozdGpNczFveDBaZAkpiVHBhYXpYV1FNSlF3MkhHdWRncWJsdmdqV2ZAaZAjRqLXNRZADFWNzE1NzhTc2tGVGd1U1pRSDBEVzJ3X1pTaWZA1aUYybUVJMkc5cDBOMEUZD"
                    limit={12}
                    instagramUsername='Banksiacafe'
                />
                <AppleCardsCarouselDemo />
                <Footer />
            </Layout>
        </>
    );
}
