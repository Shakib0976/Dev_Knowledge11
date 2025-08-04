import React, { use, useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { MdDeveloperMode } from "react-icons/md";
import { ThemeContext } from '../Theme/ThemeProvider';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar } from 'react-icons/rx';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.config';
import { AiFillHome } from "react-icons/ai";
import { ShiftingDropDown } from './DropDown';
import { FiHome, FiLayout, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { themeColor, toggleTheme } = useContext(ThemeContext);
    const { user, setUser } = use(AuthContext);


    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNavbar(false); // Hide on scroll down
            } else {
                setShowNavbar(true); // Show on scroll up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);



    const logoutUser = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                    .then(() => {
                        console.log("User signed out");
                        localStorage.removeItem('devtalksToken');
                        setUser(null); // Clear user from context
                    })
                    .catch((error) => {
                        console.log("Logout error:", error.message);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });




    }

    const links = <>
        <NavLink className='font-bold plus-jakarta-sans-500' to={'/'}>Home</NavLink>
        <NavLink className='font-bold plus-jakarta-sans-500' to={'/allArticle'} >All Articles</NavLink>
        <NavLink className='font-bold plus-jakarta-sans-500' to={'/article'}>My Articles</NavLink>
        <NavLink className='font-bold plus-jakarta-sans-500' to={'/post'}>Post Article</NavLink>
        <NavLink className='font-bold plus-jakarta-sans-500' to={'/about'}>About Us</NavLink>

    </>
    return (
        <div className=' sticky  top-0  z-50  '>

            <div>
                <div className="navbar dark:bg-gray-900 border-b-1 bg-gray-100 border-gray-50 dark:border-gray-600 w-full lg:px-8  shadow-sm mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">


                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <div className='flex flex-col p-2 space-y-2 text-bold hover:bg-gray-200'>
                                    {links}
                                </div>


                            </ul>
                        </div>
                        <a style={{ fontFamily: 'Poppins' }} className="btn btn-ghost md:text-2xl font-bold">
                            <img
                                className="w-16 md:w-20 lg:w-24"
                                src="https://i.ibb.co.com/pjQ4Kk0H/Orange-Accents-in-Developer-Logo-removebg-preview.png"
                                alt="DevKnowledge Logo"
                            />
                            <span className="hidden md:inline ml-2">
                                Dev<span className="text-orange-400">Knowledge</span>
                            </span>
                        </a>

                    </div>
                    <div className="grid grid-cols-3 ml-4  lg:hidden gap-12">
                        <Link to={'/'}
                            href="#"
                            className="flex w-full flex-col items-center justify-center  text-neutral-400 transition-colors hover:text-neutral-50"
                        >
                            <FiHome size={25} className="mb-2 text-xl dark:text-white text-black" />

                        </Link>
                        <a
                            href="#"
                            className="flex w-full flex-col items-center justify-center  text-neutral-400 transition-colors hover:text-neutral-50"
                        >
                            <FiUser size={25} className="mb-2 text-xl dark:text-white text-black" />

                        </a>
                        <a
                            href="#"
                            className="flex w-full flex-col items-center justify-center text-neutral-400 transition-colors hover:text-neutral-50"
                        >
                            <FiLayout size={25} className="mb-2 text-xl dark:text-white text-black" />

                        </a>
                    </div>
                    <div className="navbar-center hidden  lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <div className="grid grid-cols-3 gap-12">
                                <Link to={'/'}
                                    href="#"
                                    className="flex w-full flex-col items-center justify-center  text-neutral-400 transition-colors hover:text-neutral-50"
                                >
                                    <FiHome className="mb-2 text-xl dark:text-white text-black" />
                                    <span className="text-xs">Home</span>
                                </Link>
                                <a
                                    href="#"
                                    className="flex w-full flex-col items-center justify-center  text-neutral-400 transition-colors hover:text-neutral-50"
                                >
                                    <FiUser className="mb-2 text-xl dark:text-white text-black" />
                                    <span className="text-xs">Profile</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex w-full flex-col items-center justify-center text-neutral-400 transition-colors hover:text-neutral-50"
                                >
                                    <FiLayout className="mb-2 text-xl dark:text-white text-black" />
                                    <span className="text-xs">Dashboard</span>
                                </a>
                            </div>
                        </ul>
                    </div>
                    <div className="navbar-end gap-5">



                        {/* Toogle theme contronl button  button */}

                        <button onClick={toggleTheme}>


                            {/* mobilde theme */}

                            {/* <label className="btn rounded-full flex md:hidden ml-4 -mt-6 cursor-pointer gap-2">
                                {themeColor === 'light' ? (
                                    // Show Moon icon for switching to dark
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                ) : (
                                    // Show Sun icon for switching to light
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5" />
                                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4
                 M18.4 18.4l1.4 1.4M1 12h2M21 12h2
                 M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                    </svg>
                                )}
                            </label> */}

                            {/* large device  */}

                            <div className='hidden md:block'>
                                <label className="flex  mr-2 cursor-pointer gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="5" />
                                        <path
                                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                    </svg>
                                    <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                </label></div></button>



                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 rounded-full content-center">
                                        {user?.photoURL ? (
                                            <img src={user?.photoURL} alt="User Avatar" />
                                        ) : (
                                            <RxAvatar className="w-full h-full text-2xl" />
                                        )}
                                    </div>
                                </div>
                                <ul className="mt-3 z-[1] p-2 border shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-60">
                                    <li>
                                        <Link to={'/article'} className='text-sm font-semibold'>My Articles</Link>
                                        <Link to={'/post'} className='text-sm font-semibold'>Post Articles</Link>
                                    </li>
                                    <li>
                                        <button onClick={logoutUser} className="btn btn-primary mt-1">Log Out</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <div className=' hidden lg:block space-x-3'>
                                    <Link className='  hover-underline' to={'/login'}>login</Link>
                                    <Link className=' btn glow-on-hover ' to={'/register'}>Create Account</Link>


                                </div>
                                <div>
                                    <Link className=' btn bg-blue-400 lg:hidden text-white rounded-2xl mb-2  ' to={'/register'}>Signin</Link>
                                </div>

                            </div>

                        )}
                    </div>
                </div>
            </div>
            <div className='hidden lg:block'>
                < ShiftingDropDown />
            </div>
        </div>

    );
};

export default Navbar;


