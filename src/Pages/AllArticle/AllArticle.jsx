import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllArticle = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/allTask')
            .then(res => {
                setTasks(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div className='w-11/12 mx-auto'>
            <h1 className='text-center text-2xl mt-10 mb-2 md:text-4xl'>All Articles</h1>
            <p className='mb-10 text-center'>Explore our collection of knowledge and insights</p>
            <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 space-x-5 space-y-5'>
                {
                    tasks.map(task => <div key={task._id} className="card  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full w-[95%] shadow-sm">

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
        </div>
    );
};

export default AllArticle;