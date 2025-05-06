// Notifications.js

import { getUserNotificaitonAPI } from '@/api/api';

import { useEffect, useState } from 'react';
import LandingNavbar from './landingNavBar';



const AllNotifications = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const userId = user ? user._id : null;
  interface Notification {
    _id: string;
    title: string;
    description: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);

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
      <LandingNavbar/>
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
    </>
  );
};

export default AllNotifications;


