import React from "react";

import { IoCloseSharp } from "react-icons/io5";
const PhotoView = ({ image, onClose }) => {
  return (
    <>
      {image && (
        <div className="fixed transition-all z-[900] duration-300 zoom inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div className="relative">
          <img className="w-[300px] rounded-lg" src={image} alt="preview" />
          <button className="absolute top-[-10px] right-[-10px] text-white bg-black/100 p-2 rounded-full z-40 text-3xl " onClick={onClose}><IoCloseSharp /></button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoView;