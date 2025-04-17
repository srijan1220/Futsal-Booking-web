import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNotitificationAPI, deleteNotificationAPI, getNotitificationAPI } from '../../apis/api';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AddNotification = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notifications, setNotifications] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
    const opendeleteModal = () => setdeleteIsModalOpen(true);
    const closedeleteModal = () => setdeleteIsModalOpen(false);

    useEffect(() => {
        getNotitificationAPI(user._id).then((res) => {
            setNotifications(res.data.notification)
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', user._id);
        formData.append('title', title);
        formData.append('description', description);

        createNotitificationAPI(formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    window.location.reload()
                }
            })
            .catch((err) => {
                toast.error("Server Error");
                console.error(err.message);
            });
    };

    const handleDelete = (id) => {

        deleteNotificationAPI(id).then((res) => {
            if (res.data.success == true) {
                toast.success(res.data.message)
                window.location.reload()
            }
            else {
                toast.error(res.data.message)
            }
        })


    }

    return (
        <>
            <AdminNavbar />
            <AdminSidebar>
                <>
                    <div className="w-full sm:px-6">
                        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                            <div className="sm:flex items-center justify-between">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Notifications</p>
                                <div>
                                    <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-blue-700 hover:bg-blue-600 focus:outline-none rounded mb-4" onClick={openModal}>
                                        <p className="text-sm font-medium leading-none text-white">Add Notification</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                        <th className="font-normal text-left pl-4">Title</th>
                                        <th className="font-normal text-left">Description</th>
                                        <th className="font-normal text-left">DateSent</th>
                                        <th className="font-normal text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {notifications.map((notification) => (
                                        <tr key={notification._id} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                            <td className="pl-4">
                                                <div className="flex items-center">
                                                    <div className="items-start">
                                                        <p className="font-normal text-left ">{notification.title}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="">
                                                <p className="font-medium text-left">{notification.description}</p>
                                            </td>
                                            <td className="">
                                                <p className="font-medium text-left">{new Date(notification.dateSent).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-7 2xl:px-0">
                                                <Link to={`/admin/editnotification/${notification._id}`} className='bg-[#123697] py-2 px-3 text-white rounded m-1 text-sm'>
                                                    <i className="fa-regular fa-pen-to-square" style={{ color: 'white' }}></i>
                                                </Link>
                                                {isdeleteModalOpen && (
                                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                                                        <div className="relative mx-auto p-5 border w-full md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                                                            <i className="fa-solid fa-triangle-exclamation text-red-500 fa-5x"></i>
                                                            <h1 className='font-medium w-3/4 mx-auto text-center'>Are you sure you want to Delete?</h1>
                                                            <div className='flex flex-wrap items-center justify-between mx-auto w-full'>
                                                                <button
                                                                    type="submit"
                                                                    onClick={() => handleDelete(notification._id)}
                                                                    className="w-full md:w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5 md:mx-2"
                                                                >
                                                                    Delete
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="w-full md:w-1/3 mt-2 md:mt-0 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 md:mx-2"
                                                                    onClick={closedeleteModal}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <button onClick={opendeleteModal} className='bg-[#e92939] py-2 px-3 text-white rounded m-1 text-sm'>
                                                    <i className="fa-regular fa-trash-can" style={{ color: 'white' }}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Modal for adding notification */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                                <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
                                    <div className="absolute top-0 right-0 pt-4 pr-4">
                                        <button onClick={closeModal} className="text-black bg-gray-200 hover:bg-gray-300 rounded-lg text-sm p-1.5">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>

                                    <form className="space-y-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900 text-center font-semibold text-2xl">Add New Notification</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-900">Title</label>
                                                <input type="text" id="title"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                                                <textarea
                                                    id="description"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                                    rows="4"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleSubmit}>
                                            Add Notification
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            </AdminSidebar>
            
        </>


    );
};

export default AddNotification;
