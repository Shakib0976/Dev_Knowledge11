import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from "framer-motion"
import { FaRegComment } from 'react-icons/fa6';
import { BiLike } from 'react-icons/bi';

const LatestArticle = () => {
    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);
    console.log(comments);



    useEffect(() => {
        axios.get('https://dev-talks-11-server.vercel.app/article/latestArticle/letestDeadLine')
            .then(res => {
                console.log(res.data);
                setArticles(res.data);
                setComments(res.data._id)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => {
        axios.get(`https://dev-talks-11-server.vercel.app/comment`)
            .then(res => {
                console.log(res.data);
                setComments(res.data);
            })
    }, []);


    return (
        <div className='w-11/12 mx-auto '>
            <div className='grid grid-cols-1  md:gap-10 gap-5 lg:gap-20 mb-10'>
                {articles.map(article => (
                    <div
                        key={article._id}
                        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg rounded-xl overflow-hidden
                         bg-white dark:bg-neutral-900 border dark:shadow-sm  dark:hover:shadow-blue-200 border-gray-300 dark:border-gray-700 "
                    // whileHover={{
                    //     scale: 1.03, // Slightly reduced scale for better visual on hover
                    //     boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)" // More pronounced shadow
                    // }}
                    // transition={{ duration: 0.3 }}
                    >
                        {/* Image Overlay - if you want an actual image-full effect */}
                        {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.url})`, opacity: 0.2 }}></div> */}

                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <img
                                    src={article.Author_Photo}
                                    alt="Author"
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/96x96/cccccc/333333?text=Author"; }}
                                />
                                <div>
                                    <p className="font-semibold dark:text-gray-100 text-gray-800">{article.name}</p>
                                    <p className="text-sm dark:text-gray-300 text-gray-500">
                                        {article.category} &bull; {article.date}
                                    </p>
                                </div>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out">
                                Follow
                            </button>
                        </div>

                        {/* Article Image */}
                        <div className="w-full h-64 overflow-hidden bg-gray-200 flex items-center justify-center">
                            <img
                                src={article.url}
                                alt="Article"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/333333?text=Article+Image"; }}
                            />
                        </div>

                        {/* Article Content */}
                        <div className="p-4">
                            <h2 className="text-xl font-bold dark:text-gray-100 text-gray-900 mb-2">{article.article}</h2>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{article.content}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 dark:text-white dark:bg-slate-700 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className='divider'></div>

                            {/* Footer (optional - for likes/comments, not explicitly in your data but common for such cards) */}
                            <div className="flex  items-center justify-start space-x-8 text-sm">
                                <Link  className='flex hover:bg-gray-200 p-2 rounded-2xl text-black dark:text-white items-center gap-2'><BiLike size={25} /> <span className='text-gray-900 dark:text-white font-bold'>{article?.likeBy?.length} Likes</span></Link>
                                <Link className='flex hover:bg-gray-200 p-2 rounded-2xl text-black dark:text-white items-center gap-2'><FaRegComment size={20} /><span className='text-gray-900  font-bold dark:text-white'>{article?.comments?.length}Comment</span></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestArticle;