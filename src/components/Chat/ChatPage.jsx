import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import socket from "../Socket";

const ChatPage = () => {

  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

    const [user,setUser]=useState({});
     useEffect(()=>{
       fetch("http://localhost:5000/profile",{credentials:"include"})
       .then((res)=>res.json())
       .then((data)=>setUser(data.data || {}))
     },[])

  const bottomRef = useRef(null);

  /* ---------------- REGISTER SOCKET USER ---------------- */

  useEffect(() => {
    if (!user._id) return;
    socket.emit("register", user._id);
  }, [user._id]);



  /* ---------------- RECEIVE REALTIME MESSAGE ---------------- */

  useEffect(() => {

    socket.on("receive_message", (data) => {

      if (
        activeChat &&
        (data.sender === activeChat._id || data.receiver === activeChat._id)
      ) {
        setMessages((prev) => [...prev, data]);
      }

    });

    return () => {
      socket.off("receive_message");
    };

  }, [activeChat]);



  /* ---------------- LOAD FRIEND LIST ---------------- */

  useEffect(() => {

    fetch("http://localhost:5000/friend/friends", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data.friends || []);
      })
      .catch((err) => console.log(err));

  }, []);



  /* ---------------- LOAD CHAT HISTORY ---------------- */

  useEffect(() => {

    if (!activeChat) return;
    fetch(`http://localhost:5000/messages/${activeChat._id}`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
      
        setMessages(data.messages || []);
      });

  }, [activeChat]);



  /* ---------------- AUTO SCROLL ---------------- */

  useEffect(() => {

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);



  /* ---------------- SEND MESSAGE ---------------- */

  const handleSendMessage = () => {

    if (!messageInput.trim()) return;
    if (!activeChat) return;

    const newMessage = {
      senderId: user._id,
      receiverId: activeChat._id,
      text: messageInput
    };

    socket.emit("send_message", newMessage);

    setMessageInput("");

  };



  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />



      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-100">

        {activeChat ? (
          <>

            {/* Chat Header */}

            <div className="p-4 bg-white shadow flex items-center gap-3">

              <img
                src={
                  activeChat.profilePicture ||
                  `https://ui-avatars.com/api/?name=${activeChat.fullName}`
                }
                alt="profile"
                className="w-10 h-10 rounded-full"
              />

              <div>
                <h2 className="font-semibold">
                  {activeChat.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  {activeChat.bio}
                </p>
              </div>

            </div>



            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-4 space-y-2">

              {messages.map((msg, index) => {

                const isMe =
                  msg.sender === user._id || msg.sender?._id === user._id;

                return (

                  <div
                    key={index}
                    className={`flex ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >

                    <div
                      className={`px-4 py-2 rounded-lg max-w-xs ${
                        isMe
                          ? "bg-blue-500 text-white"
                          : "bg-white shadow"
                      }`}
                    >
                      {msg.message}
                    </div>

                  </div>

                );

              })}

              <div ref={bottomRef}></div>

            </div>



            {/* Input */}

            <div className="p-4 bg-white flex gap-2">

              <input
                type="text"
                value={messageInput}
                onChange={(e) =>
                  setMessageInput(e.target.value)
                }
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2"
              />

              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-6 rounded-full"
              >
                Send
              </button>

            </div>

          </>
        ) : (

          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging 💬
          </div>

        )}

      </div>
    </div>
  );
};

export default ChatPage;