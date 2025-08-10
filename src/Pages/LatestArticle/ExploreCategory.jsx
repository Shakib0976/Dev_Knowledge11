import React from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion"

const ExploreCategory = () => {

    const categories = [
        { name: "Development", img: "https://i.ibb.co/mVgTrqXr/operation-process-performance-development-icon-53876-16541.jpg", Count: '24 Article' },
        { name: "Marketing", img: "https://i.ibb.co/7xrzhNvD/corporate-management-strategy-solution-branding-concept-53876-167088.jpg", Count: '14 Article' },
        { name: "Video Editing", img: "https://i.ibb.co/6RDDKnZ1/video-editor-taking-footage-shot-by-production-teams-improving-it-finishing-project-studio-482257-10.jpg", Count: '03 Article' },
        { name: "Programming", img: "https://i.ibb.co/3yQSfL78/programming-background-with-person-working-with-codes-computer-23-2150010150.jpg", Count: '09 Article' },
        { name: "Business", img: "https://i.ibb.co/QR00083/double-exposure-image-business-people-handshake-city-office-building-showing-partnership-31965-7590.jpg", Count: '16 Article' },
    ]

    return (
        <div className='w-11/12 mx-auto my-20'>
            <h1 className='md:text-4xl text-2xl font-bold text-center mb-2'>Explore Categories</h1>
            <p className='md:text-xl text-lg text-center mb-4 md:mb-12'>Find articles that match your interests</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    categories.map(category => <motion.div
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 250 }}
                         className="card bg-base-200 w-full shadow-sm">
                        <figure className="px-10 pt-10">
                            <img
                                src={category?.img}
                                alt="category img"
                                className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{category?.name}</h2>
                            <p>{category?.Count}</p>
                            <div className="card-actions">
                                <Link to={`/category/${category?.name}`} href="#_" class="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600 text-white">
                                    <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                    <span class="relative text-indigo-600 transition duration-300 group-hover:text-white ease">Explore Article</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>)
                }
            </div>
        </div>
    );
};

export default ExploreCategory;