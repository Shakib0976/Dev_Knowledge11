import React, { use } from 'react';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import { Outlet } from 'react-router';
import { Link, NavLink } from 'react-router';
import { RxAvatar } from 'react-icons/rx';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import { Carousel } from 'react-responsive-carousel';
import { FaHome } from 'react-icons/fa';
import { TbView360 } from 'react-icons/tb';
import { GrUserManager } from 'react-icons/gr';
import { TfiWrite } from 'react-icons/tfi';
import { FcAbout, FcBusinessman, FcComboChart } from 'react-icons/fc';
import { AuthContext } from '../Context/AuthContext';
import { FiBarChart2 } from 'react-icons/fi';


const RootLayouts = () => {

    const { user } = use(AuthContext);
    return (
        <div className='dark:bg-black colorgp'>
            <Navbar></Navbar>

            {/* aside */}
            <div className='flex flex-col md:flex-row '>
                <aside className="w-70 h-screen bg-white dark:bg-gray-900  sticky top-20 md:pt-8 dark:shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] hidden lg:block dark:bg-gradient-to-r dark:from-black  border-base-100 p-4 overflow-y-auto">
                    <div className="flex mb-4 h-15">
                        <div className='text-center   mt-1 '>
                            {
                                user?.displayName ? (
                                    <div>
                                        <h1 className='text-xl mt-1 plus-jakarta-sans-500 font-bold'>{user.displayName}</h1>
                                        <p className='text-sm'>{user?.email}</p>
                                    </div>

                                ) : (

                                    <div>
                                        <h1 className='text-rotator text-black dark:text-white'>
                                            We works for
                                            <div class="dropping-texts">
                                                <div>Developers</div>
                                                <div>Designers</div>
                                                <div>Coders</div>
                                                <div>EVERYONE!</div>
                                            </div>
                                        </h1>
                                    </div>
                                )
                            }


                        </div>

                    </div>
                    <div className="divider"></div>
                    <div className=''>
                        {
                            user && <>
                                <h1 className='mt-5 font-bold text-lg'>Menu</h1>
                                <div className='flex flex-col '>
                                    {/* Home button */}
                                    <div className="flex flex-col items-start">
                                        <div className="relative group w-full">


                                            <NavLink
                                                to={"/"}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-4 py-2 rounded-xl border transition ${isActive ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-gray-800`}
                                            >
                                                <FaHome className="text-blue-500" />
                                                <span className="font-medium">Home</span>
                                            </NavLink>

                                            <NavLink
                                                to={"/allArticle"}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-4 py-2 rounded-xl border transition ${isActive ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-gray-800`}
                                            >
                                                <TbView360 className="text-green-500" />
                                                <span className="font-medium">All Articles</span>
                                            </NavLink>


                                            <NavLink
                                                to={"/article"}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-4 py-2 rounded-xl border transition ${isActive ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-gray-800`}
                                            >
                                                <GrUserManager className="text-purple-500" />
                                                <span className="font-medium">My Articles</span>
                                            </NavLink>

                                            <NavLink
                                                to={"/post"}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-4 py-2 rounded-xl border transition ${isActive ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-gray-800`}
                                            >
                                                <TfiWrite className="text-pink-500" />
                                                <span className="font-medium">Post Article</span>
                                            </NavLink>
                                            <div className="divider"></div>
                                            <div className='mt-4 text-lg'>About</div>
                                            {
                                                user && <>
                                                    <NavLink
                                                        to={"/profile"}
                                                        className={({ isActive }) =>
                                                            `flex items-center gap-2 px-4 py-2 rounded-xl border transition ${isActive ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-gray-800`}
                                                    >
                                                        <FcBusinessman />
                                                        <span className="font-medium">Profile</span>
                                                    </NavLink>

                                                    <NavLink
                                                        to={"/dashboard"}
                                                        className={({ isActive }) =>
                                                            `flex items-center gap-2 px-4 py-2 rounded-xl border transition ${isActive ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-gray-800`}
                                                    >
                                                        <FcComboChart />
                                                        <span className="font-medium">Dashboard</span>
                                                    </NavLink></>
                                            }

                                            <NavLink
                                                to={"/about"}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-2 px-4 py-2 rounded-xl border transition ${isActive ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-gray-800`}
                                            >
                                                <FcAbout />
                                                <span className="font-medium">About Us</span>
                                            </NavLink>

                                        </div>

                                    </div>

                                </div>
                                <div className="divider"></div></>
                        }
                        <div className=" py-5 hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">🚀 Latest Articles</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Read trending articles written by developers around the world.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className=" py-5 hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">💡 Start a Discussion</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Ask questions, share ideas, and learn from the community.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className=" py-5 hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">📢 Events & Meetups</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Stay updated with developer meetups, hackathons, and workshops.
                            </p>
                        </div>
                        <div className=" py-5 hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">📚 Resources</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Access a library of guides, code snippets, and best practices from the community.
                            </p>
                        </div>

                        {/* Open Source Projects */}
                        <div className=" py-5 hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">🛠 Source Projects</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Discover and contribute to open source projects from fellow developers.
                            </p>
                        </div>

                        {/* Job Opportunities */}
                        <div className="b py-5 hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">💼 Job Opportunities</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Find remote and on-site developer jobs posted by trusted companies.
                            </p>
                        </div>
                    </div>

                </aside>


                <main className="flex-1/3 ">
                    <Outlet></Outlet>
                </main>

            </div>


            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;