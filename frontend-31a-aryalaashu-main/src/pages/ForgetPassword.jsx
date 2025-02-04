import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { forgetPasswordAPI, getSingleUserApi } from '../apis/api';
import { toast } from 'react-toastify';


const ForgetPassword = () => {
const[email, setEmail] = useState('')



const navigate = useNavigate()

const handleSubmit = (e)=>{
  e.preventDefault()

  const data = {email:email}

  forgetPasswordAPI(data).then((res)=>{
    if(res.data.success==true){
      toast.success(res.data.message)
      navigate('/')
      
    }
    else {
      toast.error(res.data.message)
    }
  }).catch(err => {
    toast.error("Server Error")
  })
 
}
  return (
    <div className="flex  items-center justify-center mt-12">
      <div className="bg-white p-8 rounded-md shadow-lg w-96 ">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <p className="text-gray-600 mb-6">Enter your email to reset your password.</p>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your email"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
