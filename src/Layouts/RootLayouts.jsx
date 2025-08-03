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


const RootLayouts = () => {

    const { user } = use(AuthContext);
    return (
        <div className='dark:bg-black colorgp'>
            <Navbar></Navbar>

            {/* aside */}
            <div className='flex flex-col md:flex-row '>
                <aside className=" w-70 h-screen sticky dark:shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] top-20 hidden lg:block dark:bg-gradient-to-r dark:from-black  m-1  border-base-100 p-4 overflow-y-auto">

                    <div className="flex mb-4 h-15">
                        <div>
                            {user?.photoURL ? (
                                <img className='w-15 rounded-full' src={user.photoURL} alt="User Avatar" />
                            ) : (

                                <p></p>
                            )}
                        </div>
                        <div className='text-center mt-1 ml-2 '>
                            {
                                user?.displayName ? (
                                    <div>
                                        <h1 className='text-sm mt-1 plus-jakarta-sans-500 font-bold'>{user.displayName}</h1>
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
                    <div className='h-screen '>
                        <h1 className='mt-5 font-bold text-xl'>Menu</h1>
                        <div className='flex flex-col '>
                            {/* Home button */}
                            <div className="flex flex-col items-start gap-2">
                                {/* Button Template */}
                                {[
                                    { icon: <FaHome className="text-blue-500" />, text: "Home", to: "/" },
                                    { icon: <TbView360 className="text-green-500" />, text: "All Articles", to: "/allArticle" },
                                    { icon: <GrUserManager className="text-purple-500" />, text: "My Articles", to: "/article" },
                                    { icon: <TfiWrite className="text-pink-500" />, text: "Post Article", to: "/post" },
                                    { icon: <FcBusinessman />, text: "Profile", to: "/profile" },
                                    { icon: <FcComboChart />, text: "Dashboard", to: "/dashboard" },
                                    { icon: <FcAbout />, text: "About Us", to: "/about" },
                                ].map((btn, index) => (
                                    <div key={index} className="relative group w-full">
                                        <button className="relative w-full p-px font-semibold leading-6 text-white dark:text-white bg-gray-800 dark:bg-gray-900  rounded-xl  transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                                            {/* Gradient border hover effect */}
                                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                                            {/* Inner content background based on theme */}
                                            <span className="relative z-10 block px-6 py-3 rounded-xl bg-white dark:bg-gray-950 transition-colors">
                                                <div className="flex items-center justify-start space-x-3 group-hover:translate-x-1 transition-all duration-300">
                                                    {btn.icon}
                                                    <NavLink to={btn.to} className="font-bold plus-jakarta-sans-500 text-gray-900 dark:text-white">
                                                        {btn.text}
                                                    </NavLink>
                                                </div>
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>

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