import React from 'react'
import { Form } from 'react-router-dom'
import FormField from './FormFeild'
import Header from './Header'

const ProfileCreate = () => {
  return (
    <>
    <Header/>
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
        <div className="text-2xl font-bold text-center">
          Create Your Profile
        </div>
        <form className="space-y-6">
<FormField label="Username" name="username" type="text" required />
<FormField label="Email" name="email" type="email" required />
<FormField label="Profile Picture" name="profilePicture" type="file" file={true} accept="image/*" />
<FormField label="Bio" name="bio" textarea={true} rows={4} />
<input type="submit" value="Create Profile" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' />
          </form>
      </div>
      
    </div>
    </>
  )
}

export default ProfileCreate
