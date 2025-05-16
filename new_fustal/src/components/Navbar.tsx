import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user') || '{}'); //there is  change (||'{}' )added

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [islogoutModalOpen, setlogoutIsModalOpen] = useState(false);
  const openlogoutModal = () => setlogoutIsModalOpen(true);
  const closelogoutModal = () => setlogoutIsModalOpen(false);

  // Close the user menu when clicking outside
  useEffect(() => {
    const userMenuRef = useRef<HTMLDivElement>(null);//this line added
    function handleClickOutside(event: MouseEvent) {//:mouseEvevnt is addes
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {//as node added
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  const navigate = useNavigate();

  const handleDelete = () => {//there was e between() so i removed
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md relative z-20 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center">
            <img src="/../assets/images/futsalbackground.png" alt="Navbar Brand" className="h-30 w-40" />
          </a>
        </div>

        {/* Primary Navbar items */}
        <div className="flex-grow md:flex md:justify-center md:items-center hidden">
          <Link to={'/dashboard'} className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">Home</Link>
          <Link to={'/mybooking'} className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">My Bookings</Link>
          <a href="#" className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">About</a>
          <a href="#" className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">Contact Us</a>
        </div>

        {user ? (
          <>
            {/* User icon and dropdown */}
            <div className="flex-shrink-0 relative flex items-center" ref={userMenuRef}>
              <FontAwesomeIcon
                icon={faUser}
                className="text-xl md:text-3xl text-gray-800 cursor-pointer hover:text-green-500 mr-4 "
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              />
              {/* Conditionally render based on screen size */}
              <span className="hidden md:block">Hello {user.userName}</span>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
                  <Link to="/update" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-300" >
                    Profile
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-300"
                    onClick={openlogoutModal}
                  >
                    Logout
                  </button>
                </div>
              )}

              {islogoutModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                  <div className="relative mx-auto p-5 border w-full md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
                    <i className="fa-solid fa-triangle-exclamation text-red-500 fa-5x"></i>
                    <h1 className="font-medium w-3/4 mx-auto text-center">Are you sure you want to Logout?</h1>
                    <div className="flex flex-wrap items-center justify-between mx-auto w-full">
                      <button
                        type="submit"
                        onClick={handleDelete}
                        className="w-full md:w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5 md:mx-2"
                      >
                        Logout
                      </button>
                      <button
                        type="button"
                        className="w-full md:w-1/3 mt-2 md:mt-0 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 md:mx-2"
                        onClick={closelogoutModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </>
        ) : (
          <>
            {/* Login and Register buttons */}
            <div className='hidden md:flex'>
              <Link to={'/login'} className=" py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">
                Login
              </Link>
              <Link to={'/register'} className=" py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">
                Register
              </Link>
            </div>
          </>
        )}

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button className="outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6 text-black hover:text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link to={'/dashboard'} className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
          Home
        </Link>
        <Link to={'/mybooking'} className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
          My Bookings
        </Link>
        <a href="#" className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
          About
        </a>
        <a href="#" className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
          Contact Us
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
