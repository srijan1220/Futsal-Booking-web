import React from 'react';
import { Link } from 'react-router-dom';
const Footer = ()=>{
    return(
<footer className="bg-white shadow-lg w-full py-20 text-neutral-700">
<div className="text-neutral-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9 w-5/6 mx-auto justify-center space-x-4">
    {/* Section 1 */}
    <div className="mt-10">
        
            <img src="../assets/images/futsalbackground.png" className='cursor-pointer ' alt="Visa" />
            
    </div>

    {/* Section 2 */}
    <div className="flex flex-col mt-10 md:pl-16">
        <span className="text-xl font-medium">Quick Links</span>
        <div className="flex flex-col w-full text-neutral-700">
            <Link to="/dashboard" className="mt-2 font-medium cursor-pointer hover:text-green-600">Home</Link>
            <Link to="/" className="mt-2 font-medium cursor-pointer hover:text-green-600">About Us</Link>
            <Link to="/mybooking" className="mt-2 font-medium cursor-pointer hover:text-green-600">My Bookings</Link>
            <Link to="/" className="mt-2 font-medium cursor-pointer hover:text-green-600">Contact</Link>
        </div>
    </div>

    {/* Section 3 */}
    <div className="items-center justify-center mt-10 md:pl-16">
        <span className="text-xl font-medium">Contact Us</span>
        <div className="flex flex-col w-full text-neutral-700">
            <span className="mt-3 font-medium">
                <i className="fa-solid fa-location-dot mr-2 neutral-700"></i>Hetauda Nepal</span>
            <span className="mt-3 font-medium">
                <i className="fa-solid fa-phone mt-2 text-neutral-700 mr-2"></i>
                9864849599</span>
            <span className="mt-3 font-medium">
                <i className="fa-regular fa-message mt-2 text-neutral-700 mr-2"></i>Futsalhetauda@gmail.com</span>
        </div>
    </div>

    {/* Section 4 */}
    <div className="mt-4">
        <div className="flex grid grid-cols-4 mt-10 w-3/5">
            <i className="fa-brands fa-twitter text-neutral-700 cursor-pointer hover:text-green-600 fa-lg"></i>
            <i className="fa-brands fa-facebook text-neutral-700 cursor-pointer hover:text-green-600 fa-lg"></i>
            <i className="fa-brands fa-instagram text-neutral-700 cursor-pointer hover:text-green-600 fa-lg "></i>
            <i className="fa-brands fa-pinterest text-neutral-700 cursor-pointer hover:text-green-600  fa-lg "></i>
        </div>
    </div>
</div>

<div className="w-5/6 mx-auto border-b border-solid border-neutral-700 mt-8"></div>

<div className="text-neutral-700 flex flex-col md:flex-row justify-between mt-4 w-5/6 mx-auto">
    <span className='mb-4 md:mb-0 md:mr-4 max-w-[400px]'>© Copyright, Property All Rights Reserved</span>
    <span className='max-w-[400px]'>© Designed and Developed by Aashutosh Aryal</span>
</div>

</footer>
    )
}

export default Footer;