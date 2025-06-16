import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const MyArticle = () => {
    const { user } = use(AuthContext)
    const [article, setArticle] = useState([]);
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
    return (
        <div className='w-11/12 mx-auto my-10 '>
            <h1 className='text-2xl mt-15 mb-2 text-center md:text-5xl'>My Articles</h1>
            <p className='text-center mb-6'>Manage your published articles</p>
            <div className='bg-gray-100 p-5'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Article</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                            
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyArticle;