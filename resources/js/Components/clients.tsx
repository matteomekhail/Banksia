import React from 'react';
import Slider from 'react-slick';

// Importa gli stili di Slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ClientCarousel() {
    // Opzioni per la configurazione di Slick
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    // Lista dei loghi dei clienti
    const logos = [
        { id: 1, src: "https://logo.clearbit.com/twitter.com", alt: "Client 1" },
        { id: 2, src: "https://logo.clearbit.com/facebook.com", alt: "Client 2" },
        { id: 3, src: "https://logo.clearbit.com/instagram.com", alt: "Client 3" },
        { id: 4, src: "https://logo.clearbit.com/github.com", alt: "Client 4" },
        { id: 5, src: "https://logo.clearbit.com/reddit.com", alt: "Client 5" },
    ];

    return (
        <div className="w-full overflow-x-hidden pt-10 pb-10">
            <h2 className="text-2xl font-bold text-black text-center mb-10">Clients that had trust in us</h2>
            <Slider {...settings}>
                {logos.map(logo => (
                    <div key={logo.id} className="px-3">
                        <img src={logo.src} alt={logo.alt} className="mx-auto" style={{ height: 'auto' }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ClientCarousel;
