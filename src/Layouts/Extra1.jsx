import React from 'react';
import { BsStars } from 'react-icons/bs';
import { IoBookOutline } from 'react-icons/io5';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import CountUp from 'react-countup';


const Extra1 = () => {
    return (
        <div>
            <div className='  py-20'>
                <div className='w-11/12 mx-auto'>

                    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-10 rounded-2xl'>
                        <div className=' bg-blue-50 dark:bg-gray-800 text-blue-600 py-8 px-8 justify-center items-center rounded-2xl flex flex-col'>
                            <h1><IoBookOutline size={60} /></h1>
                            <h1 className='text-2xl font-semibold my-2'><CountUp start={0} end={50} duration={50} />k+</h1>
                            <p>Knowledge Seekers</p>
                        </div>

                        <div className=' bg-purple-50 dark:bg-gray-800 text-purple-600 py-8 px-8 justify-center items-center rounded-2xl flex flex-col'>
                            <h1><MdOutlinePeopleAlt size={60} /></h1>
                            <h1 className='text-2xl font-semibold my-2'> <CountUp start={0} end={1000} duration={30} />+</h1>
                            <p>Active Contributors</p>
                        </div>

                        <div className=' bg-green-50 dark:bg-gray-800  text-green-600 py-8 px-8 justify-center rounded-2xl items-center flex flex-col'>
                            <h1><BsStars size={60} /></h1>
                            <h1 className='text-2xl font-semibold my-2'><CountUp start={0} end={500} duration={30} />+</h1>
                            <p>Articles Published</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Extra1;