import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserApi } from "../apis/api";

const Registration = () => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //  usestate(settinig error message)
  const [nameerror, setNameError] = useState('')
  const [phonenumbererror, setPhoneNumberError] = useState('')
  const [emailerror, setEmailError] = useState('')
  const [passworderror, setPasswordError] = useState('')
  const [cpassworderror, setCpasswordError] = useState('')

  // validate input value

  const Validate = () => {
    let isValid = true
    // reset error message
    setNameError('')
    setPhoneNumberError('')
    setEmailError('')
    setPasswordError('')
    setCpasswordError('')
    if (userName.trim() === "") {
      setNameError(" Name is Required")
      isValid = false
    }
    if (phoneNumber.trim() === "") {
      setPhoneNumberError("NUmber is Required")
      isValid = false
    } if (email.trim() === "") {
      setEmailError("Email is Required")
      isValid = false
    }
    if (password.trim() === "") {
      setPasswordError("Password is Required")
      isValid = false
    }
    if (confirmPassword.trim() === "") {
      setCpasswordError("Password is Required")
      isValid = false
    }

    if (password.trim() !== confirmPassword.trim()) {
      setCpasswordError("Password doesnot match")
      isValid = false
    }
    return isValid

  }

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };

  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the data input value is available
    // console.log(userName, phoneNumber, email, password);
    const isValid = Validate()

    if (!isValid) {
      return
    }

    // Making json data object
    const data = {
      userName: userName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,

    };

    // Making API call
    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
        navigate('/')
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl m-auto shadow-lg">
        {/* Image container */}
        <div className="hidden md:block">
          <img
            className="object-cover w-full h-full"
            src="/../assets/images/3.png"
            alt="Signup Visual"
          />
        </div>

        {/* Login form container */}
        <div className="flex flex-col justify-center p-8 bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-center text-gray-700">Welcome Back!</h2>
            <p className="text-center text-gray-500">Please sign up for account</p>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                UserName
              </label>
              <input
                type="text"
                id="user"
                name="user"
                autoComplete="user"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="UserName"
                onChange={changeUserName}
              />
              {

                nameerror && <p className='text-danger'>{nameerror}</p>
              }
            </div>
            <div>
              <label htmlFor="number" className="text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="number"
                id="number"
                name="number"
                autoComplete="number"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder=" Phone Number"
                onChange={changePhoneNumber}
              />

              {

                phonenumbererror && <p className='text-danger'>{phonenumbererror}</p>
              }
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Email Address"
                onChange={changeEmail}
              />

              {

                emailerror && <p className='text-danger'>{emailerror}</p>
              }
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="********"
                onChange={changePassword}
              />
              {

                passworderror && <p className='text-danger'>{passworderror}</p>
              }
            </div>
            <div>
              <label htmlFor="confirmpassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="********"
                onChange={changeConfirmPassword}

              />
              {

                cpassworderror && <p className='text-danger'>{cpassworderror}</p>
              }
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-6">
            <div className="text-sm">
              <Link to={'/'} className="font-medium text-green-600 hover:text-green-500">
                Already Have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>


    
  );
};

export default Registration;
