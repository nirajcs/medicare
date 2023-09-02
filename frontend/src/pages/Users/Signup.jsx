import React from 'react'
import signup from '../../assets/images/signup-img.jpg'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <section className='p-2 px-5 lg:px-0'>
      <div className='w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
          <span className='text-primaryColor'>Register</span> User
        </h3>
      </div>
 
      <div className='md:flex md:items-center md:text-center justify-between w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <div className='hidden md:block'>
          <img src={signup} className="h-96" alt="" />
        </div>
        <form action="" className="flex-col text-center md:mx-[60px] md:text-center">
          <div className="my-[30px]">
            <input type="text" name="name" placeholder="Enter your name" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className="my-[30px]">
            <input type="email" name="email" placeholder="Enter your email" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className="my-[30px]">
            <input type="number" name="phone" placeholder="Enter your phone" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className="my-[30px]">
            <input type="password" name="password" placeholder="Enter your password" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className="my-[30px]">
            <input type="text" name="confirm-password" placeholder="Confirm your password" className="w-[200px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className='flex items-center justify-center'>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
          </div>
          <div className="my-[10px] text-[12px] flex items-center justify-center">
            <p className='text-textGray'>New User?</p>
            <Link to='/'>
              <p className='text-primaryColor mx-[2px]'>Login</p>
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Signup