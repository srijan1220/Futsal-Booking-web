import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";

import {
  getAllFutsalsApi,
  getAvgRatingApi,
  getUserNotificaitonAPI,
} from "@/api/api";
import LandingNavbar from "./landingNavBar";
const SOCKET_URL = "http://localhost:5000";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id || null;

  const [hoveredFutsalId, setHoveredFutsalId] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const handleMouseEnter = (futsalId: string) => {
    setHoveredFutsalId(futsalId);

    getAvgRatingApi(futsalId)
      .then((res) => {
        setAverageRating(res.data.averageRating);
      })
      .catch((error) => {
        console.error("Error Fetching Average Rating", error);
      });
  };

  const handleMouseLeave = () => {
    setHoveredFutsalId(null);
    setAverageRating(null);
  };

  const [futsals, setFutsals] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [futsalName, setFutsalName] = useState<string>("");

  interface Notification {
    _id: string;
    title: string;
    description: string;
    dateSent: string;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationDropdownRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      console.log("I am connected");
    });

    socketRef.current.emit("user connected", userId);

    socketRef.current.on("admin add notification", (data: Notification) => {
      toast(
        <div>
          <p>
            You have got a new Notification on date{" "}
            {new Date(data.dateSent).toLocaleDateString()}
          </p>
        </div>
      );
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserNotifications(userId);
    }

    getAllFutsalsApi()
      .then((res) => {
        setFutsals(res.data.futsals);
      })
      .catch((error) => {
        console.error("Error fetching futsals:", error);
      });

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userId]);

  const fetchUserNotifications = (userId: any): Promise<any> => {
    return getUserNotificaitonAPI(userId)
      .then((res) => {
        const userNotifications = res.data.data.notifications;
        const adminFutsals = res.data.data.adminFutsals;
        const name = adminFutsals.length > 0 ? adminFutsals[0].futsalName : "";

        setNotifications(userNotifications.reverse());
        setUnreadCount(userNotifications.length);
        setFutsalName(name);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      notificationDropdownRef.current &&
      !notificationDropdownRef.current.contains(e.target as Node)
    ) {
      setShowNotifications(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const filteredFutsals = futsals.filter((item) => {
    const name = item.futsalName ? item.futsalName.toLowerCase() : "";
    const location = item.futsalLocation
      ? item.futsalLocation.toLowerCase()
      : "";
    return name.includes(searchQuery) || location.includes(searchQuery);
  });

  return (
    <>
      <LandingNavbar />
      <div className="min-h-screen bg-white p-5">
        <div className="flex justify-between mb-5">
          <input
            className="mx-auto w-full max-w-md rounded-md p-2 border-2 border-black"
            placeholder="Search Here..."
            onChange={handleSearchChange}
          />

          <div className="relative" ref={notificationDropdownRef}>
            <div
              onClick={toggleNotifications}
              className="md:mr-16 text-3xl text-gray-500 hover:text-green-500 cursor-pointer ml-4 relative"
            >
              <FontAwesomeIcon icon={faBell} />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                  {unreadCount}
                </span>
              )}
            </div>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50 p-4 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl font-semibold">Notifications</span>
                  <button onClick={markAllAsRead} className="text-blue-500">
                    Mark All as Read
                  </button>
                </div>
                <ul>
                  {notifications.slice(0, 2).map((notification) => (
                    <li
                      key={notification._id}
                      className="py-2 border-b border-black rounded-lg"
                    >
                      <div className="font-semibold space-y-2">
                        <div className="text-end text-sm text-gray-600">
                          {new Date(notification.dateSent).toLocaleDateString()}
                        </div>
                        <div className="text-center">{futsalName} Futsal</div>
                        <div className="text-center font-bold">
                          {notification.title}
                        </div>
                        <div className="text-center">
                          {notification.description}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {notifications.length > 2 && (
                  <Link
                    to={"/allnotification"}
                    className="text-blue-500 mt-2 block text-center"
                  >
                    View All Notifications
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredFutsals.map((item) => (
            <div
              key={item._id}
              className="rounded overflow-hidden shadow-lg bg-white cursor-pointer relative"
              onMouseEnter={() => handleMouseEnter(item._id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/booking/${item._id}`}>
                {hoveredFutsalId === item._id && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg font-medium text-2xl text-black p-2 text-center z-10">
                    Average Rating:{" "}
                    {averageRating !== null
                      ? averageRating.toFixed(1)
                      : "Not rated yet"}
                  </div>
                )}
                <img
                  className="w-full h-60 object-cover"
                  src={item.futsalImageUrl}
                  alt="Futsal"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-center">
                    {item.futsalName}
                  </div>
                  <div className="font-semibold text-xl text-center">
                    Location: {item.futsalLocation}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
