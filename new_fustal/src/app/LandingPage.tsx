"use client"

import { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const Landing = () => {
  const images = [
    "/../assets/images/football/3.jpg",
    "/../assets/images/football/4.jpg",
    "/../assets/images/football/5.jpg",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  const faqItems = [
    {
      question: "How do I book a futsal court?",
      answer:
        "You can book a futsal court by creating an account, selecting your preferred location and time slot, and completing the payment process. Our system will confirm your booking instantly.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards, digital wallets, and bank transfers. All payments are processed securely through our platform.",
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer:
        "Yes, you can cancel or reschedule your booking up to 24 hours before your scheduled time. Please note that cancellations made less than 24 hours in advance may be subject to our cancellation policy.",
    },
    {
      question: "Are there any membership options available?",
      answer:
        "Yes, we offer various membership packages that provide benefits such as priority booking, discounted rates, and exclusive access to tournaments. Check our membership section for more details.",
    },
    {
      question: "Do you provide equipment for players?",
      answer:
        "Basic equipment such as balls and bibs are provided. However, players are encouraged to bring their own footwear and personal gear for comfort and hygiene purposes.",
    },
  ]

  return (
    <>
      {/* <LandingNavbar /> */}
      <div className="flex flex-col w-full font-[Montserrat]">
        {/* Hero Section */}
        <div className="relative w-full h-screen overflow-hidden">
          {images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`Futsal image ${index + 1}`}
              className="absolute w-full h-full object-cover"
              style={{
                transform: `translateX(${100 * (index - currentIndex)}%)`,
                transition: "transform 1s ease-in-out",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Futsal Nepal</h1>
              <p className="text-xl md:text-2xl mb-8">Book your futsal court with ease</p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
        {/* Hero Section Ends */}

        {/* Features Section */}
        <div className="py-16 bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">HOW IT WORKS</h1>
            <p className="text-gray-700 font-medium text-xl mt-4">SIMPLE STEPS TO ELEVATE YOUR FUTSAL EXPERIENCE</p>
          </div>
          <div className="mt-12 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Step 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <img
                  className="mx-auto h-64 w-full object-cover rounded-md"
                  src="/../assets/images/create account.png"
                  alt="Create Account"
                />
                <h3 className="font-semibold text-xl text-gray-800 mt-5">Create Your Account</h3>
                <p className="text-gray-600 mt-2">Sign up and set up your futsal league profile in minutes.</p>
              </div>
              {/* Step 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <img
                  className="mx-auto h-64 w-full object-cover rounded-md"
                  src="/../assets/images/team.jpg"
                  alt="Organize Matches"
                />
                <h3 className="font-semibold text-xl text-gray-800 mt-5">Organize Matches</h3>
                <p className="text-gray-600 mt-2">Schedule and manage your matches with a few clicks.</p>
              </div>
              {/* Step 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <img
                  className="mx-auto h-64 w-full object-cover rounded-md"
                  src="/../assets/images/match.jpeg"
                  alt="Enjoy Futsal"
                />
                <h3 className="font-semibold text-xl text-gray-800 mt-5">Enjoy Futsal</h3>
                <p className="text-gray-600 mt-2">Play and track your games with ease and fun.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section Ends */}

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-800">FREQUENTLY ASKED QUESTIONS</h1>
            <p className="text-gray-700 font-medium text-xl mt-4">EVERYTHING YOU NEED TO KNOW</p>
          </div>
          <div className="container mx-auto px-4 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-lg py-4">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {/* FAQ Section Ends */}

        {/* Contact Section */}
        <div className="py-16 bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">CONTACT US</h1>
            <p className="text-gray-700 font-medium text-xl mt-4">WE WOULD LOVE TO HEAR FROM YOU</p>
          </div>
          <div className="mt-12 container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Section 1 */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <img
                  className="mx-auto h-64 w-full object-cover rounded-md"
                  src="/../assets/images/contact.jpg"
                  alt="Contact Us"
                />
                <h3 className="font-semibold text-xl text-gray-800 mt-5">Reach Out to Us</h3>
                <p className="text-gray-600 mt-2">Send us an email or call for inquiries.</p>
              </div>
              {/* Section 2 */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <img
                  className="mx-auto h-64 w-full object-cover rounded-md"
                  src="/../assets/images/phone.jpg"
                  alt="Phone"
                />
                <h3 className="font-semibold text-xl text-gray-800 mt-5">Call Us</h3>
                <p className="text-gray-600 mt-2">Get in touch via phone for immediate assistance.</p>
              </div>
              {/* Section 3 */}
              <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
                <img
                  className="mx-auto h-64 w-full object-cover rounded-md"
                  src="/../assets/images/email.jpg"
                  alt="Email"
                />
                <h3 className="font-semibold text-xl text-gray-800 mt-5">Email Us</h3>
                <p className="text-gray-600 mt-2">We are always available through email.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Section Ends */}
      </div>

      <footer className="bg-white shadow-lg w-full py-16 text-neutral-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-11/12 lg:w-5/6 mx-auto">
          {/* Section 1 */}
          <div className="flex items-center justify-center md:justify-start">
            <img
              src="../assets/images/futsalbackground.png"
              className="cursor-pointer max-h-24"
              alt="Futsal Nepal Logo"
            />
          </div>

          {/* Section 2 - Added Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-medium mb-4">Quick Links</span>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-medium mb-4">Contact Us</span>
            <div className="flex flex-col space-y-3">
              <span className="font-medium flex items-center">
                <i className="fa-solid fa-location-dot mr-2"></i>
                Kathmandu, Nepal
              </span>
              <span className="font-medium flex items-center">
                <i className="fa-solid fa-phone mr-2"></i>
                980000000000
              </span>
              <span className="font-medium flex items-center">
                <i className="fa-regular fa-message mr-2"></i>
                FutsalNepal@gmail.com
              </span>
            </div>
          </div>

          {/* Section 4 */}
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-medium mb-4">Follow Us</span>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-700 hover:text-green-600 transition-colors">
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-neutral-700 hover:text-green-600 transition-colors">
                <i className="fa-brands fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-neutral-700 hover:text-green-600 transition-colors">
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-neutral-700 hover:text-green-600 transition-colors">
                <i className="fa-brands fa-pinterest fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="w-11/12 lg:w-5/6 mx-auto border-t border-neutral-300 mt-8 pt-8">
          <div className="text-neutral-700 flex flex-col md:flex-row justify-between items-center">
            <span className="mb-4 md:mb-0">© {new Date().getFullYear()} Futsal Nepal. All Rights Reserved</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Landing
