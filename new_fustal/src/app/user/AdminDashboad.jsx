import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFutsalApi, deleteFutsalAPI, getFutsalUserIdApi } from '../../apis/api';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [isdeleteModalOpen, setdeleteIsModalOpen] = useState(false);
    const opendeleteModal = () => setdeleteIsModalOpen(true);
    const closedeleteModal = () => setdeleteIsModalOpen(false);


    const [searchQuery, setSearchQuery] = useState('');


    const [futsalName, setFutsalName] = useState('')
    const [futsalPrice, setFutsalPrice] = useState('')
    const [futsalContact, setFutsalContact] = useState('')
    const [futsalCategory, setFutsalCategory] = useState('')
    const [futsalDescription, setFutsalDescription] = useState('')
    const [futsalLocation, setFutsalLocation] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')


    const [futsalImage, setFutsalImage] = useState(null)
    const [imagePreview, setPreviewImage] = useState(null)

    const [futsals, setFutsals] = useState([])
    useEffect(() => {
        getFutsalUserIdApi(user._id).then((res) => {
            setFutsals(res.data.futsals);
        });
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openImageModal = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setSelectedImageUrl(null);
        setImageModalOpen(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setFutsalImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const filteredFutsals = futsals.filter((item) => {
        return (
            item.futsalName.toLowerCase().includes(searchQuery) ||
            item.futsalLocation.toLowerCase().includes(searchQuery) ||
            item.futsalPrice.toString().toLowerCase().includes(searchQuery)
        );
    });

    const totalPages = Math.ceil(filteredFutsals.length / itemsPerPage);
    const slicedData = filteredFutsals.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('userId', user._id)
        formData.append('futsalName', futsalName)
        formData.append('futsalPrice', futsalPrice)
        formData.append('futsalContact', futsalContact)
        formData.append('futsalCategory', futsalCategory)
        formData.append('futsalDescription', futsalDescription)
        formData.append('futsalLocation', futsalLocation)
        formData.append('futsalImage', futsalImage)
        formData.append('latitude', latitude)
        formData.append('longitude', longitude)
        


        createFutsalApi(formData).then((res) => {
            if (res.data.success == false) {
                toast.error(res.data.message)

            } else {
                window.location.reload()
                toast.success(res.data.message)


            }


        }).catch(err => {
            toast.error("Server Error")
            console.log(err.message)
        })

    }

    const handleDelete = (id) => {

        deleteFutsalAPI(id).then((res) => {
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
        <AdminNavbar/>
        <AdminSidebar>
            <>
                <div className="w-full sm:px-6">
                    <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                        <div className="sm:flex items-center justify-between">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Futsals</p>
                            <input
                                type="text"
                                placeholder="Search Futsal..."
                                className="px-12 py-3 border border-solid border-gray-700 rounded-lg ml-auto"
                                onChange={handleSearchChange}
                            />
                            <div>
                                <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-blue-700 hover:bg-blue-600 focus:outline-none rounded mb-4"
                                    onClick={openModal}
                                >
                                    <p className="text-sm font-medium leading-none text-white">Add Futsal</p>
                                </button>

                            </div>


                        </div>
                    </div>
                    <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                    <th className="font-normal text-left pl-4">Futsal Name</th>
                                    <th className="font-normal text-left pl-12">Price/Hr</th>
                                    <th className="font-normal text-left pl-12">Contact</th>
                                    <th className="font-normal text-left pl-20">Category</th>
                                    <th className="font-normal text-left pl-20">Description</th>
                                    <th className="font-normal text-left pl-16">Action</th>
                                </tr>
                            </thead>
                            <tbody className="w-full">
                                {slicedData.map((item) => (
                                    <tr key={item._id} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                        <td
                                            className="pl-4 cursor-pointer"
                                            onClick={() => openImageModal(item.futsalImageUrl)}
                                        >


                                            <div className="flex items-center">
                                                <div className="w-10 h-10">
                                                    <img
                                                        className="w-full h-full"
                                                        src={item.futsalImageUrl}
                                                        alt="Thumbnail Image"
                                                    />
                                                </div>
                                                <div className="pl-4">
                                                    <p className="font-medium">{item.futsalName}</p>
                                                    <p className="text-xs leading-3 text-gray-600 pt-2">
                                                        {item.futsalLocation}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pl-12">
                                            <p className="text-sm font-medium leading-none text-gray-800">{item.futsalPrice}</p>

                                        </td>
                                        <td className="pl-12">
                                            <p className="font-medium">{item.futsalContact}</p>
                                        </td>
                                        <td className="pl-20">
                                            <p className="font-medium">{item.futsalCategory}</p>
                                        </td>
                                        <td className="pl-20">
                                            <p className="font-medium"> {item.futsalDescription}</p>
                                        </td>

                                        <td className="px-7 2xl:px-0">

                                            <Link to={`/admin/edit/${item._id}`} className='bg-[#123697] py-2 px-3 text-white rounded m-1 text-sm'>

                                                <i class="fa-regular fa-pen-to-square " style={{ color: 'white' }}></i>
                                            </Link>
                                            {isdeleteModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                                                    <div className="relative mx-auto p-5 border w-full md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                                                        <i className="fa-solid fa-triangle-exclamation text-red-500 fa-5x"></i>
                                                        <h1 className='font-medium w-3/4 mx-auto text-center'>Are you sure you want to Delete?</h1>
                                                        <div className='flex flex-wrap items-center justify-between mx-auto w-full'>
                                                            <button
                                                                type="submit"
                                                                onClick={() => handleDelete(item._id)}
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
                                                <i class="fa-regular fa-trash-can" style={{ color: 'white' }}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>


                        <ReactPaginate
                            previousLabel={
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
                                    Backward
                                </span>
                            }
                            nextLabel={
                                <span className="flex items-center">
                                    Forward
                                    <FontAwesomeIcon icon={faChevronRight} className="ml-1" />
                                </span>
                            }
                            breakLabel={
                                <span className="text-gray-600 mx-2">
                                    Page {currentPage + 1} of {totalPages}
                                </span>
                            }
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination flex items-center justify-center list-none my-4'}
                            activeClassName={'active'}
                            pageClassName={'mx-2'}
                            pageLinkClassName={'cursor-pointer'}
                        />
                    </div>
                    {isImageModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black opacity-75" onClick={closeImageModal}></div>
                            <div className="relative z-50 bg-white p-8">
                                <span className="absolute top-7 right-7 cursor-pointer p-2 bg-white rounded-lg" onClick={closeImageModal}>
                                    <FontAwesomeIcon icon={faTimes} className="ml-1" />
                                </span>
                                {selectedImageUrl && (
                                    <img className="w-full h-auto" src={selectedImageUrl} alt="Selected Futsal" />
                                )}
                            </div>
                        </div>
                    )}

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                            <div className="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
                                <div className="absolute top-0 right-0 pt-4 pr-4">
                                    <button onClick={closeModal} className="text-black bg-gray-200 hover:bg-gray-300 rounded-lg text-sm p-1.5">
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>

                                <form className="space-y-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 text-center font-semibold text-2xl">Add New Futsal</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="futsalName" className="block text-sm font-medium text-gray-900">Futsal Name</label>
                                            <input type="text" onChange={(e) => setFutsalName(e.target.value)} id="futsalName" className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                                        </div>
                                        <div>
                                            <label htmlFor="futsalPrice" className="block text-sm font-medium text-gray-900">Futsal Price</label>
                                            <input type="number" onChange={(e) => setFutsalPrice(e.target.value)} id="futsalPrice" className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                                        </div>
                                        <div>
                                            <label htmlFor="futsalContact" className="block text-sm font-medium text-gray-900">Futsal Contact</label>
                                            <input type="number" onChange={(e) => setFutsalContact(e.target.value)} id="futsalContact" className="mt-1 block w-full  border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                                        </div>
                                        <div>
                                            <label htmlFor="futsalCategory" className="block text-sm font-medium text-gray-900">Futsal Category</label>
                                            <select onChange={(e) => setFutsalCategory(e.target.value)} className='form-control mb-2'>
                                                <option value="Select Category">Select Category</option>
                                                <option value="5A-Side">5A-Side</option>
                                                <option value="7A-Side">7A-Side</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="futsalLocation" className="block text-sm font-medium text-gray-900">Futsal Location</label>
                                            <input type="text" id="futsalLocation" onChange={(e) => setFutsalLocation(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                                        </div>

                                        <div>
                                            <label htmlFor="futsalDescription" className="block text-sm font-medium text-gray-900">Futsal Description</label>
                                            <textarea id="futsalDescription" onChange={(e) => setFutsalDescription(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" rows="4" required></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="latitude" className="block text-sm font-medium text-gray-900">Location Latitude</label>
                                            <input type="text" id="latitude" onChange={(e) => setLatitude(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                                        </div>
                                        <div>
                                            <label htmlFor="longitude" className="block text-sm font-medium text-gray-900">Futsal Longitude</label>
                                            <input type="text" id="longitude" onChange={(e) => setLongitude(e.target.value)} className="mt-1 block w-full border border-solid border-gray-300 text-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="futsalImage" className="block text-sm font-medium  text-gray-900">Futsal Image</label>
                                        <input type="file" id="futsalImage" accept="image/*" className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={handleImageUpload} required />
                                        {imagePreview && (
                                            <div className="mt-4">
                                                <img src={imagePreview} alt="Futsal preview" className="w-full rounded-md" />
                                            </div>
                                        )}
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleSubmit}>Add Futsal</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </AdminSidebar>
        </>

    )
}

export default AdminDashboard
