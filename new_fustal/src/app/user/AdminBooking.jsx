import React, { useEffect, useState } from 'react';
import { approveBookingApi, getAllBookingApi, getBookingbyfutsalid, rejectBookingApi } from '../../apis/api';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';



const AdminBookings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user ? user._id : null;
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleApprove = (bookingId) => {
        approveBookingApi(bookingId)
            .then((res) => {
                if (res.data.success) {
                    setBookings(bookings.map(booking =>
                        booking._id === bookingId ? { ...booking, approvalStatus: 'approved' } : booking
                    ));
                } else {
                    console.error('Error approving booking:', res.data.message);
                    // Optionally, handle showing error to the user
                }
            })
            .catch((err) => {
                console.error('API call failed:', err);
                // Optionally, handle showing error to the user
            });
    };


    const handleReject = (bookingId) => {
        rejectBookingApi(bookingId)
            .then((res) => {
                if (res.data.success) {
                    setBookings(bookings.map(booking =>
                        booking._id === bookingId ? { ...booking, approvalStatus: 'rejected' } : booking
                    ));
                    
                } else {
                    console.error('Error rejecting booking:', res.data.message);
                    // Optionally, handle showing error to the user
                }
            })
            .catch((err) => {
                console.error('API call failed:', err);
                // Optionally, handle showing error to the user
            });
    };


    const formatDate = (isoDateString) => {
        return isoDateString.split('T')[0];
    };

    const filteredBookings = bookings.filter(booking => {
        const formattedDate = formatDate(booking.date);
        const userExists = booking.user && booking.user?.userName; 
        const matchesSearchQuery = userExists && booking.user?.userName.toLowerCase().includes(searchQuery) ||
                                   booking.futsal.futsalName.toLowerCase().includes(searchQuery) ||
                                   formattedDate.toLowerCase().includes(searchQuery);

        const matchesDate = selectedDate ? formattedDate === selectedDate : true;

        return matchesSearchQuery && matchesDate;
    });

    useEffect(() => {
        if(id){
        getBookingbyfutsalid(id)
            .then((res) => {
                if (res.data.success) {
                    setBookings(res.data.bookings);
                } else {
                    console.error('Error fetching bookings:', res.data.error);
                }
            })
            .catch((err) => {
                console.error('API call failed:', err);
            });
        }
    }, [id]);

    return (
        <>
            <AdminNavbar />

        <AdminSidebar>
              <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                <div className="sm:flex items-center justify-between">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Bookings</p>
                    <div className="flex items-center">
                        <input
                            type="date"
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-4 py-2 border border-solid border-gray-700 rounded-lg mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Search Bookings..."
                            className="px-12 py-3 border border-solid border-gray-700 rounded-lg ml-auto"
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="h-16 w-full text-sm leading-none text-gray-800">
                            <th className="font-normal text-left pl-4">User Name</th>
                            <th className="font-normal text-left pl-12">Futsal Name</th>
                            <th className="font-normal text-left pl-12">Date</th>
                            <th className="font-normal text-left pl-20">Time</th>
                            <th className="font-normal text-left pl-16">Action</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {filteredBookings.map((booking) => (
                            <tr key={booking._id} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4">
                                    <p className="font-medium">{booking.user?.userName}</p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">{booking.futsal.futsalName}</p>
                                </td>
                                <td className="pl-12">
                                    <p className="font-medium">{formatDate(booking.date)}</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">{booking.from}</p>
                                </td>
                                
                                <td className="px-7 2xl:px-0">
                                    {booking.approvalStatus === 'pending' && (
                                        <>
                                            <button onClick={() => handleApprove(booking._id)} className="focus:outline-none ml-2 text-green-500 hover:text-green-700">
                                                Approve
                                            </button>
                                            <button onClick={() => handleReject(booking._id)} className="focus:outline-none ml-2 text-red-500 hover:text-red-700">
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {booking.approvalStatus === 'approved' && (
                                        <div className="flex items-center justify-center text-green-500">
                                            <svg className="w-6 h-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Approved
                                        </div>
                                    )}
                                    {booking.approvalStatus === 'rejected' && (
                                        <div className="flex items-center justify-center text-red-500">
                                            <svg className="w-6 h-6 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                            Rejected
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </AdminSidebar>
        </>

    );
};

export default AdminBookings;
