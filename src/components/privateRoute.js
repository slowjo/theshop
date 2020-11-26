import React from 'react';
import { navigate } from 'gatsby';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
    const authState = useSelector(state => state.auth);
    const { isLoggedIn, loading } = authState;

    if (!isLoggedIn && location.pathname !== '/app/login' && !loading) {
        navigate('/app/login');
        return null;
    }

    return <Component {...rest} location={location} />
};

export default PrivateRoute;
