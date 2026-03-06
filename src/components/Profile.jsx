import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import PhotoView from "./PhotoView";

const Profile = () => {
  const [image,setImage]=useState("")
    const [user,setUser]=useState({});
    useEffect(()=>{
      fetch("http://localhost:5000/profile",{credentials:"include"})
      .then((res)=>res.json())
      .then((data)=>setUser(data.data || {}))
    },[])
  return (
    <>
    <Header/>
    <div className="min-h-[100vh] m-auto flex justify-center items-center ">
    <div className=" max-w-md w-full  bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col items-center">
        <p className="text-xl  font-[600] p-2">Welcome Back👋 {user.fullName}</p>
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

      {/* Buttons */}
      <div className="mt-6 flex gap-3">

        <Link  to="/profile-create" className="flex-1 bg-blue-600 text-white py-2 text-center rounded-lg hover:bg-blue-700">
          Edit Profile
        </Link >

        <button className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">
          Settings
        </button>

      </div>
     </div>
    </div>

    </>
  );
};

export default Profile;