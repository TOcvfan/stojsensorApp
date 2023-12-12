"use client"
import { useEffect } from 'react';
import { useAppContext } from "$/AppContext";
import { notFound } from 'next/navigation';

const withAuth = (WrappedComponent) => {

    const AuthComponent = (props) => {
        const { user, isLoggedIn } = useAppContext();
        const { id, token } = user;
        let isAuthenticated = false;

        useEffect(() => {
            // Implement your authentication check here
            if (isLoggedIn) {
                isAuthenticated = true
            }

            if (!isAuthenticated) {
                // Redirect to login page or show an error
                notFound();
            }
        }, []);
        /* 
        if (!isAuthenticated) {
            // You can also return a loading indicator or an error message here
            return null;
        }
        */
        // If authenticated, render the wrapped component
        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
