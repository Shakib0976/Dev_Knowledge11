import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import loaderAnimation from '../../assets/loginL.json';
import Lottie from 'lottie-react';
import './Register.css';

const Register = () => {
    const { setUser, createUser, googleSignIn, updateUser, setLoading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const { name, email, password, photo } = e.target;

        if (password.value.length < 6) {
            return setError('Password must be at least 6 characters.');
        }
        if (!/[A-Z]/.test(password.value)) {
            return setError('Password must contain at least one uppercase letter.');
        }
        if (!/[a-z]/.test(password.value)) {
            return setError('Password must contain at least one lowercase letter.');
        }

        try {
            const result = await createUser(email.value, password.value);
            const user = result.user;
            localStorage.setItem('devtalksToken', user.accessToken);
            await updateUser({ displayName: name.value, photoURL: photo.value });
            setUser({ ...user, displayName: name.value, photoURL: photo.value });
            toast.success('Successfully Signed Up');
            navigate(location.state || '/', { state: { toastMessage: 'Login successful!' } });
        } catch (err) {
            console.error(err);
            setError('Account already exists or invalid credentials.');
            toast.error(err.message);
        }
    };

    const handleSigninGoogle = async () => {
        try {
            setLoading(true);
            const result = await googleSignIn();
            const user = result.user;
            localStorage.setItem('devtalksToken', user.accessToken);
            setUser(user);
            toast.success('Signed in with Google');
            navigate(location.state || '/', { state: { toastMessage: 'Login successful!' } });
        } catch (err) {
            console.error(err);
            toast.error('Google sign-in failed.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col  lg:flex-row items-center justify-center px-4 py-8 bg-gray-50 dark:bg-black ">
            <div className="w-full flex flex-col md:w-1/2 mb-8 items-center justify-center md:mb-0 text-center">

                <h1 className="text-3xl home-title lg:text-4xl font-bold text-gray-800 dark:text-white"> <span className='dark:text-white'>Create Your Account</span></h1>
                <p className="text-gray-500 mb-2 dark:text-gray-300 mt-2">Please enter your details to sign up.</p>
                <Lottie animationData={loaderAnimation} loop={true} className="w-78 hidden lg:flex mt-5 h-78" />
            </div>

            <div className="w-full max-w-md p-8  rounded-2xl dark:shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] bg-gradient-to-br  bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleCreateUser} className="space-y-2">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="input-field w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input-field w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Photo URL</label>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Enter photo URL"
                            className="input-field w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input-field w-full"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <button type="submit" className="w-full py-3 mt-2 font-semibold bg-transparent hover:bg-gray-200 border-2 text-black border-gray-300 dark:hover:bg-gray-600 dark:bg-white dark:text-black rounded-full transition">
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>

                <div className="divider text-sm my-4 text-gray-400">or sign up with</div>

                <button
                    onClick={handleSigninGoogle}
                    className="w-full flex  items-center justify-center gap-2 py-3 bg-white border border-gray-300 dark:text-black dark:border-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 text-sm font-medium transition"
                >
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Sign up with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
