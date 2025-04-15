import { useEffect, useState } from "react";

const Landing = () => {
  const images = [
    "/../assets/images/football/3.jpg",
    "/../assets/images/football/4.jpg",
    "/../assets/images/football/5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const containerStyle = {
    width: "100%",
    marginLeft: "4px",
    marginRight: "4px",
    height: "500px",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <>
      {/* <LandingNavbar /> */}
      <div className="flex flex-col w-full font-[Montserrat] ">
        {/* Hero Section */}
        <div
          className="w-full min-h-screen ml-4 mr-4 mx-auto"
        //   style={containerStyle}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="w-full object-cover absolute"
              style={{
                transform: `translateX(${100 * (index - currentIndex)}%)`,
                transition: "transform 1s ease-in-out",
              }}
            />
          ))}
        </div>
        {/* Hero Section Ends */}

        {/* Features Section */}
        <div className="pt-8 min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 text-dark">
              HOW IT WORKS
            </h1>
            <p className="text-dark font-medium text-xl mt-4 text-dark">
              SIMPLE STEPS TO ELEVATE YOUR FUTSAL EXPERIENCE
            </p>
          </div>
          <div className="mt-8 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center auto-rows-auto">
              {/* Step 1 */}
              <div className="bg-white rounded-lg shadow p-6">
                <img
                  className="mx-auto h-80 w-full object-cover"
                  src="/../assets/images/create account.png"
                  alt="Step 1"
                />
                <h3 className="font-semibold text-lg text-gray-800 mt-5">
                  Create Your Account
                </h3>
                <p className="text-gray-600 mt-2">
                  Sign up and set up your futsal league profile.
                </p>
              </div>
              {/* Step 2 */}
              <div className="bg-white rounded-lg shadow p-6">
                <img
                  className="mx-auto h-80 w-full object-cover"
                  src="/../assets/images/team.jpg"
                  alt="Step 1"
                />

                <h3 className="font-semibold text-lg text-gray-800 mt-5">
                  Organize Matches
                </h3>
                <p className="text-gray-600 mt-2">
                  Schedule and manage your matches with a few clicks.
                </p>
              </div>
              {/* Step 3 */}
              <div className="bg-white rounded-lg shadow p-6">
                <img
                  className="mx-auto h-80 w-full object-cover"
                  src="/../assets/images/match.jpeg"
                  alt="Step 1"
                />

                <h3 className="font-semibold text-lg text-gray-800 mt-5">
                  Enjoy Futsal
                </h3>
                <p className="text-gray-600 mt-2">
                  Play and track your games with ease and fun.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section Ends */}

        {/* Contact Section */}
        <div className="pt-8 min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 text-dark">
              CONTACT US
            </h1>
            <p className="text-dark font-medium text-xl mt-4 text-dark">
              WE WOULD LOVE TO HEAR FROM YOU
            </p>
          </div>
          <div className="mt-8 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center auto-rows-auto">
              {/* Section 1 */}
              <div className="bg-white rounded-lg shadow p-6">
                <img
                  className="mx-auto h-80 w-full object-cover"
                  src="/../assets/images/contact.jpg"
                  alt="Contact Us"
                />
                <h3 className="font-semibold text-lg text-gray-800 mt-5">
                  Reach Out to Us
                </h3>
                <p className="text-gray-600 mt-2">
                  Send us an email or call for inquiries.
                </p>
              </div>
              {/* Section 2 */}
              <div className="bg-white rounded-lg shadow p-6">
                <img
                  className="mx-auto h-80 w-full object-cover"
                  src="/../assets/images/phone.jpg"
                  alt="Phone"
                />
                <h3 className="font-semibold text-lg text-gray-800 mt-5">
                  Call Us
                </h3>
                <p className="text-gray-600 mt-2">
                  Get in touch via phone for immediate assistance.
                </p>
              </div>
              {/* Section 3 */}
              <div className="bg-white rounded-lg shadow p-6">
                <img
                  className="mx-auto h-80 w-full object-cover"
                  src="/../assets/images/email.jpg"
                  alt="Email"
                />
                <h3 className="font-semibold text-lg text-gray-800 mt-5">
                  Email Us
                </h3>
                <p className="text-gray-600 mt-2">
                  We are always available through email.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Section Ends */}

      </div>

      <footer className="bg-white shadow-lg w-full py-20 text-neutral-700">
        <div className="text-neutral-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9 w-5/6 mx-auto justify-center space-x-4">
          {/* Section 1 */}
          <div className="mt-10">
            <img
              src="../assets/images/futsalbackground.png"
              className="cursor-pointer "
              alt="Visa"
            />
          </div>

          {/* Section 3 */}
          <div className="items-center justify-center mt-10 md:pl-16">
            <span className="text-xl font-medium">Contact Us</span>
            <div className="flex flex-col w-full text-neutral-700">
              <span className="mt-3 font-medium">
                <i className="fa-solid fa-location-dot mr-2 neutral-700"></i>
                Kathmandu Nepal
              </span>
              <span className="mt-3 font-medium">
                <i className="fa-solid fa-phone mt-2 text-neutral-700 mr-2"></i>
                980000000000
              </span>
              <span className="mt-3 font-medium">
                <i className="fa-regular fa-message mt-2 text-neutral-700 mr-2"></i>
                FutsalNepal@gmail.com
              </span>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mt-4">
            <div className="flex grid grid-cols-4 mt-10 w-3/5">
              <i className="fa-brands fa-twitter text-neutral-700 cursor-pointer hover:text-green-600 fa-lg"></i>
              <i className="fa-brands fa-facebook text-neutral-700 cursor-pointer hover:text-green-600 fa-lg"></i>
              <i className="fa-brands fa-instagram text-neutral-700 cursor-pointer hover:text-green-600 fa-lg "></i>
              <i className="fa-brands fa-pinterest text-neutral-700 cursor-pointer hover:text-green-600 fa-lg "></i>
            </div>
          </div>
        </div>

        <div className="w-5/6 mx-auto border-b border-solid border-neutral-700 mt-8"></div>

        <div className="text-neutral-700 flex flex-col md:flex-row justify-between mt-4 w-5/6 mx-auto">
          <span className="mb-4 md:mb-0 md:mr-4 max-w-[400px]">
            © Copyright, Property All Rights Reserved
          </span>
        </div>
      </footer>
    </>
  );
};

export default Landing;
