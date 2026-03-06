import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import FormField from './FormFeild'
import Header from './Header'
import EventDisplay from './Chat/EventDisplay'

const ProfileCreate = ({user}) => {
  const [success,setSuccess]=useState(false)
  const nav=useNavigate();
 const[event,setEvent]=useState({
  message:"",
  show:false,
  type:""
 })
 const [file,setFile]=useState(null);
  const [formData,setFormData]=useState({
    fullName:"",
    bio:"",
    photo:null
  });


  const handleChange=(e)=>{
      setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
  

    
useEffect(()=>{
  if(user){
    setFormData((prev)=>({...prev,...user
    }))
  }
},[user])

const [previewImage,setPreviewImage]=useState("");



useEffect(()=>{
  if(file){
    setFormData((prev)=>({...prev,photo:file}))
    setPreviewImage(URL.createObjectURL(file))
  }
},[file])


const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(formData)
    const data = new FormData()
 Object.keys(formData).forEach((key)=>{
  data.append(key,formData[key]);
 })  
  fetch("http://localhost:5000/profile/update",{
    body:data,
    method:"PUT",
credentials:"include",
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
        type:"error"
      })
  }
})
}


useEffect(()=>{
 if(success){
  const timeout=setTimeout(()=>{
       nav("/profile")
  },1500)
  return ()=>{
    clearTimeout(timeout)
  }
 }
},[success])
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
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
        <div className="text-2xl font-bold text-center">
          Create Your Profile
        </div>
        <form  onSubmit={handleSubmit} className="space-y-6">
<FormField label="Username" onChange={handleChange} value={formData.fullName} name="fullName" type="text"  />
<FormField label="Profile Picture" onChange={(e)=>(setFile(e.target.files[0]) )}  name="profilePicture" type="file" file={true} accept="image/*" />
 <img
          src={formData.profilePicture || previewImage || `https://ui-avatars.com/api/?name=${formData.fullName}`}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />

<FormField label="Bio" onChange={handleChange} value={formData.bio} name="bio" textarea={true} rows={4} />
<input type="submit" value="Update profile" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' />
          </form>
      </div>
      
    </div>
    </>
  )
}

export default ProfileCreate
