import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from 'react-router-dom';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { toast } from 'react-toastify';
import { createBookingApi, createReviewApi, getAvailableTimeSlotsApi, getAvgRatingApi, getReviewsByFutsalIdApi, getSingleFutsalApi } from '../api/api';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';

const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    interface Futsal {
        futsalImageUrl?: string;
        futsalName?: string;
        futsalLocation?: string;
        futsalPrice?: number;
        futsalDescription?: string;
        futsalContact?: string;
        latitude?: number;
        longitude?: number;
        [key: string]: any; // for any additional properties
    }

    const [futsal, setFutsal] = useState<Futsal>({});
    const [date, setDate] = useState('');
    const [selectedTimes, setSelectedTimes] = useState<{ value: string; label: string }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [futsalName, setFutsalName] = useState('');
    const [validOptions, setValidOptions] = useState<{ value: string; label: string }[]>([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    //const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    let availableTime = [
        '6:00-7:00',
        '7:00-8:00',
        '8:00-9:00',
        '9:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-13:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        '16:00-17:00',
        '17:00-18:00',
        '18:00-19:00',
        '19:00-20:00',
    ]

    //var timeOptions = [];
    let timeOptions: { value: string; label: string }[] = [];


    const [rating, setRating] = useState(0);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');


    const handleStarClick = (selectedRating: number) =>  {
        setRating(selectedRating);
    };

    interface Review {
        _id: string;
        user: { userName: string };
        rating: number;
        review: string;
        [key: string]: any;
    }
    const [reviews, setReviews] = useState<Review[]>([]);

    const defaultIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/svgs/solid/map-marker.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    useEffect(() => {
        // Fetch reviews when the component mounts
        if (id) {
            // Replace 'id' with the actual futsal ID
            getReviewsByFutsalIdApi(id)
                .then((res) => {
                    // Sort reviews by date in descending order
                    const sortedReviews = res.data.reviews.sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    setReviews(sortedReviews);
                })
                .catch((error) => {
                    console.error('Error Fetching Reviews', error);
                });
        }
    }, [id]);

    const [avgRating, setAvgRating] = useState<number | null>(null); // New state to store average rating

    useEffect(() => {
        // Fetch average rating when the component mounts
        if (id) {
            getAvgRatingApi(id)
                .then((res) => {
                    setAvgRating(res.data.averageRating);
                })
                .catch((error) => {
                    console.error('Error Fetching Average Rating', error);
                });
        }
    }, [id]);

    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        setMinDate(formattedToday);

        if (id) {
            getSingleFutsalApi(id)
                .then((res) => {
                    setFutsal(res?.data?.futsal);
                    setFutsalName(res?.data?.futsal?.futsalName);
                })
                .catch((error) => {
                    console.error('Error Fetching Data', error);
                });
        }
    }, [id]);


    useEffect(() => {
        if (futsal) {
            console.log("futsal", futsal)
        }

    }, [futsal]
    )
    useEffect(() => {
        if (id && date) {
            getAvailableTimeSlotsApi(id, date)
                .then((data) => {
                    availableTime = availableTime.filter(item => !data.data['bookedTimeSlots'].includes(item))
                    for (var i = 0; i < availableTime.length; i++) {
                        timeOptions.push({ value: availableTime[i], label: availableTime[i] })
                    }
                    setValidOptions(timeOptions)
                    setAvailableTimeSlots(data.data['bookedTimeSlots']);
                })
                .catch((error) => {
                    console.error('Error Fetching Available Time Slots', error);
                    console.log(error)
                });
        }
    }, [id, date]);


    
    const handleTimeChange = (
        selectedOptions: MultiValue<{ value: string; label: string }>,
        _actionMeta: ActionMeta<{ value: string; label: string }>
    ) => {
        setSelectedTimes(Array.isArray(selectedOptions) ? [...selectedOptions] : []);
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const confirmBooking = () => {
        setIsModalOpen(false);
        const formData = new FormData();
        formData.append('user', storedUser._id);
        formData.append('futsal', id ?? '');
        formData.append('futsalName', futsalName);
        formData.append('date', date);
        const times = selectedTimes.map(option => option.value);
        formData.append('from', JSON.stringify(times));

        createBookingApi(formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    navigate('/dashboard');
                }
            })
            .catch((err) => {
                toast.error('Server Error');
                console.log(err.message);
            });
    };


    const handleReviewSubmit = () => {
        setIsReviewModalOpen(false);

        const reviewData = {
            user: storedUser._id,
            futsal: id,
            rating: rating,
            review: reviewText
        };

        // Add logic to create review
        createReviewApi(reviewData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    // You can navigate or perform other actions after submitting the review
                }
            })
            .catch((err) => {
                toast.error('Server Error');
                console.log(err.message);
            });
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col mt-2">
                <div className='w-full flex flex-wrap justify-center items-center'>
                    <div className='ml-2'>
                        <p className='text-\white font-semibold text-3xl px-3 py-3 bg-green-500 rounded-lg'>
                            {avgRating !== null ? avgRating.toFixed(1) : 'Loading...'}
                        </p>
                    </div>
                    <div className="w-4/5 justify-center mx-auto h-[400px]">
                        <img src={futsal.futsalImageUrl} alt="Futsal banner" className="w-full h-full object-cover rounded-md" />
                    </div>
                </div>
                <div className="flex flex-1 flex-col md:flex-row items-start justify-center p-4 md:mt-4 mt-24">
                    <div className="md:w-1/3 w-full border-2 border-solid border-black p-8 m-2 h-[418px] rounded-lg shadow-lg transform md:translate-y-0 -translate-y-1/4 flex flex-col flex-wrap">
                        <div className="flex-grow">
                            <h1 className="text-3xl font-bold text-center md:text-left">{futsalName}</h1>
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-2xl font-bold mb-3">Location: {futsal.futsalLocation}</h2>
                            <p className="text-lg font-semibold mb-4">Price: Rs{futsal.futsalPrice}/hr</p>
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-bold mb-2">Our Services:</h3>
                            <ul className="list-disc ml-4 mb-4">
                                <li>{futsal.futsalDescription}</li>

                            </ul>
                        </div>
                        {/* Futsal Contact */}
                        <div className="flex-grow">
                            <p className="font-semibold">Contact no: {futsal.futsalContact}</p>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="md:w-1/3 w-full bg-white p-8 m-2 rounded-lg shadow-lg transform md:translate-y-0 -translate-y-1/4 flex flex-col items-center justify-center border-2 border-solid border-black">
                        <form className="flex flex-col space-y-4 w-4/5" onSubmit={handleSubmit}>
                            <input
                                className="shadow appearance-none border border-solid border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Name"
                            />
                            <input
                                className="shadow appearance-none border border-solid border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="text"
                                placeholder="Phone Number"
                            />
                            <input
                                className="shadow appearance-none border border-solid border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="date"
                                type="date"
                                onChange={(e) => setDate(e.target.value)}

                                min={minDate}
                            />
                            <Select
                                isMulti
                                name="times"
                                options={validOptions}
                                className="basic-multi-select shadow appearance-none border border-solid border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                classNamePrefix="Time"
                                onChange={handleTimeChange}
                                value={selectedTimes}
                            />

                            {/* Submit Button */}
                            <button
                                className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Book Now
                            </button>
                        </form>
                    </div>
                    <div className="md:w-1/3 w-full bg-white  h-[418px] p-8 m-2 rounded-lg border-2 border-solid border-black shadow-lg transform md:translate-y-0 -translate-y-1/4">
                        <h2 className="text-2xl font-bold mb-4">Booked Time Slots for: {date}</h2>
                        <ul className="list-disc ml-4">

                            {availableTimeSlots.map((timeSlot, index) => (
                                <li key={index}>{timeSlot}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-wrap">

                    {/* Review Form */}
                    <div className="md:w-1/3 w-full p-4 md:p-8 border-2 border-black m-2 mx-auto justify-center items-center rounded-lg shadow-lg">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Give Us Feedback</h2>

                        {/* Rating Stars */}
                        <div className="flex items-center mb-4 ">
                            <p className="mr-2 font-semibold">Rating:</p>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                        }`}
                                    onClick={() => handleStarClick(star)}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>

                        {/* Review Text Area */}
                        <textarea
                            className="shadow appearance-none border border-solid border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                            placeholder="Write your review here..."
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>

                        {/* Submit Button */}
                        <button
                            className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setIsReviewModalOpen(true)}
                        >
                            Submit
                        </button>
                    </div>

                    {/* View Reviews Section */}
                    <div className="md:w-1/2 mx-auto border-2 border-black w-full p-4 md:p-8 m-2 bg-white rounded-lg shadow-lg flex flex-wrap">
                        <h2 className="text-xl md:text-2xl font-bold text-center w-full mb-4">User Reviews</h2>

                        {reviews.length > 0 ? (
                            reviews.slice(0, 4).reverse().map((review) => (
                                <div key={review?._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 p-2">
                                    <div className="border-2 border-solid border-gray-300 p-4 rounded-lg">
                                        <p className='font-semibold'>{review.user.userName}</p>
                                        <div className="flex items-center mb-2">
                                            <div className="flex flex-wrap">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={`text-2xl ${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                    >
                                                        &#9733;
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* User Review Text */}
                                        <p className="text-gray-700" style={{ wordWrap: 'break-word' }}>{review.review}</p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p>No reviews available for this futsal.</p>
                        )}
                    </div>

                </div>

                {
                    futsal?.latitude !== undefined && futsal?.longitude !== undefined && (
                        <MapContainer
                            className="h-[500px] w-full mt-6"
                            center={[futsal.latitude, futsal.longitude]}
                            zoom={25}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />   
                            <Marker position={[futsal.latitude, futsal.longitude]} icon={defaultIcon}>
                                <Popup>
                                    <div>
                                        <h1>{futsal.futsalName}</h1>
                                        <p>{futsal.futsalLocation}</p>
                                        <img src={futsal.futsalImageUrl} alt={futsal.futsalName} />
                                    </div>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    )
                }







                {/* Confirmation Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="bg-white p-5 rounded-lg shadow-xl">
                            <h2 className="text-xl font-bold mb-4">Confirm Booking???</h2>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Time:</strong> {selectedTimes.map(option => option.label).join(", ")}</p>
                            {/* Include other details as needed */}
                            <div className="mt-4 flex justify-end space-x-3">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" onClick={confirmBooking}>Confirm</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {isReviewModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                        <div className="bg-white p-5 rounded-lg shadow-xl">
                            <h2 className="text-xl font-bold mb-4">Give Us Feedback</h2>
                            {/* Rating Stars */}
                            <div className="flex items-center mb-4">
                                <p className="mr-2 font-semibold">Rating:</p>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                            }`}
                                        onClick={() => handleStarClick(star)}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>

                            {/* Review Text Area */}
                            <textarea
                                className="shadow appearance-none border border-solid border-black rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                                placeholder="Write your review here..."

                            >{reviewText}</textarea>

                            {/* Submit Button */}
                            <button
                                className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleReviewSubmit}
                            >
                                Submit Review
                            </button>


                        </div>
                    </div>
                )}

            </div>
            <Footer />
        </>
    );
};

export default BookingForm;