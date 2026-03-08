import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { IoNotifications } from "react-icons/io5";
const Header = () => {
  const [user,setUser]=useState({})

  useEffect(()=>{

   fetch("http://localhost:5000/user/",{credentials:"include"})
   .then((res)=>res.json())
   .then((data)=>setUser(data?.data))
   .catch((err)=>console.log(err))
    },[user])

    
  return (
    
    <div className="w-full  z-120 h-16 bg-gray-800 text-white flex items-center px-6 shadow-md">

      {/* Left - App Name */}
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-blue-400 transition">
     <img src={logo} alt="Chat App Logo" className="inline-block w-6 h-6 mr-2" />
          Chat App
        </Link>
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-4">
       
        {!user ? (
          <>
            <span className="text-sm text-gray-300">Welcome!</span>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition text-sm"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/notification">
              <IoNotifications/>
            </Link>
            <span className="text-sm text-gray-300">
              Welcome
            </span>
                  <Link
              to="/profile">
            <img
              src={`https://ui-avatars.com/api/?name=${user.userName}`}
              alt="avatar"
              className="w-9 h-9 rounded-full border border-gray-500"
            />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;