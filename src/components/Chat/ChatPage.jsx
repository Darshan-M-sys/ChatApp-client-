import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey bro, how are you?",
      time: "2:30 PM",
      online: true,
    },
    {
      id: 2,
      name: "Alice",
      lastMessage: "Let's meet tomorrow.",
      time: "1:10 PM",
      online: false,
    },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "me",
      text: "Hello 👋",
    },
    {
      id: 2,
      sender: "other",
      text: "Hey bro!",
    },
  ]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: messageInput,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

const [menu,setMenuShow]=useState(false);
  return (
    <div className="flex h-screen">

    <div className="hidden md:flex">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />
</div>


{ menu &&(
    <div className="flex md:hidden">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />
      
</div>)}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-100">

        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white shadow flex items-center justify-between">
              <div className="relative flex items-center gap-3">
                
                <img
                  src={`https://ui-avatars.com/api/?name=${activeChat.name}`}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold text-lg">
                {activeChat.name}
              </h2>
              <p className="text-sm text-gray-500">WelCome to Darshan </p>
              </div>
              
              </div>
            
              <span className="text-sm text-gray-500">
                {activeChat.online ? "Online 🟢" : "Offline"}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      msg.sender === "me"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 shadow"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-gray-500 text-lg">
              Select a chat to start messaging 💬
            </h2>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatPage;