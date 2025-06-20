import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { RxAvatar } from 'react-icons/rx';
import { Link } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostArticales = () => {

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
        console.log(data);

        axios.post('http://localhost:3000/allTask', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your job has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }

    const { user } = use(AuthContext)
    return (
        <div className=' py-15 mx-auto w-11/12'>
            <h1 className='text-center space-grotesk-500 text-2xl md:text-4xl font-semibold'>Post New Article </h1>
            <p className='text-center space-grotesk-500 py-2 text-xl'>Share your knowledge with the community</p>
            <div className='py-10 bg-blue-100 max-w-2xl  mt-10 mb-25  p-6 justify-center items-center mx-auto'>
                <form onSubmit={handlePostArticles}>
                    <div className='md:flex items-center justify-center  space-x-3'>
                        <fieldset className="fieldset w-full my-1">
                            <legend className=" fieldset-legend">Article Title *</legend>
                            <input type="text" name='article' className="input" placeholder="Enter article title" />
                        </fieldset>
                        <div>
                            <label className="block  font-medium mb-1 my-2 space-grotesk-500">Category</label>
                            <select name='category' className="w-70 bg-base-100 px-4 py-2 border text-gray-500 rounded-md ">
                                <option >Select a category</option>
                                <option>Development</option>
                                <option>Marketing</option>
                                <option>Video Editing</option>
                                <option>Programming</option>
                                <option>Business</option>
                                <option>Others</option>

                            </select>
                        </div>


                    </div>
                    {/* text area  */}
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Content *</legend>
                        <textarea name='content' className="textarea w-full my-1 h-24" placeholder="write your article content here"></textarea>
                    </fieldset>

                    {/* tags */}
                    <div className='md:flex justify-center items-center space-x-3'>
                        <div>
                            <label className="block mb-2 text-sm my-2">Tags </label>
                            <input
                                type="text"
                                name='tags'
                                className="border border-gray-300 bg-base-100 p-2 rounded w-75"
                                placeholder="enter tags"
                            />
                            <p className='text-sm  text-gray-500'>Separate tags with commas</p>
                        </div>
                        <div>
                            <input name='date' type="date" className="input w-75 mx-auto mt-1" />
                        </div>
                    </div>

                    {/* img url */}
                    <label className="input bg-base-100 w-full my-5 validator">
                        <svg className="h-[1em]  opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
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
                            required
                            placeholder="https://"

                        />
                    </label>
                    <p className="validator-hint">Must be valid URL</p>



                    <div>
                        <h1 className='text-xl  my-5'>Author Information : </h1>
                        <div className='flex flex-col my-2'>
                            <input className='bg-base-100 py-2 my-1 w-full px-4' type="text" name='name' readOnly defaultValue={user?.displayName} />
                            <input className='bg-base-100 py-2 my-1 w-full px-4' readOnly type="text" name='email' defaultValue={user?.email} />
                        </div>
                    </div>

                    <div className='flex justify-center space-x-4'>
                        <button type='submit' class="flex items-center justify-center gap-2  w-full py-2 rounded-xl  text-white font-semibold
                        bg-gradient-to-r from-blue-600 to-purple-700
                        hover:from-blue-700 hover:to-purple-800
                        transition-all duration-300 ease-in-out
                        shadow-lg">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Publish Article
                        </button>
                        <Link to={'/'} className='btn '>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostArticales;