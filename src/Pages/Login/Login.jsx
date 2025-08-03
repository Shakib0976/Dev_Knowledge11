import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import lottiData from '../../assets/login1.json'
import Lottie from 'lottie-react';
import '../Register/Register.css'






const Login = () => {
    const locations = useLocation();

    const { setUser, googleSignIn, logInUser, setLoading } = use(AuthContext);


    const navigate = useNavigate();


    const handleSigninGoogle = () => {
        setLoading(true);
        googleSignIn()
            .then((result) => {
                toast.success('Successfully login')
                localStorage.setItem('devtalksToken', result?.user?.accessToken);
                navigate(locations?.state || '/', {
                    state: { toastMessage: 'Login successful!' }
                });
                const user = result.user;
                setUser(user);


            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage);
            });


    }


    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;


        logInUser(email, password)
            .then((result) => {
                const user = (result.user);
                setUser(user)
                localStorage.setItem('devtalksToken', result?.user?.accessToken);
                toast.success('Successfully Login')
                navigate(locations?.state || '/', {
                    state: { toastMessage: 'Login successful!' }
                });



            })
            .catch((error) => {
                console.log(error.message);
                toast.error('Invalid email or password!');
            })


    }
    return (
        <div className=' lg:flex  py-15  md:mx-12 justify-between' >
            <div className='flex-1 w-full flex flex-col mb-8 items-center justify-center md:mb-0 text-center'>
                <p className='space-grotesk-500 text-gray-500 font-semibold text-center mt-4'>Welcome Back</p>
                <h1 className='space-grotesk-500 text-xl md:text-2xl lg:text-4xl font-bold text-center mt-2'>Sign In your account</h1>
                <p className='text-gray-500 space-grotesk-500 font-bold text-center m-2 mb-6'>Please enter your details to sign in.</p>
                <Lottie animationData={lottiData} loop={true} className="w-78 hidden lg:flex mt-5 h-78" />
            </div>
            <div className="w-full max-w-md p-4 md:p-8 rounded-2xl shadow-[0_0_5px_rgba(110,69,226,0.5),_0_0_10px_rgba(136,211,206,0.3)] bg-gradient-to-br  bg-white dark:bg-transparent border border-gray-200 dark:border-gray-700">
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        {/* email */}
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            required
                            name='email'
                            type="email"
                            className="input-field w-full"
                            placeholder="enter your name here" />
                        {/* password */}
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                        <input

                            name='password'
                            type="password"
                            className="input-field w-full"
                            placeholder="Password" />
                        <div><button type='button' className="link link-hover">Forgot password?</button></div>
                        {/* button */}
                        <button type='submit' className="w-full py-2 mt-2  bg-white border border-gray-200 text-black hover:bg-gray-300 dark:hover:bg-gray-600 dark:bg-white dark:text-black rounded-full transition font-bold text-lg">Signin</button>



                    </form>
                    <p className='text-center mb-3'>Don't have an account?<span className='text-blue-700'>
                        <Link to='/register'>Sign up</Link></span></p>
                    <p className='font-bold text-gray-400 text-center'>Or, login with</p>

                    {/* google login button */}

                    <button
                        onClick={handleSigninGoogle}
                        className="w-full flex  items-center justify-center gap-2 py-3 bg-white border border-gray-300 dark:text-black dark:border-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 text-sm font-medium transition"
                    >
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Sign up with Google
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Login;