import React, { use, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const barData = [
    { name: "Mo", hours: 3 },
    { name: "Tu", hours: 2.5 },
    { name: "We", hours: 1.5 },
    { name: "Th", hours: 4.5 },
    { name: "Fr", hours: 3 },
    { name: "Sa", hours: 4 },
];

const pieData = [
    { name: "View Post", value: 100, color: "#fbbf24" },
    { name: "Post articles", value: 10, color: "#6366f1" },
    { name: "Yet to Start Task", value: 10, color: "#22c55e" },
];

const Dashboard = () => {

    const { user } = use(AuthContext);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup
    }, []);



    const [article, setArticle] = useState([]);
    const [tasks, setTasks] = useState([]);




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

     useEffect(() => {
            axios.get('https://dev-talks-11-server.vercel.app/allTask')
                .then(res => {
                    setTasks(res.data);
                    
                })
                .catch(err => {
                    console.log(err);
                  
                });
        }, []);
    console.log(article);

    const formattedDate = currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div className="min-h-screen  dark:text-white text-black p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <p className="text-gray-800 dark:text-gray-200">
                    {formattedDate} — {formattedTime}
                </p>
                <h1 className="text-3xl font-bold">Good Evening! <span className="text-yellow-400">{user?.displayName
                }</span>,</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="dark:bg-gray-900 bg-white  rounded-xl p-6 text-center shadow">
                    <p className="text-gray-400">Time Saved</p>
                    <h2 className="text-3xl font-bold">12 hrs</h2>
                </div>
                <div className="dark:bg-gray-900 bg-white rounded-xl p-6 text-center shadow">
                    <p className="text-gray-400">Total Post</p>
                    <h2 className="text-3xl font-bold">{article?.length || 0}</h2>
                </div>
                <div className="dark:bg-gray-900 bg-white rounded-xl p-6 text-center shadow">
                    <p className="text-gray-400">Total articles</p>
                    <h2 className="text-3xl font-bold">{tasks?.length}</h2>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="dark:bg-gray-900 bg-white rounded-xl p-6 shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Average view Tasks</h3>
                        <button className="bg-gray-700 text-sm px-3 py-1 rounded">This Week</button>
                    </div>
                    <p className="text-2xl font-bold">24.9 <span className="text-sm text-gray-400">Hours Spent</span></p>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} />
                                <Bar dataKey="hours" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="dark:bg-gray-900 bg-white rounded-xl p-6 shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Posted Tasks</h3>
                        <button className="bg-gray-700 text-sm px-3 py-1 rounded">This Week</button>
                    </div>
                    <div className="h-60 flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-center text-xl font-bold mt-4">14 <span className="text-sm">OUT OF 20</span></p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
