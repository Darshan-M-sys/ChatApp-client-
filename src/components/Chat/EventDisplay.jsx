import React, { useEffect } from "react";

const EventDisplay = ({ type, message, onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: "bg-green-500 border-green-700",
    error: "bg-red-500 border-red-700",
    warning: "bg-yellow-500 border-yellow-700",
    info: "bg-blue-500 border-blue-700",
  };

  return (
    <div className="fixed top-[100px] right-[90px] z-50 animate-slideIn">
      <div
        className={`flex items-center justify-between gap-4 p-4 rounded-xl text-white shadow-lg border-l-[8px] ${
          typeStyles[type] || "bg-gray-500 border-gray-700"
        }`}
      >
        <p className="text-sm md:text-base font-medium">
          {message}
        </p>

        <button
          onClick={onClose}
          className="text-white font-bold hover:opacity-70"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default EventDisplay;