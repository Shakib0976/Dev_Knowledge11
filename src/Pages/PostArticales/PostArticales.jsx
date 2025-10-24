import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar, RxUpload } from 'react-icons/rx';
import { FiImage, FiX } from 'react-icons/fi';
import { Link } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostArticales = () => {
    const { user } = use(AuthContext);
    const [imagePreview, setImagePreview] = React.useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = React.useState('');

    const handleImageUpload = async (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                'https://api.imgbb.com/1/upload?key=472a4f35f88299fe3e3320a210542e39', // Replace with your imgBB API key
                formData
            );

            if (response.data.success) {
                setUploadedImageUrl(response.data.data.url);
                Swal.fire({
                    icon: 'success',
                    title: 'Image Uploaded!',
                    text: 'Your image has been successfully uploaded.',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Image upload error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: 'Failed to upload image. Please try again.'
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);

            handleImageUpload(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setUploadedImageUrl('');
    };

    const handlePostArticles = e => {
        e.preventDefault()

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // process tags 
        const tagString = data.tags
        const tagSpace = tagString.split(',');
        const tagsNoSpace = tagSpace.map(req => req.trim());
        data.tags = tagsNoSpace;
        data.likeBy = [];
        data.Author_Photo = user?.photoURL;

        // Use uploaded image URL if available, otherwise use the URL input
        data.url = uploadedImageUrl || data.url;

        console.log(data);

        axios.post('https://dev-talks-11-server.vercel.app/allTask', data, {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your article has been published",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log(res.data);
                form.reset();
                setImagePreview(null);
                setUploadedImageUrl('');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3'>Post New Article</h1>
                    <p className='text-lg text-gray-600 dark:text-gray-400'>Share your knowledge with the community</p>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8'>
                    <form onSubmit={handlePostArticles}>
                        {/* Article Title & Category */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Article Title *
                                </label>
                                <input
                                    type="text"
                                    name='article'
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter article title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Category *
                                </label>
                                <select
                                    name='category'
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option>Development</option>
                                    <option>Marketing</option>
                                    <option>Video Editing</option>
                                    <option>Programming</option>
                                    <option>Business</option>
                                    <option>Others</option>
                                </select>
                            </div>
                        </div>

                        {/* Content */}
                        <div className='mb-6'>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Content *
                            </label>
                            <textarea
                                name='content'
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors h-32"
                                placeholder="Write your article content here"
                                required
                            ></textarea>
                        </div>

                        {/* Tags & Date */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    name='tags'
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    placeholder="Enter tags separated by commas"
                                />
                                <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>Separate tags with commas</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Publication Date
                                </label>
                                <input
                                    name='date'
                                    type="date"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                />
                            </div>
                        </div>

                        {/* Image Upload Section */}
                        <div className='mb-6'>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Featured Image
                            </label>

                            {imagePreview ? (
                                <div className="relative mb-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                    >
                                        <FiX size={18} />
                                    </button>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors mb-4">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer flex flex-col items-center"
                                    >
                                        <FiImage className="w-8 h-8 text-gray-400 mb-2" />
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                            Upload Featured Image
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            or use URL below
                                        </span>
                                    </label>
                                </div>
                            )}

                            {/* Fallback URL Input */}
                            <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-600">
                                <svg className="h-5 w-5 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                    </g>
                                </svg>
                                <input
                                    type="url"
                                    name='url'
                                    className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300"
                                    placeholder="https://image-url.com"
                                />
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Upload image or provide URL</p>
                        </div>

                        {/* Author Information */}
                        <div className='mb-6'>
                            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Author Information</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <input
                                    className='px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400'
                                    type="text"
                                    name='name'
                                    readOnly
                                    defaultValue={user?.displayName}
                                />
                                <input
                                    className='px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400'
                                    readOnly
                                    type="text"
                                    name='email'
                                    defaultValue={user?.email}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700'>
                            <button
                                type='submit'
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg flex-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Publish Article
                            </button>
                            <Link
                                to={'/'}
                                className='px-6 py-3 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostArticales;