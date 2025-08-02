import React, { useState, useEffect } from 'react';
import { RouterProvider } from "react-router";
import router from './Routes/Router.jsx';
import ThemeProvider from './Pages/Theme/ThemeProvider.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import Loading2 from './Layouts/Loading2.jsx';

const RootWrapper = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading, replace with real loading logic like auth check
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return  <Loading2></Loading2>
    }

    return (
        <AuthProvider>
            <ThemeProvider>
                <Toaster position="top-right" />
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    );
};

export default RootWrapper;
