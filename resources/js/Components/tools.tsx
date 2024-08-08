import React, { useEffect, useRef, useState } from 'react';

interface Tool {
    name: string;
    icon: string;
    style: string;
}
const TechTools: React.FC = () => {
    const tools: Tool[] = [
        { name: 'Laravel', icon: '/svg/Laravel.svg', style: 'text-red-500' },
        { name: 'Php', icon: '/svg/PHP.svg', style: 'text-red-500' },
        { name: 'MySQL', icon: '/svg/MySQL.svg', style: 'text-orange-500' },
        { name: 'React js', icon: '/svg/React.svg', style: 'text-blue-500' },
        { name: 'Python', icon: '/svg/Python.svg', style: 'text-yellow-500' },
        { name: 'C++', icon: '/svg/CPlusPlus.svg', style: 'text-purple-500' },
        { name: 'Java', icon: '/svg/Java.svg', style: 'text-red-500' },
        { name: 'Vue.js', icon: '/svg/Vue.svg', style: 'text-green-500' },
    ];
    const selectedTools: Tool[] = [
        { name: 'Tailwind CSS', icon: '/svg/Tailwindcss.svg', style: 'text-indigo-500' },
        { name: 'Linux', icon: '/svg/Linux.svg', style: 'text-black' },
        { name: 'GitHub', icon: '/svg/github.svg', style: 'text-black' },
        { name: 'Wordpress', icon: '/svg/Wordpress.svg', style: 'text-black' },
        { name: 'Shopify', icon: '/svg/Shopify.svg', style: 'text-green-500' },
        { name: 'Node.js', icon: '/svg/NodeJS.svg', style: 'text-green-500' },
    ];
    const AITools: Tool[] = [
        { name: 'ChatGPT', icon: '/svg/ChatGPT.svg', style: 'text-indigo-500' },
        { name: 'Stability.AI', icon: '/svg/stability.svg', style: 'text-black' },
        { name: 'Midjourney', icon: '/svg/midjourney.svg', style: 'text-black' },
    ];

    const [delays, setDelays] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState<boolean[]>(new Array(tools.length).fill(false));
    const toolRefs = useRef<(HTMLDivElement | null)[]>(new Array(tools.length).fill(null));


    useEffect(() => {
        const newDelays = tools.map(() => 2 + Math.random() * 1.5);
        setDelays(newDelays);
    }, [tools.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = toolRefs.current.indexOf(entry.target as HTMLDivElement);
                        setIsVisible(prev => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
                            return newVisible;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        toolRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            toolRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [tools.length]);

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handler = () => setIsDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return (
        <>
            <div className="text-center text-white p-10">
                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-300 to-purple-400">Tools Of The Present & Future</h2>
                <p className="text-xl  text-gray-800 dark:text-gray-300 mb-10">Technologies I enjoy using</p>
                <div className="flex flex-wrap justify-center">
                    {tools.map((tool, index) => (
                        <div
                            ref={el => toolRefs.current[index] = el}
                            key={tool.name}
                            className="p-6 max-w-sm mx-auto rounded-xl flex flex-col items-center space-y-4"
                            style={{
                                opacity: 0,
                                animation: isVisible[index] ? `fadeIn 1s ease forwards` : 'none'
                            }}>
                            <div className={`flex items-center justify-center ${tool.style} h-40 w-40`}>
                                <img className="max-h-32 max-w-32" src={tool.icon} alt={`${tool.name} icon`} />
                            </div>
                            <div>
                                <p className=" text-gray-800 dark:text-gray-300 font-medium">{tool.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xl text-gray-800 dark:text-gray-300 mb-20 mt-20">Other Technologies That I Can Use</p>
                <div className="flex flex-wrap justify-center">
                    {selectedTools.map((tool, index) => (
                        <div
                            ref={el => toolRefs.current[index + tools.length] = el}
                            key={tool.name}
                            className={`p-6 max-w-sm mx-auto rounded-xl flex flex-col items-center space-y-4 ${index >= selectedTools.length - 2 ? 'mt-4' : ''}`}
                            style={{
                                opacity: 0,
                                animation: isVisible[index + tools.length] ? `fadeIn 1s ease forwards` : 'none'
                            }}>
                            <div className={`flex items-center justify-center ${tool.style} h-40 w-40`}>
                                <img className={`max-h-32 max-w-32 ${tool.icon.includes('github.svg') && !isDarkMode ? 'icon-white' : ''}`} src={tool.icon} alt={`${tool.name} icon`} />
                            </div>
                            <div>
                                <p className="text-gray-800 dark:text-gray-300 font-medium">{tool.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xl text-gray-800 dark:text-gray-300 mt-20">I can also integrate AI in your future App!</p>
                <div className="flex flex-wrap justify-center">
                    {AITools.map((tool, index) => (
                        <div
                            ref={el => toolRefs.current[index + tools.length + selectedTools.length] = el}
                            key={tool.name}
                            className={`p-6 max-w-sm mx-auto rounded-xl flex flex-col items-center space-y-4 ${index >= AITools.length - 2 ? 'mt-4' : ''}`}
                            style={{
                                opacity: 0,
                                animation: isVisible[index + tools.length + selectedTools.length] ? `fadeIn 1s ease forwards` : 'none'
                            }}>
                            <div className={`flex items-center justify-center ${tool.style} h-40 w-40`}>
                                <img className={`max-h-32 max-w-32 ${tool.icon.includes('midjourney.svg') && isDarkMode ? 'icon-white' : ''}`} src={tool.icon} alt={`${tool.name} icon`} />
                            </div>
                            <div>
                                <p className="text-gray-800 dark:text-gray-300 font-medium">{tool.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

};

export default TechTools;
