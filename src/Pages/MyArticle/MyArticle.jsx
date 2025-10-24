import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CiCalendarDate } from "react-icons/ci";
import { HiMiniPencilSquare, HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2';

const MyArticle = () => {
    const { user } = use(AuthContext);
    const [article, setArticle] = useState([]);
    const [articleId, setArticleId] = useState(null);

    useEffect(() => {
        fetch(`https://dev-talks-11-server.vercel.app/allTask/email/${user?.email}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(result => {
                setArticle(result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [user, articleId]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://dev-talks-11-server.vercel.app/allTask/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            const remainArticle = article.filter(art => art._id !== id);
                            setArticle(remainArticle);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your article has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const updateArticle = e => {
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const tagString = data.tags;
        const tagSpace = tagString.split(',');
        const tagsNoSpace = tagSpace.map(req => req.trim());
        data.tags = tagsNoSpace;

        fetch(`https://dev-talks-11-server.vercel.app/allTask/${articleId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setArticle(prevTasks =>
                    prevTasks.map(task =>
                        task._id === articleId._id ? { ...task, ...data } : task
                    )
                );
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById(`modal-${articleId}`).close();
            });
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {article.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                            No articles found
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            You haven't published any articles yet. Start sharing your knowledge with the community.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                My Articles
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                                Manage and edit your published articles
                            </p>
                        </div>

                        {/* Articles Table */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                Article
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {article.map(task => (
                                            <tr key={task._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                                {/* Article Column */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-gray-600"
                                                                src={task?.url}
                                                                alt={task.article}
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                                {task.article}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                                                {task.content.substring(0, 60)}...
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Category Column */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                                        {task.category}
                                                    </span>
                                                </td>

                                                {/* Date Column */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                        <CiCalendarDate className="mr-2 text-lg" />
                                                        {task.date}
                                                    </div>
                                                </td>

                                                {/* Actions Column */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center space-x-3">
                                                        {/* Edit Button */}
                                                        <button
                                                            onClick={() => {
                                                                setArticleId(task._id);
                                                                document.getElementById(`modal-${task._id}`).showModal();
                                                            }}
                                                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                                                            title="Edit Article"
                                                        >
                                                            <HiMiniPencilSquare size={20} />
                                                        </button>

                                                        {/* Delete Button */}
                                                        <button
                                                            onClick={() => handleDelete(task._id)}
                                                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                                            title="Delete Article"
                                                        >
                                                            <RiDeleteBin6Line size={20} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modals */}
            {article.map(task => (
                <dialog key={task._id} id={`modal-${task._id}`} className="modal">
                    <div className="modal-box max-w-4xl p-0 overflow-hidden">
                        <div className="bg-white dark:bg-gray-900 rounded-lg">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        Edit Article
                                    </h3>
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                                    </form>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 max-h-[70vh] overflow-y-auto">
                                <form onSubmit={updateArticle}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {/* Article Title */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Article Title *
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={task.article}
                                                name='article'
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                                placeholder="Type article title"
                                            />
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Category
                                            </label>
                                            <select
                                                name='category'
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            >
                                                <option>{task.category}</option>
                                                <option>Development</option>
                                                <option>Marketing</option>
                                                <option>Video Editing</option>
                                                <option>Programming</option>
                                                <option>Business</option>
                                                <option>Others</option>
                                            </select>
                                        </div>

                                        {/* Date */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Date
                                            </label>
                                            <input
                                                name='date'
                                                defaultValue={task.date}
                                                type="date"
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Content *
                                        </label>
                                        <textarea
                                            name='content'
                                            defaultValue={task.content}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-32 resize-none"
                                            placeholder="Write your article content here"
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Tags
                                        </label>
                                        <input
                                            type="text"
                                            name='tags'
                                            defaultValue={task.tags.join(',')}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="Enter tags separated by commas"
                                        />
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Separate tags with commas
                                        </p>
                                    </div>

                                    {/* Thumbnail URL */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Thumbnail URL
                                        </label>
                                        <input
                                            type="url"
                                            name='url'
                                            defaultValue={task.url}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    {/* Hidden Author Info */}
                                    <div className="hidden">
                                        <input type="text" name='name' readOnly defaultValue={user?.displayName} />
                                        <input readOnly type="text" name='email' defaultValue={user?.email} />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <form method="dialog" className="flex-1">
                                            <button className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium">
                                                Cancel
                                            </button>
                                        </form>
                                        <button
                                            type='submit'
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg"
                                        >
                                            <HiPencilSquare size={18} />
                                            Update Article
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </dialog>
            ))}
        </div>
    );
};

export default MyArticle;