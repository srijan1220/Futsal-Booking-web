// AdminSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const AdminSidebar = ({ children }) => {
    return (
        <>
            <div className="flex flex-row">
                <div className="w-64 min-h-screen bg-gray-800 text-white">
                    <div className="flex items-center justify-center h-20 shadow-md">
                        <h1 className="text-3xl uppercase font-bold">Dashboard</h1>
                    </div>
                    <ul className="py-4">
                        <li className="pl-6 cursor-pointer py-2 hover:bg-gray-700">
                            <Link to={'/admin/futsal'}>Futsals</Link>
                        </li>
                       
                        <li className="pl-6 cursor-pointer py-2 hover:bg-gray-700">
                            <Link to={"/admin/booking"}>Bookings</Link>
                        </li>
                        <li className="pl-6 cursor-pointer py-2 hover:bg-gray-700">
                            <Link to={"/admin/notification"}>Notification</Link>
                        </li>
                        
                    </ul>
                </div>

                <div className="w-full">
                    {children}
                </div>
            </div>

        </>
    );
};

export default AdminSidebar;
