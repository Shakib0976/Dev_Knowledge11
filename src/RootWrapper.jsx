import React, { useState, useEffect } from 'react';
import { RouterProvider } from "react-router";
import { Provider } from 'react-redux'; 
import router from './Routes/Router.jsx';
import ThemeProvider from './Pages/Theme/ThemeProvider.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import Loading2 from './Layouts/Loading2.jsx';
import { store } from './Redux/Store.js';

const RootWrapper = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading, replace with real loading logic like auth check
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading2 />;
    }

    return (
        <Provider store={store}> {/* <-- Wrap everything in Redux Provider */}
            <AuthProvider>
                <ThemeProvider>
                    <Toaster position="top-right" />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthProvider>
        </Provider>
    );
};

export default RootWrapper;
