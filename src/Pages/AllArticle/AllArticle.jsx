import axios from 'axios';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import knowledgeAnimation from '../../assets/sc1.json';

const AllArticle = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const animationData = knowledgeAnimation;

    useEffect(() => {
        axios.get('https://dev-talks-11-server.vercel.app/allTask')
            .then(res => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleCategory = e => {
        e.preventDefault();
        const category = e.target.value;

        if (category === "All Category") {
            axios.get('https://dev-talks-11-server.vercel.app/allTask')
                .then(res => setTasks(res.data))
                .catch(err => console.log(err));
        } else {
            axios.get(`https://dev-talks-11-server.vercel.app/category/${category}`)
                .then(res => setTasks(res.data))
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='w-11/12 mx-auto'>
            <div className=" md:flex md:items-center md:justify-between mt-2 mb-16 gap-12">
                {/* Text Content */}
                {/* Left Content */}
                <div className=" text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl mb-3 mt-5 font-extrabold text-gradient ">
                        All Articles
                    </h1>
                    <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300  mb-5 md:mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Explore our curated collection of articles, tips, and insights to
                        empower your growth and knowledge.
                    </p>

                    <select
                        onClick={handleCategory}
                        name="category"
                        className="w-full max-w-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-5 py-3 shadow-md focus:outline-none focus:ring-4 focus:ring-purple-500 dark:focus:ring-purple-400 transition"
                    >
                        <option>All Category</option>
                        <option>Development</option>
                        <option>Marketing</option>
                        <option>Video Editing</option>
                        <option>Programming</option>
                        <option>Business</option>
                        <option>Others</option>
                    </select>
                </div>

                {/* Right Illustration */}
                <div className="md:w-1/2 hidden  md:flex justify-center mt-12 md:mt-0">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        style={{ width: 360, height: 260 }}
                        aria-label="Illustration showing knowledge and learning"
                    />
                </div>
            </div>


            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10'>
                {loading
                    ? [...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="card w-[95%] shadow-sm p-4 bg-gradient-to-r  rounded-xl"
                        >
                            <div className="skeleton h-40 w-full rounded-xl mb-4"></div>
                            <div className="skeleton h-6 w-3/4 mb-2"></div>
                            <div className="skeleton h-4 w-1/2 mb-4"></div>
                            <div className="flex justify-between">
                                <div className="skeleton h-4 w-20"></div>
                                <div className="skeleton h-4 w-20"></div>
                            </div>
                            <div className="skeleton h-10 w-24 mt-4"></div>
                        </div>
                    ))
                    : tasks.map(task => (
                        <div
                            key={task._id}
                            className="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={task.url}
                                alt={task.article}
                                className="w-full h-80 object-cover"
                            />
                            <div className="absolute bottom-0 w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{task.article}</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{task.category}</p>
                                <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                                    <span>{task.name}</span>
                                    <span>{task.date}</span>
                                </div>
                                <Link
                                    to={`/allArticle/${task._id}`}
                                    className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    );
};

export default AllArticle;
