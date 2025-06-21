import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const LatestArticle = () => {
    const [articles, setArticles] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3000/article/latestArticle/letestDeadLine')
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
            <h1 className='text-4xl font-bold text-center mb-4'>Featured Articles</h1>
            <p className='text-xl text-center mb-8'>Discover the latest insights from our community of experts</p>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 space-x-5 space-y-5 '>
                {
                    articles.map(article => <div key={article._id} className="card  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full w-[95%] shadow-sm">

                        <div className="card-body rounded-xl dark:text-white text-black">
                            <img className='w-full h-48 object-cover rounded-xl' src={article.url} alt="" />

                            <h2 className="card-title dark:text-white text-black">Title :  {article.article
                            }</h2>
                            <h1>Expart : {article.category}</h1>
                            <div className='flex justify-between mt-5'>
                                <p className='dark:text-white text-black card-title'>{article.name}</p>
                                <p className='dark:text-white text-black'>Date: {article.date}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/allArticle/${article._id}`} className="btn btn-primary">Read More</Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default LatestArticle;