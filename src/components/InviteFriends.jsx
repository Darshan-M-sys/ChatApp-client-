import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import PhotoView from './PhotoView';
import OtherProfile from './OtherProfile';
import Header from './Header';


const InviteFriends = () => {
  const [text,settext]=useState("")
const [profiles,setProfiles]=useState([]);
 const [image,setImage]=useState("")
useEffect(()=>{
 fetch("http://localhost:5000/profile/all",{
  credentials:"include"
 }).then((res)=>res.json())
 .then((data)=>setProfiles(data?.data || []))
 .catch((err)=>console.log(err))
},[])

const [profile,setProfile]=useState({})
const[show,setShow]=useState(false)

const filterData=profiles.filter((p)=>p.fullName.toLowerCase().includes(text.toLowerCase()))
  return (
     <>
     <Header/>
    <div className='min-h-[100vh] flex justify-center  items-center'>
      <div className="bg-white w-full  md:max-w-xl min-h-[100vh] p-5 shadow shadow-xl">
     <div className="bg-blue-500   p-2 text-white text-center "> 
      <p className="text-2xl  font-[500]" > Invite Your Friend </p>
      <p> Connect to continue Chat</p>
     </div>
     <div>
      <div className="relative">
      <input className=" pl-8 p-2 text-xl w-full  my-1 border focus:outline-none focus:border focus:border-blue-500 rounded-lg" type="search" onChange={(e)=>settext(e.target.value)}  placeholder='Search '/>
      <p className="absolute  top-[20px] text-gray-300 left-2 "><FaSearch/></p>
      </div>
<div className="overflow-y-auto mt-4 max-h-[570px] flex flex-col  gap-3 md:gap-4">
       {filterData.length>0? filterData.map((item,index)=>{
        return(
          <div key={index} onClick={()=>(setProfile(item) ,setShow(true ))} className="flex  items-center  justify-between  gap-3  md:gap-6" >
            <img onClick={()=>setImage(item.profilePicture)}  className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full  border  border-[3px]  border-blue-500" src={ item.profilePicture || `https://ui-avatars.com/api/?name=${item.fullName}`} />
            <div className="flex-1">
              {image && (
                <PhotoView image={image} onClose={()=>setImage("")}/>
              )}
            <p className="text-xl md:text-2xl font-bold text-blue-400">{item.fullName}</p>
            <p className="text-gray-600 font-[400] wrap  text-[10px] md:text-base md:leading-[6px]">{item.bio}</p>
            </div>
            <p className="text-right md:text-base text-[10px] text-gray-300 ">{String(item.createdAt).split('T')[0]}</p>
         
      </div>
        )
      }):<div>
        No Profile Found
        </div>}
     
      </div>
     </div>
      </div>
</div>
       {show &&( <OtherProfile user={profile} onClose={()=>setShow(false)}  />)}
    </>
  )
}

export default InviteFriends
