import React, { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';






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
        <div className=' flex  flex-col py-15  justify-center items-center  mx-3  bg-cover' >
            <div>
                <p className='space-grotesk-500 text-gray-500 font-semibold text-center mt-4'>Welcome Back</p>
                <h1 className='space-grotesk-500 text-xl md:text-2xl lg:text-4xl font-bold text-center mt-2'>Sign In your account</h1>
                <p className='text-gray-500 space-grotesk-500 font-bold text-center m-2 mb-6'>Please enter your details to sign in.</p>
            </div>
            <div className="card dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 bg-base-100 mx-auto border border-gray-300 w-11/12  md:w-11/18 lg:w-11/28 shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleLogin} className="fieldset">
                        {/* email */}
                        <label className="label font-bold text-sm space-grotesk-500">Email</label>
                        <input
                            required
                            name='email'
                            type="email"
                            className="input w-full"
                            placeholder="enter your name here" />
                        {/* password */}
                        <label className="label font-bold text-sm space-grotesk-500">Password</label>
                        <input

                            name='password'
                            type="password"
                            className="input w-full"
                            placeholder="Password" />
                        <div><button type='button' className="link link-hover">Forgot password?</button></div>
                        {/* button */}
                        <a href="#_" class="relative mt-4 inline-flex items-center justify-center  overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 group-hover:w-full group-hover:h-full"></span>
                            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                            <span class="relative"><button type='submit' className="font-bold text-2xl  my-2">Signin</button></span>
                        </a>

                    </form>
                    <p className='text-center mb-3'>Don't have an account?<span className='text-blue-700'>
                        <Link to='/register'>Sign up</Link></span></p>
                    <p className='font-bold text-gray-400 text-center'>Or, login with</p>

                    {/* google login button */}

                    <button onClick={handleSigninGoogle} className="btn  border-[#e5e5e5] mt-1">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Login;