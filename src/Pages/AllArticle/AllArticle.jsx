import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllArticle = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/allTask')
            .then(res => {
                setTasks(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 space-x-5 space-y-5'>
            {
                tasks.map(task => <div key={task._id} className="card bg-base-100 image-full w-96 shadow-sm">

                    <div className="card-body bg-gray-300 text-black">
                        <div className='flex justify-between mb-5'>
                            <p className='text-black card-title'>{task.name}</p>
                            <p className='text-black'>Date: {task.date}</p>
                        </div>
                        <h2 className="card-title text-black">{task.article
                        }</h2>
                        <div className="card-actions justify-end">
                            <Link to={`/allArticle/${task._id}`} className="btn btn-primary">Read More</Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AllArticle;