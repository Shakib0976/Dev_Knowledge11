import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong, FaRegComment } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar } from 'react-icons/rx';
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, deleteComment } from "../../Redux/commentSlice";
import { use } from 'react';

const Article = () => {
    const task = useLoaderData();
    const { user } = use(AuthContext);
    const [liked, setLiked] = useState(task?.likeBy.includes(user?.email));
    const [likeCount, setLikeCount] = useState(task?.likeBy.length || 0);
    const [status, setStatus] = useState('idle');

    const dispatch = useDispatch();
    const { list: comments } = useSelector((state) => state.comments);

    // Fetch comments on mount
    useEffect(() => {
        if (task?._id) {
            dispatch(fetchComments(task._id));
        }
    }, [dispatch, task]);

    const handleClick = () => {
        if (status !== 'idle') return;
        setStatus('loading');
        setTimeout(() => {
            setStatus('done');
            setTimeout(() => setStatus('idle'), 1250);
        }, 2250);
    };

    const handleDeleteComment = (commentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteComment(commentId))
                    .unwrap()
                    .then(() => Swal.fire("Deleted!", "Your comment has been deleted.", "success"))
                    .catch(() => Swal.fire("Error!", "Failed to delete comment.", "error"));
            }
        });
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        const commentText = e.target.comment.value;

        const commentData = {
            comment: commentText,
            articleId: task._id,
            user_id: user?.uid,
            user_name: user?.displayName,
            user_email: user?.email,
            user_photo: user?.photoURL,
        };

        try {
            await axios.put(`https://dev-talks-11-server.vercel.app/allTask/comment/${task._id}`, {
                comment: { text: commentText, email: user?.email }
            });

            const res = await axios.post('https://dev-talks-11-server.vercel.app/comment', commentData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your comment has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                dispatch(fetchComments(task._id)); // Refresh comments in Redux
            }
            e.target.reset();
        } catch (err) {
            console.error(err);
            toast.error("Failed to post comment");
        }
    };

    const handleLike = () => {
        if (user?.email === task?.email) return toast.error('You cannot like your own article');

        axios.patch(`https://dev-talks-11-server.vercel.app/like/${task._id}`, { email: user?.email })
            .then(data => {
                const isLiked = data?.data?.liked;
                toast.success(isLiked ? 'Like successful' : 'Dislike successful');
                setLiked(isLiked);
                setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Navigation */}
            <nav className="mb-8">
                <Link to={'/allArticle'} className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 font-medium">
                    <FaArrowLeftLong className="text-sm" />
                    Back to Articles
                </Link>
            </nav>

            {/* Article */}
            <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-8">
                <div className="p-6 md:p-8">
                    <img className="rounded-xl w-full h-auto max-h-96 object-cover shadow-md mb-6" src={task.url} alt="Article cover" />

                    <div className="space-y-4 mb-6">
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">{task.category}</span>
                            <span className="text-gray-500 dark:text-gray-400">{task.date}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{task.article}</h1>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">{task.content}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {task.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">#{tag}</span>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            {task?.Author_Photo ? <img className="rounded-full w-12 h-12 object-cover border-2 border-gray-200 dark:border-gray-600" src={task.Author_Photo} alt="Author Avatar" /> : <RxAvatar size={48} className="text-gray-400" />}
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{task.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Author</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2"><BiLike size={18} /><span className="font-medium">{likeCount} Likes</span></div>
                            <div className="flex items-center gap-2"><FaRegComment size={16} /><span className="font-medium">{comments.length} Comments</span></div>
                        </div>
                    </div>

                    <button onClick={handleLike} className={`mt-6 flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${liked ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                        {liked ? <AiFillLike size={20} /> : <BiLike size={20} />} <span>{liked ? 'Liked' : 'Like'}</span> <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{likeCount}</span>
                    </button>
                </div>
            </article>

            {/* Comments */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg"><FaRegComment className="text-blue-600 dark:text-blue-400" size={18} /></div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Comments</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</p>
                    </div>
                </div>

                <form onSubmit={handlePostComment} className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4">
                        {user?.photoURL ? <img className="rounded-full w-10 h-10 object-cover border border-gray-200 dark:border-gray-600" src={user.photoURL} alt="User Avatar" /> : <RxAvatar size={40} className="text-gray-400" />}
                        <div className="flex-1">
                            <textarea name="comment" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Share your thoughts..." rows="3"></textarea>
                            <div className="flex justify-end mt-3"><button type="submit" className={`fancy-button ${status === 'loading' ? 'onclic' : ''} ${status === 'done' ? 'validate' : ''}`} onClick={handleClick}></button></div>
                        </div>
                    </div>
                </form>

                <div className="p-6">
                    {comments.length === 0 ? (
                        <div className="text-center py-8">
                            <FaRegComment className="mx-auto text-gray-400 mb-3" size={32} />
                            <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment._id} className="flex gap-4 pb-6 last:pb-0 border-b border-gray-100 dark:border-gray-700">
                                    <div className="flex-shrink-0">
                                        {comment.user_photo ? <img className="rounded-full w-10 h-10 object-cover border border-gray-200 dark:border-gray-600" src={comment.user_photo} alt="User Avatar" /> : <RxAvatar size={40} className="text-gray-400" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{comment.user_name}</h3>
                                            {comment.user_email === user?.email && <button onClick={() => handleDeleteComment(comment._id)} className="text-sm text-red-500 hover:text-red-700">Delete</button>}
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">{comment.comment}</p>
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
