import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ProfileCreate from './components/ProfileCreate'
import ChangePassword from './components/ChangePassword'
import Home from './components/Home'
import Chat from './components/Chat/Chat'
import Profile from './components/Profile'
import InviteFriends from './components/InviteFriends'

const App = () => {

  const [profileData,setProfileData]=useState({});

  useEffect(()=>{
    fetch("http://localhost:5000/profile",{credentials:"include"})
    .then((res)=>res.json())
    .then((data)=>setProfileData(data.data || {}))
  },[])
  return (
    <div >
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-create" element={<ProfileCreate user={profileData || {}}/>} />
        <Route path="/change-password" element={<ChangePassword  />} />
        <Route path="/profile"  element={<Profile user={profileData || {}}/>}/> 
        <Route path="/invite/friends" element={<InviteFriends/>}/>
      </Routes>
    </div>
  )
}

export default App
