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
import { FcAbout } from 'react-icons/fc';
import { AuthContext } from '../Context/AuthContext';

const RootLayouts = () => {

    const { user } = use(AuthContext);
    return (
        <div className='dark:bg-black colorgp'>
            <Navbar></Navbar>

            {/* aside */}
            <div className='flex flex-col md:flex-row'>
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
                    <div className='h-screen'>
                        <h1 className='mt-5 font-bold text-xl'>Menu</h1>
                        <div className='flex flex-col space-y-2'>
                            {/* Home button */}
                            <div href="#_" class="relative inline-flex items-center px-4 py-2 overflow-hidden text-lg font-medium border-2 border-gray-200 rounded-2xl hover:text-black group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-gradient-to-br opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-10 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative"><div className='flex items-center space-x-2'>
                                    <FaHome size={20} /><NavLink className=' font-bold plus-jakarta-sans-500' to={'/'}>Home</NavLink>
                                </div></span>
                            </div>

                            {/* view ALL articales  */}
                            <div href="#_" class="relative inline-flex items-center px-4 py-2 overflow-hidden text-lg font-medium border-2 border-gray-200 rounded-2xl hover:text-black group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-gradient-to-br opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-10 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative"><div className='flex items-center space-x-2'>
                                    <TbView360 size={20} /><NavLink to={'/allArticle'} className=' font-bold plus-jakarta-sans-500'>All Articles</NavLink>
                                </div></span>
                            </div>

                            {/* my articales */}

                            <div href="#_" class="relative inline-flex items-center px-4 py-2 overflow-hidden text-lg font-medium border-2 border-gray-200 rounded-2xl hover:text-black group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-gradient-to-br opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-10 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative"><div className='flex items-center space-x-2'>
                                    <GrUserManager size={20} /><NavLink to={'/article'} className=' font-bold plus-jakarta-sans-500'>My Articles</NavLink>
                                </div></span>
                            </div>

                            {/* post artical */}
                            <div href="#_" class="relative inline-flex items-center px-4 py-2 overflow-hidden text-lg font-medium border-2 border-gray-200 rounded-2xl hover:text-black group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-gradient-to-br opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-10 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative"><div className='flex items-center space-x-2'>
                                    <TfiWrite size={20} /> <NavLink to={'/post'} className='font-bold plus-jakarta-sans-500'>Post Article</NavLink>
                                </div></span>
                            </div>

                            {/* about */}

                            <div href="#_" class="relative inline-flex items-center px-4 py-2 overflow-hidden text-lg font-medium border-2 border-gray-200 rounded-2xl hover:text-black group hover:bg-gray-50">
                                <span class="absolute left-0 block w-full h-0 transition-all bg-gradient-to-br  opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span class="absolute right-0 flex items-center justify-start w-10 h-5 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span class="relative"><div className='flex items-center space-x-2'>
                                    <FcAbout size={20} /> <NavLink to={'/about'} className=' font-bold plus-jakarta-sans-500'>About Us</NavLink>
                                </div></span>
                            </div>
                        </div>
                    </div>
                </aside>


                <main className="flex-1/3 p-2">
                    <Outlet></Outlet>
                </main>

            </div>


            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;