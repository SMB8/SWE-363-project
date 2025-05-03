import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    console.log("ProtectedRoute component is being rendered"); // ADD THIS LINE

    const token = localStorage.getItem('token');
    console.log("i am here",token);
    if (!token) {
        console.log("No token found, redirecting to /sign-in"); // ADD THIS LINE
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;
