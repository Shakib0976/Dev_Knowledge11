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
    const [taskId, setTaskId] = useState(null);
    const [status, setStatus] = useState('idle');
    const task = useLoaderData();
    const { user } = use(AuthContext);
    const [liked, setLiked] = useState(task?.likeBy.includes(user?.email));
    const [likeCount, setLikeCount] = useState(task?.likeBy.length || 0);

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
                setComments(res.data);
                setTaskId(task._id);
            });
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
        };

        try {
            const response = await axios.put(`https://dev-talks-11-server.vercel.app/allTask/comment/${taskId}`, {
                comment: {
                    text: comment,
                    email: user?.email,
                },
            });
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
                    setComments(prevComments => [...prevComments, { ...commentData, _id: res.data.insertedId }]);
                }
                form.reset();
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleLike = () => {
        if (user?.email === task?.email) return toast.error('You cannot like your own article');

        axios.patch(`https://dev-talks-11-server.vercel.app/like/${task._id}`, { email: user?.email })
            .then(data => {
                const isLiked = data?.data?.liked;
                if (isLiked) {
                    toast.success('Like successful');
                } else {
                    toast.success('Dislike successful');
                }
                setLiked(isLiked);
                setLikeCount(prevLike => (isLiked ? prevLike + 1 : prevLike - 1));
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Navigation */}
            <nav className="mb-8">
                <Link
                    to={'/allArticle'}
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                    <FaArrowLeftLong className="text-sm" />
                    Back to Articles
                </Link>
            </nav>

            {/* Article Card */}
            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
                <div className="p-6 md:p-8">
                    {/* Article Image */}
                    <div className="mb-6">
                        <img
                            className="rounded-xl w-full h-auto max-h-96 object-cover shadow-md"
                            src={task.url}
                            alt="Article cover"
                        />
                    </div>

                    {/* Article Metadata */}
                    <div className="space-y-4 mb-6">
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                {task.category}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                {task.date}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                            {task.article}
                        </h1>
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                            {task.content}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {task.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Author & Stats */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            {task?.Author_Photo ? (
                                <img
                                    className="rounded-full w-12 h-12 object-cover border-2 border-gray-200 dark:border-gray-600"
                                    src={task.Author_Photo}
                                    alt="Author Avatar"
                                />
                            ) : (
                                <RxAvatar size={48} className="text-gray-400" />
                            )}
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{task.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <BiLike size={18} />
                                <span className="font-medium">{likeCount} Likes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaRegComment size={16} />
                                <span className="font-medium">{comments.length} Comments</span>
                            </div>
                        </div>
                    </div>

                    {/* Like Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${liked
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }`}
                        >
                            {liked ? <AiFillLike size={20} /> : <BiLike size={20} />}
                            <span>{liked ? 'Liked' : 'Like'}</span>
                            <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                                {likeCount}
                            </span>
                        </button>
                    </div>
                </div>
            </article>

            {/* Comments Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                {/* Comments Header */}
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <FaRegComment className="text-blue-600 dark:text-blue-400" size={18} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Comments
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comment Form */}
                <form onSubmit={HandlePostFrom} className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            {user?.photoURL ? (
                                <img
                                    className="rounded-full w-10 h-10 object-cover border border-gray-200 dark:border-gray-600"
                                    src={user?.photoURL}
                                    alt="User Avatar"
                                />
                            ) : (
                                <RxAvatar size={40} className="text-gray-400" />
                            )}
                        </div>
                        <div className="flex-1">
                            <textarea
                                name="comment"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                placeholder="Share your thoughts..."
                                rows="3"
                            ></textarea>
                            <div className="flex justify-end mt-3">
                                <button
                                    type="submit"
                                    className={`fancy-button ${status === 'loading' ? 'onclic' : ''} ${status === 'done' ? 'validate' : ''}`}
                                    onClick={handleClick}
                                ></button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Comments List */}
                <div className="p-6">
                    {comments.length === 0 ? (
                        <div className="text-center py-8">
                            <FaRegComment className="mx-auto text-gray-400 mb-3" size={32} />
                            <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="flex gap-4 pb-6 last:pb-0 last:border-b-0 border-b border-gray-100 dark:border-gray-700"
                                >
                                    <div className="flex-shrink-0">
                                        {comment.user_photo ? (
                                            <img
                                                className="rounded-full w-10 h-10 object-cover border border-gray-200 dark:border-gray-600"
                                                src={comment.user_photo}
                                                alt="User Avatar"
                                            />
                                        ) : (
                                            <RxAvatar size={40} className="text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {comment.user_name}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl leading-relaxed">
                                            {comment.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Article;