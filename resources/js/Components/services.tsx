import React from 'react';

interface Service {
    title: string;
    description: string;
    iconUrl: string;
}

const services: Service[] = [
    {
        title: 'Continuous support',
        description: 'I will advance your web-based software to keep it efficient, competitive on the market. Using a well-established processes, it helps me roll out urgent updates within few hours and release new, planned functional modules every other week.',
        iconUrl: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/svgs/solid/tools.svg',
    },
    {
        title: 'Back-end development',
        description: 'I accurately implement the business logic of your web app on the back end. I always rely on proven frameworks to ensure fast and quality coding. And I build well structured APIs to integrate your web app with third-party systems and services',
        iconUrl: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/svgs/solid/server.svg',
    },
    {
        title: 'Frontend design/dev',
        description: 'As a web expert I tend to closely analyze the user audience to understand their needs and reflect these findings in UI design. Having agreed on the look and feel of a web app with project stakeholders, I push to bring it to life with smart front-end technologies.',
        iconUrl: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/svgs/solid/laptop-code.svg',
    }
];

interface ServiceCardProps {
    title: string;
    description: string;
    iconUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps & { index: number }> = ({ title, description, iconUrl, index }) => {
    let gradientClass = '';
    switch (index) {
        case 0:
            gradientClass = 'dark:from-white from-gray-800 dark:to-blue-100 to-blue-300';
            break;
        case 1:
            gradientClass = 'from-blue-300 via-blue-300 to-blue-300';
            break;
        case 2:
            gradientClass = 'from-blue-300 via-purple-400 to-purple-400';
            break;
        default:
            break;
    }

    return (
        <div className="flex flex-col items-center text-white p-6 rounded-lg">
            <img src={iconUrl} alt={title} className="w-12 h-12 mb-4 icon-white" />
            <h3 className={`text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${gradientClass}`}>{title}</h3>
            <p className='text-gray-800 dark:text-gray-300'>{description}</p>
        </div>
    );
};

const ServicesSection: React.FC = () => (
    <div className="text-center py-12 px-4" id="services">
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-300 to-purple-400">You're Safe And in Good Hands</h2>
        <p className="text-xl text-gray-800 dark:text-gray-300 mb-10">Customer satisfaction comes first, and in order to do that I decided to pickup skills and principles to provide quality service.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
            {services.map((service, index) => (
                <ServiceCard key={index} index={index} {...service} />
            ))}
        </div>
    </div>
);

export default ServicesSection;
