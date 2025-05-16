import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUserApi } from '../apis/api'; // Ensure this path is correct
import Navbar from '../components/Navbar';
// import Footer from '../components/footer';

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams();
    const navigate = useNavigate();
   

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [currentError, setCurrentError] = useState('');
    const [newError, setNewError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const validate = () => {
        let isValid = true;
        setCurrentError('');
        setNewError('');
        setConfirmError('');

        if (currentPassword.trim() === "") {
            setCurrentError("Current Password is required");
            isValid = false;
        }

        if (newPassword.trim() === "") {
            setNewError("New Password is required");
            isValid = false;
        }

        if (confirmPassword.trim() === "") {
            setConfirmError("Confirm Password is required");
            isValid = false;
        }

        if (newPassword.trim() !== confirmPassword.trim()) {
            setConfirmError("Passwords do not match");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            const data = { currentPassword, newPassword };
            const response = await updateUserApi(user._id, data);

            if (response.data.success == true) {
                toast.success(response.data.message);
                const updatedUser ={
                    ...user,
                    newPassword
                };
                localStorage.setItem('user', JSON.stringify(updatedUser))
                navigate('/dashboard');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Server Error");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="bg-white p-8 max-w-md w-full rounded-md border border-solid border-blue-500 mx-auto mt-16">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form >
                <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {currentError && <p className="text-red-500 text-sm mt-2">{currentError}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newError && <p className="text-red-500 text-sm mt-2">{newError}</p>}
                </div>
                <div className="mb-8">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmError && <p className="text-red-500 text-sm mt-2">{confirmError}</p>}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 mr-2"
                    >

                        Save Changes
                    </button>
                    <Link to={'/dashboard'}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none hover:bg-gray-400"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
        {/* <Footer/> */}
        </>
    );
};

export default UserProfile;
