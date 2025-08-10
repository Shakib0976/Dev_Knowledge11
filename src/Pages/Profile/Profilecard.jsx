import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";

const ProfileCard = () => {
    const { user } = use(AuthContext);
    const [article, setArticle] = useState([]);




    useEffect(() => {
        fetch(`https://dev-talks-11-server.vercel.app/allTask/email/${user?.email}`, {
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setArticle(result)
            })
            .catch(err => {
                console.log(err);
            })
    }, [user])
    console.log(article);


    console.log(user);
    return (
        <div className="min-h-screen   text-white  flex items-center justify-center px-4">
            <div className="max-w-5xl my-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left: Profile Picture */}
                <div className="bg-white dark:bg-gray-900 text-black rounded-2xl p-6 flex flex-col items-center shadow-lg">
                    <img
                        src={user?.photoURL || <FaCircleUser />}
                        alt="Profile"
                        className="w-48 h-48 rounded-full border-4 p-1 border-gray-700"
                    />
                    <h2 className="mt-4 text-2xl dark:text-white font-bold">{user?.displayName
                    }</h2>
                    <p className="text-green-400"> User</p>
                </div>

                {/* Right: Bio & Details */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Bio & other details</h3>
                    <div className="space-y-3 text-gray-500 dark:text-gray-400">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-white">My Role</span>
                            <span className="font-medium">User</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-white">My Experience Level</span>
                            <span className="font-medium">Intermediate</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-white">My shared Artists</span>
                            <span className="font-medium">{article.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-white">Email</span>
                            <span className="font-medium">{user?.email}</span>
                        </div>

                        {/* Availability */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 dark:text-white">Availability</span>
                            <span className="bg-green-700 px-3 py-1 text-white dark:text-gray-300 rounded-full text-sm font-medium flex items-center gap-2">
                                <span className="w-2 dark:text-white text-black h-2 bg-green-400 rounded-full"></span>
                                Available for Collaboration
                            </span>
                        </div>

                        {/* Badges */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 dark:text-white">Badges</span>
                            <span className="text-white text-sm font-medium">🏆 Top Collaborator</span>
                        </div>

                        {/* Tags */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 dark:text-white">Tags</span>
                            <span className="text-sm">#Drill, #Melancholic, #Rap-US</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
