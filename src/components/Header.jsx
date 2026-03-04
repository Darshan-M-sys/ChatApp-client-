import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Header = ({ user, onLogout }) => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center px-6 shadow-md">

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
            <span className="text-sm text-gray-300">
              Welcome, {user.username}
            </span>

            <img
              src={`https://ui-avatars.com/api/?name=${user.username}`}
              alt="avatar"
              className="w-9 h-9 rounded-full border border-gray-500"
            />

            <button
              onClick={onLogout}
              className="px-3 py-1 bg-red-500 rounded-md hover:bg-red-600 text-sm transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;