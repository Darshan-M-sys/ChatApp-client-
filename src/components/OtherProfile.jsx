import React, { useEffect, useState } from "react";
import Header from "./Header";
import PhotoView from "./PhotoView";
import { IoCloseSharp } from "react-icons/io5";
import EventDisplay from "./Chat/EventDisplay";

const OtherProfile = ({ user, onClose }) => {

  const [image, setImage] = useState("");
  const [requestId, setRequestId] = useState("");

  // status: none | pending | accepted
  const [status, setStatus] = useState("none");

  const [event, setEvent] = useState({
    show: false,
    type: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);


  // Check Friend Request Status
  const checkRequestStatus = () => {

    fetch(`http://localhost:5000/friend/invite/${user._id}`, {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.success) {
           
          setRequestId(data.data?._id);

          if (data.data.status === "accepted") {
            setStatus("accepted");
          }
          else if (data.data.status === "pending") {
            setStatus("pending");
          }

        } else {
          setStatus("none");
        }

      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    if (user?._id) {
      checkRequestStatus();
    }
  }, [user]);


  // Send Invite
  const sendInvite = (id) => {

    setLoading(true);

    fetch(`http://localhost:5000/friend/invite/${id}`, {
      method: "POST",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {

        setEvent({
          show: true,
          message: data.msg,
          type: "success"
        });

        checkRequestStatus();

      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };


  // Withdraw Request
  const handleWithdrawRequest = () => {

    setLoading(true);

    fetch(`http://localhost:5000/friend/request/${requestId}`, {
      method: "DELETE",
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {

        setEvent({
          show: true,
          message: data.msg,
          type: "success"
        });

        checkRequestStatus();

      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };


  return (
    <>

      {/* Notification */}
      {event.show && (
        <EventDisplay
          type={event.type}
          message={event.message}
          onClose={() =>
            setEvent({
              type: "",
              message: "",
              show: false
            })
          }
        />
      )}

      <Header />

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">

        <div className="max-w-md w-[320px] md:w-full relative bg-white shadow-lg rounded-xl p-6">


          {/* Profile Header */}
          <div className="flex flex-col items-center">

            <p className="text-xl font-[600] p-2">
              {String(user.fullName).split(" ")[0]}'s Profile
            </p>

            <img
              onClick={() => setImage(user.profilePicture)}
              src={
                user.profilePicture ||
                `https://ui-avatars.com/api/?name=${user.fullName}`
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 cursor-pointer"
            />

            {image && (
              <PhotoView image={image} onClose={() => setImage("")} />
            )}

            <h2 className="text-xl font-semibold mt-3">
              {user.fullName}
            </h2>

            <p className="text-gray-500 text-sm">
              {user.bio || "No bio available"}
            </p>

            <span
              className={`mt-2 px-3 py-1 text-xs rounded-full ${
                user.isOnline
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {user.isOnline ? "Online" : "Offline"}
            </span>

          </div>


          {/* Info */}
          <div className="mt-6 space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-500">Joined</span>

              <span className="font-medium">
                {String(user?.createdAt || "").split("T")[0]}
              </span>
            </div>

          </div>


          {/* Close Button */}
          <button
            className="absolute top-[-10px] right-[-10px] text-white bg-black p-2 rounded-full text-3xl"
            onClick={onClose}
          >
            <IoCloseSharp />
          </button>



          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">

            {status === "accepted" ? (

              <button
                className="flex-1 py-2 bg-green-600 text-white rounded-lg"
                disabled
              >
                Friends
              </button>

            ) : status === "pending" ? (

              <button
                disabled={loading}
                onClick={handleWithdrawRequest}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                {loading ? "Loading..." : "Withdraw"}
              </button>

            ) : (

              <button
                disabled={loading}
                onClick={() => sendInvite(user._id)}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {loading ? "Loading..." : "Invite"}
              </button>

            )}

          </div>

        </div>

      </div>

    </>
  );
};

export default OtherProfile;