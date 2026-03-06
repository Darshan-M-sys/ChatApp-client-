import React, { useEffect, useState } from 'react'
import FormField from './FormFeild'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import EventDisplay from './Chat/EventDisplay'

const ChangePassword = () => {
  const [event,setEvent]=useState({
    show:false,
    message:"",
    type:""
  })
const [formData,setFormData]=useState({
 email:"",
 password:"",
 newPassword:""
})
const handleChange=(e)=>{
  setFormData(prev=>({...prev,[e.target.name]:e.target.value}));
}

const nav=useNavigate();
const [success,setSuccess]=useState(false);

const handleSubmit=(e)=>{
e.preventDefault();
  fetch("http://localhost:5000/user/reset-password",{
    body:JSON.stringify(formData),
    headers:{
      "Content-Type":"application/json"
    },
    method:"POST",
    credentials:"include"
  }).then((res)=>res.json())
  .then((data)=>{

    if(data.success){
   setSuccess(true)
      setEvent({
        show:true,
        message:data.msg,
        type:"success"
      })
    }else{
      setEvent({
        show:true,
        message:data.msg,
        type:"info"
      })
    }
  }).catch((err)=>console.log(err))
}


useEffect(()=>{
  if(success){
    const timeout= setTimeout(()=>{
     nav("/login")
    },1500)
    return()=>{
      clearTimeout(timeout)
    }
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-bold text-center">
          Change Your Password
        </div>
        <form  onSubmit={handleSubmit} className="space-y-6">
         <FormField 
         label="email"
         name="email"
         type="email"
         onChange={handleChange}
         value={formData.email}
         required={true}
          />
          <FormField 
         label="current password"
         name="password"
         onChange={handleChange}
         value={formData.password}
          type="password"
          required={true} 
          />
          <FormField 
         label="new password"
         name="newPassword"
          type="password" 
          onChange={handleChange}
         value={formData.newPassword}
          required={true}
            />
            <input type="submit" value="Change Password" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' />
          </form>
          <div>
            <p className="text-sm text-center text-gray-600">
              Remembered your password?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login here
              </a>
            </p>
           <p className="text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} chat App. All rights reserved.
    </p>
                 </div>
            </div>

    </div>
    </>
  )
}

export default ChangePassword
