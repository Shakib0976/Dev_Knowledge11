import React, { use } from 'react';
import Banner from '../Banner/Banner';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar } from 'react-icons/rx';
import { motion } from "framer-motion";

const Home = () => {

    const { user } = use(AuthContext);
    console.log(user);
    return (
        <div className="flex  ">
            {/* Sidebar */}
            <aside className="w-64 m-1 border-1 border-gray-300  p-4">
                <div className="flex mb-4">
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
                                    <h1 className='text-lg plus-jakarta-sans-500 font-bold'>{user.displayName}</h1>
                                    <img className='w-8' src="/src/assets/devLogo/verified.png" alt="" />
                                </div>

                            ) : (
                                <motion.div animate={{ color: ["#3b82f6", "#27548A", "#f59e0b", "#3A0519"] }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    }}>
                                    <h1 className='text-2xl plus-jakarta-sans-500 font-bold'>Want to support dev careers?</h1>
                                    <p>Lets Start !</p>
                                </motion.div>
                            )
                        }


                    </div>

                </div>
                <div className="divider"></div>
                <div className='flex flex-col'>
                    <h1>Menu</h1>
                    <NavLink className='font-bold btn text-start' to={'/'}>Home</NavLink>
                    <NavLink className='font-bold btn text-start'>All Articles</NavLink>
                    <NavLink className='font-bold btn text-start'>My Articles</NavLink>
                    <NavLink className='font-bold btn text-start'>Post Article</NavLink>
                    <NavLink className='font-bold btn text-start'>About Us</NavLink>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-2">
                <Banner></Banner>
            </main>
        </div>
    );
};


export default Home;

