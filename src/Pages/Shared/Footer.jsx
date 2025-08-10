import React from 'react';
import { Link, NavLink } from 'react-router';

const Footer = () => {
    return (
        <div className='bg-gray-900 text-white py-10 md:py-20 md:px-15 px-8'>
            <div className='lg:flex justify-between'>
                <div>
                    {/* logo and title */}
                    <div className='flex '>
                        <img className='w-5 -m-4' src='/logo.png' alt="" />
                        <a style={{ fontFamily: 'Poppins' }} className="btn btn-ghost text-2xl font-bold"><img className='w-25  hidden md:block' src="/src/assets/devLogo/Orange_Accents_in_Developer_Logo-removebg-preview.png" alt="" />Dev<span className='text-orange-400'>Knowledge</span></a>
                    </div>
                    <div className='my-5'>
                        <p className='md:ml-9'>Share your knowledge with the community , DevKnowledge <br /> is more than just a forum—it's a collaborative platform <br /> built by developers,  for developers. </p>
                    </div>
                    {/* social login */}
                    <div>
                        <div className="flex gap-5">
                            <a href="https://www.facebook.com/md.shakib.khan.809698" target='_blank'><img src="/insta.png" alt="" /></a>
                            <a href="https://www.google.com/" target='_blank'><img src="/tw.png" alt="" /></a>
                            <a href="https://www.instagram.com/" target='_blank'><img src="/facebook.png" alt="" /></a>
                            <a href="https://www.youtube.com/" target='_blank'><img src="/youtube.png" alt="" /></a>
                        </div>

                    </div>
                </div>




                <div className='mt-3 md:mt-0'>
                    <h1 className='font-bold text-2xl mb-5'>Quick Links</h1>
                    <div className='grid mt-2 space-x-3'>
                        <NavLink className='plus-jakarta-sans-500' to={'/'}> Home</NavLink>
                        <NavLink to="/allArticle" className='plus-jakarta-sans-500' >All Articles</NavLink>
                        <NavLink  to="/about" className='plus-jakarta-sans-500' >About Us</NavLink>
                       
                    </div>
                </div>
                <div className='mt-3 md:mt-0'>
                    <h1 className='font-bold text-2xl mb-5'>Follow Us</h1>
                    <div className='mt-2 flex  space-x-3'>
                        <Link to={'https://www.linkedin.com/'} ><img className='w-10' src="https://i.ibb.co/N2pJg8NV/linkedin.png" alt="" /></Link>
                        <Link to={'https://www.facebook.com/'} > <img className='w-10' src="https://i.ibb.co/p6BK8vNq/communication.png" alt="" /></Link>
                        <Link to={'https://x.com/?lang=en'} >  <img className='w-10' src="https://i.ibb.co/XZKPP3MX/twitter.png" alt="" /></Link>





                    </div>
                </div>
            </div>
            <div className='border border-gray-500 my-5'></div>
            <div className='text-center text-gray-300'>
                <h1 className='mb-2'>© 2025 TaskForce</h1>
                <p> All rights reserved.    Terms of ServicePrivacy Policy</p>
            </div>
        </div>
    );
};

export default Footer;