import React, { use } from 'react';
import Banner from '../Banner/Banner';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar } from 'react-icons/rx';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import { Carousel } from 'react-responsive-carousel';

const Home = () => {

    const { user } = use(AuthContext);
    console.log(user);
    return (
        <div className="flex  ">
            {/* Sidebar */}
            <aside className="w-64 m-1 hidden lg:block  shadow-xl border-base-100 p-4">
                <div className="flex mb-4 h-25">
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
                                <motion.div animate={{ color: ["#3b82f6", "#493D9E", "#4DA1A9", "#3A0519"] }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    }}>
                                    <h1 className='text-2xl h-23 plus-jakarta-sans-500 font-bold'><Typewriter
                                        words={['Want to support dev careers?', ' Allow users to start a new discussion', 'Users can comment on posts or articles.', ' Profile created on signup']}
                                        loop={5}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    /></h1>
                                    <p>Lets Start !</p>
                                </motion.div>
                            )
                        }


                    </div>

                </div>
                <div className="divider"></div>
                <div className='h-screen'>
                    <h1 className='my-5'>Menu</h1>
                    <div className='flex flex-col space-y-5'>
                       <div>
                         <NavLink className='border-2 border-base-200 py-2 font-bold plus-jakarta-sans-500' to={'/'}>Home</NavLink>
                       </div>
                        <NavLink className='border-2 border-base-200 py-2 font-bold plus-jakarta-sans-500'>All Articles</NavLink>
                        <NavLink className='border-2 border-base-200 py-2 font-bold plus-jakarta-sans-500'>My Articles</NavLink>
                        <NavLink className='border-2 border-base-200 py-2 font-bold plus-jakarta-sans-500'>Post Article</NavLink>
                        <NavLink className='border-2 border-base-200 py-2 font-bold plus-jakarta-sans-500'>About Us</NavLink>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-2">

            </main>
        </div>
    );
};


export default Home;

