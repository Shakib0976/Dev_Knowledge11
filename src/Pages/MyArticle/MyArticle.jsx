import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CiCalendarDate } from "react-icons/ci";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { BsXLg } from 'react-icons/bs';
import toast from 'react-hot-toast';

const MyArticle = () => {
    const { user } = use(AuthContext)

    const [article, setArticle] = useState([]);
    const [selectedId, setSelectedId] = useState(null);


    console.log(article);
    console.log(user?.email);



    useEffect(() => {
        fetch(`http://localhost:3000/allTask/email/${user?.email}`)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setArticle(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, [user])





    // delete article

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

                axios.delete(`http://localhost:3000/allTask/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            const remainArticle = article.filter(art => art._id !== id);
                            setArticle(remainArticle);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your article has been deleted.",
                    icon: "success"
                });
            }
        });
    }



    const updateArticle = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        // process tags 

        const tagString = data.tags
        const tagSpace = tagString.split(',');
        const tagsNoSpace = tagSpace.map(req => req.trim());
        data.tags = tagsNoSpace;
        console.log(data);



        fetch(`http://localhost:3000/allTask/${selectedId}`, {
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
                        task._id === selectedId ? { ...task, ...data } : task
                    )
                );
                console.log('updatebids', data);
                toast.success('bits Update successfull')
            })
    }




    return (
        <div className='w-11/12 mx-auto my-10 '>
            <h1 className='text-2xl mt-15 mb-2 text-center md:text-5xl'>My Articles</h1>
            <p className='text-center mb-8'>Manage your published articles</p>
            <div className='bg-gray-100 dark:bg-gray-800 p-5'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='text-lg'>Article</th>
                                <th className='text-lg'>Category</th>
                                <th className='text-lg'>Date</th>
                                <th className='text-lg'>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                article.map(art => <tr>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={art?.url}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{art.article}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h1>{art.actegory}</h1>
                                    </td>
                                    <td className='flex items-center space-x-2'><CiCalendarDate size={20} />{art.date}</td>
                                    <th>
                                        <div className='space-x-4'>

                                            {/* update modal button */}


                                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                                            <button className="btn" onClick={() => {
                                                setSelectedId(art._id); // <== move here
                                                document.getElementById('my_modal_5').showModal();
                                            }}>
                                                <HiPencilSquare size={25} />
                                            </button>
                                            <dialog id="my_modal_5" className="modal  modal-bottom sm:modal-middle">
                                                <div className='bg-[#EAE0FF] dark:bg-[#2E1F47] p-5 rounded-2xl'>
                                                    <form onSubmit={updateArticle} className=''>
                                                        <div className='md:flex  items-center justify-center  space-x-3'>
                                                            <fieldset className="fieldset w-full my-1">
                                                                <legend className=" fieldset-legend">Article Title *</legend>
                                                                <input type="text" defaultValue={art?.article} name='article' className="input" placeholder="Enter article title" />
                                                            </fieldset>
                                                            <div>
                                                                <label className="block  font-medium mb-1 my-2 space-grotesk-500">Category</label>
                                                                <select name='actegory' defaultValue="Server location" className="w-70 bg-base-100 px-4 py-2 border text-gray-500 rounded-md ">
                                                                    <option>{art?.actegory}</option>
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
                                                            <textarea name='content' defaultValue={art?.content} className="textarea w-full my-1 h-24" placeholder="write your article content here"></textarea>
                                                        </fieldset>

                                                        {/* tags */}
                                                        <div className='md:flex justify-center items-center space-x-3'>
                                                            <div>
                                                                <label className="block mb-2 text-sm my-2">Tags </label>
                                                                <input
                                                                    type="text"
                                                                    name='tags'
                                                                    defaultValue={art?.tags}
                                                                    className="border border-gray-300 bg-base-100 p-2 rounded w-75"
                                                                    placeholder="enter tags"
                                                                />
                                                                <p className='text-sm  text-gray-500'>Separate tags with commas</p>
                                                            </div>
                                                            <div>
                                                                <input name='date' defaultValue={art?.date} type="date" className="input w-75 mx-auto mt-4" />
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
                                                                defaultValue={art?.url}
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
                                                            <button onClick={() => setSelectedId(art._id)} type='submit' class="flex items-center justify-center gap-2  w-full py-2 rounded-xl  text-white font-semibold
                                                        bg-gradient-to-r from-blue-600 to-purple-700
                                                        hover:from-blue-700 hover:to-purple-800
                                                        transition-all duration-300 ease-in-out
                                                        shadow-lg">
                                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                                </svg>
                                                                Update Article
                                                            </button>

                                                        </div>
                                                    </form>
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="w-full btn rounded-2xl mt-2 ">Close</button>
                                                    </form>
                                                </div>
                                            </dialog>
                                            <button onClick={() => handleDelete(art._id)}><RiDeleteBin6Line size={25} /></button>
                                        </div>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyArticle;