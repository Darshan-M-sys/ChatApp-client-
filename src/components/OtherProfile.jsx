import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import PhotoView from "./PhotoView";
import { IoCloseSharp } from "react-icons/io5";
import EventDisplay from "./Chat/EventDisplay";

const OtherProfile= ({user ,onClose}) => {
  const [event,setEvent]=useState({
    show:false,
    type:"",
    message:""
  })
   const [reRender,setReRender]=useState(true)
  const [image,setImage]=useState("")
  const  sendInvite=(id)=>{
  fetch(`http://localhost:5000/friend/invite/${id}`,{
    credentials:"include",
    method:"POST",
  }).then((res)=>res.json())
  .then((data)=>{
    setReRender(!reRender)
      setEvent({
      show:true,
      message:data.msg,
      type:"success"
    })})
  .catch((err)=>console.log(err))
  }

  const[requestId,setRequestId]=useState("")
 
  const [success,setSuccess]=useState(false)
  useEffect(()=>{
  fetch(`http://localhost:5000/friend/invite/${user._id}`,{credentials:"include"})
  .then((res)=>res.json())
  .then((data)=>{
    if(data.success){
      setRequestId(data.data?._id)
      setSuccess(true)
    }else{
      setSuccess(false)
    }
  })
  .catch((err)=>console.log(err))
  },[user,reRender])

 const handleWithdrawRequest=()=>{
  fetch(`http://localhost:5000/friend/request/${requestId}`,{credentials:"include",method:"DELETE"})
  .then((res)=>res.json())
  .then((data)=>{
    setEvent({
      show:true,
      message:data.msg,
      type:"success"
    })
      setReRender(!reRender)
  })
  .catch((err)=>console.log(err))
 }
  return (
    <>
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
    <Header/>
   
    <div className="fixed transition-all duration-300 zoom inset-0    flex justify-center items-center bg-black bg-opacity-80 ">
    <div className=" max-w-md  w-[320px] md:w-full relative  bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col items-center">
        <p className="text-xl  font-[600] p-2">{String(user.fullName).split(" ")[0]} 's Profile</p>
    <img  onClick={ ()=>setImage(user.profilePicture)}
          src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.fullName}`}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="zoom transition-all duration-300">
        <PhotoView image={image} onClose={()=>setImage("")} />
</div>
        <h2 className="text-xl font-semibold mt-3">{user.fullName}</h2>
        <p className="text-gray-500 text-sm">{user.bio || "No bio available"}</p>

        {/* Status */}
        <span
          className={`mt-2 px-3 py-1 text-xs rounded-full ${
            user.isOnline=== true
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {user.isOnline?"Online":"Offline"}
        </span>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Joined</span>
          <div>
          <span className="font-medium">{String(user?.createdAt || "").split("T")[0] || ""   }</span> <br/>
          </div>
        </div>

      </div>
  <button className="absolute top-[-10px] right-[-10px] text-white bg-black/100 p-2 rounded-full z-40 text-3xl " onClick={onClose}><IoCloseSharp /></button>
      {/* Buttons */}
      <div className="mt-6 flex gap-3">

        <button onClick={success?handleWithdrawRequest:()=>sendInvite(user._id)}  to="/profile-create" className="flex-1 bg-blue-600 text-white py-2 text-center rounded-lg hover:bg-blue-700">
          {success?"WithDraw":"Invite"}       </button >

        

      </div>
     </div>
    </div>

    </>
  );
};

export default OtherProfile ;