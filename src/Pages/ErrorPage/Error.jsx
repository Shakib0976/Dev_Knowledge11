import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (

        <div className='max-w-11/12 mx-auto'>
            <div className='items-center mt-12 grid justify-center text-center'>
                <div>
                    <img className=' w-[450px]' src="https://i.ibb.co.com/nMCpVphs/oops-404-error-with-broken-robot-concept-illustration-114360-5529.jpg" alt="" />
                </div>
                <div>
                    <h1 className='font-bold text-3xl text-yellow-300'>404 - Page Not Found</h1>
                    <p className='mt-4'>Oops! The page you are looking dosen't  exist</p>
                </div>
                <div className='mt-8'>
                    <Link className='  text-white  bg-[#0EA106]   px-6 py-2' to='/'>Got To Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;