import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";


const ChatSidebar = ({ chats = [], activeChat, setActiveChat }) => {

  return (
    <>

    <div className="w-[320px]  md:w-72 h-screen bg-gray-900 text-white flex flex-col">
      
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="p-4  border-gray-700 text-lg font-semibold">
        Chats
      </div>
     <Link to="/invite/friends" className="text-xl text-gray-400 cursor-pointer hover:text-gray-200 transition">
        <FaPlus />
      </Link>
      </div>
      {/* Search */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-800 transition ${
              activeChat?.id === chat.id ? "bg-gray-800" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${chat.name}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
              )}
            </div>

            {/* Name + Last Message */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{chat.name}</h3>
              <p className="text-xs text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>

            {/* Time */}
            <div className="text-xs text-gray-400">
              {chat.time}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ChatSidebar;