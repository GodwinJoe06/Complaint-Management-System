import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const AdminRoute = ({ children, roles }) => {
    const isLoggedIn = authService.isLoggedIn();
    const userRole = authService.getUserRole();

    if (!isLoggedIn) {
        // If not logged in, redirect to login
        return <Navigate to="/login" />;
    }

    if (!roles.includes(userRole)) {
        // If the user's role is not in the allowed list, redirect to the customer dashboard
        return <Navigate to="/dashboard" />;
    }

    // If logged in and has the correct role, show the page
    return children;
};

export default AdminRoute;