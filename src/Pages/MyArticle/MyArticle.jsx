import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { CiCalendarDate } from "react-icons/ci";
import { HiPencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import Swal from 'sweetalert2';

const MyArticle = () => {
    const { user } = use(AuthContext)
    const [article, setArticle] = useState([]);
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
                    text: "Your task has been deleted.",
                    icon: "success"
                });
            }
        });
    }




    return (
        <div className='w-11/12 mx-auto my-10 '>
            <h1 className='text-2xl mt-15 mb-2 text-center md:text-5xl'>My Articles</h1>
            <p className='text-center mb-8'>Manage your published articles</p>
            <div className='bg-gray-100 p-5'>
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
                                            <button><HiPencilSquare size={25} /></button>
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