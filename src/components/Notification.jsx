import React, { useEffect, useState } from "react";
import Header from "./Header";

const Notification = () => {

const [notifications,setNotifications]=useState([]);

useEffect(()=>{

fetch("http://localhost:5000/notification",{
credentials:"include"
})
.then(res=>res.json())
.then(data=>setNotifications(data.data || []))

},[])



const handleAccept = (id) => {

  fetch(`http://localhost:5000/friend/response/${id}`, {
    method: "PUT",
    credentials: "include",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      status: "accepted"
    })

  })
  .then((res) => res.json())
  .then((data) => {

    console.log(data)

    // update UI
    setNotifications((prev)=>
      prev.filter((n)=>n._id !== id)
    )

  })
  .catch((err)=>console.log(err))

}
  return (
    <>
      <Header/>

      <div className="min-h-screen bg-gray-100 flex justify-center p-6">

        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-5">

          <h2 className="text-2xl font-bold mb-6 border-b pb-3">
            Notifications
          </h2>

          <div className="space-y-4">

            {notifications.length > 0 ? notifications.map((item) => (

              <div
                key={item._id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
              >

                {/* Left */}
                <div className="flex items-center gap-4">

                  <img
                    src={
                      item.sender?.profilePicture ||
                      `https://ui-avatars.com/api/?name=${item.sender?.fullName}`
                    }
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />

                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">
                        {item.sender?.fullName}
                      </span>{" "}
                      {item.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* Right Buttons */}
                {item.type === "friend_request" && (
                  <div className="flex gap-2">

                    <button onClick={()=>handleAccept(item.requestId)} className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600">
                      Accept
                    </button>

                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                      Reject
                    </button>

                  </div>
                )}

              </div>

            )) : (

              <div className="text-center text-gray-400">
                No Notifications
              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default Notification;