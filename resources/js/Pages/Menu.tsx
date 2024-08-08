import Hero from '@/Components/hero';
import Footer from '@/Components/footer';
import { AppleCardsCarouselDemo } from '@/Components/cards';
import Layout from '@/Components/layout';
import InstagramGallery from '@/Components/instagram';
import LocationSection from '@/Components/location';
import RestaurantMenu from '@/Components/menucomponent';

export default function Welcome() {
    return (
        <>
            <Layout>
                <RestaurantMenu />
            </Layout>
        </>
    );
}
