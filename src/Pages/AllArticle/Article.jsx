import React, { use } from 'react';
import { FaArrowLeftLong, FaRegComment } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar } from 'react-icons/rx';
import { BiLike } from 'react-icons/bi';
import { LuSend } from 'react-icons/lu';

const Article = () => {
    const task = useLoaderData();
    console.log(task);
    const { user } = use(AuthContext);
    return (
        <div className='mx-auto w-[60%]'>
            <div>
                <Link to={'/allArticle'} className='btn mt-15 mb-5'> <FaArrowLeftLong /> Back</Link>
            </div>
            <div className="card  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full  shadow-sm">

                <div className="card-body rounded-xl dark:text-white text-black">
                    <img className='rounded-xl w-180 mx-auto' src={task.url} alt="" />

                    <h2 className="card-title dark:text-white text-black">{task.actegory

                    }</h2>
                    <h1 className="card-title dark:text-white text-black">{task.article}</h1>

                    {/* tags */}
                    <h1>Tags :</h1>
                    <h1 className=' dark:text-white text-black flex space-x-3'>{task.tags.map(tag => <h1 className='bg-green-300 dark:bg-green-500 px-4 py-1 rounded-2xl'>{tag}</h1>)}</h1>

                    <div className='flex justify-between'>
                        <div className='flex space-x-3 items-center  mt-5'>
                            <div >
                                {user?.photoURL ? (
                                    <img className='rounded-full w-15' src={user?.photoURL} alt="User Avatar" />
                                ) : (
                                    <RxAvatar className="w-full h-full text-2xl" />
                                )}
                            </div>
                            <div>
                                <p className='dark:text-white text-black card-title'>{task.name}</p>
                                <p className='dark:text-white text-black'>Date: {task.date}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-6'>
                            <h1 className='flex items-center gap-3 dark:text-white text-black'><BiLike /> 0 Like</h1>
                            <h1 className='flex items-center gap-3 dark:text-white text-black'><FaRegComment />  0 Comment</h1>
                        </div>
                    </div>

                    <div className='items-center  space-x-3'>
                        <h1 className='flex btn  w-30 mt-5 items-center gap-3'><button><BiLike size={25} /></button> 0 Like</h1>



                    </div>



                </div>

                <div>
                </div>
            </div>

            {/* comment box */}
            <div className=' my-3  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full  shadow-sm'>
                <div className="collapse-title font-semibold"><h1 className='flex  mt-4 items-center gap-3 w-30 dark:text-white text-black'><FaRegComment size={25} />  Comment </h1></div>

                <div>
                    <div className='flex space-x-3 p-4'>
                        {user?.photoURL ? (
                            <img className='rounded-full w-15 h-15' src={user?.photoURL} alt="User Avatar" />
                        ) : (
                            <RxAvatar className="w-full h-full text-2xl" />
                        )}

                        <textarea className="textarea w-[100%]" placeholder="Write Comment...."></textarea>
                    </div>

                    <button className='btn ml-20 m mt-2 btn-primary flex'> <LuSend /> Post Comment</button>

                </div>
            </div>
        </div>
    );
};

export default Article;