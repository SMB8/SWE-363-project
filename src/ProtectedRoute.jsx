import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Make sure to install jwt-decode: npm install jwt-decode

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("No token found, redirecting to /sign-in");
        return <Navigate to="/sign-in" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 

        if (decodedToken.exp < currentTime) {
            console.log("Token expired, redirecting to /sign-in");
            localStorage.removeItem('token'); 
            return <Navigate to="/sign-in" replace />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token'); 
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

export default ProtectedRoute;
