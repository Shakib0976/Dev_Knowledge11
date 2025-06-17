import React from 'react';
import { MdOutlineRocketLaunch } from 'react-icons/md';

const About = () => {
    return (
        <div>
            <div className=' bg-cover     dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] p-4 py-10 md:py-15 lg:py-20'>
                <div class="badge badge-sm md:badge-lg text-sm md:mb-8 mb-4 bg-[#EAE0FF] dark:bg-[#2E1F47]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2 2m-2-2m2 2l2 2M10 9v6m4-3H6m3-3h6m-3 6v6m3-3h-6m9-9v4m-2-2h4m5 16l2 2m-2-2m2 2l2 2M10 12h4m-2 0V8m0 4v4" />
                    </svg>
                    Explore our Knowledge Community
                </div>
                <h1 class="md:text-6xl text-3xl font-bold mb-2 md:mb-6 text-center">
                    <span > About </span>
                    <span class="bg-gradient-to-r from-[#6A5ACD] to-[#935BEF] dark:bg-gradient-to-r dark:from-purple-600 dark:via-pink-500 dark:to-yellow-400 text-transparent bg-clip-text">DevKnowledge</span>
                </h1>
                <p class="text-[#4A4A4A] dark:text-gray-400 md:text-lg text-center max-w-2xl  mb-2 md:mb-10">
                    We're on a mission to democratize knowledge sharing and create a platform where everyone can learn, teach, and grow together. Join our community of curious minds and passionate experts.
                </p>
            </div>


            <div className='lg:flex  gap-5 md:p-20 p-5 my-20'>
                <div className='lg:w-[50%]'>
                    <h1 className='text-4xl flex font-bold my-10'><MdOutlineRocketLaunch /> Our Mission</h1>
                    <p className='my-2 text-lg text-gray-600 dark:text-gray-400'>At KnowledgeHub, we believe that knowledge is meant to be shared. Our platform connects curious learners with passionate experts, creating a vibrant ecosystem where insights flow freely and everyone can contribute to the collective wisdom.</p>
                    <p className='text-lg text-gray-600 dark:text-gray-400'>Whether you're sharing your expertise, learning something new, or simply exploring different perspectives, KnowledgeHub provides the tools and community you need to make meaningful connections through knowledge.</p>

                </div>
                <div className='bg-gradient-to-br my-3 lg:w-[50%] justify-center flex flex-col space-y-12  text-center from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-12 px-20 rounded-lg shadow-md'>
                    <div className='flex justify-between items-center'>
                        <div className='text-blue-600'>
                            <h1 className='text-4xl  font-bold mb-1'>10k+</h1>
                            <p>Articles Shared</p>
                        </div>
                        <div className='text-green-600'>
                            <h1 className='text-4xl  font-bold mb-1'>50k+</h1>
                            <p>Knowledge Seekers</p>
                        </div>
                    </div>
                   
                    <div  className='flex justify-between items-center'>
                        <div className='text-purple-600'>
                            <h1 className='text-4xl  font-bold mb-1'>5k+</h1>
                            <p>Active Writers</p>
                        </div>
                        <div className='text-red-600'>
                            <h1 className='text-4xl  font-bold mb-1'>100k+</h1>
                            <p>Topics Covered</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;