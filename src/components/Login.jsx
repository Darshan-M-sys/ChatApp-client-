import React, { useEffect, useState } from 'react'
import FormField from './FormFeild'
import Header from './Header'
import EventDisplay from './Chat/EventDisplay'
import axios from "axios"

import { useNavigate } from 'react-router-dom'
const Login = () => {
  const nav=useNavigate()
  const [formData,setFormData]=useState({
      email:"",
      password:""
    })

const [event,setEvent]=useState({show:false,
  message:"",
  type:""
})

const [success,setSuccess]=useState(false);
    const handleChange=(e)=>{
      setFormData(prev=>({...prev,[e.target.name]:e.target.value}))
    }

   const handleSubmit=async(e)=>{
    e.preventDefault();
    if(formData.email==="" && formData.password===""){
      setEvent({
        show:true,
        message:"Email  and Password Require?",
        type:"info"

     })
     return;
    }
    try{
    const res = await fetch(
        "http://localhost:5000/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSuccess(true)
        setEvent({
          show: true,
          type: "success",
          message: data.msg,
        });
      } else {
        setEvent({
          show: true,
          type: "error",
          message: data.msg,
        });
      }

    } catch (error) {

      console.log(error);

      setEvent({
        type: "error",
        message: "Server Error",
        show: true,
      });

    }
   }

   useEffect(()=>{
    if(success){
      const timeout=setTimeout(()=>{
            nav("/Chat")
      },1500)
      return()=>{clearTimeout(timeout)}
    }
   })
  return (
    
    <>
    <Header/>
      {event.show && (
        <EventDisplay
          type={event.type}
          message={event.message}
          onClose={() =>
            setEvent({
              type: "",
              message: "",
              show: false,
            })
          }
        />
      )}

    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'
      ><div className="text-2xl font-bold text-center">
          Login to Your Account
        </div>
        <form onSubmitCapture={handleSubmit} className="space-y-6">
          <FormField label="Email" onChange={handleChange} value={formData.email} name="email" type="email" required />
          <FormField label="Password" onChange={handleChange} value={formData.password}  name="password" type="password" required />
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div className="flex items-center justify-between">
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register
            </a>
          </p>
      <p className="text-sm text-center text-gray-600">
       
            <a href="/change-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Change your password?
            </a>
          </p>
    </div>
    <p className="text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} chat App. All rights reserved.
    </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
