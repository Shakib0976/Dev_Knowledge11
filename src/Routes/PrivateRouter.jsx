import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Loader from '../Layouts/Loader';

const PrivateRouter = ({ children }) => {



    const locations = useLocation();


    const { user, loading } = use(AuthContext);

    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate state={locations.pathname} to='/login'></Navigate>
    }
    return children;
};

export default PrivateRouter;