
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useEffect, useRef, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const user = JSON.parse(localStorage.getItem('user'));

// const LandingNavbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const userMenuRef = useRef(null);
//   const [islogoutModalOpen, setlogoutIsModalOpen] = useState(false);
//   const openlogoutModal = () => setlogoutIsModalOpen(true);
//   const closelogoutModal = () => setlogoutIsModalOpen(false);

//   // Close the user menu when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setIsUserMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [userMenuRef]);

//   const navigate = useNavigate();

//   const handleDelete = (e) => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     navigate('/');
//     window.location.reload();
//   };

//   return (
//     <nav className="bg-white shadow-md relative z-20 sticky top-0">
//       <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
//         <div className="flex-shrink-0">
//           <a href="#" className="flex items-center">
//             <img src="/../assets/images/futsalbackground.png" alt="Navbar Brand" className="h-30 w-40" />
//           </a>
//         </div>
        

//         {/* Primary Navbar items */}
//         <div className="flex-grow md:flex md:justify-center md:items-center hidden">
//           <Link to={'/dashboard'} className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">Home</Link>
//           <Link to={'/'} className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">Features</Link>
//           <a href="#" className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">About</a>
//           <a href="#" className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">Contact Us</a>
//         </div>

//         {user ? (
//           <>
//             {/* User icon and dropdown */}
//             <div className="flex-shrink-0 relative " ref={userMenuRef}>
//               <FontAwesomeIcon
//                 icon={faUser}
//                 className="text-xl md:text-3xl text-gray-800 cursor-pointer hover:text-green-500 mr-4 "
//                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//               />

//               Hello {user.userName}
//               {isUserMenuOpen && (
//                 <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
//                   <Link to="/update" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-300" >
//                     Profile
//                   </Link>
//                   <button
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-300"
//                     onClick={openlogoutModal}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}

//               {islogoutModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
//                   <div className="relative mx-auto p-5 border w-full md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white space-y-8 justify-center items-center flex flex-col">
//                     <i className="fa-solid fa-triangle-exclamation text-red-500 fa-5x"></i>
//                     <h1 className="font-medium w-3/4 mx-auto text-center">Are you sure you want to Logout?</h1>
//                     <div className="flex flex-wrap items-center justify-between mx-auto w-full">
//                       <button
//                         type="submit"
//                         onClick={handleDelete}
//                         className="w-full md:w-1/3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center py-2.5 md:mx-2"
//                       >
//                         Logout
//                       </button>
//                       <button
//                         type="button"
//                         className="w-full md:w-1/3 mt-2 md:mt-0 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 md:mx-2"
//                         onClick={closelogoutModal}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </>
//         ) : (
//           <>
//             {/* Login and Register buttons */}
//             <div className='hidden md:flex'>
//             <Link to={'/login'} className=" py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">
//                 Login
//               </Link>
//               <Link to={'/register'} className=" py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300">
//                 Register
//               </Link>
//               </div>

//           </>
//         )}

//         {/* Mobile menu button */}
//         <div className="flex items-center md:hidden">
//           <button className="outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             <svg
//               className="w-6 h-6 text-black hover:text-green-600"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
//         <Link to={'/dashboard'} className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
//           Home
//         </Link>
//         <Link to={'/'} className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
//         Features
//         </Link>
//         <a href="#" className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
//           About us
//         </a>
//         <a href="#" className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
//           Contact Us
//         </a>
//         <Link to={'/login'} className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
//           Login
//         </Link>
//         <Link to={'/register'} className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300">
//           Signup
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default LandingNavbar;



import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  userName: string;
  // Add other user properties as needed
}

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  
  // Safely parse user from localStorage
  const user: User | null = JSON.parse(localStorage.getItem('user') || "null");
   //const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');

  // Close the user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setIsUserMenuOpen(false);
  };

  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    <nav className="bg-white shadow-md relative z-20 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img 
              src="/../assets/images/futsalbackground.png" 
              alt="Navbar Brand" 
              className="h-20 w-32 object-contain" 
            />
          </Link>
        </div>

        {/* Primary Navbar items */}
        <div className="hidden md:flex md:flex-grow md:justify-center md:items-center">
          <Link 
            to={'/dashboard'} 
            className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300"
          >
            Home
          </Link>
          <Link 
            to={'/features'} 
            className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300"
          >
            Features
          </Link>
          <Link 
            to={'/about'} 
            className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300"
          >
            About
          </Link>
          <Link 
            to={'/contact'} 
            className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {user ? (
          <div className="flex items-center space-x-2">
            <span className="hidden md:block text-gray-700">Hello {user.userName}</span>
            
            {/* User icon and dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="User menu"
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-xl md:text-2xl text-gray-800 hover:text-green-500 transition duration-300"
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-300"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition duration-300"
                    onClick={openLogoutModal}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='hidden md:flex space-x-4'>
            <Link 
              to={'/login'} 
              className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300"
            >
              Login
            </Link>
            <Link 
              to={'/register'} 
              className="py-2 px-4 text-black text-lg font-semibold hover:text-green-600 transition duration-300"
            >
              Register
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button 
            className="outline-none focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-black hover:text-green-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link 
          to={'/dashboard'} 
          className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to={'/features'} 
          className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Features
        </Link>
        <Link 
          to={'/about'} 
          className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          About us
        </Link>
        <Link 
          to={'/contact'} 
          className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact Us
        </Link>
        {user ? (
          <>
            <Link 
              to={'/profile'} 
              className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              className="w-full text-left py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
              onClick={() => {
                setIsMenuOpen(false);
                openLogoutModal();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to={'/login'} 
              className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to={'/register'} 
              className="block py-2 px-4 text-lg text-black hover:bg-green-50 hover:text-green-600 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Signup
            </Link>
          </>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="relative mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/3 shadow-lg rounded-md bg-white space-y-6">
            <div className="flex justify-center">
              <svg 
                className="w-16 h-16 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-center font-medium text-lg">Are you sure you want to Logout?</h1>
            <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-4">
              <button
                type="button"
                className="w-full py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="w-full py-2.5 text-white bg-gray-500 hover:bg-gray-600 rounded-lg font-medium transition duration-300"
                onClick={closeLogoutModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;