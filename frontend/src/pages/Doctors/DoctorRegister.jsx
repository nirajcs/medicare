import React from 'react'
import { Link } from 'react-router-dom'

const DoctorRegister = () => {
  return (
    <section className='p-4 px-5 lg:px-0'>
      <div className='faded-blue-div text-center md:text-left w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
          Doctor <span className='text-primaryColor'>Registration</span>
        </h3>
      </div>
 
      <div className='faded-blue-div m-3 md:flex-col w-full max-w-[1000px] mx-auto rounded-lg shadow-md p-5'>
        <form action="" className="md:flex md:justify-between md:mx-[60px] items-center">
            <div className='px-2'>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="name">Name</label>
                  <input type="text" name="name" id='name' placeholder="Enter Your Name" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="email">Email</label>
                  <input type="email" name="email" id='email' placeholder="Enter Your Email" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="mobile">Mobile</label>
                  <input type="text" name="number" id='mobile' placeholder="Enter Your Mobile" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="mobile">Specialisation</label>
                  <input type="text" name="specialisation" id='specialization' placeholder="Your Specialization" className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
                </div>
                <div className="my-[10px]">
                  <label className='text-blue-500 text-sm font-medium' htmlFor="address">Address</label>
                  <textarea name="address" id='address' cols="50" rows="4" placeholder='Enter Your Address' className="block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"></textarea>
                </div>
            </div>
            <div className='px-2'>
              <div className="my-[10px]">
                <label className="block font-medium text-blue-500 text-sm" htmlFor="small_size">Upload your Photo</label>
                <input  type="file" className="p-0.5 text-xs text-900 cursor-pointer" id="small_size"/>
              </div>
              <div className="my-[20px]">
                <div>
                  <label className='text-sm text-blue-500 font-medium' htmlFor="address">Qualification</label>
                  <textarea name="qualification" className='block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none' id="qualification" placeholder='Qualification' cols="30" rows="2"></textarea>
                </div>
                <div>
                  <input  type="file" className="p-0.5 text-xs text-900 cursor-pointer" id="small_size"/>
                </div>
              </div>
              <div className="my-[20px]">
                <div>
                <label className='text-sm text-blue-500 font-medium' htmlFor="address">Experience</label>
                  <textarea name="experience" className='block px-2 py-1 w-full text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none' id="experience" placeholder='Experience' cols="30" rows="2"></textarea>
                </div>
                <div>
                  <input  type="file" className="p-0.5 text-xs text-900 cursor-pointer" id="small_size"/>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                  <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register For Approval</button>
              </div>
              <div className="my-[10px] text-[12px] flex items-center justify-center">
                  <p className='text-textGray'>Already In?</p>
                  <Link to='/doctors'>
                  <p className='text-primaryColor mx-[2px]'>Login</p>
                  </Link>
              </div>
            </div>
        </form>
        <div className='text-center'>
          <p className='text-blue-500 font-bold my-2'>**Approval is done by the admin team only after proper verification</p>
        </div>
      </div>
    </section>
  )
}

export default DoctorRegister