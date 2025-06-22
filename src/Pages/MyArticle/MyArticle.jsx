import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CiCalendarDate } from "react-icons/ci";
import { HiMiniPencilSquare, HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2';

const MyArticle = () => {
    const { user } = use(AuthContext)


    const [article, setArticle] = useState([]);

    const [articleId, setArticleId] = useState(null)







    // console.log(selectedId);
    // console.log(user?.email);



    useEffect(() => {
        fetch(`http://localhost:3000/allTask/email/${user?.email}`, {

            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setArticle(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, [user, articleId])
    console.log(article);





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

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries())
        // process tags 

        const tagString = data.tags
        const tagSpace = tagString.split(',');
        const tagsNoSpace = tagSpace.map(req => req.trim());
        data.tags = tagsNoSpace;
        console.log(data);

        console.log(' this is selected id', articleId);

        fetch(`http://localhost:3000/allTask/${articleId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setArticle(prevTasks =>
                    prevTasks.map(task =>
                        task._id === articleId._id ? { ...task, ...data } : task
                    )
                );
                console.log('updatebids', data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById(`modal-${articleId}`).close();
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
                                <th className='text-lg '>Article</th>
                                <th className='text-lg '>Category</th>
                                <th className='text-lg '>Date</th>
                                <th className='text-lg text-center '>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                article.map(task =>

                                    <tr key={task._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                            <div className='flex gap-2 text-center items-center'>
                                                <div className=" h-12 w-12" >
                                                    <img className='mask mask-squircle h-12 w-12' src={task?.url} alt="" />
                                                </div>
                                                {task.article}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                {task.category}
                                            </div>

                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm t">
                                            <div>
                                                {task.date}
                                            </div>
                                        </td>


                                        {/* updateButton  */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm cursor-pointer">


                                            <div className='items-center justify-center flex gap-5'>
                                                {/* update modal */}

                                                <button className=" " onClick={() => {
                                                    setArticleId(task._id); // Set the ID of the task being updated
                                                    document.getElementById(`modal-${task._id}`).showModal();
                                                }}><HiMiniPencilSquare size={25} /></button>
                                                <dialog id={`modal-${task._id}`} className="modal modal-bottom sm:modal-middle">
                                                    <div className="modal-box">
                                                        <div className="p-6  border-1 border-gray-400 rounded-lg ">
                                                            <form onSubmit={updateArticle}>
                                                                <div className=' items-center justify-center  space-x-3'>
                                                                    <fieldset className="fieldset w-full my-1">
                                                                        <legend className=" fieldset-legend">Article Title *</legend>
                                                                        <input type="text" defaultValue={task.article} name='article' className="input w-full" placeholder="Type article title " />
                                                                    </fieldset>
                                                                    <div>
                                                                        <label className="block  font-medium mb-1 my-2 space-grotesk-500">Category</label>
                                                                        <select name='category' className="w-full bg-base-100 px-4 py-2 border text-gray-500 rounded-md ">
                                                                            <option >{task.category}</option>
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
                                                                    <textarea name='content' defaultValue={task.content} className="textarea w-full my-1 h-24" placeholder="write your article content here"></textarea>
                                                                </fieldset>

                                                                {/* tags */}
                                                                <div className='justify-center items-center space-y-3'>
                                                                    <div>
                                                                        <label className="block mb-2 text-sm my-2">Tags </label>
                                                                        <input
                                                                            type="text"
                                                                            name='tags'
                                                                            defaultValue={task.tags.join(',')}
                                                                            className="border border-gray-300 bg-base-100 p-2 rounded w-full"
                                                                            placeholder="enter tags"
                                                                        />
                                                                        <p className='text-sm  text-gray-500'>Separate tags with commas</p>
                                                                    </div>
                                                                    <div>

                                                                        <input name='date' defaultValue={task.date} type="date" className="input w-full mx-auto mt-1" />
                                                                    </div>
                                                                </div>

                                                                {/* img url */}
                                                                <label className="block  text-sm mt-4">Thumbnail URL</label>
                                                                <label className="input bg-base-100 w-full mb-5 validator">
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
                                                                        defaultValue={task.url}
                                                                        required
                                                                        placeholder="https://"

                                                                    />
                                                                </label>
                                                                <p className="validator-hint">Must be valid URL</p>





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
                                                                </div>
                                                                <div className='hidden'>
                                                                    <h1 className='text-xl  my-5'>Author Information : </h1>
                                                                    <div className='flex flex-col my-2'>
                                                                        <input className='bg-base-100 py-2 my-1 w-full px-4' type="text" name='name' readOnly defaultValue={user?.displayName} />
                                                                        <input className='bg-base-100 py-2 my-1 w-full px-4' readOnly type="text" name='email' defaultValue={user?.email} />
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <form method="dialog">
                                                                {/* if there is a button in form, it will close the modal */}
                                                                <button className="w-full mt-2 btn">Close</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                                <button onClick={() => handleDelete(task._id)} className='text-red-600'><RiDeleteBin6Line size={25} /></button>
                                            </div>
                                        </td>

                                        {/* deletebutton */}

                                    </tr>

                                )




                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyArticle;