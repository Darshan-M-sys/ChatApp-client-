import React from 'react'
import FormField from './FormFeild'
import Header from './Header'

const Login = () => {
  return (
    <>
    <Header/>
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'
      ><div className="text-2xl font-bold text-center">
          Login to Your Account
        </div>
        <form className="space-y-6">
          <FormField label="Email" name="email" type="email" required />
          <FormField label="Password" name="password" type="password" required />
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div className="flex items-center justify-between">
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register
            </a>
          </p>
      <p className="text-sm text-center text-gray-600">
       
            <a href="/change-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Change your password?
            </a>
          </p>
    </div>
    <p className="text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} chat App. All rights reserved.
    </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
