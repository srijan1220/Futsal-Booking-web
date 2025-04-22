import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userNameerror, setUserNameError] = useState('')
  const [passworderror, setPasswordError] = useState('')

  const Validate = () => {
    let isValid = true

    setUserNameError('')
    setPasswordError('')

    if (userName.trim() === "") {
      setUserNameError("UserName is Required")
    }

    if (password.trim() === "") {
      setPasswordError("Password is Required")
      isValid = false
    }
    return isValid
  }

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the data input value is available
    // console.log(userName, password);

    // validate the data
    const isValid = Validate()

    if(!isValid){
      return
    }

    // making json data object
    const data = {
      userName: userName,
      password: password,
    };
    // making api call


    // navigate

    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          // set the token in local storage
          localStorage.setItem('token', res.data.token);

          // set user data
          const jsonDecode = JSON.stringify(res.data.userData);
          localStorage.setItem('user', jsonDecode);
          const user=res.data.userData;
          if(user.isAdmin==true){
            navigate("/admin/futsal")
            window.location.reload();

            return
          }  
          navigate("/dashboard")
          window.location.reload();


        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  return (
    <>

<div className="min-h-screen flex items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl m-auto shadow-lg">
        {/* Image container */}
        <div className="">
          <img
            className="object-cover w-full h-full"
            src="/../assets/images/3.png"
            alt="Login Visual"
          />
        </div>

        {/* Login form container */}
        <div className="flex flex-col justify-center p-8 bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-center text-gray-700">Welcome Back!</h2>
            <p className="text-center text-gray-500">Please sign in to your account</p>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="userame"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Username"
                onChange={changeUserName}

              />
              {
                    userNameerror && <p className='text-danger'>{userNameerror}</p>
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm">
              <Link to={'/forgetpassword'} className="font-medium text-green-600 hover:text-green-500">
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm">
              <Link to={'/register'} className="font-medium text-green-600 hover:text-green-500">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      

                 
    </>
  );
};

export default Login;
