import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { usersApi } from '../../axiosApi/axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPass,setConfirmPass] = useState('')

  const navigate = useNavigate()
  const location = useLocation();
  const email = location.state.email;
  const submitHandler = async(e)=>{
    e.preventDefault()
    if(!password || !confirmPass){
      toast.error("Both fields are required")
      return
    }
    if(password != confirmPass){
      toast.error("Passwords does not match")
      return
    }
    try {
      let res = await usersApi.post('/reset-password',{email,password})
      if(res){
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      
    }
  }

  return (
    <section className='px-5 lg:px-0 h-screen'>
      <div className='text-center md:text-left w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold'>
          Reset your <span className='text-primaryColor'>Password</span>
        </h3>
      </div>
 
      <div className='md:items-center w-full max-w-[700px] mx-auto rounded-lg shadow-md p-5'>
        <form onSubmit={submitHandler} className="flex-col text-center md:mx-[60px] md:text-center">
          <div className="my-[20px]">
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="email" placeholder="Enter your password" className="w-[250px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
          <div className="my-[20px]">
            <input onChange={(e)=>setConfirmPass(e.target.value)} value={confirmPass} type="text" name="otp" placeholder="Re-enter your password" className="w-[250px] text-[15px] border-solid border-b-2 focus:text-[16px] focus:border-blue-500 focus:outline-none"/>
          </div>
            <div className='flex items-center justify-center'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Reset Password</button>
            </div>
        </form>

      </div>
    </section>
  )
}

export default ResetPassword