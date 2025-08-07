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
    const [status, setStatus] = useState('idle');

    const handleClick = () => {
        if (status !== 'idle') return;

        setStatus('loading');
        setTimeout(() => {
            setStatus('done');
            setTimeout(() => {
                setStatus('idle');
            }, 1250);
        }, 2250);
    };



    useEffect(() => {
        axios.get(`https://dev-talks-11-server.vercel.app/comment/${taskId}`)
            .then(res => {
                console.log(res.data);
                setComments(res.data);
                setTaskId(task._id);
            })
    }, [taskId]);




    const HandlePostFrom = async (e) => {
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

        try {
            const response = await axios.put(`https://dev-talks-11-server.vercel.app/allTask/comment/${taskId}`, {
                comment: {
                    text: comment,
                    email: user?.email,
                },
            });

            console.log('Comment added:', response.data);
        } catch (error) {
            console.error('Error adding comment:', error);
        }


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
            <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-md rounded-xl overflow-hidden">
                <div className="card-body p-4 md:p-6 dark:text-white text-gray-800">
                    <img className="rounded-xl w-full max-w-3xl mx-auto object-cover" src={task.url} alt="task cover" />

                    <h2 className="text-xl md:text-2xl font-semibold mt-4 mb-2">Category: {task.category}</h2>
                    <h1 className="text-lg md:text-xl font-medium mb-2">Title: {task.article}</h1>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        <span className="font-semibold">Content:</span> {task.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="font-semibold text-lg">Tags:</span>
                        {task.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-green-200 dark:bg-green-500 text-sm px-3 py-1 rounded-2xl text-gray-800 dark:text-white"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Author & Stats */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-3">
                            {task?.Author_Photo ? (
                                <img className="rounded-full w-12 h-12 object-cover" src={task.Author_Photo} alt="Author Avatar" />
                            ) : (
                                <RxAvatar size={48} className="text-gray-500" />
                            )}
                            <div>
                                <p className="text-base font-medium">{task.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Date: {task.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-300">
                            <div className="hidden md:flex items-center gap-2">
                                <BiLike size={20} />
                                {likeCount} Likes
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <FaRegComment size={20} />
                                {comments.length} Comments
                            </div>
                        </div>
                    </div>

                    {/* Like Button */}
                    <div className="mt-5">
                        <button
                            onClick={handleLike}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white rounded-lg hover:bg-blue-200 dark:hover:bg-blue-600 transition"
                        >
                            {liked ? <AiFillLike size={22} /> : <BiLike size={22} />}
                            <span className="text-sm font-medium">{likeCount}</span>
                        </button>
                    </div>
                </div>
            </div>


            {/* comment box */}
            {/* Comment Box */}
            <div className="my-6 rounded-lg bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 shadow-md">
                <div className="px-4 py-3 border-b border-gray-300 dark:border-gray-600">
                    <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
                        <FaRegComment /> {comments.length} Comment
                    </h1>
                </div>

                <form onSubmit={HandlePostFrom} className="px-4 py-3">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                        <div className="flex-shrink-0">
                            {user?.photoURL ? (
                                <img
                                    className="rounded-full w-12 h-12 object-cover"
                                    src={user?.photoURL}
                                    alt="User Avatar"
                                />
                            ) : (
                                <RxAvatar size={48} className="text-gray-500" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <textarea
                                name="comment"
                                className="textarea textarea-bordered w-full rounded-md resize-none min-h-[80px] dark:bg-gray-900 dark:text-white"
                                placeholder="Write your comment..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end mt-3">
                        <button
                            type="submit"
                            className={`fancy-button ${status === 'loading' ? 'onclic' : ''} ${status === 'done' ? 'validate' : ''}`}
                            onClick={handleClick}
                        ></button>
                    </div>
                </form>

                <div className="px-4 pb-4">
                    {comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex flex-col sm:flex-row items-start gap-3 py-3 border-t border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex-shrink-0">
                                {comment.user_photo ? (
                                    <img
                                        className="rounded-full w-10 h-10 object-cover"
                                        src={comment.user_photo}
                                        alt="User Avatar"
                                    />
                                ) : (
                                    <RxAvatar size={32} className="text-gray-500" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                                    {comment.user_name}
                                </h2>
                                <p className="mt-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-md break-words">
                                    {comment.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default Article;