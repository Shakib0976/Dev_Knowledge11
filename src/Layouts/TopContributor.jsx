import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TopContributor = () => {


    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: true,   
        });
    }, []);

    return (
        <div className=''>
            <div className='w-11/12 mx-auto'>
                <h1 className='text-4xl font-bold text-center mt-10 mb-2'  data-aos="fade-down">Top Contributors</h1>
                <p className='text-center mb-15' data-aos="fade-down" data-aos-delay="200">Meet our most active community members</p>

                <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-10  rounded-2xl'>
                    <div data-aos="fade-down" data-aos-delay="200" className=' shadow-lg bg-white dark:bg-gray-600 py-8 px-8 justify-center items-center rounded-2xl flex flex-col'>
                        <img className='w-25 h-25 rounded-full border-2 border-blue-500' src="https://i.ibb.co/jZqsp9G6/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-ta.jpg" alt="" />
                        <h1 className='text-2xl font-semibold my-2'>Sarah Johnson</h1>
                        <p>22 articles</p>
                    </div>

                    <div data-aos="fade-down" data-aos-delay="200" className='shadow-lg bg-white dark:bg-gray-600 py-8 px-8 justify-center items-center rounded-2xl flex flex-col'>
                        <img className='w-25 h-25 rounded-full border-2 border-blue-500' src="https://i.ibb.co/4Zd6DC9Q/confident-young-man-handsome-young-man-keeping-arms-crossed-smiling-while-standing-against-white-bac.jpg" alt="" />
                        <h1 className='text-2xl font-semibold my-2'>Shakib Khan</h1>
                        <p>21 articles</p>
                    </div>

                    <div data-aos="fade-down" data-aos-delay="200" className='shadow-lg bg-white dark:bg-gray-600 py-8 px-8 justify-center rounded-2xl items-center flex flex-col'>
                        <img className='w-25 h-25 rounded-full border-2 border-blue-500' src="https://i.ibb.co/HfzXdQJx/handsome-young-man-plain-clothes-160672-5188.jpg" alt="" />
                        <h1 className='text-2xl font-semibold my-2'>Emily Davis</h1>
                        <p>15 articles</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopContributor;