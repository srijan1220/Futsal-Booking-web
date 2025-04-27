import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const UserRoutes = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return user ? <Outlet /> : null;
}

export default UserRoutes;
