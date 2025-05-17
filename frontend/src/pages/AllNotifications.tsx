// Notifications.js

import React, { useEffect, useState } from 'react';
import { getUserNotificaitonAPI } from '../apis/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AllNotifications = () => {
  type Notification = {//added this type
  _id: string;
  title: string;
  description: string;
};
const [notifications, setNotifications] = useState<Notification[]>([]);

  const user = JSON.parse(localStorage.getItem('user')||"null")
  const userId = user ? user._id : null;
  //const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch all notifications when the component mounts
    getUserNotificaitonAPI(userId)
      .then((res) => {
        setNotifications(res.data.data.notifications);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white p-5">
        <h1 className="text-3xl font-semibold mb-4">All Notifications</h1>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification._id} className="p-4 border border-gray-300 rounded-md">
              <div className="font-semibold space-y-4">Futsal
                <div className="font-semibold mt-4 text-center">{notification.title}</div>
                <div className='text-center'>{notification.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AllNotifications;
