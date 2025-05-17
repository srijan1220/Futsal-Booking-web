// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { deleteBookingAPi, getUserFutsalBookingApi } from '../apis/api';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const MyBookings = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const userId = user ? user._id : null;
//     const [bookings, setBookings] = useState([]);
//     const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//     const [filteredBookings, setFilteredBookings] = useState([]);
//     const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
//     const opendeleteModal = () => setdeleteIsModalOpen(true);
//     const closedeleteModal = () => setdeleteIsModalOpen(false);

//     useEffect(() => {
//         if (userId) {
//             getUserFutsalBookingApi(userId)
//                 .then((res) => {
//                     // console.log(res.data)
//                     if (res.data.success) {
//                         setBookings(res.data.bookings);
//                     } else {
//                         console.error('Error fetching bookings:', res.data.message);
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('API call failed:', error);
//                 });
//         }
//     }, [userId]);

//     useEffect(() => {
//         const filteredBookings = bookings.filter((booking) => {
//             const bookingDate = new Date(formatDate(booking.date));
//             const selectedDateObj = new Date(selectedDate);
//             return bookingDate.toDateString() === selectedDateObj.toDateString();
//         });
//         setFilteredBookings(filteredBookings);
//     }, [bookings, selectedDate]);

//     const navigate = useNavigate();
//     const handleDelete = (id) => {
//         deleteBookingAPi(id).then((res) => {
//             if (res.data.success == true) {
//                 toast.success(res.data.message);
//                 navigate('/dashboard');
//             } else {
//                 toast.error(res.data.message);
//             }
//         });
//     };

//     const formatDate = (isoDateString) => {
//         return isoDateString.split('T')[0];
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="w-full sm:px-6">
//                 <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
//                     <div className="sm:flex items-center justify-between">
//                         <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">MY Bookings</p>
//                         <input
//                             type="date"
//                             value={selectedDate}
//                             onChange={(e) => setSelectedDate(e.target.value)}
//                             className="px-12 py-2 border border-solid border-gray-700 rounded-lg ml-auto"
//                         />
//                     </div>
//                 </div>
//                 <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
//                     <table className="w-full whitespace-nowrap">
//                         <thead>
//                             <tr className="h-16 w-full text-sm leading-none text-gray-800">
//                                 <th className="font-normal text-left pl-4">Futsal Name</th>
//                                 <th className="font-normal text-left pl-12">Price/Hr</th>
//                                 <th className="font-normal text-left pl-12">Contact</th>
//                                 <th className="font-normal text-left pl-12">Booked Date</th>
//                                 <th className="font-normal text-left pl-12">Time</th>
//                                 <th className="font-normal text-left pl-20">Category</th>
//                                 <th className="font-normal text-left pl-20">Location</th>
//                                 <th className="font-normal text-left pl-16">Status</th>
//                                 <th className="font-normal text-left pl-16">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="w-full">
//                             {filteredBookings.map((booking) => {
//                                 const bookingDate = new Date(formatDate(booking.date));
//                                 const today = new Date();
//                                 const disableEditButtons = bookingDate < today;

//                                 return (
//                                     <tr key={booking._id} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
//                                         <td className="pl-4">
//                                             <p className="font-medium">{booking.futsal.futsalName}</p>
//                                         </td>
//                                         <td className="pl-12">
//                                             <p className="font-medium">{booking.futsal.futsalPrice}</p>
//                                         </td>
//                                         <td className="pl-12">
//                                             <p className="font-medium">{booking.futsal.futsalContact}</p>
//                                         </td>
//                                         <td className="pl-12">
//                                             <p className="font-medium">{formatDate(booking.date)}</p>
//                                         </td>
//                                         <td className="pl-12">
//                                             <p className="font-medium"> {booking.from}</p>
//                                         </td>
//                                         <td className="pl-20">
//                                             <p className="font-medium">{booking.futsal.futsalCategory}</p>
//                                         </td>
//                                         <td className="pl-20">
//                                             <p className="font-medium">{booking.futsal.futsalLocation}</p>
//                                         </td>
//                                         <td className="pl-12">
//                                             <p className="font-medium">
//                                                 {booking.approvalStatus.charAt(0).toUpperCase() + booking.approvalStatus.slice(1)}
//                                             </p>
//                                         </td>
//                                         <td className="px-7 2xl:px-0">
//                                             {disableEditButtons ? (
//                                                 <p className="text-gray-500">Booked Date Passed</p>
//                                             ) : (
//                                                 booking.approvalStatus === 'pending' && (
//                                                     <div className='flex items-center justify-center'>
//                                                         <Link to={`/myedit/${booking._id}`} className='bg-[#123697] py-2 px-3 text-white rounded m-1 text-sm'>
//                                                             <i className="fa-regular fa-pen-to-square" style={{ color: 'white' }}></i>
//                                                         </Link>
//                                                         {isdeleteModalOpen && (
//                                                             <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//                                                                 <div className="relative mx-auto p-5 border w-full md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
//                                                                     <i className="fa-solid fa-triangle-exclamation text-red-500 fa-5x"></i>
//                                                                     <h1 className='font-medium w-3/4 mx-auto text-center'>Are you sure you want to Delete?</h1>
//                                                                     <div className='flex flex-wrap items-center justify-between mx-auto w-full'>
//                                                                         <button
//                                                                             type="submit"
//                                                                             onClick={() => handleDelete(booking._id)}
//                                                                             className="w-full md:w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5 md:mx-2"
//                                                                         >
//                                                                             Delete
//                                                                         </button>
//                                                                         <button
//                                                                             type="button"
//                                                                             className="w-full md:w-1/3 mt-2 md:mt-0 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 md:mx-2"
//                                                                             onClick={closedeleteModal}
//                                                                         >
//                                                                             Cancel
//                                                                         </button>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         )}

//                                                         <button className='bg-[#e92939] py-2 px-3 text-white rounded m-1 text-sm' onClick={opendeleteModal}>
//                                                             <i className="fa-regular fa-trash-can" style={{ color: 'white' }}></i>
//                                                         </button>
//                                                     </div>
//                                                 )
//                                             )}
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default MyBookings;



import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteBookingAPi, getUserFutsalBookingApi } from '../apis/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define types
interface User {
  _id: string;
  // Add other user properties as needed
}

interface Futsal {
  futsalName: string;
  futsalPrice: string;
  futsalContact: string;
  futsalCategory: string;
  futsalLocation: string;
}

interface Booking {
  _id: string;
  futsal: Futsal;
  date: string;
  from: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  // Add other booking properties as needed
}

const MyBookings: React.FC = () => {
  const userString = localStorage.getItem('user');
  const user: User | null = userString ? JSON.parse(userString) : null;
  const userId = user?._id || null;
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const navigate = useNavigate();

  const openDeleteModal = (id: string) => {
    setSelectedBookingId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBookingId(null);
  };

  useEffect(() => {
    if (userId) {
      getUserFutsalBookingApi(userId)
        .then((res) => {
          if (res.data.success) {
            setBookings(res.data.bookings);
          } else {
            console.error('Error fetching bookings:', res.data.message);
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error('API call failed:', error);
          toast.error('Failed to fetch bookings');
        });
    }
  }, [userId]);

  useEffect(() => {
    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(formatDate(booking.date));
      const selectedDateObj = new Date(selectedDate);
      return bookingDate.toDateString() === selectedDateObj.toDateString();
    });
    setFilteredBookings(filtered);
  }, [bookings, selectedDate]);

  const handleDelete = (id: string) => {
    deleteBookingAPi(id)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Remove the deleted booking from state
          setBookings(bookings.filter(booking => booking._id !== id));
          closeDeleteModal();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Delete failed:', error);
        toast.error('Failed to delete booking');
      });
  };

  const formatDate = (isoDateString: string): string => {
    return isoDateString.split('T')[0];
  };

  return (
    <>
      <Navbar />
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">MY Bookings</p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-12 py-2 border border-solid border-gray-700 rounded-lg ml-auto"
            />
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-4">Futsal Name</th>
                <th className="font-normal text-left pl-12">Price/Hr</th>
                <th className="font-normal text-left pl-12">Contact</th>
                <th className="font-normal text-left pl-12">Booked Date</th>
                <th className="font-normal text-left pl-12">Time</th>
                <th className="font-normal text-left pl-20">Category</th>
                <th className="font-normal text-left pl-20">Location</th>
                <th className="font-normal text-left pl-16">Status</th>
                <th className="font-normal text-left pl-16">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const bookingDate = new Date(formatDate(booking.date));
                  const today = new Date();
                  const disableEditButtons = bookingDate < today;

                  return (
                    <tr key={booking._id} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                      <td className="pl-4">
                        <p className="font-medium">{booking.futsal.futsalName}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{booking.futsal.futsalPrice}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{booking.futsal.futsalContact}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{formatDate(booking.date)}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">{booking.from}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{booking.futsal.futsalCategory}</p>
                      </td>
                      <td className="pl-20">
                        <p className="font-medium">{booking.futsal.futsalLocation}</p>
                      </td>
                      <td className="pl-12">
                        <p className="font-medium">
                          {booking.approvalStatus.charAt(0).toUpperCase() + booking.approvalStatus.slice(1)}
                        </p>
                      </td>
                      <td className="px-7 2xl:px-0">
                        {disableEditButtons ? (
                          <p className="text-gray-500">Booked Date Passed</p>
                        ) : (
                          booking.approvalStatus === 'pending' && (
                            <div className='flex items-center justify-center'>
                              <Link 
                                to={`/myedit/${booking._id}`} 
                                className='bg-[#123697] py-2 px-3 text-white rounded m-1 text-sm'
                              >
                                <i className="fa-regular fa-pen-to-square" style={{ color: 'white' }}></i>
                              </Link>
                              <button 
                                className='bg-[#e92939] py-2 px-3 text-white rounded m-1 text-sm' 
                                onClick={() => openDeleteModal(booking._id)}
                              >
                                <i className="fa-regular fa-trash-can" style={{ color: 'white' }}></i>
                              </button>
                            </div>
                          )
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No bookings found for the selected date
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative mx-auto p-5 border w-full md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
            <i className="fa-solid fa-triangle-exclamation text-red-500 fa-5x"></i>
            <h1 className='font-medium w-3/4 mx-auto text-center'>Are you sure you want to Delete?</h1>
            <div className='flex flex-wrap items-center justify-between mx-auto w-full'>
              <button
                type="button"
                onClick={() => selectedBookingId && handleDelete(selectedBookingId)}
                className="w-full md:w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5 md:mx-2"
              >
                Delete
              </button>
              <button
                type="button"
                className="w-full md:w-1/3 mt-2 md:mt-0 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 md:mx-2"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MyBookings;