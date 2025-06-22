import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

const Register = () => {


    const { setUser, createUser, googleSignIn, updateUser, setLoading } = use(AuthContext);

    const locations = useLocation();
    const [error, setError] = useState('')

    const navigate = useNavigate()


    const handleCreateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;

        if (password.length < 6) {
            return setError('Password must be at least 6 characters long.');
        } else if (!/[A-Z]/.test(password)) {
            return setError('Password must contain at least one uppercase letter.');
        } else if (!/[a-z]/.test(password)) {
            return setError('Password must contain at least one lowercase letter.');
        }
        else {
            setError('');




            createUser(email, password)
                .then((result) => {
                    localStorage.setItem('devtalksToken', result?.user?.accessToken);
                    toast.success('Successfully Signin')
                    navigate(locations?.state || '/', {
                        state: { toastMessage: 'Login successful!' }
                    });
                    const user = (result.user);



                    updateUser({ displayName: name, photoURL: photo })
                        .then(() => {
                            setUser({ ...user, displayName: name, photoURL: photo });

                        })
                        .catch((error) => {
                            console.log(error);
                            setUser(user);
                        })


                }
                )

                .catch((error) => {

                    toast.error(error.message);
                    setError('Account already created !')
                })


        }


    }


    const handleSigninGoogle = () => {
        setLoading(true)
        googleSignIn()
            .then((result) => {
                toast.success('Successfully Signin')
                localStorage.setItem('devtalksToken', result?.user?.accessToken);
                navigate(locations?.state || '/', {
                    state: { toastMessage: 'Login successful!' }
                });
                const user = result.user;
                setUser(user);


            }).catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);
                toast.error(errorMessage)
            });


    }
    return (
        <div className=' flex flex-col py-15  justify-center items-center mx-3'>

            <div>
                <h1 className='space-grotesk-500 text-xl md:text-2xl lg:text-4xl font-bold text-center mt-4'>Sign Up your account</h1>
                <p className='text-gray-500 space-grotesk-500 font-bold text-center m-2 mb-4'>Please enter your details to sign Up.</p>
            </div>
            <div className="card dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 bg-base-100 mx-auto border border-gray-300 w-11/12  md:w-11/18 lg:w-11/28 shrink-0 shadow-2xl">
                <div className="card-body">
                    <form onSubmit={handleCreateUser} className="fieldset">
                        {/* name */}
                        <label className="font-bold text-sm label space-grotesk-500">Name</label>
                        <input
                            name='name'
                            type="text"
                            className="input  w-full"
                            placeholder="enter your name here" />
                        {/* email */}
                        <label className="label font-bold text-sm space-grotesk-500">Email</label>
                        <input
                            required
                            name='email'
                            type="email"
                            className="input w-full"
                            placeholder="enter your Email here" />
                        {/* photo-url */}
                        <label className="label font-bold text-sm space-grotesk-500">Photo_url</label>
                        <input
                            name='photo'
                            type="text"
                            className="input w-full"
                            placeholder="Photo_url" />
                        {/* password */}
                        <label className="label font-bold text-sm space-grotesk-500">Password</label>
                        <input
                            required
                            name='password'
                            type="password"
                            className="input w-full"
                            placeholder="Password" />
                        {/* button */}

                        <a href="#_" class="relative mt-4 inline-flex items-center justify-center  overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 group-hover:w-full group-hover:h-full"></span>
                            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                            <span class="relative"> <button type='submit' className="font-bold text-2xl my-2">Sign up</button></span>
                        </a>
                        {/* <div className='text-center text-red-700 font-semibold'>{error}</div> */}
                    </form>
                    <div>
                        <h1 className='text-red-500'>{error}</h1>
                        <p className='text-center mb-1'>Already have an account?<span className='text-blue-700 ml-2'><Link to='/login'>Login</Link></span></p>
                        <p className='font-bold text-gray-400 text-center'>Or, login with</p>

                    </div>
                    {/* google login button */}

                    <button onClick={handleSigninGoogle} className="btn bg-white text-black border-[#e5e5e5] mt-1 hover:bg-gray-200">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Signup with Google
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Register;