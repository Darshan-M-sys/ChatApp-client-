import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ProfileCreate from './components/ProfileCreate'
import ChangePassword from './components/ChangePassword'
import Home from './components/Home'
import Chat from './components/Chat/Chat'

const App = () => {
  return (
    <div >
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-create" element={<ProfileCreate />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  )
}

export default App
