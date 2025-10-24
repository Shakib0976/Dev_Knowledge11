import React, { use, useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ThemeContext } from '../Theme/ThemeProvider';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.config';
import logo1 from "../../assets/devLogo/Orange_Accents_in_Developer_Logo-removebg-preview.png"
import {
    Home,
    BookOpen,
    User,
    LayoutDashboard,
    Info,
    Sun,
    Moon,
    LogOut,
    Menu,
    FileText,
    PlusCircle,
    UserCircle
} from 'lucide-react';

const Navbar = () => {
    const { themeColor, toggleTheme } = useContext(ThemeContext);
    const { user, setUser } = use(AuthContext);

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNavbar(false);
            } else {
                setShowNavbar(true);
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
                        setUser(null);
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

    const NavIcon = ({ icon: Icon, label, to, mobile = false }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${isActive
                    ? 'text-[#6A5ACD] '
                    : 'text-[#4A4A4A] dark:text-gray-400 hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] hover:text-[#6A5ACD] dark:hover:text-purple-400'
                }`
            }
        >
            <Icon size={mobile ? 20 : 22} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
        </NavLink>
    );

    return (
        <div className='sticky top-0 z-50'>
            <div>
                <div className="navbar bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 w-full lg:px-8 shadow-lg mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} className="btn btn-ghost lg:hidden">
                                <Menu size={24} className="text-[#4A4A4A] dark:text-gray-400" />
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl z-50 mt-3 w-52 p-4 shadow-xl border border-gray-200 dark:border-gray-700">
                                <div className='flex flex-col space-y-3'>
                                    <NavLink className='flex items-center gap-3 p-2 rounded-lg hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] font-semibold text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400' to={'/'}>
                                        <Home size={18} />
                                        Home
                                    </NavLink>
                                    <NavLink className='flex items-center gap-3 p-2 rounded-lg hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] font-semibold text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400' to={'/allArticle'}>
                                        <BookOpen size={18} />
                                        All Articles
                                    </NavLink>
                                    <NavLink className='flex items-center gap-3 p-2 rounded-lg hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] font-semibold text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400' to={'/article'}>
                                        <FileText size={18} />
                                        My Articles
                                    </NavLink>
                                    <NavLink className='flex items-center gap-3 p-2 rounded-lg hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] font-semibold text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400' to={'/post'}>
                                        <PlusCircle size={18} />
                                        Post Article
                                    </NavLink>
                                    <NavLink className='flex items-center gap-3 p-2 rounded-lg hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] font-semibold text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400' to={'/about'}>
                                        <Info size={18} />
                                        About Us
                                    </NavLink>
                                </div>
                            </ul>
                        </div>

                        <Link to="/" className="btn btn-ghost text-xl font-bold">
                            <div className=" items-center justify-center mr-1">
                                <img className='w-15' src={logo1} alt="" />
                            </div>
                            <span className="hidden md:inline">
                                Dev<span className="bg-gradient-to-r from-[#6A5ACD] to-[#935BEF] text-transparent bg-clip-text">Knowledge</span>
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="grid grid-cols-3 lg:hidden gap-4 mx-auto">
                        <NavIcon icon={Home} label="Home" to="/" mobile={true} />
                        <NavIcon icon={BookOpen} label="Articles" to="/allArticle" mobile={true} />
                        <NavIcon icon={Info} label="About" to="/about" mobile={true} />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex justify-center w-full py-2 bg-transparent">
                        <div className="flex gap-8">
                            <NavIcon icon={Home} label="Home" to="/" />
                            <NavIcon icon={BookOpen} label="All Articles" to="/allArticle" />
                            {user && (
                                <>
                                    <NavIcon icon={FileText} label="My Articles" to="/article" />
                                    <NavIcon icon={PlusCircle} label="Post Article" to="/post" />
                                    <NavIcon icon={User} label="Profile" to="/profile" />
                                    <NavIcon icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
                                </>
                            )}
                            <NavIcon icon={Info} label="About Us" to="/about" />
                        </div>
                    </div>

                    <div className="navbar-end gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-[#EAE0FF] dark:bg-[#2E1F47] hover:bg-[#6A5ACD] dark:hover:bg-purple-700 transition-colors duration-300"
                        >
                            {themeColor === 'light' ? (
                                <Moon size={20} className="text-[#6A5ACD] dark:text-purple-400" />
                            ) : (
                                <Sun size={20} className="text-amber-500" />
                            )}
                        </button>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 h-10 rounded-full border-2 border-[#EAE0FF] dark:border-[#2E1F47] overflow-hidden">
                                        {user?.photoURL ? (
                                            <img src={user?.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-[#6A5ACD] to-[#935BEF] flex items-center justify-center">
                                                <UserCircle size={20} className="text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <ul className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 w-56">
                                    <li className="p-2 border-b border-gray-200 dark:border-gray-600 mb-2">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-[#4A4A4A] dark:text-white truncate">
                                                {user.displayName || 'User'}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {user.email}
                                            </span>
                                        </div>
                                    </li>
                                    <li className="lg:hidden space-y-1 mb-2">
                                        <NavLink to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400">
                                            <User size={18} />
                                            Profile
                                        </NavLink>
                                        <NavLink to="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#EAE0FF] dark:hover:bg-[#2E1F47] text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400">
                                            <LayoutDashboard size={18} />
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logoutUser}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 w-full text-left"
                                        >
                                            <LogOut size={18} />
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="hidden lg:block space-x-3">
                                    <Link
                                        to="/login"
                                        className="px-4 py-2 text-[#4A4A4A] dark:text-gray-400 hover:text-[#6A5ACD] dark:hover:text-purple-400 font-medium transition-colors duration-300"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-6 py-2 bg-gradient-to-r from-[#6A5ACD] to-[#935BEF] hover:from-[#5A4ABC] hover:to-[#834ADF] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                                <div className="lg:hidden">
                                    <Link
                                        to="/register"
                                        className="px-4 py-2 bg-gradient-to-r from-[#6A5ACD] to-[#935BEF] hover:from-[#5A4ABC] hover:to-[#834ADF] text-white rounded-xl font-semibold text-sm"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;