import React, { useEffect, useState } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import PhotoView from "./PhotoView";
import OtherProfile from "./OtherProfile";
import Header from "./Header";

const InviteFriends = () => {

  const [text, settext] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [image, setImage] = useState("");

  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/profile/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProfiles(data?.data || []))
      .catch((err) => console.log(err));
  }, []);

  const filterData = profiles.filter((p) =>
    p.fullName.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <>
      <Header />

      <div className="min-h-screen flex justify-center bg-gray-100 p-4">

        <div className="bg-white w-full md:max-w-2xl rounded-xl shadow-lg p-5">

          {/* Page Title */}
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-blue-500">
              Invite Friends
            </h1>
            <p className="text-gray-500">
              Find people and start chatting
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              type="search"
              placeholder="Search friends..."
              onChange={(e) => settext(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Profiles List */}
          <div className="overflow-y-auto max-h-[600px] flex flex-col gap-3">

            {filterData.length > 0 ? (
              filterData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition cursor-pointer"
                >

                  {/* Left Side */}
                  <div
                    onClick={() => (setProfile(item), setShow(true))}
                    className="flex items-center gap-3 flex-1"
                  >

                    {/* Profile Image */}
                    <img
                      onClick={() => setImage(item.profilePicture)}
                      className="w-[55px] h-[55px] rounded-full border-2 border-blue-500 object-cover"
                      src={
                        item.profilePicture ||
                        `https://ui-avatars.com/api/?name=${item.fullName}`
                      }
                      alt=""
                    />

                    {/* Profile Info */}
                    <div>
                      <p className="font-semibold text-lg text-blue-500">
                        {item.fullName}
                      </p>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        {item.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end gap-2">

                    <p className="text-xs text-gray-400">
                      {String(item.createdAt).split("T")[0]}
                    </p>

                    <button className="flex items-center gap-1 bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600">
                      <FaUserPlus />
                      Invite
                    </button>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-10">
                No Profiles Found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Preview */}
      {image && (
        <PhotoView image={image} onClose={() => setImage("")} />
      )}

      {/* Profile Modal */}
      {show && (
        <OtherProfile
          user={profile}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
};

export default InviteFriends;