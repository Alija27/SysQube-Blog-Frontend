import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            navigate('/login')
        } 
    }, [user])
    return (
        <>
            <div className="text-2xl font-bold flex justify-center m-4">Welcome to Dashboard !!</div>
            <div className="flex justify-end m-4">
            <Link to="/dashboard/posts">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                    Posts
                </button>
                </Link>
               
                <Link to="/dashboard/users">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                    Users
                </button>
                </Link>
            </div>
            <div>{children}</div>
        </>
    );
};

export default DashboardLayout;