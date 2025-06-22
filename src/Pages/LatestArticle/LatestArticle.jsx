import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion"

const LatestArticle = () => {
    const [articles, setArticles] = useState([]);


    useEffect(() => {
        axios.get('https://dev-talks-11-server.vercel.app/article/latestArticle/letestDeadLine')
            .then(res => {
                console.log(res.data);
                setArticles(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    return (
        <div className='w-11/12 mx-auto my-20'>
            <h1 className='md:text-4xl text-2xl font-bold text-center mb-2 md:mb-4'>Featured Articles</h1>
            <p className='md:text-xl text-lg text-center md:mb-20'>Discover the latest insights from our community of experts</p>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-5 lg:gap-20  mt-10 mb-10'>
                {
                    articles.map(article => <motion.div

                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)"
                        }}
                        transition={{ duration: 0.3 }}

                        key={article._id} className="card  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full w-[95%] shadow-sm">

                        <div className="card-body rounded-xl dark:text-white text-black">
                            <img className='w-full h-48 object-cover rounded-xl' src={article.url} alt="" />

                            <h2 className="card-title dark:text-white text-black">Title :  {article.article
                            }</h2>
                            <h1 className='text-gray-800 dark:text-gray-200'>Expart : {article.category}</h1>
                            <div className='flex justify-between mt-5'>
                                <p className='dark:text-white text-black card-title'>{article.name}</p>
                                <p className='dark:text-white text-black'>Date: {article.date}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/allArticle/${article._id}`} className="btn btn-primary">Read More</Link>
                            </div>
                        </div>
                    </motion.div>)
                }
            </div>
        </div>
    );
};

export default LatestArticle;