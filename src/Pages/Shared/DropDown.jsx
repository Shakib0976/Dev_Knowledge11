import React, { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiBarChart2,
    FiChevronDown,
    FiHome,
    FiLayout,
    FiPieChart,
    FiUser,
} from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";




export const ShiftingDropDown = () => {


    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setShowHeader(false);
            } else {
                // Scrolling up
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);
    return (
        <div
            className={`fixed top-5 left-0 -z-50 w-full py-4   transition-transform duration-300 ${showHeader ? "translate-y-10" : "-translate-y-full"
                }`}
        >
            <div className="flex h-12 w-full justify-start dark:bg-gray-900 mb-2  bg-gray-100 pb-4 text-neutral-200 md:justify-start">
                <Tabs />
            </div>
        </div>
    );
};

const Tabs = () => {
    const [selected, setSelected] = useState(null);
    const [dir, setDir] = useState(null);

    const handleSetSelected = (val) => {
        if (typeof selected === "number" && typeof val === "number") {
            setDir(selected > val ? "r" : "l");
        } else if (val === null) {
            setDir(null);
        }

        setSelected(val);
    };

    return (
        <div
            onMouseLeave={() => handleSetSelected(null)}
            className="relative flex h-fit gap-2"
        >
            {TABS.map((t) => {
                return (
                    <Tab
                        key={t.id}
                        selected={selected}
                        handleSetSelected={handleSetSelected}
                        tab={t.id}
                    >
                        {t.title}
                    </Tab>
                );
            })}

            <AnimatePresence>
                {selected && <Content dir={dir} selected={selected} />}
            </AnimatePresence>
        </div>
    );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
    return (
        <button
            id={`shift-tab-${tab}`}
            onMouseEnter={() => handleSetSelected(tab)}
            onClick={() => handleSetSelected(tab)}
            className={`flex items-center dark:text-white gap-1 rounded-full px-3 py-1.5 text-xl  transition-colors ${selected === tab
                ? " bg-neutral-800 text-neutral-100"
                : "text-black"
                }`}
        >
            <span>{children}</span>
            <FiChevronDown
                className={`transition-transform ${selected === tab ? "rotate-180" : ""
                    }`}
            />
        </button>
    );
};

const Content = ({ selected, dir }) => {
    return (
        <motion.div
            id="overlay-content"
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 8,
            }}
            className="absolute left-0 top-[calc(100%_+_24px)] w-150 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4"
        >
            <Bridge />
            <Nub selected={selected} />

            {TABS.map((t) => {
                return (
                    <div className="overflow-hidden" key={t.id}>
                        {selected === t.id && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                                }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                                <t.Component />
                            </motion.div>
                        )}
                    </div>
                );
            })}
        </motion.div>
    );
};

const Bridge = () => (
    <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
    const [left, setLeft] = useState(0);

    useEffect(() => {
        moveNub();
    }, [selected]);

    const moveNub = () => {
        if (selected) {
            const hoveredTab = document.getElementById(`shift-tab-${selected}`);
            const overlayContent = document.getElementById("overlay-content");

            if (!hoveredTab || !overlayContent) return;

            const tabRect = hoveredTab.getBoundingClientRect();
            const { left: contentLeft } = overlayContent.getBoundingClientRect();

            const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

            setLeft(tabCenter);
        }
    };

    return (
        <motion.span
            style={{
                clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
            }}
            animate={{ left }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
        />
    );
};

const Products = () => {
    return (
        <div>
            <div className="flex gap-4">
                <div>
                    <h3 className="mb-2 text-sm font-medium">Frontend Developer</h3>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Focus: User interfaces (UI) and user experience (UX)
                    </a>
                    <a href="#" className="block text-sm text-neutral-400">
                        Tools: HTML, CSS, JavaScript, React, Vue, Angular
                    </a>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-medium">Backend Developer</h3>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Focus: Server-side logic, databases, APIs
                    </a>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Tools: Node.js, Express, Django, Ruby on Rails, Java, SQL, MongoDB
                    </a>
                </div>
                <div>
                    <h3 className="mb-2 text-sm font-medium"> Full Stack Developer</h3>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Focus: Both frontend and backend
                    </a>
                    <a href="#" className="mb-1 block text-sm text-neutral-400">
                        Tools: Mix of frontend and backend stacks (e.g., MERN, LAMP)
                    </a>
                </div>
            </div>

            <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
                <span>View more</span>
                <FiArrowRight />
            </button>
        </div>
    );
};

const Pricing = () => {
    return (
        <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
            >
                <FiHome className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Home</span>
            </a>
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
            >
                <FiUser className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Profile</span>
            </a>
            <a
                href="#"
                className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
            >
                <FiLayout className="mb-2 text-xl text-indigo-300" />
                <span className="text-xs">Dashboard</span>
            </a>
        </div>
    );
};

const Blog = () => {
    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <a href="#">
                    <h4 className="mb-0.5 text-sm font-medium">The Hidden Power of useEffect in React</h4>
                    <p className="text-xs text-neutral-400">
                        If you're new to React, useEffect might feel a bit mysterious. You’re told to use it for "side effects," but what does that really mean?
                    </p>
                </a>
                <a href="#">
                    <h4 className="mb-0.5 text-sm font-medium">How I Built a Donation Management System with the MERN Stack</h4>
                    <p className="text-xs text-neutral-400">
                        For my recent project—a Local Food Waste Reduction Platform—I needed a way to handle donations, role-based dashboards, and pickup requests. The MERN stack made it all possible.
                    </p>
                </a>
            </div>
            <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
                <span>View more</span>
                <FiArrowRight />
            </button>
        </div>
    );
};

const TABS = [
    {
        title: "Community",
        Component: Products,
    },
    {
        title: "Blog",
        Component: Blog,
    },
    {
        title: "About",
        Component: Pricing,
    },
].map((n, idx) => ({ ...n, id: idx + 1 }));