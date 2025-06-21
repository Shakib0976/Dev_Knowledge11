import React from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoBookOutline } from 'react-icons/io5';
import { Link, useLoaderData } from 'react-router';

const CategoryArticle = () => {
    const categoryData = useLoaderData();
    console.log(categoryData);
    return (
        <div className='w-11/12 mx-auto my-20'>

            <Link className='flex items-center gap-2 mb-4' to={'/'}> <FaArrowLeftLong /> Back to Home</Link>
            <h1 className='text-4xl my-2 font-bold'>Business Articles</h1>
            <p className='text-xl mb-15'>Discover insights and knowledge in business</p>




            {
                categoryData.length === 0 ? <div className='flex flex-col my-20  items-center justify-center'>
                    <h1 className='mb-5'><IoBookOutline size={50} /></h1>
                    <h1 className='text-4xl my-2 font-bold'>No articles in Business</h1>
                    <p>Be the first to share knowledge in this category! Your expertise could be valuable to the community</p>
                    <div class="flex flex-col mt-5 mb-15 sm:flex-row md:gap-4">
                        <Link to={'/allArticle'} class="btn border-none md:py-6 mt-1 text-white bg-gradient-to-r from-[#4B80F4] to-[#935BEF] hover:from-[#3a67d1] hover:to-[#7e47d1]">
                            Explore Articles
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 12h-15m11.5-4l4 4-4 4" />
                            </svg>
                        </Link>
                        <Link to={'/post'} href="#_" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
                            <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                            <span class="relative text-indigo-600 transition duration-300 group-hover:text-white ease">Share Knowledge</span>
                        </Link>
                    </div>
                </div> : <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 space-x-5 space-y-5'>
                    {
                        categoryData.map(task => <div key={task._id} className="card  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full w-[95%] shadow-sm">

                            <div className="card-body rounded-xl dark:text-white text-black">
                                <img className='rounded-xl' src={task.url} alt="" />

                                <h2 className="card-title dark:text-white text-black">{task.article
                                }</h2>
                                <div className='flex justify-between mt-5'>
                                    <p className='dark:text-white text-black card-title'>{task.name}</p>
                                    <p className='dark:text-white text-black'>Date: {task.date}</p>
                                </div>
                                <div className="card-actions justify-end">
                                    <Link to={`/allArticle/${task._id}`} className="btn btn-primary">Read More</Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            }







            <div className='bg-gray-200 dark:bg-gray-800 p-6 rounded-xl mt-10'>
                <h1 className='text-3xl font-bold mb-4'>About Business</h1>
                <p className='text-gray-700 dark:text-gray-300'> The business category is a space for sharing knowledge, insights, and experiences related to business. Whether you're a beginner looking to learn or an expert wanting to share your knowledge, this is the perfect place to connect with like-minded individuals and grow together as a community.</p>
            </div>
        </div>
    );
};

export default CategoryArticle;