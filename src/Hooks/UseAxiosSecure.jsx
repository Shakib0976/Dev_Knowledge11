import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';


const axiosInstance = axios.create({
    baseURL: 'https://dev-talks-11-server.vercel.app/'
})

const UseAxiosSecure = () => {

    const { user } = use(AuthContext);

    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    })

    return axiosInstance;
};

export default UseAxiosSecure;