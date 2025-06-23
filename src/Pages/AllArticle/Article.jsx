import React, { use, useEffect, useState } from 'react';
import { FaArrowLeftLong, FaRegComment } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar } from 'react-icons/rx';
import { BiLike } from 'react-icons/bi';
import { LuSend } from 'react-icons/lu';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiFillLike } from 'react-icons/ai';
import toast from 'react-hot-toast';


const Article = () => {

    const [comments, setComments] = useState([]);
    const [taskId, setTaskId] = useState(null)


    useEffect(() => {
        axios.get(`https://dev-talks-11-server.vercel.app/comment/${taskId}`)
            .then(res => {
                console.log(res.data);
                setComments(res.data);
                setTaskId(task._id);
            })
    }, [taskId]);




    const HandlePostFrom = e => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        const commentData = {
            comment,
            articleId: task._id,
            user_id: user?.uid,
            user_name: user?.displayName,
            user_email: user?.email,
            user_photo: user?.photoURL,
        }
        console.log(commentData);


        axios.post('https://dev-talks-11-server.vercel.app/comment', commentData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your comment has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setComments(prevComments => [...prevComments, { ...commentData, _id: res.data.insertedId }
                    ]);
                }

                console.log(res.data);
                form.reset();
            })
            .catch(err => {
                console.log(err);
            })
    }








    const task = useLoaderData();
    // console.log(task);
    const { user } = use(AuthContext);
    console.log(task);



    const [liked, setLiked] = useState(task?.likeBy.includes(user?.email))


    const [likeCount, setLikeCount] = useState(task?.likeBy.length || 0);




    const handleLike = () => {
        if (user?.email === task?.email) return toast.error('you can not like your own article')



        axios.patch(`https://dev-talks-11-server.vercel.app/like/${task._id}`, { email: user?.email })
            .then(data => {
                console.log(data.data);
                const isLiked = data?.data?.liked;

                if (isLiked) {
                    toast.success('like success')
                }
                else {
                    toast.success('disLike Success')
                }

                // set like state
                setLiked(isLiked)

                // updated like count

                setLikeCount(prevLike => (isLiked ? prevLike + 1 : prevLike - 1))
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className='mx-auto w-11/12 md:w-[60%]'>
            <div>
                <Link to={'/allArticle'} className='btn mt-15 mb-5'> <FaArrowLeftLong /> Back</Link>
            </div>
            <div className=" w-full  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full  shadow-sm">

                <div className="card-body rounded-xl dark:text-white text-black">
                    <img className='rounded-xl md:w-180 mx-auto' src={task.url} alt="" />

                    <h2 className="card-title dark:text-white text-black">{task.actegory

                    }</h2>
                    <h1 className="card-title dark:text-white text-black">{task.article}</h1>

                    {/* tags */}
                    <h1>Tags :</h1>
                    <h1 className=' dark:text-white w-1 text-black flex md:space-x-3'>{task.tags.map(tag => <p className='bg-green-300 dark:bg-green-500  md:px-4 px-2 md:py-1  rounded-2xl'>{tag}</p>)}</h1>

                    <div className='flex justify-between'>
                        <div className='flex space-x-3 items-center  mt-5'>
                            <div >
                                {task?.Author_Photo ? (
                                    <img className='rounded-full w-15' src={task?.Author_Photo} alt="User Avatar" />
                                ) : (
                                    <RxAvatar size={40} className="w-full h-full text-2xl" />
                                )}
                            </div>
                            <div>
                                <p className='dark:text-white text-black md:card-title'>{task.name}</p>
                                <p className='dark:text-white text-black'>Date: {task.date}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-6'>
                            <h1 className='md:flex hidden md:block items-center gap-3 dark:text-white text-black'><BiLike /> {likeCount} Like</h1>
                            <h1 className='md:flex hidden md:block items-center gap-3 dark:text-white text-black'><FaRegComment />  {comments.length} Comment</h1>
                        </div>
                    </div>

                    <div className='items-center  space-x-3'>
                        <h1 className='flex btn  w-30 mt-5 items-center gap-3'><button onClick={handleLike}>{
                            liked ? <p className='text-blue-600'><AiFillLike size={25} /></p> : <BiLike size={25} />
                        }</button> {likeCount}</h1>



                    </div>



                </div>

                <div>
                </div>
            </div>

            {/* comment box */}
            <div className=' my-3  bg-cover     dark:from-gray-800 dark:to-gray-700  bg-gradient-to-r from-[#F0F4FF] to-[#FDF0FF] image-full  shadow-sm'>
                <div className="collapse-title font-semibold"><h1 className='md:flex hidden md:block items-center gap-3 dark:text-white text-black'><FaRegComment />  {comments.length} Comment</h1></div>

                <form onSubmit={HandlePostFrom}>
                    <div className='flex space-x-3 p-4'>
                        {user?.photoURL ? (
                            <img className='rounded-full w-15 h-15' src={user?.photoURL} alt="User Avatar" />
                        ) : (
                            <RxAvatar size={45} />
                        )}

                        <textarea type='test' name='comment' className="textarea w-[100%]" placeholder="Write Comment...."></textarea>
                    </div>

                    <button type='submit' className='btn ml-22  -mt-2 btn-primary flex'> <LuSend /> Post Comment</button>

                </form>

                <div>
                    <div>
                        {
                            comments.map(comment => (
                                <div key={comment._id} className='flex space-x-1 p-4  items-center'>
                                    {comment.user_photo ? (
                                        <img className='rounded-full w-10 h-10' src={comment.user_photo} alt='this is user avatar' />
                                    ) : (
                                        <RxAvatar size={25} />
                                    )
                                    }
                                    <div className=' p-3 w-full'>
                                        <h1 className='text-lg mb-1 font-bold '>{comment.user_name}</h1>
                                        <h1 className='bg-gray-200 dark:bg-gray-800 py-4 px-2'>{comment.comment}</h1>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;