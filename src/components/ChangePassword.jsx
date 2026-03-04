import React from 'react'
import FormField from './FormFeild'
import Header from './Header'

const ChangePassword = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-bold text-center">
          Change Your Password
        </div>
        
        <form className="space-y-6">
         <FormField 
         label="email"
         name="email"
         type="email"
         required={true}
          />
          <FormField 
         label="current password"
         name="currentPassword"
          type="password"
          required={true} 
          />
          <FormField 
         label="new password"
         name="newPassword"
          type="password" 
          required={true}
            />
            <input type="submit" value="Change Password" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' />
          </form>
          <div>
            <p className="text-sm text-center text-gray-600">
              Remembered your password?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login here
              </a>
            </p>
           <p className="text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} chat App. All rights reserved.
    </p>
                 </div>
            </div>

    </div>
    </>
  )
}

export default ChangePassword
