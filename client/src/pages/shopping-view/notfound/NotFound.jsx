import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const NotFound = () => {
  const location = useLocation()
if(location.pathname === '/') return <Navigate to="/shop" replace />

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link to={"/shop"}>
          <button className="bg-gradient-to-br from-green-200 to-green-400 hover:from-green-400 hover:to-green-200 text-green-800 font-bold py-2 px-4 shadow-md rounded mt-4">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;