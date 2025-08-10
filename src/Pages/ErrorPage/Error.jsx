import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/404page.json"; 

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white px-4 relative overflow-hidden">
            {/* Lottie Animation */}
            <div className="w-[300px] md:w-[450px]">
                <Lottie animationData={errorAnimation} loop={true} />
            </div>

            {/* Text Section */}
            <h1 className="mt-2 text-2xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
                Lost in Knowledge?
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-md text-center">
                Oops! The page you are looking for doesn’t exist or has been moved.
            </p>

            {/* Home Button */}
            <Link
                to="/"
                className="mt-8 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
                Go To Home
            </Link>

            {/* Decorative Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>
        </div>
    );
};

export default ErrorPage;
