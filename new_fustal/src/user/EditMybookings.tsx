import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { getSingleBookingApi, updateBookingApi } from '../api/api';

const EditMybookings = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [minDate, setMinDate] = useState('');
    const [futsalName, setFutsalName] = useState('');
    const [futsalPrice, setFutsalPrice] = useState('');
    const [futsalDate, setFutsalDate] = useState('');
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingTimePassed, setIsBookingTimePassed] = useState(false);

    const timeOptions = [
        { value: '6:00-7:00', label: '6:00-7:00' },
        { value: '7:00-8:00', label: '7:00-8:00' },
        { value: '8:00-9:00', label: '8:00-9:00' },
        { value: '9:00-10:00', label: '9:00-10:00' },
        { value: '10:00-11:00', label: '10:00-11:00' },
        { value: '11:00-12:00', label: '11:00-12:00' },
        { value: '12:00-13:00', label: '12:00-13:00' },
        { value: '13:00-14:00', label: '13:00-14:00' },
        { value: '14:00-15:00', label: '14:00-15:00' },
        { value: '15:00-16:00', label: '15:00-16:00' },
        { value: '16:00-17:00', label: '16:00-17:00' },
        { value: '17:00-18:00', label: '17:00-18:00' },
        { value: '18:00-19:00', label: '18:00-19:00' },
        { value: '19:00-20:00', label: '19:00-20:00' },
    ];

    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        setMinDate(formattedToday);
        if(id!=null){
        getSingleBookingApi(id).then((res) => {
            setFutsalName(res.data.booking.futsal.futsalName);
            setFutsalPrice(res.data.booking.futsal.futsalPrice);
            setFutsalDate(res.data.booking.date);

            const fromData = res.data.booking.from;
            if (Array.isArray(fromData)) {
                setSelectedTimes(fromData.map(time => ({ value: time, label: time })));
            } else {
                setSelectedTimes([{ value: fromData, label: fromData }]);
            }
        });

        }

    }, [id]);

    useEffect(() => {
        if (futsalDate) {
            const currentTime = new Date();
            const bookingDateTime = new Date(futsalDate); 
            setIsBookingTimePassed(currentTime > bookingDateTime);
        }
    }, [futsalDate]); 
    const handleTimeChange = (selectedOptions) => {
        setSelectedTimes(selectedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const confirmChanges = () => {
        setIsModalOpen(false);

        const formData = new FormData();
        formData.append('date', futsalDate);
        const times = selectedTimes.map(option => option.value);
        formData.append('from', JSON.stringify(times));

        // Making the API call
        updateBookingApi(id, formData).then((res) => {
            if (res.data.success === true) {
                toast.success(res.data.message);
                navigate('/mybooking/');
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            toast.error("Server Error");
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
                {/* Close button */}
                <div className="absolute top-0 right-0 pt-4 pr-4">
                    <Link to={'/mybooking'} className="bg-[#e92939] py-2 px-3 text-white rounded m-1 text-sm">
                        <i className="fa-solid fa-x"></i>
                    </Link>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 text-center font-semibold text-2xl">Edit Booking Changes</h3>
                    {/* ... Existing Form Fields ... */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="futsalName" className="block text-sm font-medium text-gray-900">
                                Futsal Name
                            </label>
                            <input
                                type="text"
                                id="futsalName"

                                readOnly
                                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                value={futsalName}
                                onChange={(e) => setFutsalName(futsalName)}

                            />
                        </div>
                        <div>
                            <label htmlFor="futsalPrice" className="block text-sm font-medium text-gray-900">
                                Futsal Price
                            </label>
                            <input
                                type="number"
                                id="futsalPrice"
                                readOnly
                                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                value={futsalPrice}
                                onChange={(e) => setFutsalPrice(futsalPrice)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-900">
                                Booked Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                required
                                value={futsalDate}
                                onChange={(e) => setFutsalDate(e.target.value)}
                                min={minDate}

                            />
                        </div>
                       
                       
                    </div>
                   
                    <div>
                        <label htmlFor="times" className="block text-sm font-medium text-gray-900">
                            Select Times
                        </label>
                        <Select
                            isMulti
                            name="times"
                            options={timeOptions}
                            className="basic-multi-select mt-1 block w-full border border-solid border-gray-300 rounded-lg shadow-sm"
                            classNamePrefix="select"
                            onChange={handleTimeChange}
                            value={selectedTimes}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Save Changes
                    </button>
                </form>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirm Changes</h2>
                        <p><strong>Date:</strong> {futsalDate}</p>
                        <p><strong>Time:</strong> {selectedTimes.map(option => option.label).join(", ")}</p>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" onClick={confirmChanges}>Confirm</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditMybookings;
