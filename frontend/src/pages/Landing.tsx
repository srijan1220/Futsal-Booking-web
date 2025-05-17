import React, { useEffect, useState } from "react";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";
import LandingFooter from "../components/LandingFooter";


const Landing = () => {
    const images = [
        '/../assets/images/football/3.jpg',
        '/../assets/images/football/4.jpg',
        '/../assets/images/football/5.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    const containerStyle: React.CSSProperties = {
  width: '100%',
  marginLeft: '4px',
  marginRight: '4px',
  height: '500px',
  position: 'relative', // ✅ Now TypeScript knows this is a valid value
  overflow: 'hidden',
};



    return (

        <>
            <LandingNavbar />
            <div className="flex flex-col w-full font-[Montserrat] ">
                {/* Hero Section */}
                <div
                    className="w-full min-h-screen ml-4 mr-4 mx-auto"
                    style={containerStyle}

                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt=""
                            className="w-full  object-cover absolute "
                            style={{
                                transform: `translateX(${100 * (index - currentIndex)}%)`,
                                transition: 'transform 1s ease-in-out',
                            }}
                        />
                    ))}
                </div>
                {/* hero upto here */}

                {/* Features Section */}
                <div className="pt-8 ">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 text-dark">HOW IT WORKS</h1>
                        <p className="text-dark font-medium text-xl mt-4 text-dark">SIMPLE STEPS TO ELEVATE YOUR FUTSAL EXPERIENCE</p>
                    </div>
                    <div className="mt-8 container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center auto-rows-auto">
                            {/* Step 1 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <img className="mx-auto h-80 w-full object-cover" src="/../assets/images/create account.png" alt="Step 1" />
                                <h3 className="font-semibold text-lg text-gray-800 mt-5">Create Your Account</h3>
                                <p className="text-gray-600 mt-2">Sign up and set up your futsal league profile.</p>
                            </div>
                            {/* Step 2 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <img className="mx-auto h-80 w-full object-cover" src="/../assets/images/team.jpg" alt="Step 1" />

                                <h3 className="font-semibold text-lg text-gray-800 mt-5">Organize Matches</h3>
                                <p className="text-gray-600 mt-2">Schedule and manage your matches with a few clicks.</p>
                            </div>
                            {/* Step 3 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <img className="mx-auto h-80 w-full object-cover" src="/../assets/images/match.jpeg" alt="Step 1" />

                                <h3 className="font-semibold text-lg text-gray-800 mt-5">Enjoy Futsal</h3>
                                <p className="text-gray-600 mt-2">Play and track your games with ease and fun.</p>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Features Section */}
                 <div className="pt-8 ">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 text-dark">HOW IT WORKS</h1>
                        <p className="text-dark font-medium text-xl mt-4 text-dark">SIMPLE STEPS TO ELEVATE YOUR FUTSAL EXPERIENCE</p>
                    </div>
                    <div className="mt-8 container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center auto-rows-auto">
                            {/* Step 1 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <img className="mx-auto h-80 w-full object-cover" src="/../assets/images/create account.png" alt="Step 1" />
                                <h3 className="font-semibold text-lg text-gray-800 mt-5">Create Your Account</h3>
                                <p className="text-gray-600 mt-2">Sign up and set up your futsal league profile.</p>
                            </div>
                            {/* Step 2 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <img className="mx-auto h-80 w-full object-cover" src="/../assets/images/team.jpg" alt="Step 1" />

                                <h3 className="font-semibold text-lg text-gray-800 mt-5">Organize Matches</h3>
                                <p className="text-gray-600 mt-2">Schedule and manage your matches with a few clicks.</p>
                            </div>
                            {/* Step 3 */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <img className="mx-auto h-80 w-full object-cover" src="/../assets/images/match.jpeg" alt="Step 1" />

                                <h3 className="font-semibold text-lg text-gray-800 mt-5">Enjoy Futsal</h3>
                                <p className="text-gray-600 mt-2">Play and track your games with ease and fun.</p>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
            <LandingFooter />
        </>
    );
}

export default Landing
    ;
