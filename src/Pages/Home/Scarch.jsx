import React, { useState } from 'react';

const Scarch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const toolsData = [
        { type: "Color Tool", name: "Coolors", logo: "🎨", link: "https://coolors.co", description: "Generate perfect color palettes instantly." },
        { type: "Color Tool", name: "Color Hunt", logo: "🌈", link: "https://colorhunt.co", description: "Free curated color palette collections." },
        { type: "Color Tool", name: "Happy Hues", logo: "🎯", link: "https://www.happyhues.co", description: "Curated colors with use-case context." },
        { type: "Design Tool", name: "Figma", logo: "🖌️", link: "https://figma.com", description: "Design, prototype, and collaborate in real-time." },
        { type: "Design Tool", name: "Penpot", logo: "🔳", link: "https://penpot.app", description: "Open-source design & prototyping platform." },
        { type: "Animation Library", name: "Framer Motion", logo: "⚛️", link: "https://www.framer.com/motion/", description: "Declarative animations for React made easy." },
        { type: "Animation Library", name: "React Spring", logo: "🌱", link: "https://react-spring.dev", description: "Spring-physics-based animation library." },
        { type: "Animation Library", name: "React Reveal", logo: "💥", link: "https://www.react-reveal.com", description: "Animate React elements on scroll." },
        { type: "Illustration", name: "unDraw", logo: "🖼️", link: "https://undraw.co", description: "Open-source illustrations for any idea." },
        { type: "Illustration", name: "Humaaans", logo: "👩‍🎨", link: "https://humaaans.com", description: "Mix-match people illustrations." },
        { type: "Illustration", name: "ManyPixels", logo: "🌀", link: "https://www.manypixels.co", description: "Free daily illustrations for startups." },
        { type: "Component UI", name: "ShadCN UI", logo: "💎", link: "https://ui.shadcn.com", description: "Accessible, customizable React components." },
        { type: "Component UI", name: "Radix UI", logo: "🧩", link: "https://www.radix-ui.com", description: "Unstyled, accessible UI primitives for React." },
        { type: "Illustration", name: "LottieFiles", logo: "🔁", link: "https://lottiefiles.com", description: "Library of animated icons and illustrations." },
        { type: "Animation Website", name: "Motion.dev", logo: "🎞️", link: "https://motion.dev", description: "Animate anything in React easily with Motion One." },
        {
            type: "Animation Button Website",
            name: "Webdeasy Button Animations",
            logo: "🔘",
            link: "https://dev.to/webdeasy/top-20-css-buttons-animations-f41",
            description: "A curated list of 20 modern and creative CSS button animations with source code."
        }
        ,
        {
            type: "Animation Buttons Website",
            name: "Uiverse Buttons",
            logo: "🌐",
            link: "https://uiverse.io/buttons",
            description: "Community-made animated UI components including buttons, cards, toggles, and more — all with HTML, CSS, and Tailwind."
        }
        ,
        {
            type: " Animated Icons / Button",
            name: "Gradienty Animated Button/ Icons",
            logo: "⚙️",
            link: "https://gradienty.codes/animated-icons",
            description: "A collection of beautiful animated SVG icons powered by CSS gradients and keyframes."
        }

    ];

    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredData = normalizedSearch
        ? toolsData.filter(tool => tool.type.toLowerCase().includes(normalizedSearch))
        : toolsData;

    return (
        <div className='mb-25'>
            <div className=" sticky top-3 text-gray-900 dark:text-white mb-6">
                <input
                    type="text"
                    placeholder="Search website  (e.g., Color Tool , illustrator)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input hover:border-blue input-bordered w-full pl-10 pr-4 py-2 bg-base-200 border border-gray-700 dark:bg-black dark:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
            </div>

            {filteredData.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400 mt-16">
                    <div className="text-5xl mb-4">🔍</div>
                    <h2 className="text-xl font-semibold">No matching tools found</h2>
                    <p className="text-sm mt-2">Try searching with a different keyword.</p>
                </div>
            ) : (
                filteredData.map((tool, index) => (
                    <div
                        key={index}


                        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-lg dark:hover:shadow-sm hover:shadow-blue-200 transition-all p-4 mb-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{tool.logo}</span>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {tool.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {tool.type}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {tool.description}
                        </p>
                        <a
                            href={tool.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-indigo-500 hover:underline"
                        >
                            Visit Website →
                        </a>
                    </div>
                ))
            )}
        </div>
    );
};

export default Scarch;
