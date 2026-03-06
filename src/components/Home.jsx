import React from "react";
import Header from "./Header";
import home from "../assets/images/home.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
<main className="h-[calc(100vh-4rem)] relative flex items-center justify-center">
 {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur opacity-20"
          style={{ backgroundImage: `url(${home})` }}
        ></div>
 {/* Content */}
        <div className="relative text-center px-6">
          <h1 className="text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 font-bold mb-4">
            Welcome to Chat App 
          </h1>
       <p className="text-lg text-gray-600 mb-6">
            Connect with your friends and family in real-time.
          </p>
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
<div className="absolute bottom-4 w-full text-center">
    <p className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} chat App. All rights reserved.
    </p>      
</div>
      </main>
    </>
  );
};

export default Home;