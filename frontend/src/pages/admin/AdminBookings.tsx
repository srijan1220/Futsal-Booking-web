import React, { useEffect, useState } from 'react';
import { approveBookingApi, getBookingbyfutsalid, rejectBookingApi } from '../../apis/api';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@shadcn/ui';

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
                    toast({ title: "Booking Approved" });
                } else {
                    console.error('Error approving booking:', res.data.message);
                    toast({ title: "Approval Failed", description: res.data.message });
                }
            })
            .catch((err) => {
                console.error('API call failed:', err);
                toast({ title: "Error", description: "API call failed" });
            });
    };

    const handleReject = (bookingId) => {
        rejectBookingApi(bookingId)
            .then((res) => {
                if (res.data.success) {
                    setBookings(bookings.map(booking =>
                        booking._id === bookingId ? { ...booking, approvalStatus: 'rejected' } : booking
                    ));
                    toast({ title: "Booking Rejected" });
                } else {
                    console.error('Error rejecting booking:', res.data.message);
                    toast({ title: "Rejection Failed", description: res.data.message });
                }
            })
            .catch((err) => {
                console.error('API call failed:', err);
                toast({ title: "Error", description: "API call failed" });
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
        if (id) {
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
        <><div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
            <div className="sm:flex items-center justify-between">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                    Bookings
                </p>
                <div className="flex items-center gap-2">
                    <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-44" />
                    <Input
                        type="text"
                        placeholder="Search Bookings..."
                        onChange={handleSearchChange}
                        className="w-64" />
                </div>
            </div>
        </div><div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell className="font-normal text-left pl-4">User Name</TableCell>
                            <TableCell className="font-normal text-left pl-12">Futsal Name</TableCell>
                            <TableCell className="font-normal text-left pl-12">Date</TableCell>
                            <TableCell className="font-normal text-left pl-20">Time</TableCell>
                            <TableCell className="font-normal text-left pl-16">Action</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBookings.map((booking) => (
                            <TableRow key={booking._id} className="text-sm text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <TableCell className="pl-4 font-medium">
                                    {booking.user?.userName}
                                </TableCell>
                                <TableCell className="pl-12">
                                    <p className="text-sm font-medium">{booking.futsal.futsalName}</p>
                                </TableCell>
                                <TableCell className="pl-12 font-medium">{formatDate(booking.date)}</TableCell>
                                <TableCell className="pl-20 font-medium">{booking.from}</TableCell>
                                <TableCell className="px-7 2xl:px-0">
                                    {booking.approvalStatus === 'pending' && (
                                        <div className="flex">
                                            <Button
                                                variant="outline"
                                                className="text-green-600 hover:text-green-700 ml-2"
                                                onClick={() => handleApprove(booking._id)}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="text-red-600 hover:text-red-700 ml-2"
                                                onClick={() => handleReject(booking._id)}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    )}
                                    {booking.approvalStatus === 'approved' && (
                                        <div className="flex items-center text-green-500">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2"
                                                viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Approved
                                        </div>
                                    )}
                                    {booking.approvalStatus === 'rejected' && (
                                        <div className="flex items-center text-red-500">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2"
                                                viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Rejected
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div></>
    );
};

export default AdminBookings;