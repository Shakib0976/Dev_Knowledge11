import React, { use } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from 'react-simple-typewriter';
import { AuthContext } from '../../Context/AuthContext';

const Banner = () => {
    const loading = use(AuthContext);
    console.log(loading);
   
    return (
        <div className=' bg-cover     dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] p-4 py-10 md:py-15 lg:py-20'>
            <div  class="badge badge-sm md:badge-lg text-sm md:mb-8 mb-4 bg-[#EAE0FF] dark:bg-[#2E1F47]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2 2m-2-2m2 2l2 2M10 9v6m4-3H6m3-3h6m-3 6v6m3-3h-6m9-9v4m-2-2h4m5 16l2 2m-2-2m2 2l2 2M10 12h4m-2 0V8m0 4v4" />
                </svg>
                Welcome to the Knowledge Community
            </div>
            <h1 class="md:text-5xl text-3xl font-bold mb-2 md:mb-6 text-center">
                <span >Share Your</span>
                <span class="bg-gradient-to-r from-[#6A5ACD] to-[#935BEF] dark:bg-gradient-to-r dark:from-purple-600 dark:via-pink-500 dark:to-yellow-400 text-transparent bg-clip-text">Knowledge</span>
            </h1>
            <p class="text-[#4A4A4A] dark:text-gray-400 md:text-lg text-center max-w-2xl  mb-2 md:mb-10">
                Join a vibrant community of learners and experts. Discover insights, share your expertise, and contribute to the collective wisdom of our platform.
            </p>
            <div class="flex flex-col sm:flex-row md:gap-4">
                <button class="btn border-none md:py-6 mt-1 text-white bg-gradient-to-r from-[#4B80F4] to-[#935BEF] hover:from-[#3a67d1] hover:to-[#7e47d1]">
                    Explore Articles
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 12h-15m11.5-4l4 4-4 4" />
                    </svg>
                </button>
                <a href="#_" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
                    <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span class="relative text-indigo-600 transition duration-300 group-hover:text-white ease">Share Knowledge</span>
                </a>
            </div>
        </div>
    );
};

export default Banner;




